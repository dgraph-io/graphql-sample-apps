import React from "react"
import { useParams } from "react-router-dom"
import { Container, Header, Loader, Image, Divider } from "semantic-ui-react"
import { useGetPostQuery } from "./types/operations"
import { DateTime } from "luxon"

interface PostParams {
  id: string
}

export function Post() {
  const { id } = useParams<PostParams>()

  const { data, loading, error } = useGetPostQuery({ variables: { id: id } })

  if (loading) return <Loader />
  if (error) {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">Ouch! That page didn't load</Header>
        <p>Here's why : {error.message}</p>
      </Container>
    )
  }
  if (!data?.getPost) {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">This is not a post</Header>
        <p>You've navigated to a post that doesn't exist.</p>
        <p>That most likely means that the id {id} isn't the id of post.</p>
      </Container>
    )
  }

  let dateStr = "at some unknown time"
  if (data.getPost.datePublished) {
    dateStr =
      DateTime.fromISO(data.getPost.datePublished).toRelative() ?? dateStr
  }

  const paras = data.getPost.text.split("\n").map((str) => <p>{str}</p>)

  return (
    <Container text textAlign="left" style={{ marginTop: "7em" }}>
      <Header as="h1">{data.getPost.title}</Header>
      <Header as="h3">Published : {dateStr}</Header>
      <Divider />
      <Image
        src={
          data.getPost.author.avatarImg ??
          "https://img.icons8.com/dotty/80/000000/question.png"
        }
        size="small"
        floated="left"
        style={{ margin: "2em 2em 2em -4em" }}
      />
      {paras}
    </Container>
  )
}
