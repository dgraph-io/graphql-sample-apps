import React from "react";
import {Typography} from '@material-ui/core';
import { useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import MasonaryGrid from "../components/masonryGrid";
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
  return <MasonaryGrid data={data} isApproved={false} updateCache={updateCache} allTags={allTags}/>
}

export default Approve;
