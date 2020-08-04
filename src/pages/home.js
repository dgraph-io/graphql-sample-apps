import React from "react";
import {Typography, Grid} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import { Search } from "../components/searchbar/search";
import { Sort } from "../components/searchbar/sort";
import PostCard from "../components/postCard";

import { GET_APPROVED_POST } from "../gql/queryData"

const Home = () => {

  const { loading, error, data } = useQuery(GET_APPROVED_POST);
  const history = useHistory();
  const handleClick = (event, value) => {
    history.push(`/types/${value}`)
  }

  return <>
    <Navbar title="Home" color="primary" />
    <Content>
      {!loading && !error ?
      <>
      <Search data={data.queryPost.text || []} label="Search your joke here" onChange={handleClick} />
      <Sort />
      </>
      : null}
      <PostList loading={loading} error={error} data={data} />
    </Content>
  </>
}

function PostList({loading, error, data}) {
  if (loading) { return <Typography>Loading...</Typography> }
  if (error) {
    return <Typography>
      Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?
    </Typography>
  }
  return <Grid container spacing={2}>
    {data.queryPost.map(post =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
        <PostCard author={post.createdby.username} text={post.text} postID={post.id} time={post.timeStamp} numLikes={post.numLikes} isApproved={true}/>
      </Grid>
    )}
  </Grid>;
}

export default Home;
