# mds

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Classic Multidimensional Scaling aka Principal Coordinate Analysis (PCoA).

Get the Senate vote-patterns down to a nice 2D plot.

## Installation

`$ npm i ml-mds`

## Usage

```js
import { MultidimensionalScaling as MDS } from 'ml-mds';

const result = new MDS(data, dimension, options);

// some methods and properties
const d = result.dimension; // dimension of the output space
const error = result.strain(); // stress of the solution
const up = result.scaleUp(n); // `n` either number or array !
const down = result.scaleDown(n); // same
```

## Basic API Description

- `data` is an array of arrays. There are two cases:

  - Pass the distances between pair of points.
    In this case we are passing a dissimilarity/distance matrix. Which is the default.
  - Pass the raw data. It needs the option `calculateDissimilarity:true`.

- `dimension` is the dimension of the output space. It may be less depending on the EigenValues, you can inspect it using `result.dimensions`.

- `options` is an object currently only with the option `calculateDissimilarity` which is `false` by default, as described previously.

## Idea of Multidimensional Scaling

> Given a distance matrix with the distances between each pair of objects in a set, and a chosen number of dimensions, N, an MDS algorithm places each object into N-dimensional space (a lower-dimensional representation) such that the between-object distances are preserved as well as possible. For N = 1, 2, and 3, the resulting points can be visualized on a scatter plot.

[Source: Wikipedia - MDS](https://en.wikipedia.org/wiki/Multidimensional_scaling)


[Source: Towards Data Science - MDS](https://towardsdatascience.com/multidimensional-scaling-d84c2a998f72)

## [Documentation](https://mljs.github.io/mds/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-mds.svg
[npm-url]: https://www.npmjs.com/package/ml-mds
[ci-image]: https://github.com/mljs/mds/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/mds/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/mds.svg
[codecov-url]: https://codecov.io/gh/mljs/mds
[download-image]: https://img.shields.io/npm/dm/ml-mds.svg
[download-url]: https://www.npmjs.com/package/ml-mds
