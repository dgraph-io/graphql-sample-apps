import React from "react";
import Question from "./Question";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import queryString from "query-string";
import { Card } from "semantic-ui-react";

const GET_FILTERED_QUESTIONS = gql`
  query Question($search: String!) {
    queryQuestion(
      filter: {
        or: {
          title: { anyofterms: $search }
          or: { text: { anyoftext: $search } }
        }
        tags: { eq: $search }
      }
    ) {
      id
      title
      text
      likes
      author {
        username
      }
    }
  }
`;

const GET_TOP_QUESTIONS = gql`
  query {
    queryQuestion(first: 10) {
      id
      text
      title
      tags
      author {
        username
      }
    }
  }
`;

export default function QuestionList(props) {
  let params,
    search = "";
  if (props.location.search !== "") {
    params = queryString.parse(props.location.search);
    search = params.search;
  }
  let query = GET_FILTERED_QUESTIONS;
  if (search === "") {
    query = GET_TOP_QUESTIONS;
  }

  const { loading, error, data } = useQuery(query, {
    variables: { search },
    fetchPolicy: "network-only"
  });
  if (loading) return "Fetching Questions...";
  if (error) return `Error: ${error}`;
  const questions = data.queryQuestion;
  
  return (
    <div className="container">
      <Card.Group itemsPerRow={1}>
        {questions.map(question => (
          <Question key={question.text} question={question} />
        ))}
      </Card.Group>
    </div>
  );
}
