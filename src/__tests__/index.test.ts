import { mds } from '../index';

const data = [
  [0, 159, 247, 131, 197],
  [159, 0, 230, 97, 89],
  [247, 230, 0, 309, 317],
  [131, 97, 309, 0, 68],
  [197, 89, 317, 68, 0],
];

console.log(mds(data, 2, { calculateDissimilarity: false }));
