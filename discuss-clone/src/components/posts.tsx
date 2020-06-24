import React from "react"
import {
  Container,
  Header,
  Feed,
  Icon,
} from "semantic-ui-react"

export function PostFeed() {
  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Which Posts Interest You?</Header>

      <Feed>
      <Feed.Event>
          <Feed.Label>
            <img src="/diggy.png" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Diggy</Feed.User> I'm going to write lots of posts
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />1 Like
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <Feed.Event>
          <Feed.Label>
          <img src="/diggy.png" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Diggy</Feed.User> My first Post
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Container>
  )
}
