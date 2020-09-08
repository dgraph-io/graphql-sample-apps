import React from 'react';
import {counter, ChartProps} from './common';
import {Bar} from 'react-chartjs-2';
import {presetPalettes} from '@ant-design/colors';

export default function Chart(field: ChartProps) {
  const count = counter(field.entries!.map(entry => entry.rating));

  const labels = [];
  const data = [];

  const palette = [
    presetPalettes.red,
    presetPalettes.volcano,
    presetPalettes.orange,
    presetPalettes.gold,
    presetPalettes.yellow,
    presetPalettes.lime,
    presetPalettes.green,
    presetPalettes.cyan,
    presetPalettes.blue,
    presetPalettes.geekblue,
  ].map(palette => palette[5]);

  const colors = [];

  for (let i = 1; i <= field.count!; i++) {
    labels.push(i);
    data.push(count[i] || 0);

    const paletteIdx = Math.round(
      ((i - 1) / (field.count! - 1)) * (palette.length - 1)
    );
    colors.push(palette[paletteIdx]);
  }

  const chartData = {
    datasets: [
      {
        data,
        label: 'Responses',
        backgroundColor: colors,
      },
    ],
    labels,
  };

  const chartOptions = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
