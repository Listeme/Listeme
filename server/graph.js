const { Neo4jGraphQL } = require("@neo4j/graphql");
const { Neo4jGraphQLAuthJWTPlugin } = require("@neo4j/graphql-plugin-auth");

const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");
require("dotenv").config({path: "./config.env"});

const neo_url = process.env.NEO_URL;
const neo_user = process.env.NEO_USER;
const neo_pass = process.env.NEO_PASS;
const server_port = process.env.SERVER_PORT;
const secret = process.env.SECRET;

const typeDefs = gql`
    type User {
        id: ID! @id
        email: String! @unique
        password: String!
        jwt: String @unique
        notes: [Note!]! @relationship(type: "OWNED_BY", direction: OUT)
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime! @timestamp(operations: [UPDATE])
    }
    
    type Task {
        id: ID! @id
        name: String!
        notes: [NotesFolder!]! @relationship(type: "HAS_NOTE", direction: OUT)
        completed: Boolean!
        startDate: DateTime!
        endDate: DateTime!
        subtasks: [Task!]! @relationship(type: "HAS_SUBTASK", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime! @timestamp(operations: [UPDATE])
    }
        
    type NotesFolder {
        id: ID! @id
        name: String!
        notes: [Note!]! @relationship(type: "HAS_NOTE", direction: OUT)
        subfolders: [NotesFolder!]! @relationship(type: "HAS_SUBFOLDER", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime! @timestamp(operations: [UPDATE])
    }
    
    type Note {
        id: ID! @id
        title: String!
        content: String!
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime! @timestamp(operations: [UPDATE])
    }
    
    type Pomodoro {
        id: ID! @id
        startTime: String!
        endTime: String!
        task: [Task!]! @relationship(type: "HAS_POMODORO", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime! @timestamp(operations: [UPDATE])
    }
`;

const driver = neo4j.driver(
    neo_url,
    neo4j.auth.basic(neo_user, neo_pass)
);

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
    plugins: {
        auth: new Neo4jGraphQLAuthJWTPlugin({
            secret: secret
        })
    }
});

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ req })
    });

    server.listen({port: server_port}).then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
})