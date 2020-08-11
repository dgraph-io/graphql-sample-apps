import React from "react";
import {Typography, Grid} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import PostCard from "../components/postCard";
import {GET_UNAPPROVED_POST} from "../gql/queryData";

const Approve = () => {
  const { loading, error, data } = useQuery(GET_UNAPPROVED_POST);
  return <>
    <Navbar title="Approve" color="primary" />
    <Content>
      <UnApprovedList loading={loading} error={error} data={data} />
    </Content>
  </>
}

function UnApprovedList({loading, error, data}) {
  const updateCache = (client, {data}) => {
    const existing_unapproved = client.readQuery({
      query: GET_UNAPPROVED_POST
    });
    // TODO: need to know why this is needed
    const newUnapproved = {
      id: 'xx'
    }
    client.writeQuery({
      query: GET_UNAPPROVED_POST,
      data: {queryPost: [newUnapproved, ...existing_unapproved.queryPost]}
    })
  }

  if (loading) { return <Typography>Loading...</Typography> }
  if (error) {
    return <Typography>
      Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?
    </Typography>
  }
  return <Grid container spacing={2}>
    {data.queryPost.map(post =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={post.text}>
        <PostCard author={post.createdby.username} text={post.text} isApproved={false} postID={post.id} likes={post.likes} tags={post.tags} updateCache={updateCache}/>
      </Grid>
    )}
  </Grid>;
}

export default Approve;
