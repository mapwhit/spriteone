const sharp = require('sharp');

module.exports = {
  render
};

async function render(items, { dim, layout, resize: resizeAll, format = 'png' }) {
  return sharp({
    create: {
      width: dim.width,
      height: dim.height,
      channels: 4, // RGBA
      background: 'transparent'
    }
  })
    .composite(await Promise.all(items.map(convert)))
    .toFormat(format)
    .toBuffer();

  async function convert({ id, img, dim, resize = resizeAll }) {
    const { x, y } = layout[id];
    let s = sharp(img);
    if (resize) {
      s.resize(dim);
    }
    return {
      left: x,
      top: y,
      input: await s.toBuffer()
    };
  }
}
