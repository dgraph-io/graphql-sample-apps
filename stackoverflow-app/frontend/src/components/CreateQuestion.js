import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

const ADD_QUESTION = gql`
  mutation addQuestion($question: AddQuestionInput!) {
    addQuestion(input: $question) {
      text
    }
  }
`;

export default function CreateQuestion(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([])

  const history = useHistory();

  const question = {
    title,
    text,
    tags
  };

  const handleChangeTags = (tagsSet) => {
    setTags(tagsSet)
  }

  const [addQuestion] = useMutation(ADD_QUESTION)

  return (
    <div className="container">
      <hr />
      <div className="form-group">
        <label htmlFor="questionTitle">Title:</label>
        <input
          id="questionTitle"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Add Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="questionTags">Tags:</label>
        <TagsInput value={tags} onChange={handleChangeTags} />
      </div>
      <div className="form-group">
        <label htmlFor="questionText">Text:</label>
        <textarea
          id="questionText"
          className="form-control"
          rows="15"
          cols="100"
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Add your question text"
        />
      </div>
          <button
              type="submit"
              className="btn btn-primary"
              onClick={async e => {
                e.preventDefault();
                await addQuestion({ variables: {question}})
                history.push("/");
              }}
          >
            Publish
          </button>
    </div>
  );
}
