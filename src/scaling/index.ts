import { type MultidimensionalScaling } from '..';

/**
 * Scale the coordinates.
 * @param by - Either a number or a column vector of the same length as the number of rows in the coordinates matrix.
 * It divides each row by the corresponding value.
 * @returns
 */
export function scaleDown(
  this: MultidimensionalScaling,
  by: number | number[],
) {
  const coordinatesMatrix = this.coordinatesMatrix.clone();
  if (typeof by === 'number') {
    coordinatesMatrix.div(by);
  } else {
    if (by.length !== coordinatesMatrix.columns) {
      throw new Error(
        'by must be a number or a column vector of the same length as the number of rows in the coordinates matrix.',
      );
    }
    return coordinatesMatrix.divRowVector(by);
  }
  return coordinatesMatrix;
}

export function scaleUp(this: MultidimensionalScaling, by: number | number[]) {
  const coordinatesMatrix = this.coordinatesMatrix.clone();
  if (typeof by === 'number') {
    coordinatesMatrix.mul(by);
  } else {
    if (by.length !== coordinatesMatrix.columns) {
      throw new Error(
        'by must be a number or a column vector of the same length as the number of rows in the coordinates matrix.',
      );
    }
    return coordinatesMatrix.mulRowVector(by);
  }
  return coordinatesMatrix;
}
/**
 * Performs a simple normalization for each column, between 0 and 1.
 * As in (column_vector - col_min) / (col_max - col_min)
 * If min and max are equal, returns the original matrix.
 * @returns The coordinates matrix normalized between 0 and 1.
 */
export function normalize(this: MultidimensionalScaling) {
  const coordinatesMatrix = this.coordinatesMatrix.clone();
  for (let i = 0; i < coordinatesMatrix.columns; i++) {
    const column = coordinatesMatrix.getColumnVector(i);
    const max = column.max();
    const min = column.min();
    if (max === min) {
      coordinatesMatrix.setColumn(i, column.sub(min));
    } else {
      coordinatesMatrix.setColumn(i, column.sub(min).div(max - min));
    }
  }
  return coordinatesMatrix;
}
