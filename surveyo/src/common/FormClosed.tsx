import React from 'react';

import {Button, Result} from 'antd';
import {Link} from 'react-router-dom';

export default function SurveyClose() {
  return (
    <Result
      subTitle="This Survey is Closed"
      extra={
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      }
    />
  );
}
