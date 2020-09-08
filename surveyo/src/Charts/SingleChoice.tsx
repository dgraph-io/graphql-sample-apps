import React from 'react';
import {counter, ChartProps} from './common';
import {presetPalettes} from '@ant-design/colors';
import {Doughnut} from 'react-chartjs-2';

export default function Chart(props: ChartProps) {
  const count = counter(
    props.entries!.map((entry: any) => entry.singleChoice?.title)
  );

  const colors = Object.values(presetPalettes)
    .flatMap(palette => palette.slice(5))
    .sort(() => Math.random() - 0.5);

  const chartData = {
    datasets: [
      {
        data: Object.values(count),
        backgroundColor: colors,
      },
    ],
    labels: Object.keys(count),
  };

  return <Doughnut data={chartData} />;
}
