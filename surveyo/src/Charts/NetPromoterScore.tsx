import React from 'react';
import {counter, ChartProps} from './common';
import {presetPalettes} from '@ant-design/colors';
import {Typography, Tag} from 'antd';
import {Bar} from 'react-chartjs-2';

enum Customer {
  Detractor = 'Detractor',
  Passive = 'Passive',
  Promoter = 'Promoter',
}

export default function Chart(props: ChartProps) {
  const count = counter(
    props.entries!.map(entry => {
      const score = entry.netPromoterScore!;
      if (0 <= score && score <= 6) {
        return Customer.Detractor;
      }
      if (score <= 8) {
        return Customer.Passive;
      }
      if (score <= 10) {
        return Customer.Promoter;
      }
      return null;
    })
  );

  const detractorCount = count[Customer.Detractor] || 0;
  const passiveCount = count[Customer.Passive] || 0;
  const promoterCount = count[Customer.Promoter] || 0;
  const totalCount = promoterCount + passiveCount + detractorCount;

  const nps = ((promoterCount - detractorCount) * 100) / totalCount || 0;
  const npsColors = [
    presetPalettes.red,
    presetPalettes.volcano,
    presetPalettes.orange,
    presetPalettes.gold,
    presetPalettes.yellow,
    presetPalettes.lime,
    presetPalettes.green,
  ].map(palette => [palette[0], palette[5]]);

  const detractorColor = presetPalettes.red[5];
  const passiveColor = presetPalettes.yellow[5];
  const promoterColor = presetPalettes.green[5];

  const npsColorIdx = Math.round(((nps + 100) * (npsColors.length - 1)) / 200);
  const [npsColorLight, npsColorDark] = npsColors[npsColorIdx];

  const labels = [Customer.Detractor, Customer.Passive, Customer.Promoter];
  const data = [detractorCount, passiveCount, promoterCount];

  const chartData = {
    datasets: [
      {
        data,
        label: 'Responses',
        backgroundColor: [detractorColor, passiveColor, promoterColor],
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

  return (
    <>
      <Typography.Text style={{paddingRight: 5}}>
        Net Promoter Score:
      </Typography.Text>
      <Tag
        color={npsColorLight}
        style={{
          color: npsColorDark,
          borderColor: npsColorDark,
        }}
      >
        {nps.toFixed(2)}%
      </Tag>
      <Bar data={chartData} options={chartOptions} />
    </>
  );
}
