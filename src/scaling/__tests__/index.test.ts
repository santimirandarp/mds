import { describe, it, expect, assert } from 'vitest';

import { assertResult } from '../../__tests__/util';
import { MultidimensionalScaling } from '../..';

describe('scaling', () => {
  const data = [
    [0, 1, 2, 3],
    [1, 0, 1, 2],
    [2, 1, 0, 1],
    [3, 2, 1, 0],
  ];
  const juliaSolution = [
    [-1.4999999999999991, 2.557385952237348e-8],
    [-0.49999999999999967, 8.52461984079116e-9],
    [0.4999999999999996, -8.524619840791158e-9],
    [1.5000000000000002, 3.125693941623423e-8],
  ];
  const mds = new MultidimensionalScaling(data, 2, {
    calculateDissimilarity: false,
  });
  it('check output', () => {
    assertResult(juliaSolution, mds.coordinatesMatrix, 7);
  });
  it('scale up', () => {
    const scaleUpJuliaByTwo = juliaSolution.map((row) =>
      row.map((val, i) => (i % 2 == 0 ? val * 2 : val)),
    );
    const scaleUpOursByTwo = mds.scaleUp([2, 1]);
    assertResult(scaleUpJuliaByTwo, scaleUpOursByTwo, 6);
    expect(() => mds.scaleUp([2, 1, 3])).toThrow(
      'by must be a number or a column vector of the same length as the number of rows in the coordinates matrix.',
    );
  });
  it('scale down', () => {
    const scaleDownJuliaByTwo = juliaSolution.map((row) =>
      row.map((val) => val / 2),
    );
    const scaleDownOursByTwo = mds.scaleDown([2, 2]);
    assertResult(scaleDownJuliaByTwo, scaleDownOursByTwo, 6);
    expect(() => mds.scaleDown([2, 1, 3])).toThrow(
      'by must be a number or a column vector of the same length as the number of rows in the coordinates matrix.',
    );
  });
});
