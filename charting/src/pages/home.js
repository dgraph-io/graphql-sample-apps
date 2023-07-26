import React, { useMemo, useState } from "react";
import { CircularProgress, Backdrop, Grid, Card, CardContent, TextField, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { gql, useQuery } from '@apollo/client'
import Chart from "react-google-charts";

import Content from '../components/content';
import { Navbar } from '../components/navbar';

const query = gql`
query QueryMetrics($timestampGE: DateTime!, $timestampLT: DateTime!){
  queryMetric {
    name
    readings @cascade {
      value
      collection(filter: {timestamp: {ge: $timestampGE}, and: {timestamp: {lt: $timestampLT}}}) {
        timestamp
      }
    }
  }
}`;

const Home = ({currentTime = new Date()}) => {
  const [endTime] = useState(currentTime)
  const oneMonthAgo = new Date(endTime.getTime() -  28 * 3600 * 1000 * 24);
  const startDate = oneMonthAgo.toISOString().substr(0, 10)
  const endDate = endTime.toISOString().substr(0, 10)

  const {loading, error, data, refetch} = useQuery(query, {
    variables: {
      timestampGE: startDate,
      timestampLT: endDate,
    }
  });
  const graphData = useMemo(() => {
    if(!data) { return [] }
    return (data.queryMetric || []).map(({name, readings}) => ({
      name,
      data: [
        ["Timestamp", name],
        ...readings.map(({ value, collection }) => [new Date(collection.timestamp), value]).sort(([k1], [k2]) => k1 < k2 ? -1 : 1)
      ]
    }));
  }, [data])

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
              onChange={e => refetch({ timestampGE: e.target.value })}
            />
            <TextField
              label="To"
              type="date"
              defaultValue={endDate }
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => refetch({ timestampLT: e.target.value })}
            />
          </Card>
        </Grid>
        {graphData.map(({name, data}, index) => <Grid item key={index} sm={12} lg={6}>
          <Card style={{textAlign: "center"}}>
            <CardContent>
              <h3>{name}</h3>
              {data.length > 1
                ? <Chart
                    chartType="LineChart"
                    width="100%"
                    loader={<CircularProgress />}
                    data={data}
                    options={{
                      pointSize: 5,
                      curveType: "function",
                      legend: { position: "none" }
                    }} />
                : <Typography>Not enough Data to show this chart</Typography>}

            </CardContent>
          </Card>
        </Grid>)}
      </Grid>
    </Content>
  </>
}

export default Home;
