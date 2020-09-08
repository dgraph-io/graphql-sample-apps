import React from 'react';
import {GetChartData_getForm_fields} from './__generated__/GetChartData';
import NetPromoterScore from './NetPromoterScore';
import Rating from './Rating';
import SingleChoice from './SingleChoice';
import Text from './Text';

export default function Chart(props: GetChartData_getForm_fields) {
  switch (props.type) {
    case 'NetPromoterScore':
      return <NetPromoterScore {...props} />;
    case 'Rating':
      return <Rating {...props} />;
    case 'SingleChoice':
      return <SingleChoice {...props} />;
    case 'Text':
      return <Text {...props} />;
    default:
      return null;
  }
}
