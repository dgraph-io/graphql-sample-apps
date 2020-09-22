import {
    makeRemoteExecutableSchema,
    introspectSchema
  } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import { fetch } from 'cross-fetch'
  
const link = new HttpLink({ 
    uri: 'http://localhost:8080/graphql', 
    fetch 
});

export const getDgSchema = async () => {
    const schema = await introspectSchema(link);

    const executableSchema = makeRemoteExecutableSchema({
        schema,
        link,
    });

    return executableSchema
}
