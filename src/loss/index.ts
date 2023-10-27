import { type MultidimensionalScaling } from '..';

/**
 * Get the Strain (a loss function that is minimized by MDS) of the result.
 * $\text{Strain}_D(x_1, x_2, \dots, x_N) = \Biggl(\frac{\sum_{i,j} (b_{ij} - x_i^Tx_j)^2}{\sum_{i,j} b_{ij}^2}\Biggr)^{1/2}$
 */
export function strain(this: MultidimensionalScaling) {
  // new matrix.
  const estimatedB = this.coordinatesMatrix.mmul(
    this.coordinatesMatrix.transpose(),
  );

  //mutates estimatedB
  estimatedB.sub(this.symmetricMatrixB).pow(2);
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < estimatedB.rows; i++) {
    for (let j = 0; j < estimatedB.columns; j++) {
      numerator += estimatedB.get(i, j);
      denominator += Math.pow(this.symmetricMatrixB.get(i, j), 2);
    }
  }
  // both values are >= 0
  return denominator ? Math.sqrt(numerator / denominator) : null;
}
