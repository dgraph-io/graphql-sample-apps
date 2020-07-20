import React, { useState } from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_AUTHORS = gql`
  {
    queryAuthor {
      id
      name
    }
  }
`;

export default function AuthorSelect({ onChange, author }) {
  let authorName = "Select Author"
  if (author !== "") {
    authorName = author
  }
  const [value, setValue] = useState(authorName);

  return (
    <Query query={GET_AUTHORS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Fetching Authors...</div>;
        }
        if (error) {
          return <div>Error: {error}</div>;
        }

        const authorList = [
          { id: "default", name: "Select an Author" },
          ...data.queryAuthor
        ];

        const onSelectboxChange = e => {
          setValue(e.target.value);

          const selectedIndex = e.target.options.selectedIndex;
          const authorId = authorList[selectedIndex].id;
          const authorName = e.target.value;
          onChange(authorName, authorId);
        };

        return (
          <select
            id="authorSelect"
            value={value}
            onChange={onSelectboxChange}
            className="form-control"
          >
            {authorList.map(({ name, id }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
  );
}
