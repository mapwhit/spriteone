const assert = require('node:assert');
const test = require('node:test');
const { grid } = require('../lib/layout');

test('grid', function () {
  const expectedLayout = {
    a: { width: 5, height: 7, x: 0, y: 0, pixelRatio: 1 },
    b: { width: 5, height: 7, x: 5, y: 0, pixelRatio: 1 },
    c: { width: 5, height: 7, x: 10, y: 0, pixelRatio: 1 },
    d: { width: 5, height: 7, x: 0, y: 7, pixelRatio: 1 },
    e: { width: 5, height: 7, x: 5, y: 7, pixelRatio: 1 }
  };
  const expectedDim = {
    width: 15,
    height: 14
  };

  const result = grid([{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }], {
    dim: { width: 5, height: 7 },
    columns: 3
  });

  assert.deepEqual(result.layout, expectedLayout);
  assert.deepEqual(result.dim, expectedDim);
});
