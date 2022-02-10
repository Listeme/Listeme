const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type Movie {
        title: String
        actors: [Actor] @relationship(type: "ACTED_IN", direction: IN)
    }

    type Actor {
        name: String
        movies: [Movie] @relationship(type: "ACTED_IN", direction: OUT)
    }
    
    type User {
        email: String!
        password: String!
    }
    
    type Task {
        id: ID!
        name: String!
        notes: [Note] @relation(name: "HAS_NOTE", direction: "OUT")
        completed: Boolean!
        dueDate: Time
        user: User! @relation(name: "HAS_TASK")
    }
        
    type Note {
        id: ID!
        user: User! @relation(name: "HAS_NOTE")
        title: String!
        content: String!
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