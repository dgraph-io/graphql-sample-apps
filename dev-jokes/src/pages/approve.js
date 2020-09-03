import React from "react";
<<<<<<< HEAD
import {Typography, Grid} from '@material-ui/core';
=======
import {Typography} from '@material-ui/core';
>>>>>>> ad5c8a5e4dfa0670a58eb6c6da4acc5af226f208
import { useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
<<<<<<< HEAD
import PostCard from "../components/postCard";
=======
import MasonaryGrid from "../components/masonryGrid";
>>>>>>> ad5c8a5e4dfa0670a58eb6c6da4acc5af226f208
import {GET_UNAPPROVED_POST, GET_TAGS} from "../gql/queryData";

import { useState, useEffect } from 'react';
import {g2aTags} from "../utils/utils";

const Approve = () => {
  const [allTags, setAllTags] = useState([]);
  const { loading, error, data } = useQuery(GET_UNAPPROVED_POST);
  const {data: tagsData, loading: tloading, error: terror} = useQuery(GET_TAGS)

  useEffect (() => {
    if(!tloading && !terror){
      setAllTags(g2aTags(tagsData.queryTag));
    }
  }, [tagsData, tloading, terror])

  return <>
    <Navbar title="Approve" color="primary" />
    <Content>
      <UnApprovedList loading={loading} error={error} data={data} allTags={allTags}/>
    </Content>
  </>
}

function UnApprovedList({loading, error, data, allTags}) {
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
<<<<<<< HEAD
  return <Grid container spacing={2}>
    {data.queryPost.map(post =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={post.text}>
        <PostCard size={"345px"} author={post.createdby.username} text={post.text} isApproved={false} postID={post.id} likes={post.likes} tags={post.tags} flags={post.flags} img={post.img} updateCache={updateCache} allTags={allTags}/>
      </Grid>
    )}
  </Grid>;
=======
  return <MasonaryGrid data={data} isApproved={false} updateCache={updateCache} allTags={allTags}/>
>>>>>>> ad5c8a5e4dfa0670a58eb6c6da4acc5af226f208
}

export default Approve;
