[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @mapwhit/sprite

Create sprite layout and generate sprite based on it.
Heavily inspired by [@mapbox/spritezero] but with simplified API and [sharp] replacing [mapnik].

## Install

```sh
$ npm install --save @mapwhit/spriteone
```

## Usage

To generate sprite from images of various sizes:

```js
const so = require('@mapwhit/spriteone');

const imgs = [
  {
    id: 'id_1',                  // unique id of an image
    img: '/path/to/image.png',   // or a buffer - passed to sharp-object
    dim: { width, height }       // optional - will be computed if not provided
  }
];
const { layout, sprite } = await so.create(imgs);
```

To generate grid sprite (if all the images are that same size):

```js
// or: if all the images have the same size...

const { layout, sprite } = await so.createGrid(
  imgs,
  {
    dim: { width: 10, height: 15 }
  }
);
```

Result is an object with `sprite` and `layout` - `sprite` is an image that can be written to file, and 
the resulting `layout` can be used to generate CSS files etc:

```js
 {
    id_1: { x, y, width, height } 
    id_2: { x, y, width, height } 
    id_3: { x, y, width, height } 
 }
```

## License

ISC © [Damian Krzeminski](https://pirxpilot.me)


[@mapbox/spritezero]: https://npmjs.org/package/@mapbox/spritezero
[sharp]: https://npmjs.org/package/sharp
[mapnik]: https://npmjs.org/package/mapnik

[sharp object]: https://sharp.pixelplumbing.com/api-constructor#sharp

[npm-image]: https://img.shields.io/npm/v/@mapwhit/spriteone
[npm-url]: https://npmjs.org/package/@mapwhit/spriteone

[build-url]: https://github.com/mapwhit/spriteone/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/mapwhit/spriteone/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@mapwhit/spriteone
[deps-url]: https://libraries.io/npm/@mapwhit%2Fspriteone
