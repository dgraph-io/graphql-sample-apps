import React from 'react';
import GraphiQL from 'graphiql';
import {Row, Layout, PageHeader} from 'antd';

import 'graphiql/graphiql.css';
import {useParams} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

function Graphiql() {
  const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
  const {id} = useParams();
  const {getIdTokenClaims} = useAuth0();
  const graphQLFetcher = async (graphQLParams: any) => {
    const token = await getIdTokenClaims();
    return await fetch(GRAPHQL_ENDPOINT!, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token.__raw,
      },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  };

  return (
    <PageHeader ghost title="Query">
      <Layout style={{height: '80vh'}}>
        <Row style={{height: '100%'}}>
          <GraphiQL fetcher={graphQLFetcher} query={makeDefaultQuery(id)} />
        </Row>
      </Layout>
    </PageHeader>
  );
}

function makeDefaultQuery(id: string): string {
  return `\
query {
  getForm(id: "${id}") {
    fields(order: { asc: order }) {
      entries {
        date
        netPromoterScore
        rating
        singleChoice @cascade {
          title
        }
        text
      }
    }
  }
}`;
}

export default Graphiql;
