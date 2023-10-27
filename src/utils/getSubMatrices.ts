import { type EigenvalueDecomposition, Matrix } from 'ml-matrix';

import { getIndicesAndRootOfEigenValues } from './getIndicesAndRootOfEigenValues';

interface GetSubMatrices {
  /**
   * The matrix B EV-decomposed
   */
  decomposedB: EigenvalueDecomposition;
  /**
   * The number of dimensions they want
   */
  dimensions: number;
}

/**
 * Get the sub-matrices of:
 * 1. EigenVectors or `Em`
 * 2. EigenValues (square root) or `LRoot`.
 * @param param0
 * @returns
 */
export function getSubMatrices({
  decomposedB,
  dimensions,
}: GetSubMatrices): Out {
  // determine the m largest eigenvalues of B
  const { realEigenvalues, eigenvectorMatrix } = decomposedB;

  // avoid using matrix, and get sqrt in a simple way.
  const { mEigenValues, mIndices } = getIndicesAndRootOfEigenValues({
    realEigenvalues,
    dimensions,
  });

  // this happens if all the EVs were negative.
  if (dimensions === 0) {
    throw new Error(
      'All the eigenvalues are negative. Cannot perform MDS in this case.',
    );
  }
  // it also takes care of the order of the columns
  const Em = eigenvectorMatrix.subMatrixColumn(mIndices);
  const LRoot = Matrix.diag(mEigenValues);

  return {
    Em,
    LRoot,
  };
}

interface Out {
  /**
   * The sub-matrix of eigenvectors
   */
  Em: Matrix;
  /**
   * The sub-matrix of eigenvalues
   */
  LRoot: Matrix;
}
