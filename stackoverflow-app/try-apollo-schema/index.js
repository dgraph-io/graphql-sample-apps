import {
  introspectSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { ApolloServer } from "apollo-server";

const dgraph = require("dgraph-js");
const grpc = require("grpc");

const clientStub = new dgraph.DgraphClientStub(
  // addr: optional, default: "localhost:9080"
  "localhost:9080",
  // credentials: optional, default: grpc.credentials.createInsecure()
  grpc.credentials.createInsecure()
);
const dgraphClient = new dgraph.DgraphClient(clientStub);

const query = `query {
  project(func: type(Project)) {
     uid
     Project.name
}
}`;

const createDgraphData = async () => {
  const res = await dgraphClient.newTxn().query(query);

  const ppl = res.getJson();
  console.log("dsadsa", ppl.project[0]["Project.name"]);
  ppl.project.forEach((proj) => console.log(proj["Project.name"]));
};

createDgraphData();

const createUserSchema = async () => {
  const link = new HttpLink({
    uri: `http://localhost:8080/graphql`,
    fetch,
  });

  const remoteUserSchema = await introspectSchema(link);
  return makeRemoteExecutableSchema({
    schema: remoteUserSchema,
    link,
  });
};

const typeDefs = `
  type Query {
    proj_name: String
  }
`;

const resolvers = {
  Query: {
    proj_name: async (root, args, context, info) => {
      const res = await dgraphClient.newTxn().query(query);
      const ppl = res.getJson();
      return ppl.project[0]["Project.name"];
    },
  },
};

const createNewSchema = async () => {
  const userExecutableSchema = await createUserSchema();
  const projSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  // Merge the two schemas
  return mergeSchemas({
    schemas: [userExecutableSchema, projSchema],
  });
};

const runServer = async () => {
  // Get newly merged schema
  const schema = await createNewSchema();
  // start server with the new schema
  const server = new ApolloServer({
    schema,
  });
  server.listen().then(({ url }) => {
    console.log(`Running at ${url}`);
  });
};

try {
  runServer();
} catch (err) {
  console.error(err);
}
