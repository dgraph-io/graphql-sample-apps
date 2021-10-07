import { useSubscription } from "@apollo/client";
import { QUERY_LOGGED_IN_USER } from "../GraphQL/Queries";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Spinner,
  Text,
  Card,
  CardBody,
  Heading,
  Avatar,
  CardHeader,
  Box,
  Grid,
  Image,
  CardFooter,
} from "grommet";

const Feed = () => {
  const { user } = useAuth0();
  const { email } = user;

  const { data, loading, error } = useSubscription(QUERY_LOGGED_IN_USER, {
    variables: {
      userFilter: {
        email: {
          eq: email,
        },
      },
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div>
        <Text size="large" color="red">
          {error.message}
        </Text>
      </div>
    );
  }
  console.log(data);
  return (
    <Box pad="large" direction="row" alignSelf="center">
      <Grid
        gap="large"
        rows="medium"
        columns={{ count: "fit", size: ["small", "medium"] }}
      >
        {data.queryUser.map((userInfo) =>
          userInfo.following.map((followedUser) =>
            followedUser.posts.map((post) => (
              <Card width="medium" key={post.id}>
                <CardHeader
                  pad={{ horizontal: "small", vertical: "small" }}
                  background="light-1"
                  width="medium"
                  justify="stretch"
                  gap="small"
                >
                  <Avatar
                    size="small"
                    src={post.postedBy.avatarImageURL}
                    a11yTitle="Generated avatar for the user from robohash.org"
                  />

                  <Heading level="4" margin="none">
                    {post.postedBy.username}
                  </Heading>
                </CardHeader>
                <CardBody height="medium">
                  <Image fit="cover" src={post.imageURL} />
                </CardBody>
                <CardFooter
                  pad={{ horizontal: "small" }}
                  height="xxsmall"
                  background="light-3"
                  justify="between"
                  gap="xxsmall"
                >
                  <Text size="small">{post.description}</Text>
                  <Heading level="5" margin="none">
                    {post.likes === 1
                      ? `${post.likes} like`
                      : `${post.likes} likes`}
                  </Heading>
                </CardFooter>
              </Card>
            ))
          )
        )}
      </Grid>
    </Box>
  );
}

// Do not show this component unless the user have logged in
export default withAuthenticationRequired(Feed, {
  onRedirecting: () => <Spinner />,
});
