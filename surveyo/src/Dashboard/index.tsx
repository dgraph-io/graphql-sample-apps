import React, {useState} from 'react';

import {
  Alert,
  Card,
  Table,
  Tooltip,
  Space,
  PageHeader,
  Popconfirm,
  Button,
  message,
} from 'antd';
import {
  LineChartOutlined,
  CodeOutlined,
  ExportOutlined,
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';
import {GET_FORMS, DELETE_FORM, GET_CSV} from './query';
import {DeleteFormVariables, DeleteForm} from './__generated__/DeleteForm';
import {GetSurveys, GetSurveysVariables} from './__generated__/GetSurveys';
import {
  GetCsvResponses,
  GetCsvResponsesVariables,
} from './__generated__/GetCsvResponses';
import {makeCsv} from './csv';
import {CSVLink} from 'react-csv';

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

  const [state, setState] = useState([]);

  const [deleteForm] = useMutation<DeleteForm, DeleteFormVariables>(
    DELETE_FORM
  );

  const {loading, error, data} = useQuery<GetSurveys, GetSurveysVariables>(
    GET_FORMS,
    {
      variables: {
        email: user.email,
      },
      onCompleted: () => {
        setState((data?.getUser?.forms || []) as any);
      },
    }
  );

  if (loading) {
    return <Card loading />;
  }

  if (error) {
    console.error(error);
    return <Alert message={error.message} type="warning" />;
  }

  async function handleDelete(id: string) {
    setState(state => state.filter((form: any) => form?.id !== id));

    try {
      await deleteForm({
        variables: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
      message.error('Internal error: could not delete form');
    }
  }

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
      render: (_text: any, record: any) => record.responses?.length || 0,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Open form">
            <Link to={`/form/${record.id}`} target="_blank">
              <Button type="link" icon={<ExportOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Download CSV">
            <DownloadCsv id={record.id} title={record.title} />
          </Tooltip>
          <Tooltip title="Charts">
            <Link to={`/charts/${record.id}`} target="_blank">
              <Button type="link" icon={<LineChartOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="GraphiQL">
            <Link to={`/graphiql/${record.id}`} target="_blank">
              <Button type="link" icon={<CodeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this form?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table columns={tableCols as any} dataSource={state as any} />;
}

function DownloadCsv(props: any) {
  const [getCsv, {loading, error, data}] = useLazyQuery<
    GetCsvResponses,
    GetCsvResponsesVariables
  >(GET_CSV);

  if (error) {
    console.error(error);
    message.error('Internal error: could not generate CSV');
  }

  return data ? (
    <Tooltip title="Download CSV">
      <CSVLink data={makeCsv(data)} filename={`${props.title}.csv`}>
        <Button type="link" icon={<DownloadOutlined />} />
      </CSVLink>
    </Tooltip>
  ) : (
    <Tooltip title="Generate CSV">
      <Button
        type="link"
        icon={loading ? <LoadingOutlined /> : <FileExcelOutlined />}
        onClick={() => getCsv({variables: {id: props.id}})}
      />
    </Tooltip>
  );
}
