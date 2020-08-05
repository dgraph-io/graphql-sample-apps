import React, {useState, useEffect} from "react";
import {Typography, Grid} from '@material-ui/core';

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import { Search } from "../components/searchbar/search";
import { Sort } from "../components/searchbar/sort";
import PostCard from "../components/postCard";

import { GET_APPROVED_POST, SEARCH_POSTS } from "../gql/queryData"
import useImperativeQuery from "../utils/imperativeQuery"

const Home = () => {
  const [mydata, setMydata] = useState(null)
  const searchPosts = useImperativeQuery(SEARCH_POSTS)
  let getPosts = useImperativeQuery(GET_APPROVED_POST);

  const handleClick = async (event, value) => {
    if(value === null)
      return
    const {data} = await searchPosts({
      text: value
    });
    console.log("Search:", data)
    setMydata(data)
  }

  const getData = async () => {
    const {data} = await getPosts();
    setMydata(data)
  }
  useEffect( () => {
    getData()
  }, [])

  return <>
    <Navbar title="Home" color="primary" />
    <Content>
      { mydata != null &&
      <>
      <Search data={[]} label="Search your joke here" onChange={handleClick} />
      <Sort/>
      <PostList mydata={mydata}/>
      </>
      }
    </Content>
  </>
}

function PostList({mydata}) {
  return <Grid container spacing={2}>
    {mydata.queryPost.map(post =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
        <PostCard author={post.createdby.username} text={post.text} postID={post.id} time={post.timeStamp} likes={post.likes} isApproved={true}/>
      </Grid>
    )}
  </Grid>;
}

export default Home;
