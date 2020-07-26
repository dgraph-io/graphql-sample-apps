import React from "react";
import {Typography, Grid} from '@material-ui/core';

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import { CenteredCard } from '../components/card';
import { gql, useQuery } from '@apollo/client'

const query = gql`
query getType($typeId: String!){
  __type(name: $typeId) {
    name
    kind
    description
    fields {
      name
      type {
        name
      }
    }
  }
}`;

const Types = ({match}) => {
  const typeId = match.params.typeId;
  const { loading, error, data } = useQuery(query, {
    variables: { typeId },
  });
  return <>
    <Navbar title={`Type ${typeId}`} />
    <Content>
      <TypeDetails loading={loading} error={error} data={data} />
    </Content>
  </>
}

const TypeDetails = ({loading, error, data}) => {
  if (loading) { return <Typography>Loading...</Typography> }
  if (error) {
    return <Typography>
      Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?
    </Typography>
  }
  const {name, kind, fields, description} = data.__type;
  return <>
    <Typography paragraph>{name} is of kind {kind}</Typography>
    <Typography paragraph>{description || "There is no description of this type"}</Typography>
    {fields.length > 0
     ? <>
        <Typography paragraph>Here are a list of fields on {name}</Typography>
        <Grid container spacing={3}>
          {fields.map(field =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={field.name}>
              <CenteredCard>{field.name} ({field.type.name})</CenteredCard>
            </Grid>
          )}
        </Grid>
      </>
    : <Typography>There are no fields on {name}</Typography>}
  </>;
}

export default Types;
