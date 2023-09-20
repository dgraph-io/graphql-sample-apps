import React from 'react';
import './App.css';
import { Container, Navbar } from 'react-bootstrap';


import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import AppSigned from './AppSigned';
 
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
 

function App() {
  

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
      <Navbar bg="dark" variant='dark'> 
      <Container> 
        <Navbar.Brand href="#home"> 
        <img 
        alt=""
        src="/diggy.png"
        height="40"
        className="d-inline-block align-top"
        />{' | '}Sample Application 
        </Navbar.Brand>
      </Container>
      </Navbar>
      <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
         <AppSigned />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
      
     
    </div>
  );
}

export default App;
