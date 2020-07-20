import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import AuthorSelect from "./AuthorSelect";

const POST_MUTATION = gql`
  mutation addPost($post: [AddPostInput!]!) {
    addPost(input: $post) {
      post {
        postID
        title
        text
        author {
          id
          name
        }
      }
    }
  }
`;

export default function AddPost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [tags, setTags] = useState([])

  const history = useHistory();

  const handleChangeAuthor = (authorName, authorId) =>
    setAuthorId(authorId);

  const post = [{
    title,
    text,
    tags,
    isPublished: true,
    author: {
      id: authorId
    }
  }];

  const handleChangeTags = (tagsSet) => {
    setTags(tagsSet)
  }

  const [addPost] = useMutation(POST_MUTATION)

  return (
    <div className="container">
      <hr />
      <div className="form-group">
        <label htmlFor="authorSelect">Author:</label>
        <AuthorSelect onChange={handleChangeAuthor} />
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
        <label htmlFor="postTags">Tags (Press enter to add a tag):</label>
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
                await addPost({ variables: {post}})
                history.push("/");
              }}
          >
            Publish
          </button>
    </div>
  );
}
