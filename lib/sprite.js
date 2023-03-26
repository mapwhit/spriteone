const sharp = require('sharp');

module.exports = {
  renderSprite,
};

async function renderSprite(items, { dim, layout }) {
  return sharp({
    create: {
      width: dim.width,
      height: dim.height,
      channels: 4, // RGBA
      background: 'transparent'
    }
  })
    .composite(await Promise.all(items.map(convert)))
    .png()
    .toBuffer();

  async function convert({ id, svg }) {
    const { x, y } = layout[id];
    const png = sharp(svg)
      .png();
    return {
      left: x,
      top: y,
      input: await png.toBuffer()
    };
  }
}