import React from "react";
import { useHistory } from "react-router-dom"
import { Card } from 'semantic-ui-react'

export default function Question({ question }) {
  const history = useHistory();
  const viewQuestion = (questionID) => {
    history.push({
      pathname: '/view',
      search: `?questionID=${questionID}`
    })
  }
  return (
    <Card
      onClick={() => viewQuestion(question.id)}
      header={question.title}
      meta={question.author.username}
      description={question.text}
    />
  );
}
