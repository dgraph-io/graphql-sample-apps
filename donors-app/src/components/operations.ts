import { gql } from "urql";
import { graphql } from "../gql";
/*
   run yarn graphql-codegen --watch 
   in a terminal to have codegen monitoring you edits and build types
*/
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
export const ProjectFragment = graphql(`
  fragment ProjectItem on Project {
    id 
    title
    school {
      name
      geoloc {
        latitude
        longitude
      }
    }
    grade
  }
`)

export const SchoolslByTermDocument = graphql(`
  query schoolsByTerm($term: String!) {
    querySchool (filter: {name: {allofterms: $term}}, first: 10) {

        ...SchoolItem

    }
  }
`)
export const ProjectsBySemantic = graphql(`
  query projectsBySemantic($term: String!) {
    semSearchProjects(first: 3, title: $term) {
      id 
    title
    school {
      name
      geoloc {
        latitude
        longitude
      }
    }
    grade
    }
  }
`)

export const AllCategoriesDocument = graphql(`
  query allCategories{
    queryCategory (order: {asc: name}){
        name
    }
  }
`)
export const AddCategoryDocument = graphql(`
  mutation addCategory($name: String!){
     addCategory(input: {name: $name}) {
        numUids
     }
  }
  
`)




