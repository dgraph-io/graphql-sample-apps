import React from "react"
import {
  Container,
  Header,
  Feed,
  Icon,
  Loader,
  Image,
  Popup,
} from "semantic-ui-react"
import { useAllPostsQuery } from "./types/operations"
import { DateTime } from "luxon"

export function PostFeed() {
  const { data, loading, error } = useAllPostsQuery()

  if (loading) return <Loader />
  if (error) return `Error! ${error.message}`

  const items = data?.queryPost?.map((post) => {
    let dateStr = "date unknown"
    if (post?.datePublished) {
      dateStr = DateTime.fromISO(post.datePublished).toRelative() ?? dateStr
    }

    const likes = post?.likes ?? 0

    const avatar = post?.author.avatarImg ? (
      <Image src={post.author.avatarImg} />
    ) : (
      <Popup
        as="a"
        trigger={
          <Image
            src="https://img.icons8.com/dotty/80/000000/question.png"
            href="https://icons8.com/icon/44088/puzzled"
          />
        }
        content="We couldn't find and icon for this user.  This placeholder is a link to the source: Puzzled icon by Icons8"
      />
    )

    return (
      <Feed.Event key={post?.id}>
        <Feed.Label>{avatar}</Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{post?.author.displayName} </Feed.User> {post?.title}
            <Feed.Date>{dateStr}</Feed.Date>
            <Feed.Extra text>
              {post?.text.substring(0, 100)}...(posted in{" "}
              <a>{post?.category.name}</a>)
            </Feed.Extra>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />
              {likes} Like{likes === 1 ? "" : "s"}
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    )
  })

  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Which Posts Interest You?</Header>

      <Feed>{items}</Feed>
    </Container>
  )
}
