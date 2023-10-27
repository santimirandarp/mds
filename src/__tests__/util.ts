import { Matrix } from 'ml-matrix';
import { expect } from 'vitest';

export function assertResult(
  solution: number[][],
  ourResult: Matrix,
  numDigits = 5,
) {
  for (let i = 0; i < solution.length; i++) {
    for (let j = 0; j < solution[0].length; j++) {
      expect(ourResult.get(i, j)).toBeCloseTo(solution[i][j], numDigits);
    }
  }
}
