import { describe, expect, test } from 'vitest';

import { MultidimensionalScaling } from '../index';

import { data } from './data/simple.matrix';
import { assertResult } from './util';

describe('MDS', () => {
  // the signs for the second column are flipped, but it's still a valid solution (just flipped along the axis)
  const juliaSolution = [
    [4.0964853994662, -109.60830413814391],
    [-17.216020281773528, 47.60002429181552],
    [211.77971914746627, 24.972399542334482],
    [-94.64018914038735, -17.87711515004059],
    [-104.0199951247715, 54.91299545403453],
  ];

  const ourResult = new MultidimensionalScaling(data, 2, {
    calculateDissimilarity: false,
  });
  test('Check dimensions is 2', () => {
    expect(ourResult.dimensions).toBe(2);
  });
  test('Compare with plain Julia result', () => {
    // solution
    assertResult(juliaSolution, ourResult.coordinatesMatrix, 6);
  });
  test('Check that strain is small', () => {
    //strain
    expect(ourResult.strain()).toBeCloseTo(0.011289, 4);
  });
  test('Compare scaled up result', () => {
    //scaled up solution
    const scaleUpJuliaByTwo = juliaSolution.map((row) =>
      row.map((val) => val * 2),
    );
    const scaleUpOursByTwo = ourResult.scaleUp(2);
    assertResult(scaleUpJuliaByTwo, scaleUpOursByTwo, 6);
  });
  test('Compare scaled down result', () => {
    const scaleDownJuliaByTwo = juliaSolution.map((row) =>
      row.map((val) => val / 2),
    );
    const scaleDownOursByTwo = ourResult.scaleDown(2);
    assertResult(scaleDownJuliaByTwo, scaleDownOursByTwo, 6);
  });
  test('Pass an empty data array', () => {
    expect(() => new MultidimensionalScaling([], 2)).toThrow(
      'Cannot have more dimensions than the number of columns in the data.',
    );
  });
});

/**
 console.log(
   mds(
     [
       [0, 0, 0],
       [0, 0, 1],
       [1, 1, 1],
       [0, 1, 0],
       [0, 1, 1],
     ],
     2,
     {
       calculateDissimilarity: true,
     },
   ),
 )
*/
