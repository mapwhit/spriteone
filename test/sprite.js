import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sprite from '../lib/sprite.js';

test('empty', async () => {
  const layout = {
    dim: { width: 1, height: 1 },
    layout: {}
  };
  const result = await sprite([], layout);
  assert.ok(Buffer.isBuffer(result));
});

test('simple', async t => {
  const images = [
    {
      id: 'r',
      svg: `
        <svg width="50" height="40">
          <rect width="25" height="35" x="5" y="5" fill="green" />
        </svg>
      `
    },
    {
      id: 'c',
      svg: `
        <svg width="50" height="40">
          <circle cx="20" cy="15" r="12" fill="red" />
        </svg>
      `
    }
  ].map(({ id, svg }) => ({ id, img: Buffer.from(svg) }));

  const layout = {
    dim: { width: 100, height: 100 },
    layout: {
      r: { x: 10, y: 20 },
      c: { x: 50, y: 40 }
    }
  };

  await t.test('png', async () => {
    const result = await sprite(images, layout);
    const expected = await readFile(path.resolve(import.meta.dirname, 'fixtures/simple.png'));
    assert.ok(Buffer.isBuffer(result));
    assert.equal(Buffer.compare(result, expected), 0, 'should be equal to reference image');
  });

  await t.test('webp', async () => {
    const result = await sprite(images, { ...layout, format: 'webp' });
    const expected = await readFile(path.resolve(import.meta.dirname, 'fixtures/simple.webp'));
    assert.ok(Buffer.isBuffer(result));
    assert.equal(Buffer.compare(result, expected), 0, 'should be equal to reference image');
  });
});
