const { Neo4jGraphQL } = require("@neo4j/graphql");
const { Neo4jGraphQLAuthJWTPlugin } = require("@neo4j/graphql-plugin-auth");
const { OGM } = require("@neo4j/graphql-ogm");

const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config({path: "./config.env"});

const neo_url = process.env.NEO_URL;
const neo_user = process.env.NEO_USER;
const neo_pass = process.env.NEO_PASS;
const server_port = process.env.SERVER_PORT;
const secret = process.env.SECRET;

const typeDefs = `
    type User
        @exclude(operations: [CREATE, UPDATE, DELETE])
        @auth (
            rules: [
                {
                    operations: [READ, CONNECT, DISCONNECT],
                    allow: { id: "$jwt.sub", jwtid: "$jwt.jti" } # checks the user subject, and if it matches the most recent jwt
                }
            ]
        ) {
        id: ID! @id @readonly
        name: String! @readonly
        email: String! @unique @readonly
        password: String! @writeonly
        notes: [Note!]! @relationship(type: "OWNED_BY", direction: OUT)
        lastModified: DateTime! @timestamp @readonly
        jwtid: ID! @writeonly
    }

    type Task 
        @auth (
            rules: [
                {
                    operations: [CREATE, UPDATE, DELETE, CONNECT, DISCONNECT],
                    bind: { user: { id: "$jwt.sub", jwtid: "$jwt.jti"}}
                },
                {
                    operations: [READ],
                    where: { user: { id: "$jwt.sub" }},
                    where: { user: { jwtid: "$jwt.jti" }}
                }
            ]
        ) {
        id: ID! @id @readonly
        name: String!
        notes: [NotesFolder!]! @relationship(type: "HAS_NOTE", direction: OUT)
        completed: Boolean!
        startDate: DateTime!
        endDate: DateTime!
        subtasks: [Task!]! @relationship(type: "HAS_SUBTASK", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN) 
        lastModified: DateTime! @timestamp
    }

    type NotesFolder
        @auth (
            rules: [
                {
                    operations: [CREATE, UPDATE, DELETE, CONNECT, DISCONNECT],
                    bind: { user: { id: "$jwt.sub", jwtid: "$jwt.jti"}}
                },
                {
                    operations: [READ],
                    where: { user: { id: "$jwt.sub" }},
                    where: { user: { jwtid: "$jwt.jti" }}
                }
            ]
        ) {
        id: ID! @id @readonly
        name: String!
        notes: [Note!]! @relationship(type: "HAS_NOTE", direction: OUT)
        subfolders: [NotesFolder!]! @relationship(type: "HAS_SUBFOLDER", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        lastModified: DateTime! @timestamp
    }

    type Note
        @auth (
            rules: [
                {
                    operations: [UPDATE, DELETE, CONNECT, DISCONNECT],
                    bind: { user: { id: "$jwt.sub", jwtid: "$jwt.jti"}}
                },
                {
                    operations: [READ],
                    where: { user: { id: "$jwt.sub" }},
                    where: { user: { jwtid: "$jwt.jti" }}
                }
            ]
        ) {
        id: ID! @id @readonly
        title: String!
        content: String!
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        lastModified: DateTime! @timestamp
    }

    type Pomodoro
        @auth (
            rules: [
                {
                    operations: [CREATE, UPDATE, DELETE, CONNECT, DISCONNECT],
                    bind: { user: { id: "$jwt.sub", jwtid: "$jwt.jti"}}
                },
                {
                    operations: [READ],
                    where: { user: { id: "$jwt.sub" }},
                    where: { user: { jwtid: "$jwt.jti" }}
                }
            ]
        ) {
        id: ID! @id @readonly
        startTime: String!
        endTime: String!
        task: [Task!]! @relationship(type: "HAS_POMODORO", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        lastModified: DateTime! @timestamp
    }
    
    type Mutation {
        signUp(name: String!, email: String!, password: String!): String!
        signIn(email: String!, password: String!): String!
    }
`;

const driver = neo4j.driver(
    neo_url,
    neo4j.auth.basic(neo_user, neo_pass)
);

const ogm = new OGM({ typeDefs, driver });

const User = ogm.model("User");

async function signIn(_source, { email, password }) {
    let [user] = await User.find({ where: { email }});

    if (!user) {
        throw new Error(`User with username ${email} does not exist`);
    }

    if (!bcrypt.compare(password, user.password)) {
        throw new Error(`Incorrect password`);
    }

    // NOTE: could check if the user has verified their email here

    let jti = uuidv4();
    let token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d", jwtid: jti })

    await User.update(
        {
            where: { id: user.id },
            update: { jwtid: jti }
        }
    );
    return token;
}

async function signUp(_source, { name, email, password }) {
    let [existingUser] = await User.find({ where: { email }});

    if (existingUser) {
        throw new Error(`User with email ${email} already exists`);
    }

    // NOTE: could send an email to verify the email address here
    let salt = await bcrypt.genSalt(10)
    let hashed_password = await bcrypt.hash(password, salt);

    const { users } = await User.create({ input: [{ name: name, email: email, password: hashed_password, jwtid: ''}] });

    let jti = uuidv4();
    let token = jwt.sign({ sub: users[0].id }, secret, { expiresIn: "7d", jwtid: jti })

    await User.update(
        {
            where: { id: users[0].id },
            update: { jwtid: jti }
        }
    );
    return token;
}

// NOTE: an endpoint to resend the verification email can be added here

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
    plugins: {
        auth: new Neo4jGraphQLAuthJWTPlugin({
            secret: secret
        })
    },
    resolvers: {
        Mutation: {
            signIn,
            signUp
        }
    }
});

Promise.all([neoSchema.getSchema(), ogm.init()]).then(([schema]) => {
    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
    });

    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
});