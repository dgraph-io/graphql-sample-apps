import React from "react";
import {Typography, Grid} from '@material-ui/core';
import { useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import PostCard from "../components/postCard";
import {GET_FLAGGED_POST} from "../gql/queryData";

const Flagged = () => {
  const { loading, error, data } = useQuery(GET_FLAGGED_POST);
  return <>
    <Navbar title="Flagged" color="primary" />
    <Content>
      <FlaggedList loading={loading} error={error} data={data} />
    </Content>
  </>
}

function FlaggedList({loading, error, data}) {
  const updateCache = (client, {data}) => {
    const existing_flagged = client.readQuery({
      query: GET_FLAGGED_POST
    });
    // TODO: need to know why this is needed
    const newFlagged = {
      id: 'xx'
    }
    client.writeQuery({
      query: GET_FLAGGED_POST,
      data: {queryPost: [newFlagged, ...existing_flagged.queryPost]}
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
        <PostCard size={"354px"} author={post.createdby.username} text={post.text} isApproved={false} postID={post.id} likes={post.likes} img={post.img} flags={post.flags} flagCount={post.flags.length} tags={post.tags} updateCache={updateCache}/>
      </Grid>
    )}
  </Grid>;
}

export default Flagged;
