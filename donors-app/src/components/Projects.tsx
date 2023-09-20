import { ProjectItemFragment, ProjectsBySemanticDocument } from "../gql/graphql";
import { Accordion, Button, Container, Form, ListGroup } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import { useQuery, useSubscription } from "urql";



const SemProjects = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [entities, setEntities] = useState<ProjectItemFragment[]>([]);
    //
    // Fetch GraphQL Data using URQL client
    //
    const [{ data, fetching, error }] = useQuery( {
        query: ProjectsBySemanticDocument,
        variables: {
          term: searchTerm
        }
    })
    // 
    // uddate Schools array when we have new data
    //
    useEffect( ()=> {
       console.log(`data changed ${data?.semSearchProjects?.length}`)
       var entities = new Array<ProjectItemFragment>();
       data?.semSearchProjects?.map((e,i) => e && entities.push(e));
       setEntities(entities)
    }, [data])
  interface MyFormElements extends HTMLFormControlsCollection {
    searchString: HTMLInputElement
  }
  
  interface SearchFormElement extends HTMLFormElement {
     readonly elements: MyFormElements
  }
    const handleSubmit = (e:React.FormEvent<SearchFormElement>) => {
      e.preventDefault()
      setSearchTerm(e.currentTarget.elements.searchString.value)
    }
    // Search form     
    console.log(`render Projects`)
    return(
            <>
            <Container> <br></br>

            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  id="searchString"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="primary" type="submit">
                Submit
                </Button>
              </Form>
            
            <br></br>
            <Accordion>
              {entities && entities.map((e,i) => e && <Accordion.Item eventKey={`${i}`}>
              <Accordion.Header>{e.title}</Accordion.Header>
              <Accordion.Body>
               
                <b>school: </b><span>{e.school?.name}</span><br/>
                <b>grade: </b><span>{e.grade}</span><br/>
                
              </Accordion.Body>
              </Accordion.Item>)}     
            </Accordion>
            </Container>
            </>
    )
    
}


export default SemProjects
