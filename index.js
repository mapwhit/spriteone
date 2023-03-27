const sprite = require('./lib/sprite');
const layout = require('./lib/layout');

module.exports = {
  sprite,
  layout,
  pack: makePack,
  grid: makeGrid
};

async function makePack(imgs) {
  const pack = layout.pack(imgs);
  return {
    sprite: await sprite.render(imgs, pack),
    layout: pack
  };
}

async function makeGrid(imgs, params) {
  const grid = layout.grid(imgs, params);
  return {
    sprite: await sprite.render(imgs, grid),
    layout: grid
  };
}
