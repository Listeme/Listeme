const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type User {
        email: String!
        password: String!
        jwt: String
    }
    
    type Task {
        id: ID!
        name: String!
        notes: [NotesFolder!]! @relationship(type: "HAS_NOTE", direction: OUT)
        completed: Boolean!
        startDate: String!
        endDate: String!
        subtasks: [Task!]! @relationship(type: "HAS_SUBTASK", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
    }
        
    type NotesFolder {
        id: ID!
        name: String!
        notes: [Note!]! @relationship(type: "HAS_NOTE", direction: OUT)
        subfolders: [NotesFolder!]! @relationship(type: "HAS_SUBFOLDER", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
    }
    
    type Note {
        id: ID!
        title: String!
        content: String!
        user: User! @relationship(type: "OWNED_BY", direction: IN)
    }
    
    type Pomodoro {
        id: ID!
        startTime: String!
        endTime: String!
        task: [Task!]! @relationship(type: "HAS_POMODORO", direction: OUT)
        user: User! @relationship(type: "OWNED_BY", direction: IN)
    }
`;

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "kitten")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: neoSchema.schema,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});