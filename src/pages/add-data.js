import React, { useState } from "react";
import { CircularProgress, Backdrop, Card, TextField, Grid, CardContent} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { gql, useQuery, useMutation } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import UglyButton from "../components/ugly-button";
import history from '../utils/history';

const query = gql`{
  queryMetric {
    name
  }
}`;

const addCollection = gql`
mutation AddCollection($date: DateTime!, $readings: [ReadingRef!]!) {
  addCollection(input: [
    {
      timestamp: $date,
      readings: $readings,
    }
  ]) {
    collection {
      readings {
        value
        metric { name }
      }
    }
  }
}`


const AddData = ({currentTime = new Date()}) => {
  const {loading, error, data} = useQuery(query);
  const [date, setDate] = useState(currentTime.toISOString().substr(0, 10))
  const [values, setValues] = useState({})
  const [addCollectionMutation] = useMutation(addCollection);

  const metrics = data?.queryMetric || []

  const submitMetrics = async () => {
    const readings = Object.entries(values).map(([name, value]) => ({ value, metric: { name } }))
    await addCollectionMutation({ variables: {readings, date} })
    history.push("/");
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
              label="Date"
              type="date"
              defaultValue={date}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: 20 }}
              onChange={e => setDate(e.target.value)}
            />
          </Card>
        </Grid>
        {metrics.map(({ name }, index) => <Grid item key={index} sm={12} md={6} lg={3}>
          <Card style={{ textAlign: "center" }}>
            <CardContent>
              <TextField
                label={name}
                type="number"
                defaultValue={0}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginRight: 20 }}
                onChange={e => setValues({...values, [name]: e.target.value})}
              />
            </CardContent>
          </Card>
        </Grid>)}
        <Grid item sm={12} style={{textAlign: "right"}}>
          <UglyButton onClick={submitMetrics}>Add Readings</UglyButton>
        </Grid>
      </Grid>
    </Content>
  </>
}

export default AddData;
