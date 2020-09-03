import React, { useState } from "react";
import { CircularProgress, Backdrop, Grid, Card, TextField } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';

const query = gql`{
  queryMetric {
    name
  }
}`;

const Home = ({currentTime = new Date()}) => {
  const [endDate, setEndDate] = useState(currentTime.toISOString().substr(0, 10))
  const [startDate, setStartDate] = useState(new Date(currentTime.getTime() - 28 * 3600 * 1000 * 24).toISOString().substr(0, 10))

  const {loading, error, data} = useQuery(query);

  const results = [];
  for (let date = Date.parse(startDate); date <= Date.parse(endDate); date = date + 3600 * 1000 * 24) {
    results.push({
      timestamp: new Date(date).toISOString().substr(0, 10),
      readings: (data?.queryMetric || []).map(({name}) => ({
        value: ((date - Date.parse(startDate)) / (3600 * 1000 * 24)) + Math.random() * 4,
        name
      }))
    })
  }

  return <>
    <Navbar title="Home" color="primary" />
    <Content>
      {loading && <Backdrop open={loading} >
        <CircularProgress />
      </Backdrop>}
      {error && <Alert severity="error">Something Went Horribly Wrong</Alert>}
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Card style={{ padding: 30 }}>
            <TextField
              label="From"
              type="date"
              defaultValue={startDate}
              InputLabelProps={{
                shrink: true,
              }}
              style={{marginRight: 20}}
              onChange={e => setStartDate(e.target.value)}
            />
            <TextField
              label="To"
              type="date"
              defaultValue={endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setEndDate(e.target.value)}
            />
          </Card>
        </Grid>
        <Grid item sm={12}>
          <Card style={{ padding: 30 }}>
            <pre>{`mutation {
  addCollection(input: [
    ${results.map(({timestamp, readings}) => `{
      timestamp: "${timestamp}",
      readings: [
        ${readings.map(({value, name}) => `{value: ${value}, metric: { name: "${name}" } }`).join(",\n        ")}
      ]
    }`).join(",\n    ")}
  ]) {
    collection {
      readings {
        value
        metric { name }
      }
    }
  }
}`}</pre>
          </Card>
        </Grid>
      </Grid>
    </Content>
  </>
}

export default Home;
