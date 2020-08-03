import React from "react";
import {Typography, Grid} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import PostCard from "../components/postCard";

const query = gql`{
    __schema {
      types {
        name
      }
    }
  }`;

const Approve = () => {

  const { loading, error, data } = useQuery(query);
  return <>
    <Navbar title="Approve" color="primary" />
    <Content>
      <TypesList loading={loading} error={error} data={data} />
    </Content>
  </>
}

function TypesList({loading, error, data}) {
  if (loading) { return <Typography>Loading...</Typography> }
  if (error) {
    return <Typography>
      Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?
    </Typography>
  }
  return <Grid container spacing={2}>
    {data.__schema.types.map(type =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={type.name}>
        <PostCard author={type.name} isApproved={false}/>
      </Grid>
    )}
  </Grid>;
}

export default Approve;
