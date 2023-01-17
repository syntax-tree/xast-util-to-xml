/**
 * @typedef {import('xast').Literal} Literal
 * @typedef {import('xast').Root} Root
 * @typedef {import('xast').RootChildMap} RootChildMap
 */

/**
 * @typedef {Literal & {type: 'raw'}} Raw
 * @typedef {Root | RootChildMap[keyof RootChildMap]} Node
 *
 * @typedef {'"' | "'"} Quote
 *   XML quotes for attribute values.
 *
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [allowDangerousXml=false]
 *   Allow `raw` nodes and insert them as raw XML.
 *
 *   When `false`, `Raw` nodes are encoded.
 *
 *   > ⚠️ **Danger**: only set this if you completely trust the content.
 * @property {boolean | null | undefined} [closeEmptyElements=false]
 *   Close elements without any content with slash (`/`) on the opening tag
 *   instead of an end tag: `<circle />` instead of `<circle></circle>`.
 *
 *   See `tightClose` to control whether a space is used before the slash.
 * @property {Quote | null | undefined} [quote='"']
 *   Preferred quote to use.
 * @property {boolean | null | undefined} [quoteSmart=false]
 *   Use the other quote if that results in less bytes.
 * @property {boolean | null | undefined} [tightClose=false]
 *   Do not use an extra space when closing self-closing elements: `<circle/>`
 *   instead of `<circle />`.
 *
 *   > 👉 **Note**: only used if `closeEmptyElements: true`.
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
 * @param {Node | Array<Node>} node
 *   xast node(s) to serialize.
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {string}
 *   Serialized XML.
 */
export function toXml(node, options) {
  /** @type {Node} */
  // @ts-expect-error Assume no `root` in `node`.
  const value = Array.isArray(node) ? {type: 'root', children: node} : node

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

  return one(value, state)
}
