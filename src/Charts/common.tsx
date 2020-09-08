import {GetChartData_getForm_fields} from './__generated__/GetChartData';

export type ChartProps = GetChartData_getForm_fields;

export function counter(arr: any[]): Record<any, number> {
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
