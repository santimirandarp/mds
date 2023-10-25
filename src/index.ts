import { EigenvalueDecomposition, Matrix } from 'ml-matrix';

import {
  doubleCenterMatrix,
  getDissimilaritySquared,
  getSubMatrices,
} from './utils/';

/**
 * Performs classic multidimensional scaling.
 * In this software D is the Squared Proximity Matrix.
 * C is the Centering Matrix.
 * @returns The matrix X, or Coordinates Matrix.
 */
export function mds(
  data: number[][],
  dimensions: number,
  options: {
    /**
     * If true, calculate the dissimilarity matrix from the data, otherwise
     * assume the data is already a dissimilarity matrix, and square it.
     */
    calculateDissimilarity?: boolean;
  } = {},
) {
  const dataLength = data.length;

  // step 1: calculate the squared of the dissimilarity matrix D
  const D2: Matrix = options.calculateDissimilarity
    ? getDissimilaritySquared(data)
    : new Matrix(data).pow(2);

  // step 2: Apply double centering to D
  const B = doubleCenterMatrix(D2, dataLength);

  const decomposedB = new EigenvalueDecomposition(B);

  // step 3: Determine the m (dimensions) largest eigenvalues of B
  const { Em, rootOfDiagonal } = getSubMatrices({
    decomposedB,
    dataLength,
    dimensions,
  });

  // step 4: Calculate the coordinates, X
  return Em.mmul(rootOfDiagonal);
}
