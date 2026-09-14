const sprite = require('./lib/sprite.js');
const layout = require('./lib/layout.js');

module.exports = {
  sprite,
  layout,
  pack: makePack,
  grid: makeGrid
};

async function makePack(imgs, opts = {}) {
  const pack = layout.pack(imgs);
  return {
    sprite: await sprite.render(imgs, { ...opts, ...pack }),
    layout: pack
  };
}

async function makeGrid(imgs, { dim, columns, ...opts }) {
  const grid = layout.grid(imgs, { dim, columns });
  return {
    sprite: await sprite.render(imgs, { ...opts, ...grid }),
    layout: grid
  };
}
