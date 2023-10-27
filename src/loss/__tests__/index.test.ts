import { Matrix } from 'ml-matrix';
import { describe, it, expect } from 'vitest';

import { MultidimensionalScaling } from '../..';

// test the strain method

describe('strain', () => {
  const data = [
    [0, 1, 2, 3],
    [1, 0, 1, 2],
    [2, 1, 0, 1],
    [3, 2, 1, 0],
  ];
  const mds = new MultidimensionalScaling(data, 2, {
    calculateDissimilarity: false,
  });
  it('strain', () => {
    expect(mds.strain()).toBeCloseTo(0, 5);
    //calculate twice to check nothing is mutated
    expect(mds.strain()).toBeCloseTo(0, 5);
    mds.coordinatesMatrix = Matrix.zeros(4, 2);
    mds.symmetricMatrixB = Matrix.zeros(4, 4);
    expect(mds.strain()).toBeNull();
  });
});
