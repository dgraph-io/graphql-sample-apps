import React from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Loader, Image, Label, Form, TextArea } from "semantic-ui-react";
import { useGetPostQuery } from "./types/operations";
import { DateTime } from "luxon";
import { useAuth0 } from "@auth0/auth0-react";

interface PostParams {
  id: string;
}

export function Post() {
  const { id } = useParams<PostParams>();
  const {user, isAuthenticated } = useAuth0();

  const { data, loading, error } = useGetPostQuery({ variables: { id: id } });

  if (loading) return <Loader />;
  if (error) {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">Ouch! That page didn't load</Header>
        <p>Here's why : {error.message}</p>
      </Container>
    );
  }
  if (!data?.getPost) {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">This is not a post</Header>
        <p>You've navigated to a post that doesn't exist.</p>
        <p>That most likely means that the id {id} isn't the id of post.</p>
      </Container>
    );
  }

  let dateStr = "at some unknown time";
  if (data.getPost.datePublished) {
    dateStr =
      DateTime.fromISO(data.getPost.datePublished).toRelative() ?? dateStr;
  }

  const paras = data.getPost.text.split("\n").map((str) => <p>{str}</p>);

  return (
    <div style={{ margin: "1rem 7rem 7rem 7rem" }}>
      <div>
        <Header as="h1">{data.getPost.title} </Header>
        <span className="ui red empty mini circular label"></span>
        {" " + data.getPost?.category.name}
        <Label as="a" basic color="grey" style={{ marginLeft: "5px" }}>
          {data.getPost?.category.name}
        </Label>
      </div>
      <Header as="h4" image>
        <Image src={data.getPost?.author.avatarImg} rounded size="mini" />
        <Header.Content>
          {data.getPost?.author.displayName}
          <Header.Subheader>{dateStr}</Header.Subheader>
        </Header.Content>
      </Header>
      {/* <Header as="h3">Published : </Header> */}
      {/* <Divider /> */}
      {/* <Image
        src={
          data.getPost.author.avatarImg ??
          "https://img.icons8.com/dotty/80/000000/question.png"
        }
        size="small"
        floated="left"
        style={{ margin: "2em 2em 2em -4em" }}
      /> */}
      {paras}
      {isAuthenticated && (
        <div>
          <div style={{ display: "flex" }}>
            <Image
              src={user.picture}
              avatar
              size="mini"
              style={{ height: "35px" }}
            />
            <span style={{ marginLeft: "10px" }}>
              <Form>
                <TextArea
                  placeholder={`Type here to reply to ${data.getPost.author.displayName}...`}
                  style={{ minHeight: 100, width: "350px" }}
                />
              </Form>
              <div style={{marginTop: "10px"}}>
                <button style={{ background: "linear-gradient(135deg, #ff1800, #ff009b)", color: "white"}} className="ui button">Post comment</button>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
