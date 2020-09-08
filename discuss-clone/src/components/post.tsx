import React, { useState, FormEvent } from "react"
import { useParams, useLocation } from "react-router-dom"
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
  TextAreaProps,
  Comment,
} from "semantic-ui-react"
import {
  useGetPostQuery,
  useAddCommentMutation,
  useUpdatePostMutation,
  useGetUserQuery,
  namedOperations,
} from "./types/operations"
import { DateTime } from "luxon"
import { useAuth0 } from "@auth0/auth0-react"
import { useCategories } from "./categories"
import { avatar } from "./avatar"

interface PostParams {
  id: string
}

export function Post() {
  const { id } = useParams<PostParams>()

  const { user, isAuthenticated } = useAuth0()

  const { data: currentUser, loading: userLoading } = useGetUserQuery({
    variables: { username: isAuthenticated ? user.email : "" },
  })
  const { data, loading, error } = useGetPostQuery({
    variables: { id: id },
  })
  const {
    allWriteableCategories,
    loading: catLoading,
    error: catError,
  } = useCategories(user?.email ?? "")

  const [addCommentMutation] = useAddCommentMutation({
    refetchQueries: [namedOperations.Query.getPost],
  })
  const [updatePostMutation] = useUpdatePostMutation({
    refetchQueries: [namedOperations.Query.getPost],
  })

  const [title, setTitle] = useState("")
  const [tags, setTags]: any = useState([])
  const [category, setCategory]: any = useState("")
  const [text, setText]: any = useState("")
  const [editPost, setEditPost] = useState(false)
  const [commentText, setCommentText] = useState("")

  const location = useLocation()
  const { categoriesOptions, tagsOptions }: any = location.state

  if (loading || userLoading || catLoading) return <Loader />
  if (error) {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">Ouch! That page didn't load</Header>
        <p>Here's why : {error.message}</p>
      </Container>
    )
  }
  if (catError) {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">Ouch! That page didn't load</Header>
        <p>Here's why : {catError.message}</p>
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

  const canEditThisPost = data.getPost.author.username === user?.email
  const canPostComments = isAuthenticated && !!allWriteableCategories.find(
    (c) => c?.id === data.getPost?.category.id
  )

  const writableCategoriesOptions = allWriteableCategories.map((category) => {
    return { key: category?.id, text: category?.name, value: category?.id }
  })

  const setdata = () => {
    setEditPost(true)
    setTitle(data.getPost?.title + "")
    data.getPost?.tags.map((tag) => {
      setTags((tag: any) => [...tag, tags])
    })
    setText(data?.getPost?.text)
    setCategory(data?.getPost?.category?.id)
  }

  const addComment = () => {
    addCommentMutation({
      variables: {
        comment: {
          text: commentText,
          commentsOn: { id: id },
          author: { username: currentUser?.getUser?.username },
        },
      },
      update(cache, { data }) {
        console.log(data)
      },
    })
  }

  let dateStr = "at some unknown time"
  if (data.getPost.datePublished) {
    dateStr =
      DateTime.fromISO(data.getPost.datePublished).toRelative() ?? dateStr
  }

  const paras = data.getPost.text.split("\n").map((str) => <p>{str}</p>)

  const updatePost = () => {
    setEditPost(false)
    const post = {
      text: text,
      title: title,
      tags: tags,
      // likes: 0,
      category: { id: category },
    }

    updatePostMutation({ variables: { post: post, id: id } })
  }

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
                options={writableCategoriesOptions}
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
  )

  const comments = (
    <div style={{ marginTop: "10px" }}>
      {data.getPost.comments.map((comment) => {
        return (
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                src={avatar(comment.author.avatarImg)}
                rounded
                size="mini"
              />
              <Comment.Content>
                <Comment.Author as="a">
                  {comment.author.displayName}
                </Comment.Author>
                {/* <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata> */}
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )
      })}
    </div>
  )

  return (
    <div style={{ margin: "2.5rem 7rem 7rem 7rem" }}>
      <div>
        <Header as="h1">{data.getPost.title} </Header>
        <span className="ui red empty mini circular label"></span>
        {" " + data.getPost?.category.name}
        {data.getPost?.tags.map((tag) => {
          return (
            <Label as="a" basic color="grey">
              {tag}
            </Label>
          )
        })}
      </div>
      <Header as="h4" image>
        <Image src={avatar(data.getPost?.author.avatarImg)} rounded size="mini" />
        <Header.Content>
          {data.getPost?.author.displayName}
          <Header.Subheader>{dateStr}</Header.Subheader>
        </Header.Content>
      </Header>
      {paras}
      {showEditPost}
      {canEditThisPost && (
        <div style={{ marginTop: "30px" }}>
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
      )}
      {comments}
      {canPostComments && (
        <div>
          <div style={{ display: "flex", marginTop: "50px" }}>
            <Image
              src={avatar(currentUser?.getUser?.avatarImg)}
              avatar
              size="mini"
              style={{ height: "35px" }}
            />
            <span style={{ marginLeft: "10px" }}>
              <Form>
                <TextArea
                  placeholder={`Type here to reply to ${data.getPost.author.displayName}...`}
                  style={{ minHeight: 100, width: "350px" }}
                  onChange={(
                    event: FormEvent<HTMLTextAreaElement>,
                    data: TextAreaProps
                  ) => {
                    setCommentText(data.value?.toString() ?? "")
                  }}
                />
              </Form>
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg, #ff1800, #ff009b)",
                    color: "white",
                  }}
                  className="ui button"
                  onClick={addComment}
                >
                  Post comment
                </button>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
