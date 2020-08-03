import React, { useMemo } from "react";
import { Typography, CircularProgress, Backdrop, Grid, Card, CardHeader, CardContent} from '@material-ui/core';
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
      collection(filter: {timestamp: {ge: $timestampGE lt: $timestampLT}}) {
        timestamp
      }
    }
  }
}`;

const Home = () => {
  const {loading, error, data} = useQuery(query, {
      variables: {
      timestampGE: "2020-07-01",
      timestampLT: "2020-08-02",
    }
  });
  const graphData = useMemo(() => {
    if(!data) { return [] }
    return (data.queryMetric || []).map(({name, readings}) => ({
      name,
      data: [
        ["Timestamp", name],
        ...readings.map(({ value, collection }) => [new Date(collection.timestamp), value]).sort(([k, _]) => k)
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
      <Grid container spacing="3">
        {graphData.map(({name, data}, index) => <Grid item key={index} sm="12" lg="6">
          <Card style={{textAlign: "center"}}>
            <CardContent>
              <h3>{name}</h3>
              <Chart
                chartType="LineChart"
                width="100%"
                loader={<CircularProgress />}
                data={data}
                options={{
                  pointSize: 5,
                  curveType: "function",
                  legend: { position: "none" }
                }} />
            </CardContent>
          </Card>
        </Grid>)}
      </Grid>
    </Content>
  </>
}

export default Home;
