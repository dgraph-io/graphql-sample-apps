import React, {useState} from 'react';
import {
  Card,
  Menu,
  Result,
  Button,
  Input,
  Form,
  Dropdown,
  Anchor,
  PageHeader,
  DatePicker,
  Checkbox,
  Radio,
  Col,
  Row,
  Rate,
} from 'antd';
import update from 'immutability-helper';
import {useMutation} from '@apollo/client';
import {DownOutlined} from '@ant-design/icons';

import {useForm} from 'antd/lib/form/Form';
import {useAuth0} from '@auth0/auth0-react';
import moment from 'moment';
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import {ADD_FORM} from './query';
import NetPromoterScore from '../Form/NetPromoterScore';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 20},
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 20, offset: 4},
  },
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const dateFormat = 'YYYY/MM/DD';

function QuestionCard({question, updateQuestion, deleteQuestion}: any) {
  return (
    <div>
      <Card
        bordered={false}
        actions={[
          <DeleteOutlined
            key="setting"
            onClick={e => {
              deleteQuestion();
            }}
          />,
        ]}
      >
        <Input
          placeholder="Enter your question here"
          allowClear
          value={question.title}
          onChange={e => updateQuestion({...question, title: e.target.value})}
        />
        <Checkbox
          onChange={e =>
            updateQuestion({...question, required: e.target.checked})
          }
        >
          Required
        </Checkbox>
        <div>{createQuestionField({question, updateQuestion})}</div>
      </Card>
    </div>
  );
}

function SingleChoiceQuestionField({question, updateQuestion, options}: any) {
  return (
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
      <Form.List name="names">
        {(fields, {add, remove}) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Options' : ''}
                  required={false}
                  key={field.key}
                >
                  <div>
                    <Row>
                      <Col span={16}>
                        <div>
                          <Radio style={radioStyle} value={1}>
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: 'Please input option',
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="Please input option"
                                style={{width: '60%'}}
                                value={options[index]}
                                onChange={e => {
                                  let newOptions = [...options];
                                  newOptions[index] = e.target.value;
                                  updateQuestion({
                                    ...question,
                                    options: newOptions,
                                  });
                                }}
                              />
                            </Form.Item>
                          </Radio>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              style={{margin: '0 8px'}}
                              onClick={() => {
                                remove(field.name);
                                let newOptions = update(options, {
                                  $splice: [[field.name, 1]],
                                });
                                updateQuestion({
                                  ...question,
                                  options: newOptions,
                                });
                              }}
                            />
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    updateQuestion({
                      ...question,
                      options: [...options, ''],
                    });
                  }}
                  style={{width: '60%'}}
                >
                  <PlusOutlined /> Add option
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
}

function createQuestionField({question, updateQuestion}: any) {
  switch (question.type) {
    case 'SingleChoice':
      const options = question.options || [];
      return SingleChoiceQuestionField({question, updateQuestion, options});
    case 'Date':
      return (
        <DatePicker
          defaultValue={moment('2015/01/01', dateFormat)}
          format={dateFormat}
          disabled
        />
      );
    case 'Rating':
      let count = question.count || 3;
      return (
        <>
          <p>Maximum rating</p>
          <Radio.Group
            options={['3', '5', '10']}
            value={count}
            onChange={e => {
              count = e.target.value;
              updateQuestion({...question, count: e.target.value});
            }}
          />
          <Rate count={count} allowHalf />
        </>
      );
    case 'Text':
      return (
        <Input.TextArea placeholder="Short answer here" allowClear disabled />
      );
    case 'NetPromoterScore':
      return <NetPromoterScore disabled />;
  }
}

function FormCreator() {
  const [questions, setQuestions] = useState<any>([]);
  const [formSubmitted, setFormSubmitState] = useState(false);
  const [formURL, setFormURL] = useState('');
  const [surveyTitle, setSurveyTitle] = useState('');
  const [formHook] = useForm();
  const {user} = useAuth0();

  const [sendToClient] = useMutation(ADD_FORM);

  const getCard = (i: number) => {
    const question = questions[i];
    const params = {
      question: question,
      updateQuestion: (question: any) =>
        setQuestions(update(questions, {$splice: [[i, 1, question]]})),
      deleteQuestion: () =>
        setQuestions(update(questions, {$splice: [[i, 1]]})),
    };
    return <QuestionCard {...params} />;
  };
  const menu = (
    <Menu onClick={e => setQuestions(questions.concat({type: e.key}))}>
      <Menu.Item key="Text">Short Answer</Menu.Item>
      <Menu.Item key="SingleChoice">Multiple Choice</Menu.Item>
      <Menu.Item key="Date">Date</Menu.Item>
      <Menu.Item key="Rating">Rating</Menu.Item>
      <Menu.Item key="NetPromoterScore">Net Promoter Score</Menu.Item>
    </Menu>
  );

  if (formSubmitted) {
    return (
      <Card type="inner">
        <Result
          status="success"
          title="Thank you!"
          subTitle={
            <Anchor>
              <Anchor.Link href={formURL} title="Your form is live." />
            </Anchor>
          }
        />
      </Card>
    );
  } else
    return (
      <PageHeader ghost={true} title="Create a survey">
        <Form form={formHook}>
          <Card
            actions={[
              <Dropdown overlay={menu}>
                <Button>
                  Add Question <DownOutlined />
                </Button>
              </Dropdown>,
              <Button
                type="primary"
                onClick={async () => {
                  const values = await formHook.validateFields();
                  console.log('validation ' + values.name);
                  for (let index = 0; index < questions.length; index++) {
                    if ('options' in questions[index]) {
                      let newOptions = questions[index].options.map(
                        (value: any, index: any) => {
                          return {order: index, title: value};
                        }
                      );
                      questions[index].options = newOptions;
                    }
                    questions[index].order = index;
                    if (!('required' in questions[index])) {
                      questions[index].required = false;
                    }
                  }
                  var form = {
                    title: surveyTitle,
                    fields: questions,
                    creator: { email: user.email },
                    isClosed: false
                  };

                  console.log('Form: ', form);

                  try {
                    var result = await sendToClient({
                      variables: {
                        form: form,
                      },
                    });

                    console.log(result);
                    let id = result.data.addForm.form[0].id;
                    let url =
                      window.location.href.replace('/create', '') +
                      '/form/' +
                      id;
                    setFormURL(url);
                    setFormSubmitState(true);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Create
              </Button>,
            ]}
          >
            <Form.Item
              label="Survey Title"
              name="survey title"
              rules={[{required: true, message: 'Please input Survey title'}]}
            >
              <Input
                placeholder="Enter your survey title"
                onChange={e => {
                  setSurveyTitle(e.target.value);
                }}
              />
            </Form.Item>
            {questions.map((question: any, index: number) => (
              <div key={index}>
                <Card>{getCard(index)}</Card>
              </div>
            ))}
          </Card>
        </Form>
      </PageHeader>
    );
}

export default FormCreator;
