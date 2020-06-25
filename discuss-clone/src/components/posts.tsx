import React from "react"
import { Container, Header, Feed, Icon, Loader } from "semantic-ui-react"
import { useAllPostsQuery } from "./types/operations"

export function PostFeed() {
  const { data, loading, error } = useAllPostsQuery()

  if (loading) return <Loader />
  if (error) return `Error! ${error.message}`

  const items = data?.queryPost?.map((post) => (
    <Feed.Event>
      <Feed.Label>
        <img src="/diggy.png" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Diggy</Feed.User> {post?.title}
          <Feed.Date>1 Hour Ago</Feed.Date>
          <Feed.Extra text>
            {post?.text.substring(0, 100)}...(posted in{" "}
            <a>{post?.category.name}</a>)
          </Feed.Extra>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" />1 Like
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  ))

  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Which Posts Interest You?</Header>

      <Feed>{items}</Feed>
    </Container>
  )
}
