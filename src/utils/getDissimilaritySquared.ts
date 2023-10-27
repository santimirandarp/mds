import { Matrix } from 'ml-matrix';

/**
 * Distance between vectors. Make use of symmetry.
 * @param data - the data as an array of arrays
 * @returns - the dissimilarity matrix squared i.e D2
 */
export function getDissimilaritySquared(data: Matrix) {
  const n = data.rows; // dataLength or number of samples.

  // we do not mutate the data
  const D2: Matrix = new Matrix(n, n);
  for (let i = 0; i < n; i++) {
    //row
    const currentRow = data.getRowVector(i);
    for (let j = i + 1; j < n; j++) {
      let total = 0;
      for (let k = 0; k < n; k++) {
        total += Math.pow(currentRow.get(0, k) - data.get(j, k), 2);
      }
      D2.set(i, j, total);
      D2.set(j, i, total);
    }
    D2.set(i, i, 0);
  }
  return D2;
}
