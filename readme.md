# xast-util-to-xml

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[xast][] utility to serialize as XML.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`toXml(tree[, options])`](#toxmltree-options)
    *   [`Options`](#options)
    *   [`Quote`](#quote-1)
    *   [`Raw`](#raw)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that turns a xast tree into a string of XML.

## When should I use this?

You can use this utility when you want to get the serialized XML that is
represented by the syntax tree, either because you’re done with the syntax tree,
or because you’re integrating with another tool that does not support syntax
trees.

This utility has options to configure how the XML is serialized.
These options help when building tools that make output pretty (such as
formatters) or ugly (such as minifiers).

The utility [`xast-util-from-xml`][xast-util-from-xml] does the inverse of this
utility.
It turns XML into xast.

The utility [`hast-util-to-html`][hast-util-to-html] does the same as this
utility but for HTML: it turns [hast][] into HTML.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install xast-util-to-xml
```

In Deno with [`esm.sh`][esmsh]:

```js
import {toXml} from 'https://esm.sh/xast-util-to-xml@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {toXml} from 'https://esm.sh/xast-util-to-xml@3?bundle'
</script>
```

## Use

```js
import {u} from 'unist-builder'
import {x} from 'xastscript'
import {toXml} from 'xast-util-to-xml'

const tree = u('root', [
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

This package exports the identifier [`toXml`][api-to-xml].
There is no default export.

### `toXml(tree[, options])`

Serialize a xast tree to XML.

###### Parameters

*   `tree` ([`Array<Node>`][node] or `Node`)
    — xast node(s) to serialize
*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Serialized XML (`string`).

### `Options`

Configuration (TypeScript type).

##### Fields

###### `allowDangerousXml`

Allow `raw` nodes and insert them as raw XML (`boolean`, default: `false`).

When `false`, `Raw` nodes are encoded.

> ⚠️ **Danger**: only set this if you completely trust the content.

###### `closeEmptyElements`

Close elements without any content with slash (`/`) on the opening tag instead
of an end tag: `<circle />` instead of `<circle></circle>` (`boolean`, default:
`false`).

See `tightClose` to control whether a space is used before the slash.

###### `quote`

Preferred quote to use ([`Quote`][api-quote], default: `'"'`).

###### `quoteSmart`

Use the other quote if that results in less bytes (`boolean`, default:
`false`).

###### `tightClose`

Do not use an extra space when closing self-closing elements: `<circle/>`
instead of `<circle />` (`boolean`, default: `false`).

> 👉 **Note**: only used if `closeEmptyElements: true`.

### `Quote`

XML quotes for attribute values (TypeScript type).

###### Type

```ts
type Quote = '"' | "'"
```

### `Raw`

Raw (TypeScript type).

###### Type

```ts
import type {Data, Literal} from 'xast'

interface Raw extends Literal {
  type: 'raw'
  data?: RawData | undefined
}

export interface RawData extends Data {}
```

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Options`][api-options], [`Quote`][api-quote],
and [`Raw`][api-raw].

It also registers the node type with `@types/xast`.
If you’re working with the syntax tree, make sure to import this utility
somewhere in your types, as that registers the new node types in the tree.

```js
/**
 * @typedef {import('xast-util-to-xml')}
 */

import {visit} from 'unist-util-visit'

/** @type {import('xast').Root} */
const tree = getXastNodeSomeHow()

visit(tree, function (node) {
  // `node` can now be a raw node.
})
```

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `xast-util-to-xml@^3`,
compatible with Node.js 12.

## Security

XML can be a dangerous language: don’t trust user-provided data.

## Related

*   [`xast-util-from-xml`](https://github.com/syntax-tree/xast-util-from-xml)
    — parse from xml
*   [`hast-util-to-xast`](https://github.com/syntax-tree/hast-util-to-xast)
    — transform hast (html, svg) to xast (xml)
*   [`xastscript`](https://github.com/syntax-tree/xastscript)
    — create xast trees

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/xast-util-to-xml/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/xast-util-to-xml/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/xast-util-to-xml.svg

[coverage]: https://codecov.io/github/syntax-tree/xast-util-to-xml

[downloads-badge]: https://img.shields.io/npm/dm/xast-util-to-xml.svg

[downloads]: https://www.npmjs.com/package/xast-util-to-xml

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=xast-util-to-xml

[size]: https://bundlejs.com/?q=xast-util-to-xml

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[xast]: https://github.com/syntax-tree/xast

[node]: https://github.com/syntax-tree/xast#nodes

[hast]: https://github.com/syntax-tree/hast

[xast-util-from-xml]: https://github.com/syntax-tree/xast-util-from-xml

[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html

[api-to-xml]: #toxmltree-options

[api-options]: #options

[api-quote]: #quote-1

[api-raw]: #raw
