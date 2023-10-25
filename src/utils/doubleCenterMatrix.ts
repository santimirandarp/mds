import { Matrix } from 'ml-matrix';
export function doubleCenterMatrix(D: Matrix, dataLength: number) {
  // to be optimized.
  const offDiagonal = -1 / dataLength;
  const diagonal = 1 + offDiagonal;
  const C = Matrix.zeros(dataLength, dataLength);
  for (let i = 0; i < dataLength; i++) {
    for (let j = i+1; j < dataLength; j++) {
      C.set(i, j, offDiagonal);
      C.set(j, i, offDiagonal);
    }
    C.set(i, i, diagonal);
  }
  return C.mmul(D)
    .mmul(C)
    .div(-1 / 2);
}
