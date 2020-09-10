import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import {presetPalettes} from '@ant-design/colors';
import {ChartProps, counter} from './common';
import {removeStopwords} from 'stopword';

export default function Chart(props: ChartProps) {
  const count = counter(
    props!.entries!.flatMap(entry =>
      removeStopwords((entry?.text || '').split(/\s+/))
    )
  );

  const words = Object.entries(count).map(([text, value]) => ({
    text,
    value,
  }));

  const colors = Object.values(presetPalettes).flatMap(palette =>
    palette.slice(5)
  );

  return (
    <ReactWordcloud
      options={{
        colors,
        deterministic: true,
        fontFamily: 'Ubuntu',
        fontSizes: [20, 60],
        rotations: 2,
        rotationAngles: [-90, 0],
      }}
      words={words}
    />
  );
}
