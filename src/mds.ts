import { Matrix, EigenvalueDecomposition } from 'ml-matrix';

import {
  getDissimilaritySquared,
  doubleCenterMatrix,
  getSubMatrices,
} from './utils';

/**
 * Classic Multidimensional Scaling.
 * @internal
 * @param data - Either the data matrix or the dissimilarity matrix.
 * @param dimensions - The number of dimensions to output (max).
 * @param options - See {@link MDSOptions}.
 * @returns all we need
 */
export function mds(data: Matrix, dimensions: number, options: MDSOptions) {
  /*
        D: is the Dissimilarity Matrix.
        D2 is the squared of D.
        C: is the Centering Matrix.
  */
  const { calculateDissimilarity = true } = options;

  // step 1: calculate the squared of the dissimilarity matrix D
  const D2: Matrix = calculateDissimilarity
    ? getDissimilaritySquared(data)
    : new Matrix(data).pow(2);

  // step 2: Apply double centering to D2
  const B = doubleCenterMatrix(D2);
  // Eigenvalues are real only because B is symmetric
  const decomposedB = new EigenvalueDecomposition(B);

  // step 3: Determine the m (dimensions) largest eigenvalues of B
  const { Em, LRoot } = getSubMatrices({
    decomposedB,
    dimensions,
  });

  // step 4: Calculate the coordinates, X
  return {
    X: Em.mmul(LRoot),
    B,
    availableDimensions: Em.columns,
  };
}

export interface MDSOptions {
  /**
   * If true, calculate the dissimilarity matrix from the data, otherwise
   * assume the data is already a dissimilarity matrix, and square it.
   * @default true
   */
  calculateDissimilarity?: boolean;
}
