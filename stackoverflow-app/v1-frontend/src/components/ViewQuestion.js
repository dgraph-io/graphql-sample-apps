import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { Button, Comment, Form, Header, Feed, Icon } from "semantic-ui-react";
import { useAuth0 } from "../react-auth0-spa";

const GET_QUESTION = gql`
  query QUESTION($questionID: ID!) {
    getQuestion(id: $questionID) {
      id
      title
      text
      tags
      likes
      datePublished
      answers {
        id
        text
        author {
          username
        }
        comments {
            text
            datePublished
            author {
                username
            }
            comments {
                text
                datePublished
                author {
                    username
                }
            }
        }
        datePublished
      }
      comments {
        id
        text
        datePublished
        comments {
          text
          datePublished
          author {
            username
          }
          comments {
            text
            datePublished
            author {
              username
            }
          }
        }
        author {
          username
        }
      }
      author {
        username
      }
    }
  }
`;

const ADD_ANSWER = gql`
  mutation addAnswer($answer: String!, $questionID: ID!, $author: AuthorRef!, $datePublished: DateTime){
    addAnswer(input: [{ text: $answer, author: $author, datePublished: $datePublished,
    likes: 0, inAnswerTo: { id: $questionID } }]) {
      answer {text}
    }
  }
`;

export default function ViewQuestion(props) {
  const [numLikes, setNumLikes] = useState(0);
  const [answer, setAnswer] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const history = useHistory();
  const { user } = useAuth0();
  
  let params = queryString.parse(props.location.search);
  let questionID = params.questionID;

  let author
  if (user !== undefined) {
    author = {"username": user.email, "email": user.email}
  }
  let datePublished = new Date().toISOString()

  const { loading, error, data } = useQuery(GET_QUESTION, {
    variables: { questionID },
    fetchPolicy: "network-only"
  });
  const [addAnswer] = useMutation(ADD_ANSWER);

  if (loading) return "Fetching Questions...";
  if (error) return `Error: ${error}`;
  const question = data.getQuestion;
  if (numLikes === 0) {
    setNumLikes(question.numLikes);
  }

  return (
    <div className="container">
      <div className="h3 text-center">
        {question.title}
      </div>
      <hr />
      <div className="text-post">
        {question.text}
        <span className="tagsset-post">
          {question.tags.map(tag => (
            <span className="badge badge-secondary tag-post" key={tag}>
              {tag}
            </span>
          ))}
        </span>
      </div>
      <Feed.Like>
        <Icon name="like" />
        {question.likes} Likes
      </Feed.Like>
      <Comment.Group>
        <Header as="h5" dividing>
          Comments
        </Header>

        <Comment>
          {question.comments.length !== 0 &&
            question.comments.map(commentL1 => {
              return (
                <Comment.Content key={commentL1.id}>
                  <Comment.Author as="a">
                    {commentL1.author.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <span>
                      {new Date(commentL1.datePublished).toLocaleString()}
                    </span>
                  </Comment.Metadata>
                  <Comment.Text>{commentL1.text}</Comment.Text>
                </Comment.Content>
              );
            })}
          <Comment.Group collapsed={collapsed}>
            <Comment>
              {question.comments.length !== 0 &&
                question.comments[0].comments.length !== 0 && (
                  <Comment.Content>
                    <Comment.Author as="a">
                      {question.comments[0].comments[0].author.username}
                    </Comment.Author>
                    <Comment.Metadata>
                      <span>
                        {new Date(
                          question.comments[0].comments[0].datePublished
                        ).toLocaleString()}
                      </span>
                    </Comment.Metadata>
                    <Comment.Text>
                      {question.comments[0].comments[0].text}
                    </Comment.Text>
                  </Comment.Content>
                )}
              <Comment.Group>
                <Comment>
                  {question.comments.length !== 0 &&
                    question.comments[0].comments.length !== 0 &&
                    question.comments[0].comments[0].comments.length !== 0 && (
                      <Comment.Content>
                        <Comment.Author as="a">
                          {
                            question.comments[0].comments[0].comments[0].author
                              .username
                          }
                        </Comment.Author>
                        <Comment.Metadata>
                          <span>
                            {new Date(
                              question.comments[0].comments[0].comments[0].datePublished
                            ).toLocaleString()}
                          </span>
                        </Comment.Metadata>
                        <Comment.Text>
                          {question.comments[0].comments[0].comments[0].text}
                        </Comment.Text>
                      </Comment.Content>
                    )}
                </Comment>
              </Comment.Group>
            </Comment>
          </Comment.Group>
        </Comment>
        {question.comments.length !== 0 && collapsed && (
          <button
            type="button"
            className="btn btn-link"
            onClick={e => setCollapsed(false)}
          >
            More comments
          </button>
        )}
      </Comment.Group>
      <Comment.Group>
        <Header as="h5" dividing>
          Answers
        </Header>
        <Comment>
        {question.answers.map(answer => (
            <Comment.Content key={answer.id}>
              <Comment.Author as="a">{answer.author.username}</Comment.Author>
              <Comment.Metadata>
                <span>{new Date(answer.datePublished).toLocaleString()}</span>
              </Comment.Metadata>
              <Comment.Text>{answer.text}</Comment.Text>
            </Comment.Content>
        ))}
       <Comment.Group>
            <Comment>
              {question.answers.length !== 0 &&
                question.answers[0].comments.length !== 0 && (
                  <Comment.Content>
                    <Comment.Author as="a">
                      {question.answers[0].comments[0].author.username}
                    </Comment.Author>
                    <Comment.Metadata>
                      <span>
                        {new Date(
                          question.answers[0].comments[0].datePublished
                        ).toLocaleString()}
                      </span>
                    </Comment.Metadata>
                    <Comment.Text>
                      {question.answers[0].comments[0].text}
                    </Comment.Text>
                  </Comment.Content>
                )}
              <Comment.Group>
                <Comment>
                  {question.answers.length !== 0 &&
                    question.answers[0].comments.length !== 0 &&
                    question.answers[0].comments[0].comments.length !== 0 && (
                      <Comment.Content>
                        <Comment.Author as="a">
                          {
                            question.answers[0].comments[0].comments[0].author
                              .username
                          }
                        </Comment.Author>
                        <Comment.Metadata>
                          <span>
                            {new Date(
                              question.answers[0].comments[0].comments[0].datePublished
                            ).toLocaleString()}
                          </span>
                        </Comment.Metadata>
                        <Comment.Text>
                          {question.answers[0].comments[0].comments[0].text}
                        </Comment.Text>
                      </Comment.Content>
                    )}
                </Comment>
              </Comment.Group>
            </Comment>
          </Comment.Group>
          </Comment> 
        <Form reply>
          <Form.TextArea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <Button
            content="Add Answer"
            labelPosition="left"
            icon="edit"
            primary
            onClick={async e => {
              e.preventDefault();
              await addAnswer({ variables: { answer, questionID, author, datePublished } });
              history.push({
                pathname: '/',
              }); 
              history.push({
                pathname: '/view',
                search: `?questionID=${questionID}`
              });
            }}
          />
        </Form>
      </Comment.Group>
      <div>
      </div>    
    </div>
  );
}
