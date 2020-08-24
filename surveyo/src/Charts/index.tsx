import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Alert, Card, Row, Col, PageHeader} from 'antd';
import ReactWordcloud from 'react-wordcloud';
import './index.css';
import {Bar, Doughnut} from 'react-chartjs-2';
import {GET_CHART_DATA} from './query';

export default function VizPage() {
  return (
    <PageHeader
      ghost={true}
      onBack={() => (window.location.href = '/')}
      title="Charts"
    >
      <GqlViz />
    </PageHeader>
  );
}

function GqlViz() {
  const {id} = useParams();

  const {loading, error, data} = useQuery(GET_CHART_DATA, {
    variables: {id},
  });

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

  const makeChart = (field: any) => {
    switch (field.type) {
      case 'Text':
        return (
          <ReactWordcloud
            options={{
              rotations: 2,
              rotationAngles: [-90, 0],
            }}
            words={chartWordcloud(field) as any}
          />
        );
      case 'SingleChoice':
        return <Doughnut data={chartSingleChoice(field) as any} />;
      case 'Rating':
        return <Bar data={chartRating(field) as any} />;
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {data.getForm.fields.map((field: any) => {
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

function chartWordcloud(field: any) {
  // console.log('field entries: ', field.entries);

  // field.entries.text = remove_stopwords(field.entries.text);
  // console.log('New field entries: ', field.entries);
  const count = counter(
    field.entries.flatMap((entry: any) => {
      let text = remove_stopwords(entry.text);
      text = text.substring(0, 120);
      return text.split(/\s+/);
    })
  );

  const x = Object.entries(count).map(([text, value]) => ({
    text,
    value,
  }));

  console.log(x);

  return x;
}

function chartRating(field: any) {
  const count = counter(field.entries.map((entry: any) => entry.rating));

  const labels = [];
  const data = [];

  for (let i = 1; i <= field.count; i++) {
    labels.push(i);
    data.push(count[i] || 0);
  }

  return {
    datasets: [
      {
        data,
        label: 'Votes',
      },
    ],
    labels,
  };
}

function chartSingleChoice(field: any) {
  const count = counter(
    field.entries.map((entry: any) => entry.singleChoice?.title)
  );

  return {
    datasets: [
      {
        data: Object.values(count),
        backgroundColor: chartColors,
      },
    ],
    labels: Object.keys(count),
  };
}

const chartColors = [
  '#ff0029',
  '#377eb8',
  '#66a61e',
  '#984ea3',
  '#00d2d5',
  '#ff7f00',
  '#af8d00',
  '#7f80cd',
  '#b3e900',
  '#c42e60',
  '#a65628',
  '#f781bf',
  '#8dd3c7',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#fccde5',
  '#bc80bd',
  '#ffed6f',
  '#c4eaff',
  '#cf8c00',
  '#1b9e77',
  '#d95f02',
  '#e7298a',
  '#e6ab02',
  '#a6761d',
  '#0097ff',
  '#00d067',
  '#000000',
  '#252525',
  '#525252',
  '#737373',
  '#969696',
  '#bdbdbd',
  '#f43600',
  '#4ba93b',
  '#5779bb',
  '#927acc',
  '#97ee3f',
  '#bf3947',
  '#9f5b00',
  '#f48758',
  '#8caed6',
  '#f2b94f',
  '#eff26e',
  '#e43872',
  '#d9b100',
  '#9d7a00',
  '#698cff',
  '#d9d9d9',
  '#00d27e',
  '#d06800',
  '#009f82',
  '#c49200',
  '#cbe8ff',
  '#fecddf',
  '#c27eb6',
  '#8cd2ce',
  '#c4b8d9',
  '#f883b0',
  '#a49100',
  '#f48800',
  '#27d0df',
  '#a04a9b',
];

function counter(arr: string[]) {
  const count: any = {};

  for (const element of arr) {
    if (element === null || element === undefined) {
      continue;
    }

    if (count[element]) {
      count[element]++;
    } else {
      count[element] = 1;
    }
  }

  return count;
}
function remove_stopwords(str: string) {
  let stri = str || '';
  let res = [];
  let words = stri.split(' ');
  for (let i = 0; i < words.length; i++) {
    let word_clean = words[i].split('.').join('');
    word_clean = word_clean.toLowerCase();
    if (!stopwords.includes(word_clean)) {
      res.push(word_clean);
    }
  }
  return res.join(' ');
}

const stopwords = [
  'The',
  'i',
  'me',
  'my',
  'myself',
  'we',
  'our',
  'ours',
  'ourselves',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  'these',
  'those',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'having',
  'do',
  'does',
  'did',
  'doing',
  'a',
  'an',
  'the',
  'and',
  'but',
  'if',
  'or',
  'because',
  'as',
  'until',
  'while',
  'of',
  'at',
  'by',
  'for',
  'with',
  'about',
  'against',
  'between',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'to',
  'from',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  's',
  't',
  'can',
  'will',
  'just',
  'don',
  'should',
  'now',
];
