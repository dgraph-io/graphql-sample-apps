import { MessageItemFragment,AllMessagesDocument } from "../gql/graphql";
import { Accordion, Container } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import { useQuery } from "urql";



const Messages = () => {
 
    //
    // Fetch GraphQL Data using URQL client
    //
    const [{ data, fetching, error }] = useQuery( {
        query: AllMessagesDocument
      })

    // const { getToken, isLoaded, isSignedIn } = useAuth();
    // 
    // uddate Schools array when we have new data
    //
    

    // getToken({template:"Dgraph"}).then((t)=>console.log(t))
    
    return(
            <>
            <Container> <br></br>

          
            <Accordion>
              {data && data.queryMessage && data.queryMessage.map((e,i) => e && <Accordion.Item eventKey={`${i}`}>
              <Accordion.Header>{e.title} </Accordion.Header>
              <Accordion.Body>
                {e.issued}
              </Accordion.Body>
              </Accordion.Item>)}     
            </Accordion>
            </Container>
            </>
        )
    
}

export default Messages
