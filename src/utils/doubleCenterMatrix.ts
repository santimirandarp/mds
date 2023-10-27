import { Matrix } from 'ml-matrix';

/**
 * Apply double centering to D2
 * @param D2 - the squared of the dissimilarity matrix
 * @returns - the centered matrix
 */
export function doubleCenterMatrix(D2: Matrix) {
  // probably a fn to optimize in the future.

  const n = D2.rows; // dataLength or number of samples.

  const offDiagonal = -1 / n;
  const diagonal = 1 + offDiagonal;
  const C = Matrix.zeros(n, n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      C.set(i, j, offDiagonal);
      C.set(j, i, offDiagonal);
    }
    C.set(i, i, diagonal);
  }
  return C.mmul(D2)
    .mmul(C)
    .mul(-1 / 2);
}
