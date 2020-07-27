import React from "react";
import {List, ListItem, Typography, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar, NavbarItem } from '../components/navbar';
import { CenteredCard } from '../components/card';

const query = gql`{
  __schema {
    types {
      name
    }
  }
}`;

const Home = () => {
  const { loading, error, data } = useQuery(query);

  return <>
    <Navbar title="Home" color="primary">
      <NavbarItem type='icon' iconName='search.svg' oncClick={() => { }} />
      <NavbarItem type='icon' iconName='user.svg' oncClick={() => { }} />
      <NavbarItem type='icon' iconName='settings.svg' oncClick={() => { }} />
    </Navbar>
    <Content>
      <Typography>
        This is the Slash GraphQL Starter App. If you are looking for where to get started, you
        might want to check out the following files:
      </Typography>
      <List>
        <ListItem><i>src/App.js</i></ListItem>
        <ListItem><i>src/pages/home.js</i></ListItem>
        <ListItem><i>src/pages/type.js</i></ListItem>
      </List>
      <Typography paragraph>
        Below, you should see a list of types in your schema. The columns will auto adjust as per
        the screen size. So take a look at how we use the <i>{"<Grid>"}</i> component
      </Typography>
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
  return <Grid container spacing={3}>
    {data.__schema.types.map(type =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={type.name}>
        <Link to={`/types/${type.name}`}>
          <CenteredCard>{type.name}</CenteredCard>
        </Link>
      </Grid>
    )}
  </Grid>;
}

export default Home;
