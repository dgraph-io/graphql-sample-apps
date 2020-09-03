import React, {useState, useEffect} from "react";
import {Typography} from '@material-ui/core';
import { useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navbar } from '../components/navbar';
import {GET_FLAGGED_POST, GET_TAGS} from "../gql/queryData";
import MasonaryGrid from "../components/masonryGrid";

import {g2aTags} from "../utils/utils";

const Flagged = () => {
  const [allTags, setAllTags] = useState([]);
  const { loading, error, data } = useQuery(GET_FLAGGED_POST);

  const {data: tagsData, loading: tloading, error: terror} = useQuery(GET_TAGS)

  useEffect (() => {
    if(!tloading && !terror){
      setAllTags(g2aTags(tagsData.queryTag));
    }
  }, [tagsData, tloading, terror])

  return <>
    <Navbar title="Flagged" color="primary" />
    <Content>
      <FlaggedList loading={loading} error={error} data={data} allTags={allTags}/>
    </Content>
  </>
}

function FlaggedList({loading, error, data, allTags}) {
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
  return <MasonaryGrid data={data} isApproved={false} updateCache={updateCache} allTags={allTags}/>
}

export default Flagged;
