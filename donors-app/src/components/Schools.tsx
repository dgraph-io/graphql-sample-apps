import { SchoolItemFragment,SchoolsByTermDocument } from "../gql/graphql";
import { Accordion, Button, Container, Form, ListGroup } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import { useQuery } from "urql";

interface SchoolsProps {
    //data: SchoolItemFragment[];
}



const Schools = (props:SchoolsProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [schools, setSchools] = useState<SchoolItemFragment[]>([]);
    //
    // Fetch GraphQL Data using URQL client
    //
    const [{ data, fetching, error }] = useQuery( {
        query: SchoolsByTermDocument,
        variables: {
          term: searchTerm
        }
      })
    // 
    // uddate Schools array when we have new data
    //
    useEffect( ()=> {
       console.log(`data changed ${data?.querySchool?.length}`)
       var schools = new Array<SchoolItemFragment>();
       data?.querySchool?.map((e,i) => e && schools.push(e));
       setSchools(schools)
    }, [data])

    const searchSchool =  (e: React.MouseEvent<HTMLElement>): void =>  {
        e.preventDefault();
        console.log(`search ${searchTerm}`);
        
       // this.state.data = []
       // data?.querySchool?.map((e,i) => e && this.state.data.push(e));
    }
    //
    // Search form without Search button : we seach as user type
    //
    
    return(
            <>
            <Container> <br></br>
            <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(event)=>setSearchTerm(event.target.value)}
                />
              </Form>
            
            <br></br>
            <Accordion>
              {schools && schools.map((e,i) => e && <Accordion.Item eventKey={`${i}`}>
              <Accordion.Header>{e.name} ({e.projects?.length}) </Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  { e.projects && e.projects.map((e,i) => e && <ListGroup.Item>{e.title}</ListGroup.Item>)}    
               </ListGroup>
              </Accordion.Body>
              </Accordion.Item>)}     
            </Accordion>
            </Container>
            </>
        )
    
}

export default Schools
