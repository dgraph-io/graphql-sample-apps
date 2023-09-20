import { SchoolItemFragment,SchoolsByTermDocument } from "../gql/graphql";
import { Button, Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import { useMutation, useQuery, useSubscription } from "urql";
import { AllCategoriesDocument ,AddCategoryDocument} from "./operations";



const Categories = () => {
    const [name, setName] = useState<string>('');
    const [schools, setSchools] = useState<SchoolItemFragment[]>([]);
    //
    // Fetch GraphQL Data using URQL client
    //
    const [{ data, fetching, error }] = useQuery( {
        query: AllCategoriesDocument
    })

    const [state, executeMutation] = useMutation(AddCategoryDocument)

    // Search form     
    console.log(`render with $category.data?`)
    return(
            <>
            <Container> <br></br>

            <InputGroup >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event)=>setName(event.target.value)}
                />
                <Button variant="primary" type="submit"  onClick={() => {
                  executeMutation({ name })} }>
                Add
               </Button>
              </InputGroup>
              
            
            <br></br>

                <ListGroup variant="flush">
                  { data &&  data.queryCategory && data.queryCategory?.map((e,i) => e && <ListGroup.Item>{e.name}</ListGroup.Item>)}    
               </ListGroup>
     
            </Container>
            </>
    )
    
}

export default Categories
