import React, { useState } from "react";
import { CircularProgress, Backdrop, Card, TextField, List, ListItem, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { gql, useQuery, useMutation } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import UglyButton from "../components/ugly-button";

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

const Metrics = () => {
  const {loading, error, data} = useQuery(query);
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
        <UglyButton onClick={() => addMetric({ variables: { newMetricName } })} disabled={newMetricName === ""}>
          Add Metric
        </UglyButton>
      </Card>
    </Content>
  </>
}

export default Metrics;
