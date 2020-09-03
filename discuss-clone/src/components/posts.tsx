import React, { useState } from "react";
import {
  Button,
  Modal,
  Header,
  Label,
  Loader,
  Image,
  Table,
  Dropdown,
  Input,
  Form,
  TextArea,
} from "semantic-ui-react";
import { useAllPostsQuery } from "./types/operations";

export function PostFeed() {
  const { data, loading, error } = useAllPostsQuery();
  const [createPost, setCreatePost] = useState(false);
  const stateOptions: any = [
    { key: "angular", text: "Angular", value: "angular" },
    { key: "css", text: "CSS", value: "css" },
    { key: "design", text: "Graphic Design", value: "design" },
    { key: "ember", text: "Ember", value: "ember" },
    { key: "html", text: "HTML", value: "html" },
    { key: "ia", text: "Information Architecture", value: "ia" },
    { key: "javascript", text: "Javascript", value: "javascript" },
    { key: "mech", text: "Mechanical Engineering", value: "mech" },
    { key: "meteor", text: "Meteor", value: "meteor" },
    { key: "node", text: "NodeJS", value: "node" },
    { key: "plumbing", text: "Plumbing", value: "plumbing" },
    { key: "python", text: "Python", value: "python" },
    { key: "rails", text: "Rails", value: "rails" },
    { key: "react", text: "React", value: "react" },
    { key: "repair", text: "Kitchen Repair", value: "repair" },
    { key: "ruby", text: "Ruby", value: "ruby" },
    { key: "ui", text: "UI Design", value: "ui" },
    { key: "ux", text: "User Experience", value: "ux" },
  ];

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;

  const showCreatePost = (
    <Modal
      onClose={() => setCreatePost(false)}
      onOpen={() => setCreatePost(true)}
      open={createPost}
    >
      <Modal.Header>Create a New Post</Modal.Header>
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
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Dropdown
                placeholder="You must select a category to continue..."
                fluid
                search
                selection
                options={stateOptions}
                style={{
                  backgroundColor: "#f3f3f3",
                }}
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
                options={stateOptions}
                style={{
                  backgroundColor: "#f3f3f3",
                }}
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
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setCreatePost(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setCreatePost(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );

  const items = data?.queryPost?.map((post) => {
    const likes = post?.likes ?? 0;

    return (
      // <Feed.Event key={post?.id}>
      //   <Feed.Label>{avatar}</Feed.Label>
      //   <Feed.Content>
      //     <Feed.Summary>
      //       <Feed.User>{post?.author.displayName} </Feed.User>{" "}
      //       <a href={"/post/" + post?.id} style={{ color: "black" }}>
      //         {post?.title}
      //       </a>
      //       <Feed.Date>{dateStr}</Feed.Date>
      //       <Feed.Extra text>
      //         {post?.text.substring(0, 100)}...(posted in{" "}
      //         <a>{post?.category.name}</a>)
      //       </Feed.Extra>
      //     </Feed.Summary>
      //     <Feed.Meta>
      //       <Feed.Like>
      //         <Icon name="like" />
      //         {likes} Like{likes === 1 ? "" : "s"}
      //       </Feed.Like>
      //     </Feed.Meta>
      //   </Feed.Content>
      // </Feed.Event>

      <Table.Row>
        <Table.Cell>
          <a href={"/post/" + post?.id} style={{ color: "black" }}>
            <Header as="h4" image>
              <Image src={post?.author.avatarImg} rounded size="mini" />
              <Header.Content>
                {post?.title}
                <Header.Subheader>{post?.author.displayName}</Header.Subheader>
              </Header.Content>
            </Header>
          </a>
        </Table.Cell>
        <Table.Cell>
          <span className="ui red empty mini circular label"></span>{" "}
          {" " + post?.category.name}
        </Table.Cell>
        <Table.Cell>
          <Label as="a" basic color="grey">
            {post?.category.name}
          </Label>
        </Table.Cell>
        <Table.Cell>
          <p>
            <i className="heart outline icon"></i> {likes} Likes
          </p>
          <p>
            {" "}
            <i className="comment outline icon"></i> 3 Replies
          </p>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      {showCreatePost}
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <Input
          icon="search"
          placeholder="Type any keywords..."
          style={{ marginRight: "10px", backgroundColor: "#f3f3f3" }}
        />
        <Dropdown
          placeholder="Categories"
          fluid
          multiple
          search
          selection
          options={stateOptions}
          style={{
            marginRight: "10px",
            width: "20%",
            backgroundColor: "#f3f3f3",
          }}
        />
        <Dropdown
          placeholder="Tags"
          fluid
          multiple
          search
          selection
          options={stateOptions}
          style={{
            marginRight: "10px",
            width: "20%",
            backgroundColor: "#f3f3f3",
          }}
        />
        <button
          className="ui button"
          style={{
            background: "linear-gradient(135deg, #ff1800, #ff009b)",
            color: "white",
          }}
          onClick={() => setCreatePost(true)}
        >
          Create a New Post
        </button>
      </div>
      <Table basic="very" collapsing style={{ width: "100%" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Posts</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Tags</Table.HeaderCell>
            <Table.HeaderCell>Responses</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{items}</Table.Body>
      </Table>
    </>
  );
  // </Container>
}
