import { Matrix } from 'ml-matrix';

import { strain } from './loss';
import { mds, MDSOptions } from './mds';
import { scaleDown, scaleUp, normalize } from './scaling';

/**
 * Performs the calculation on instantiation (no need of `fit`)
 * Standard properties are returned (access using dot notation.)
 *
 * The fit minimizes the Strain Loss (least squares minimize SSE loss.)
 */
export class MultidimensionalScaling {
  data: Matrix;
  dimensions: number;
  options: MDSOptions;
  coordinatesMatrix: Matrix;
  symmetricMatrixB: Matrix;
  /**
   * Classic Multidimensional Scaling.
   * @param data - Either the data matrix or the dissimilarity matrix.
   * @param dimensions - The number of dimensions to output (max).
   * @param options - See {@link MDSOptions}.
   * @returns Multidimensional Scaling -  for type info see {@link MultidimensionalScaling}
   */
  constructor(
    data: number[][] | Matrix,
    dimensions: number,
    options: MDSOptions = {},
  ) {
    this.data = Matrix.checkMatrix(data);
    this.options = options;

    if (dimensions > this.data.columns) {
      throw new Error(
        'Cannot have more dimensions than the number of columns in the data.',
      );
    }

    const { X, B, availableDimensions } = mds(this.data, dimensions, options);

    this.dimensions = availableDimensions;
    this.coordinatesMatrix = X;
    this.symmetricMatrixB = B;
  }
  strain = strain;
  scaleDown = scaleDown;
  scaleUp = scaleUp;
  normalize = normalize;
}
