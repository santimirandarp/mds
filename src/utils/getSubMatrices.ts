import { type EigenvalueDecomposition, Matrix } from 'ml-matrix';

interface GetSubMatrices {
  /**
   * The matrix B EV-decomposed
   */
  decomposedB: EigenvalueDecomposition;
  /**
   * The number of dimensions they want
   */
  dimensions: number;
  /**
   * The number of data points
   */
  dataLength: number;
}

export function getSubMatrices({
  decomposedB,
  dimensions,
  dataLength,
}: GetSubMatrices) {
  // determine the m largest eigenvalues of B
  const { diagonalMatrix, eigenvectorMatrix } = decomposedB;

  // diagonal matrix is mutated to sqrt of eigenvalues
  const indices = getIndices({ diagonalMatrix, dataLength, dimensions });
  const Em = eigenvectorMatrix.subMatrixColumn(indices);

  const rootOfDiagonal = diagonalMatrix.subMatrixColumn(indices);
  for (let i = 0; i < dimensions; i++) {
    rootOfDiagonal.set(i, i, Math.sqrt(rootOfDiagonal.get(i, i)));
  }
  return { Em, rootOfDiagonal };
}

/**
 * Mutates Diagonal Matrix, returns useful column indices.
 * @param param0
 * @returns
 */
function getIndices({
  diagonalMatrix,
  dataLength,
  dimensions,
}: {
  diagonalMatrix: Matrix;
  dataLength: number;
  dimensions: number;
}) {
  // sort in descending order
  const eigenValues: { value: number; index: number }[] = [];
  for (let i = 0; i < dataLength; i++) {
    const element = diagonalMatrix.get(i, i);
    diagonalMatrix.set(i, i, Math.sqrt(element));
    eigenValues.push({
      value: element,
      index: i,
    });
  }
  const mValues = eigenValues
    .sort((a, b) => b.value - a.value)
    .slice(0, dimensions);

  return mValues.map((v) => v.index);
}
