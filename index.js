import * as layout from './lib/layout.js';
import sprite from './lib/sprite.js';

export { layout, makeGrid as grid, makePack as pack, sprite };

async function makePack(imgs, opts = {}) {
  const pack = layout.pack(imgs);
  return {
    sprite: await sprite(imgs, { ...opts, ...pack }),
    layout: pack
  };
}

async function makeGrid(imgs, { dim, columns, ...opts }) {
  const grid = layout.grid(imgs, { dim, columns });
  return {
    sprite: await sprite(imgs, { ...opts, ...grid }),
    layout: grid
  };
}
