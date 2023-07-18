/**
 * @typedef {import('xast').Literal} Literal
 * @typedef {import('xast').Nodes} Nodes
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [allowDangerousXml=false]
 *   Allow `raw` nodes and insert them as raw XML (default: `false`).
 *
 *   When `false`, `Raw` nodes are encoded.
 *
 *   > ⚠️ **Danger**: only set this if you completely trust the content.
 * @property {boolean | null | undefined} [closeEmptyElements=false]
 *   Close elements without any content with slash (`/`) on the opening tag
 *   instead of an end tag: `<circle />` instead of `<circle></circle>`
 *   (default: `false`).
 *
 *   See `tightClose` to control whether a space is used before the slash.
 * @property {Quote | null | undefined} [quote='"']
 *   Preferred quote to use (default: `'"'`).
 * @property {boolean | null | undefined} [quoteSmart=false]
 *   Use the other quote if that results in less bytes (default: `false`).
 * @property {boolean | null | undefined} [tightClose=false]
 *   Do not use an extra space when closing self-closing elements: `<circle/>`
 *   instead of `<circle />` (default: `false`).
 *
 *   > 👉 **Note**: only used if `closeEmptyElements: true`.
 *
 * @typedef {'"' | "'"} Quote
 *   XML quotes for attribute values.
 *
 * @typedef {Literal & {type: 'raw'}} Raw
 *   To do: improved `Raw` type?
 *
 *
 * @typedef State
 *   Info passed around about the current state.
 * @property {Options} options
 *   Configuration.
 */

import {one} from './one.js'

/**
 * Serialize a xast tree to XML.
 *
 * @param {Array<Nodes> | Nodes} tree
 *   xast node(s) to serialize.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Serialized XML.
 */
export function toXml(tree, options) {
  /** @type {State} */
  const state = {options: options || {}}

  // Make sure the quote is valid.
  if (
    typeof state.options.quote === 'string' &&
    state.options.quote !== '"' &&
    state.options.quote !== "'"
  ) {
    throw new Error(
      'Invalid quote `' + state.options.quote + '`, expected `\'` or `"`'
    )
  }

  /** @type {Nodes} */
  // @ts-expect-error Assume no `root` in `node`.
  const node = Array.isArray(tree) ? {type: 'root', children: tree} : tree

  return one(node, state)
}
