import React from 'react';

import {Button, Result} from 'antd';
import {Link} from 'react-router-dom';

export default function Result404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      }
    />
  );
}
