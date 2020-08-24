import React from 'react';
import {SyForm} from './form';
import {useParams} from 'react-router-dom';
import {GetForm, GetFormVariables} from './__generated__/GetForm';
import {useQuery} from '@apollo/client';
import {Result404, Result500} from '../common';
import {PageHeader, Row, Col, Card} from 'antd';
import {GET_FORM} from './query';

export default function Page() {
  const {id} = useParams();

  const {loading, error, data} = useQuery<GetForm, GetFormVariables>(GET_FORM, {
    variables: {id},
  });

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <Result500 />;
  }

  if (!data?.getForm) {
    return <Result404 />;
  }

  return <SyForm data={data.getForm} />;
}

function PageLoading() {
  return (
    <PageHeader title="...">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card loading />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card loading />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card loading />
        </Col>
      </Row>
    </PageHeader>
  );
}
