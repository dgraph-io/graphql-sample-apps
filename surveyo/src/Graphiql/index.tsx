import React from 'react';
import GraphiQL from 'graphiql';
import {Row, Layout, PageHeader} from 'antd';

import 'graphiql/graphiql.css';

function Graphiql() {
  const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;

  const graphQLFetcher = async (graphQLParams: any) => {
    return await fetch(GRAPHQL_ENDPOINT!, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  };

  return (
    <PageHeader
      ghost
      onBack={() => (window.location.href = '/')}
      title="Query your data"
    >
      <Layout style={{height: '80vh'}}>
        <Row style={{height: '100%'}}>
          <GraphiQL
            fetcher={graphQLFetcher}
            defaultQuery={makeDefaultQuery('0x4ec6')}
          />
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
