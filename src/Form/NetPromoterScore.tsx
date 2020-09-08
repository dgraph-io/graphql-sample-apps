import React from 'react';
import {Radio} from 'antd';
import {RadioGroupProps} from 'antd/lib/radio';

export default function Field(props: RadioGroupProps) {
  const buttons = [];
  for (let i = 0; i <= 10; i++) {
    buttons.push(
      <Radio.Button key={i} value={i}>
        {i}
      </Radio.Button>
    );
  }

  return (
    <Radio.Group buttonStyle="solid" {...props}>
      {buttons}
    </Radio.Group>
  );
}
