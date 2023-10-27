/**
 * Returns useful column indices for the real eigenvalues of B
 * Skips negative eigenvalues.
 * @param getIndices - See {@link GetIndices}
 * @returns values and indices
 */
export function getIndicesAndRootOfEigenValues({
  realEigenvalues,
  dimensions,
}: GetIndices) {
  const eigenValues = realEigenvalues.map((v, i) => ({
    value: v,
    index: i,
  }));
  const sorted = eigenValues
    .sort((a, b) => b.value - a.value)
    .slice(0, dimensions);

  const mEigenValues = [];
  const mIndices = []; //needed for matrix column selection

  // not unpacking as it creates more vars
  for (const item of sorted) {
    // can not take sqrt of negative values.
    if (item.value < 0) continue;

    mEigenValues.push(Math.sqrt(item.value));
    mIndices.push(item.index);
  }

  return { mEigenValues, mIndices };
}

interface GetIndices {
  /**
   * All must be real
   */
  realEigenvalues: number[];
  /**
   * The number of output dimensions
   */
  dimensions: number;
}
