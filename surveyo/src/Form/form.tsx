import React, {useState} from 'react';

import {ADD_RESPONSE} from './query';
import {GetForm_getForm} from './__generated__/GetForm';
import {AddResponseInput, FieldRef} from '../../__generated__/globalTypes';

import {Button, Input, DatePicker, Radio, Rate, message} from 'antd';
import {PageHeader, Row, Col, Card, Result} from 'antd';
import {Form, Typography} from 'antd';
import {useMutation} from '@apollo/client';
import update from 'immutability-helper';

export function SyForm(props: SyFormProps) {
  const [state, setState] = useState<SyFormState>({
    form: {id: props.data.id},
    entries: props.data.fields.map(field => ({
      field: {
        id: field.id,
      },
    })),
    submitted: false,
  });

  const [form] = Form.useForm();

  const [submit, {loading}] = useMutation(ADD_RESPONSE);

  if (state.submitted) {
    return (
      <Card type="inner">
        <Result
          status="success"
          title="Thank you!"
          subTitle="Your response has been recorded."
        />
      </Card>
    );
  }

  const handleChange = (idx: number) => ({
    DatePicker: (event: any) => {
      const value = event;
      setState(state =>
        update(state, {
          entries: {[idx]: {$merge: {date: value}}},
        })
      );
    },
    Input: (event: any) => {
      const value = event.target.value;
      setState(state =>
        update(state, {
          entries: {[idx]: {$merge: {text: value}}},
        })
      );
    },
    Radio: (event: any) => {
      const value = event.target.value;
      setState(state =>
        update(state, {
          entries: {[idx]: {$merge: {singleChoice: {id: value}}}},
        })
      );
    },
    Rate: (event: any) => {
      const value = event;
      setState(state =>
        update(state, {
          entries: {[idx]: {$merge: {rating: value}}},
        })
      );
    },
  });

  const createField = (field: FieldRef, idx: number) => {
    switch (field.type) {
      case 'Date':
        return (
          <DatePicker mode="date" onChange={handleChange(idx).DatePicker} />
        );
      case 'Rating':
        return (
          <Rate
            allowClear
            count={field.count!}
            onChange={handleChange(idx).Rate}
          />
        );
      case 'SingleChoice':
        return (
          <Radio.Group onChange={handleChange(idx).Radio}>
            {field.options!.map(option => (
              <Radio
                key={option.id!}
                value={option.id}
                style={{
                  display: 'block',
                  height: '30px',
                  lineHeight: '30px',
                }}
              >
                {option.title}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'Text':
        return (
          <Input
            placeholder="Write something..."
            onChange={handleChange(idx).Input}
          />
        );
    }
  };

  const createFieldItem = (field: any, idx: number): JSX.Element => (
    <Form.Item
      style={{margin: 0}}
      name={field.id}
      rules={[{required: field.required, message: 'This field is required.'}]}
    >
      {createField(field, idx)}
    </Form.Item>
  );

  async function handleSubmit() {
    await form.validateFields();
    try {
      await submit({
        variables: {
          response: {
            form: state.form,
            entries: state.entries,
          } as AddResponseInput,
        },
      });
      setState(state => update(state, {$merge: {submitted: true}}));
    } catch (e) {
      console.error(e);
      message.error('Internal error: could not submit response');
    }
  }

  const fields = props.data.fields.map((field, idx) => {
    return (
      <Row gutter={[16, 16]} key={field.id}>
        <Col span={24}>
          <Card key={idx} type="inner" style={{borderRadius: '4px'}}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <SyTitle title={field.title} required={field.required} />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>{createFieldItem(field, idx)}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  });

  const submitButton = (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{textAlign: 'right'}}>
        <Form.Item>
          <Button htmlType="submit" loading={loading} type="primary">
            Submit
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <PageHeader ghost={true} title={props.data.title}>
      <Form form={form} onFinish={handleSubmit}>
        {fields}
        {submitButton}
      </Form>
    </PageHeader>
  );
}

type SyFormProps = {
  data: GetForm_getForm;
};

type SyFormState = {
  form: {id: string};
  entries: any[];
  submitted: boolean;
};

function SyTitle(props: SyTitleProps) {
  return (
    <Typography.Text style={{margin: 0, color: 'black', fontSize: '16px'}}>
      {props.title}
      {props.required ? <span style={{color: 'red'}}> *</span> : null}
    </Typography.Text>
  );
}

type SyTitleProps = {
  title: string;
  required: boolean;
};
