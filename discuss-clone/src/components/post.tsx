import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Header,
  Loader,
  Image,
  Label,
  Form,
  TextArea,
  Modal,
  Dropdown,
  Button,
} from "semantic-ui-react";
import { useGetPostQuery } from "./types/operations";
import { DateTime } from "luxon";
import { useAuth0 } from "@auth0/auth0-react";

interface PostParams {
  id: string;
}

export function Post() {
  const [title, setTitle] = useState("");
  const [tags, setTags]: any = useState([]);
  const [category, setCategory]: any = useState("");
  const [text, setText]: any = useState("");
  const [editPost, setEditPost] = useState(false);

  const { id } = useParams<PostParams>();
  const location = useLocation();

  const { categoriesOptions, tagsOptions }: any = location.state;
  const { user, isAuthenticated } = useAuth0();

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

  const setdata = () => {
    setEditPost(true);
    // setTitle(data.getPost?.title);
    data.getPost?.tags.map((tag) => {
      setTags((tag: any) => [...tag, tags]);
    });

    setText(data?.getPost?.text);
    
    setCategory(data?.getPost?.category?.id);
  };

  let dateStr = "at some unknown time";
  if (data.getPost.datePublished) {
    dateStr =
      DateTime.fromISO(data.getPost.datePublished).toRelative() ?? dateStr;
  }

  const paras = data.getPost.text.split("\n").map((str) => <p>{str}</p>);
  console.log("cat", category)

  const updatePost = () => {
    setEditPost(false);
    const post = {
      text: text,
      title: title,
      tags: tags,
      likes: 0,
      category: { id: category },
      author: { username: user.email },
      datePublished: new Date().toISOString(),
    };
    // addPost({ variables: { post: post } });
  };

  const showEditPost = (
    <Modal
      onClose={() => setEditPost(false)}
      onOpen={() => setEditPost(true)}
      open={editPost}
    >
      <Modal.Header>Edit Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Type title..."
                style={{
                  backgroundColor: "#f3f3f3",
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Dropdown
                placeholder="You must select a category to continue..."
                fluid
                search
                selection
                defaultValue={category}
                options={categoriesOptions}
                style={{
                  backgroundColor: "#f3f3f3",
                }}
                onChange={(e, data) => setCategory(data.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Tags (optional)</label>
              <Dropdown
                placeholder="Select appropriate tags..."
                fluid
                multiple
                search
                selection
                defaultValue={tags}
                options={tagsOptions}
                style={{
                  backgroundColor: "#f3f3f3",
                }}
                onChange={(e, data) => setTags(data.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Your Message</label>
              <TextArea
                rows="3"
                placholder="Enter your message..."
                style={{
                  backgroundColor: "#f3f3f3",
                }}
                value={text}
                onChange={(e, data) => setText(data.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setEditPost(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={updatePost}
          positive
        />
      </Modal.Actions>
    </Modal>
  );

  return (
    <div style={{ margin: "2.5rem 7rem 7rem 7rem" }}>
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
      {paras}
      {showEditPost}
      <div>
        <button
          style={{
            background: "linear-gradient(135deg, #ff1800, #ff009b)",
            color: "white",
          }}
          className="ui button"
          onClick={setdata}
        >
          <i className="pencil icon"></i>Edit Post
        </button>
      </div>
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
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg, #ff1800, #ff009b)",
                    color: "white",
                  }}
                  className="ui button"
                >
                  Post comment
                </button>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
