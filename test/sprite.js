const test = require('tape');
const mapwhitSprite = require('..');

test('mapwhit-sprite must have at least one test', function (t) {
  mapwhitSprite();
  t.fail('Need to write tests.');
  t.end();
});
