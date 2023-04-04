import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import { useQuery } from 'urql';
import { SchoolItemFragment } from './gql/graphql';
import Schools from './components/Schools';

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
        />{' | '}Donors Application 
        </Navbar.Brand>
      </Container>
      </Navbar>

      <Schools />
     
    </div>
  );
}

export default App;
