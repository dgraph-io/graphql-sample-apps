import React, { useState } from "react";
import gql from "graphql-tag";
import queryString from "query-string";
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useHistory } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import AuthorSelect from "./AuthorSelect";

const POST_MUTATION_TAGS = gql`
  mutation updatePost($postID: ID!, $postRemove: PostPatch!) {
    updatePost(input: {filter: {postID: [$postID]}, remove: $postRemove}) {
      post {
        postID
        title
        text
        tags
        author {
          id
          name
        }
      }
    }
  }
`;

const POST_MUTATION = gql`
mutation updatePost($postSet: PostPatch!, $postID: ID!) {
  updatePost(input: {filter: {postID: [$postID]}, set: $postSet}) {
    post {
      postID
      title
      text
      tags
      author {
        id
        name
      }
    }
  }
}
`;

const GET_POST = gql`
  query Post($postID: ID!) {
    getPost(postID: $postID) {
      postID
      title
      text
      tags
      numLikes
      isPublished
      author {
        id
        name
        dob
      }
    }
  }
`;

export default function EditPost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [tags, setTags] = useState([]);
  const [removeTags, setRemoveTags] = useState([]);

  const history = useHistory();

  const handleChangeAuthor = (authorName, authorId) => setAuthorId(authorId);

  const handleChangeTags = tagsSet => {
    setTags(tagsSet);
  };

  const postSet = {
    title,
    text,
    tags,
    isPublished: true,
    author: {
      id: authorId
    }
  }

  const postRemove = {
    tags: removeTags
  }

  let params = queryString.parse(props.location.search);
  let postID = params.postID;
  const { loading, error, data } = useQuery(GET_POST, { variables: { postID }, fetchPolicy: "network-only" });
  const [removePostTags] = useMutation(POST_MUTATION_TAGS)
  const [updatePost] = useMutation(POST_MUTATION)
  
  if (loading) return "Fetching Posts...";
  if (error) return `Error: ${error}`;
  const post = data.getPost;
  if (title === "") {
    setTitle(post.title);
    setText(post.text);
    setTags(post.tags);
    setRemoveTags(post.tags)
    setAuthorId(post.author.id)
  }
  
  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="authorSelect">Author:</label>
        <AuthorSelect
          author={post.author.name}
          onChange={handleChangeAuthor}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Add Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="postTags">Tags:</label>
        <TagsInput value={tags} onChange={handleChangeTags} />
      </div>
      <div className="form-group">
        <label htmlFor="postText">Content:</label>
        <textarea
          id="postText"
          className="form-control"
          rows="15"
          cols="100"
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Add your blog post"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async e => {
          e.preventDefault();
          await removePostTags({ variables: {postID, postRemove}})
          await updatePost({ variables: { postSet, postID} })
          history.push({
            pathname: '/view',
            search: `?postID=${postID}`
          });
        }}
      >
        Publish
          </button>
    </div>
  );
}
