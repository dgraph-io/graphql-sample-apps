import { useSubscription, gql } from "@apollo/client";
import { Card, Image } from "semantic-ui-react";

const GET_TODOS = gql`
  subscription {
    queryTodo {
      title
      description
      completed
    }
  }
`;

const TodoList = () => {
  const { loading, error, data } = useSubscription(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Card.Group>
      {data.queryTodo.map(({ id, title, description, completed }) => (
        <Card>
          <Image
            src="/diggy.png"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{completed ? "Done" : "Pending"}</Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default TodoList;
