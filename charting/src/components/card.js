import React from 'react'
import { Card } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  centeredCard: {
    padding: 20,
    textAlign: "center",
  }
}))

export function CenteredCard(props) {
  const {centeredCard} = useStyles()
  return <Card {...props} className={centeredCard} />
}
