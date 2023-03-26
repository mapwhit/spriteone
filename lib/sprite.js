const sharp = require('sharp');

module.exports = {
  render
};

async function render(items, { dim, layout }) {
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

  async function convert({ id, img }) {
    const { x, y } = layout[id];
    return {
      left: x,
      top: y,
      input: await sharp(img).png().toBuffer()
    };
  }
}
