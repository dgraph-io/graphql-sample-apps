import React from 'react';

import {Button, Result} from 'antd';
import {Link} from 'react-router-dom';

export default function Result404() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      }
    />
  );
}
