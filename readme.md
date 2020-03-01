# xast-util-to-xml

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[xast][]** utility to serialize to XML.

## Install

[npm][]:

```sh
npm install xast-util-to-xml
```

## Use

```js
var u = require('unist-builder')
var x = require('xastscript')
var toXml = require('xast-util-to-xml')

var tree = u('root', [
  u('instruction', {name: 'xml'}, 'version="1.0" encoding="utf-8"'),
  u('text', '\n'),
  x('ncx', {xmlns: 'http://www.daisy.org/z3986/2005/ncx/', version: '2005-1'}, [
    u('text', '\n  '),
    x('head', [
      u('text', '\n    '),
      x('meta', {name: 'dtb:uid', content: 'urn:isbn:9781234567891'}),
      u('text', '\n  ')
    ]),
    u('text', '\n  '),
    x('docTitle', [x('text', 'A Christmas Carol')]),
    u('text', '\n  '),
    x('docAuthor', [x('text', 'Charles Dickens')]),
    u('text', '\n')
  ])
])

console.log(toXml(tree))
```

Yields:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:isbn:9781234567891"></meta>
  </head>
  <docTitle><text>A Christmas Carol</text></docTitle>
  <docAuthor><text>Charles Dickens</text></docAuthor>
</ncx>
```

## API

### `toXml(tree[, options])`

Serialize the given **[xast][]** *[tree][]* (or list of nodes).

###### `options.quote`

Preferred quote to use (`'"'` or `'\''`, default: `'"'`).

###### `options.quoteSmart`

Use the other quote if that results in less bytes (`boolean`, default: `false`).

###### `options.closeEmptyElements`

Close elements without any content with slash (`/`) on the opening tag
instead of an end tag: `<circle />` instead of `<circle></circle>` (`boolean`,
default: `false`).
See `tightClose` to control whether a space is used before the slash.

###### `options.tightClose`

Do not use an extra space when closing self-closing elements: `<circle/>`
instead of `<circle />` (`boolean`, default: `false`).

###### `options.allowDangerousXml`

Allow `raw` nodes and insert them as raw XML.
When falsey, encodes `raw` nodes (`boolean`, default: `false`).
**Note**: Only set this if you completely trust the content.

## Security

XML can be a dangerous language: don’t trust user-provided data.

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/xast-util-to-xml.svg

[build]: https://travis-ci.org/syntax-tree/xast-util-to-xml

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/xast-util-to-xml.svg

[coverage]: https://codecov.io/github/syntax-tree/xast-util-to-xml

[downloads-badge]: https://img.shields.io/npm/dm/xast-util-to-xml.svg

[downloads]: https://www.npmjs.com/package/xast-util-to-xml

[size-badge]: https://img.shields.io/bundlephobia/minzip/xast-util-to-xml.svg

[size]: https://bundlephobia.com/result?p=xast-util-to-xml

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[tree]: https://github.com/syntax-tree/unist#tree

[xast]: https://github.com/syntax-tree/xast
