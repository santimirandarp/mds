import React from 'react';
import { MultidimensionalScaling as MDS } from '../src/index';
import {
  Plot,
  LineSeries,
  Axis,
  Legend,
  Heading,
  SeriesPoint,
  ScatterSeries,
} from 'react-plot';

import { data } from '../src/__tests__/data/simple.matrix';

const mds = new MDS(data, 2, {
  calculateDissimilarity: false,
});

const result = mds.normalize()?.to2DArray();

const calculations: SeriesPoint[][] = [];
const degree: number[] = [];

const plot = (result as number[][]).map((point) => ({
  x: point[0],
  y: point[1],
}));
calculations.push(plot);

export const Example = () => (
  <Plot
    width={1000}
    height={1000}
    margin={{ bottom: 50, left: 90, top: 50, right: 100 }}
  >
    <Heading
      title="Electrical characterization"
      subtitle="Current vs Voltage"
    />
    {calculations.map((plot, i) => (
      <ScatterSeries
        key={i}
        data={plot}
        xAxis="x"
        yAxis="y"
        label={'Scatter Plot for Cities'}
      />
    ))}
    <Axis
      id="x"
      position="bottom"
      label="Drain voltage [V]"
      displayPrimaryGridLines
      paddingStart={3}
      paddingEnd={3}
      // max={Math.max(...x) * 1.1}
    />
    <Axis
      id="y"
      position="left"
      label="Drain current [mA]"
      displayPrimaryGridLines
      // max={Math.max(...y) * 1.1}
    />
    <Legend position="right" />
  </Plot>
);
