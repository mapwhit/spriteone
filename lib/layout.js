
const ShelfPack = require('@mapbox/shelf-pack');

module.exports = {
  grid,
  pack,
  scale,
};

function pack(imgs) {
  const items = imgs.map(({ id, dim }) => ({
    id,
    width: dim.width,
    height: dim.height
  })).sort(heightAscThanNameComparator);

  const sprite = new ShelfPack(1, 1, { autoResize: true });
  sprite.pack(items, { inPlace: true });

  const layout = Object.fromEntries(
    items.map(item => [item.id, extract(item)]).sort(keyComparator)
  );

  return {
    layout,
    dim: {
      width: sprite.w,
      height: sprite.h
    }
  };

  function extract({ width, height, x, y }) {
    return { width, height, x, y, pixelRatio: 1 };
  }
}

function grid(imgs, { dim, columns = 12 }) {
  const rows = Math.ceil(imgs.length / columns);
  const { width, height } = dim;
  const totalDim = {
    width: columns * width,
    height: rows * height
  };

  let left = 0, top = 0;

  const entries = imgs.map(({ id }) => {
    const x = left;
    const y = top;
    left += width;
    if (left >= totalDim.width) {
      left = 0;
      top += height;
    }
    return [id, {
      width,
      height,
      x,
      y,
      pixelRatio: 1
    }];
  });

  return {
    dim: totalDim,
    layout: Object.fromEntries(entries)
  };
}

function scale(spriteLayout, scale) {
  if (scale === 1) {
    return spriteLayout;
  }
  const { dim, layout } = spriteLayout;
  return {
    dim: resize(dim),
    layout: mapValues(layout, resize)
  };

  function resize(o) {
    return mapValues(o, v => scale * v);
  }

  // create new object by mapping values of the source object
  function mapValues(source, mapFn, thisArg) {
    return Object.fromEntries(
      Object
        .entries(source)
        .map(
          ([k, v], index) => [k, mapFn.call(thisArg, v, index)]
        )
    );
  }
}

function heightAscThanNameComparator(a, b) {
  return (b.height - a.height) || ((a.id === b.id) ? 0 : (a.id < b.id ? -1 : 1));
}

function keyComparator([a], [b]) {
  return a === b ? 0 : (a < b ? -1 : 1);
}
