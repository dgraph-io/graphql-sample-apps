import React from 'react';

import {Alert, Card, Table, Tooltip, Space, PageHeader, Button} from 'antd';
import {
  LineChartOutlined,
  CodeOutlined,
  ExportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {useQuery} from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';
import {GET_FORMS} from './query';

export default function Dashboard() {
  return (
    <PageHeader
      ghost={true}
      title="Dashboard"
      extra={[
        <Link to="/create">
          <Button icon={<PlusOutlined />} type="primary">
            New survey
          </Button>
        </Link>,
      ]}
    >
      <DashboardHelper />
    </PageHeader>
  );
}

function DashboardHelper() {
  const {user} = useAuth0();

  const {loading, error, data} = useQuery(GET_FORMS, {
    variables: {
      email: user.email,
    },
  });

  if (loading) {
    return <Card loading />;
  }

  if (error) {
    console.log(error);
    return <Alert message={error.message} type="warning" />;
  }

  console.log(data);
  const tableData = data.getUser?.forms || [];
  const tableCols = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => text,
    },
    {
      title: 'Responses',
      dataIndex: 'responses',
      key: 'responses',
      render: (text: any, record: any) => record.responses?.length || 0,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Open form">
            <a href={`/form/${record.id}`} target="_blank" rel="noopener noreferrer">
              <ExportOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Charts">
            <a href={`charts/${record.id}`}>
              <LineChartOutlined />
            </a>
          </Tooltip>
          <Tooltip title="GraphiQL">
            <a href={`/graphiql/${record.id}`}>
              <CodeOutlined />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table columns={tableCols as any} dataSource={tableData} />;
}
