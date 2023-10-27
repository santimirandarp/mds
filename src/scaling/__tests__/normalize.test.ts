import { MultidimensionalScaling } from '../..';
import { assertResult } from '../../__tests__/util';
import { describe, it, expect } from 'vitest';
describe('normalize', () => {
  const juliaSolution = [
    [39.11642815324482, 27.6616175064927],
    [-6.32532221830131, 0.06599336086538847],
    [-57.36436066574322, 4.88479677699189],
    [24.573254730799857, -32.612407644349936],
  ];
  const data = [
    [0, 30, 99, 62],
    [30, 0, 15, 6],
    [99, 15, 0, 90],
    [62, 6, 90, 0],
  ];
  const ourSolution = new MultidimensionalScaling(data, 2, {
    calculateDissimilarity: false,
  });
  const strain = 0.5425065460960513;
  it('normalize', () => {
    //normalise julia data
    let min1 = Infinity;
    let max1 = -Infinity;
    let min2 = Infinity;
    let max2 = -Infinity;

    assertResult(juliaSolution, ourSolution.coordinatesMatrix, 6);
    // expect(ourSolution.strain()).toBeCloseTo(strain, 6);

    const normalized = ourSolution.normalize();
    juliaSolution.forEach((row) => {
      if (row[0] < min1) {
        min1 = row[0];
      }
      if (row[0] > max1) {
        max1 = row[0];
      }
      if (row[1] < min2) {
        min2 = row[1];
      }
      if (row[1] > max2) {
        max2 = row[1];
      }
    });

    const normalizeJulia = juliaSolution.map((row) =>
      row.map((val, i) =>
        i % 2 == 0
          ? (val - min1) / (max1 - min1)
          : (val - min2) / (max2 - min2),
      ),
    );
    console.log(normalizeJulia, normalized);
    assertResult(normalizeJulia, normalized, 6);
  });
  it('normalize with zeros', () => {
    ourSolution.coordinatesMatrix = ourSolution.coordinatesMatrix.setColumn(
      0,
      [3, 3, 3, 3],
    );
    expect(
      ourSolution.normalize().getColumnVector(0).to1DArray(),
    ).toStrictEqual([0, 0, 0, 0]);
  });
});
