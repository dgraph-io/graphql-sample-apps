import React, {useState, useEffect} from "react";
import {Typography, Grid} from '@material-ui/core';

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import { Search } from "../components/searchbar/search";
import { Sort } from "../components/searchbar/sort";
import PostCard from "../components/postCard";

import { GET_RECENT_POSTS, GET_OLDEST_POSTS, GET_APPROVED_POST, SEARCH_POSTS, SEARCH_POST_BY_TAG } from "../gql/queryData";
import useImperativeQuery from "../utils/imperativeQuery"


const Home = () => {
  const [mydata, setMydata] = useState(null)

  const searchPosts = useImperativeQuery(SEARCH_POSTS)
  const searchPostsByTag = useImperativeQuery(SEARCH_POST_BY_TAG)
  const getPosts = useImperativeQuery(GET_APPROVED_POST);
  const getMostRecentPosts = useImperativeQuery(GET_RECENT_POSTS);
  const getMostOldestPosts = useImperativeQuery(GET_OLDEST_POSTS);

  const handleClick = async (event, value) => {
    if(value === null)
      return
    const {data} = await searchPosts({
      text: value
    });
    console.log("Search:", data)
    setMydata(data)
  }

  const handleClickOnTags = async (event, value) => {
    if(value === null)
      return
    console.log(value)
    const {data} = await searchPostsByTag({
      input: value
    });

    let queryPost = [];
    data.queryTag.forEach(element => {
      queryPost.push(...element["posts"])
    });
    let formatted_data = {"queryPost": queryPost}
    console.log("Search by tag:", formatted_data)
    setMydata(formatted_data)
  }

  const getData = async () => {
    const {data} = await getPosts();
    console.log(data)
    setMydata(data)
  }

  const sortBy = async (by) => {
    let data;
    console.log("triggered", by)
    if(by === "new"){
      data = await getMostRecentPosts()
    } else if(by === "old"){
      data = await getMostOldestPosts()
    }
    console.log("Data after sort:", data.data)
    setMydata(data.data)
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
      <Search data={[]} label="Search jokes by tags" onChange={handleClickOnTags} />
      <Sort cb={sortBy}/>
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
        <PostCard author={post.createdby.username} text={post.text} postID={post.id} time={post.timeStamp} likes={post.likes} tags={post.tags} isApproved={true}/>
      </Grid>
    )}
  </Grid>;
}

export default Home;
