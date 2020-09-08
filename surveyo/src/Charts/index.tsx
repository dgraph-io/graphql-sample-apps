import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Alert, Card, Row, Col, PageHeader} from 'antd';
import {GET_CHART_DATA} from './query';
import {
  GetChartData_getForm_fields,
  GetChartDataVariables,
  GetChartData,
} from './__generated__/GetChartData';
import {Chart} from 'chart.js';
import ChartNetPromoterScore from './NetPromoterScore';
import ChartRating from './Rating';
import ChartSingleChoice from './SingleChoice';
import ChartText from './Text';

Chart.defaults.global.defaultFontFamily = 'Ubuntu';

export default function VizPage() {
  return (
    <PageHeader ghost={true} title="Charts">
      <GqlViz />
    </PageHeader>
  );
}

function GqlViz() {
  const {id} = useParams();

  const {loading, error, data} = useQuery<GetChartData, GetChartDataVariables>(
    GET_CHART_DATA,
    {
      variables: {id},
    }
  );

  if (loading) {
    return <Card title loading />;
  }

  if (error) {
    return (
      <Card title>
        <Alert message={error.message} type="warning" />
      </Card>
    );
  }

  const makeChart = (field: GetChartData_getForm_fields) => {
    switch (field.type) {
      case 'NetPromoterScore':
        return <ChartNetPromoterScore {...field} />;
      case 'Rating':
        return <ChartRating {...field} />;
      case 'SingleChoice':
        return <ChartSingleChoice {...field} />;
      case 'Text':
        return <ChartText {...field} />;
      default:
        return null;
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {data!.getForm!.fields.map(field => {
        const chart = makeChart(field);
        if (chart) {
          return (
            <Col span={12}>
              <Card style={{height: '100%'}}>
                <h3>{field.title}</h3>
                <div style={{height: 'fit-content'}}>{chart}</div>
              </Card>
            </Col>
          );
        } else {
          return null;
        }
      })}
    </Row>
  );
}
