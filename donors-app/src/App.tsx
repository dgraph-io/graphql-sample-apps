import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Navbar, Tab, Tabs } from 'react-bootstrap';
import Schools from './components/Schools';
import SemProjects from './components/Projects';
import Categories from './components/Categories';
import Message from './components/Message';

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
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="schools" title="Schools">
          <Schools />
      </Tab>
      <Tab eventKey="sem-schools" title="Semantic Search">
          <SemProjects />
      </Tab>
      <Tab eventKey="category" title="Categories">
        <Categories />
      </Tab>
      <Tab eventKey="subscription" title="Subscription">
        <Message />
      </Tab>
    </Tabs>
      
     
    </div>
  );
}

export default App;
