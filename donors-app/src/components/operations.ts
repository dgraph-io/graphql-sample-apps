import { graphql } from "../gql";

export const SchoolFragment = graphql(`
  fragment SchoolItem on School {
    id
    name
    type
    projects {
        title
    }
  }
`)


export const SchoolslByTermDocument = graphql(`
  query schoolsByTerm($term: String!) {
    querySchool (filter: {name: {allofterms: $term}}, first: 10) {
        ...SchoolItem
    }
  }
`)

