/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment SchoolItem on School {\n    id\n    name\n    type\n    projects {\n        title\n    }\n  }\n": types.SchoolItemFragmentDoc,
    "\n  fragment ProjectItem on Project {\n    id \n    title\n    school {\n      name\n      geoloc {\n        latitude\n        longitude\n      }\n    }\n    grade\n  }\n": types.ProjectItemFragmentDoc,
    "\n  query schoolsByTerm($term: String!) {\n    querySchool (filter: {name: {allofterms: $term}}, first: 10) {\n\n        ...SchoolItem\n\n    }\n  }\n": types.SchoolsByTermDocument,
    "\n  query projectsBySemantic($term: String!) {\n    semSearchProjects(first: 3, title: $term) {\n      id \n    title\n    school {\n      name\n      geoloc {\n        latitude\n        longitude\n      }\n    }\n    grade\n    }\n  }\n": types.ProjectsBySemanticDocument,
    "\n  query allCategories{\n    queryCategory (order: {asc: name}){\n        name\n    }\n  }\n": types.AllCategoriesDocument,
    "\n  mutation addCategory($name: String!){\n     addCategory(input: {name: $name}) {\n        numUids\n     }\n  }\n  \n": types.AddCategoryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SchoolItem on School {\n    id\n    name\n    type\n    projects {\n        title\n    }\n  }\n"): (typeof documents)["\n  fragment SchoolItem on School {\n    id\n    name\n    type\n    projects {\n        title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectItem on Project {\n    id \n    title\n    school {\n      name\n      geoloc {\n        latitude\n        longitude\n      }\n    }\n    grade\n  }\n"): (typeof documents)["\n  fragment ProjectItem on Project {\n    id \n    title\n    school {\n      name\n      geoloc {\n        latitude\n        longitude\n      }\n    }\n    grade\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query schoolsByTerm($term: String!) {\n    querySchool (filter: {name: {allofterms: $term}}, first: 10) {\n\n        ...SchoolItem\n\n    }\n  }\n"): (typeof documents)["\n  query schoolsByTerm($term: String!) {\n    querySchool (filter: {name: {allofterms: $term}}, first: 10) {\n\n        ...SchoolItem\n\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query projectsBySemantic($term: String!) {\n    semSearchProjects(first: 3, title: $term) {\n      id \n    title\n    school {\n      name\n      geoloc {\n        latitude\n        longitude\n      }\n    }\n    grade\n    }\n  }\n"): (typeof documents)["\n  query projectsBySemantic($term: String!) {\n    semSearchProjects(first: 3, title: $term) {\n      id \n    title\n    school {\n      name\n      geoloc {\n        latitude\n        longitude\n      }\n    }\n    grade\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allCategories{\n    queryCategory (order: {asc: name}){\n        name\n    }\n  }\n"): (typeof documents)["\n  query allCategories{\n    queryCategory (order: {asc: name}){\n        name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addCategory($name: String!){\n     addCategory(input: {name: $name}) {\n        numUids\n     }\n  }\n  \n"): (typeof documents)["\n  mutation addCategory($name: String!){\n     addCategory(input: {name: $name}) {\n        numUids\n     }\n  }\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;