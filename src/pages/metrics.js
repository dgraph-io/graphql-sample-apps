import React, { useState } from "react";
import { CircularProgress, Backdrop, Card, CardContent, TextField, List, ListItem, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Alert} from '@material-ui/lab';
import { gql, useQuery, useMutation } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';

const query = gql`{
  queryMetric {
    name
  }
}`;

const addMetricMutation = gql`
mutation AddMetric($newMetricName: String!) {
  addMetric(input: [{name: $newMetricName}]) {
    metric {
      name
    }
  }
}`

const useStyles = makeStyles(theme => ({
  root: {
    margin: "4px 12px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
}))

const Metrics = () => {
  const {loading, error, data} = useQuery(query);
  const { root } = useStyles();
  const [newMetricName, setNewMetricName] = useState("");
  const [addMetric, { loading: mutationLoading }] = useMutation(addMetricMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [{query}],
  });

  const metrics = data?.queryMetric || []

  return <>
    <Navbar title="Metrics" color="primary" />
    <Content>
      {loading && <Backdrop open={loading || mutationLoading} >
        <CircularProgress />
      </Backdrop>}
      {error && <Alert severity="error">Something Went Horribly Wrong</Alert>}
      <Card style={{ padding: 30 }}>
        <Typography>Here are the metrics currently configured:</Typography>
        <List>
          {metrics.map(({ name }, index) => <ListItem item key={index} sm={12} md={6} lg={3}>
            <Typography>{name}</Typography>
          </ListItem>)}
        </List>

        <TextField
          label="Add Metric"
          defaultValue={newMetricName}
          onChange={e => setNewMetricName(e.target.value)}
        />
        <Button onClick={() => addMetric({variables: { newMetricName }}) } color="primary" size="large" className={root} disabled={newMetricName === ""}>Add Metric</Button>
      </Card>
    </Content>
  </>
}

export default Metrics;
