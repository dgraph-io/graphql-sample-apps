import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import Messages from './components/Messages';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useAuth,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';




const AppSigned =  () => {
  if (!process.env.REACT_APP_DGRAPH_ENDPOINT) {
    throw new Error("Missing Dgraph Endpoint")
  }
  const endpoint = process.env.REACT_APP_DGRAPH_ENDPOINT
  const [client, setClient] = useState<Client>(new Client({url: endpoint,exchanges: [
    cacheExchange,
    fetchExchange
  ]}));
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  getToken({template:"Dgraph"}).then((t)=> {
    console.log("Token "+t)
    let requestHeaders: any = { 'X-Auth-Token': `Bearer ${t}` };
    setClient(new Client({
      url: endpoint,
      fetchOptions: {
        headers: requestHeaders
      },
      exchanges: [
        cacheExchange,
        fetchExchange
      ]
    }) )
  })
  
 
  

  
  

  /* 
  const [{ data, fetching, error }] = useQuery( {
    query: TopSchoolsDocument,
    variables: {
      first: 10
    }
  })

   var schools = new Array<SchoolItemFragment>();
   data?.querySchool?.map((e,i) => e && schools.push(e));
  */
  
  return (
    <div>
      <Provider value={client}>
         <Messages />
      </Provider>
     
    </div>
  );
}

export default AppSigned;
