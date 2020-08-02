import React from "react";
import {Typography, Grid} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar, NavbarItem } from '../components/navbar';
import { Search } from "../components/searchbar/search";
import { Sort } from "../components/searchbar/sort";
import PostCard from "../components/postCard";

const query = gql`{
  __schema {
    types {
      name
    }
  }
}`;

const Home = () => {

  const { loading, error, data } = useQuery(query);
  const history = useHistory();
  const handleClick = (event, value) => {
    history.push(`/types/${value}`)
  }

  return <>
    <Navbar title="Home" color="primary" />
    <Content>
      {!loading && !error ?
      <>
      <Search data={data.__schema.types || []} label="Search your joke here" onChange={handleClick} />
      <Sort />
      </>
      : null}
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
        <PostCard author={type.name}/>
      </Grid>
    )}
  </Grid>;
}

export default Home;
