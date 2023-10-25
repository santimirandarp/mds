import { Matrix } from 'ml-matrix';

import { distance } from 'ml-distance';
/**
 * Distance between vectors. We make use of symmetry.
 * @param data
 * @returns
 */
export function getDissimilaritySquared(data: number[][]) {
  const dataLength = data.length;
  //
  const D: Matrix = new Matrix(dataLength, dataLength);
  for (let i = 0; i < dataLength; i++) {
    //row
    const reference = data[i];
    for (let j = i + 1; j < data.length; j++) {
      //column
      const d = distance.squaredEuclidean(reference, data[j]);
      D.set(i, j, d);
      D.set(j, i, d);
    }
    D.set(i, i, 0);
  }
  return D;
}
