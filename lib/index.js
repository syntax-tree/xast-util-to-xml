/**
 * @typedef {import('xast').Root} Root
 * @typedef {import('xast').Element} Element
 * @typedef {import('xast').Cdata} Cdata
 * @typedef {import('xast').Comment} Comment
 * @typedef {import('xast').Doctype} Doctype
 * @typedef {import('xast').Instruction} Instruction
 * @typedef {import('xast').Text} Text
 * @typedef {import('xast').Literal & {type: 'raw'}} Raw
 * @typedef {Root|Element} Parent
 * @typedef {import('xast').Attributes} Attributes
 * @typedef {Root['children'][number]} Child
 * @typedef {Child|Root} Node
 *
 * @typedef {'"'|"'"} Quote
 *
 * @typedef Options
 * @property {Quote} [quote='"'] Preferred quote to use
 * @property {boolean} [quoteSmart=false] Use the other quote if that results in
 *   less bytes
 * @property {boolean} [closeEmptyElements=false] Close elements without any
 *   content with slash (/) on the opening tag instead of an end tag:
 *   `<circle />` instead of `<circle></circle>`.
 *   See `tightClose` to control whether a space is used before the slash.
 * @property {boolean} [tightClose=false] Do not use an extra space when closing
 *    self-closing elements: `<circle/>` instead of `<circle />`.
 * @property {boolean} [allowDangerousXml=false] Allow `raw` nodes and insert
 *   them as raw XML. When falsey, encodes `raw` nodes.
 *   Only set this if you completely trust the content!
 *
 * @typedef Context
 * @property {Quote} quote
 * @property {Quote|undefined} alternative
 * @property {boolean} close
 * @property {boolean} tight
 * @property {boolean} dangerous
 *
 * @callback Handle
 * @param {Node} node
 * @param {Context} context
 * @returns {string}
 */

import {one} from './one.js'

/**
 * Serialize the given xast tree (or list of nodes).
 *
 * @param {Node|Array<Node>} node
 * @param {Options} [options]
 * @returns {string}
 */
export function toXml(node, options = {}) {
  const quote = options.quote || '"'
  /** @type {Quote} */
  const alternative = quote === '"' ? "'" : '"'
  const smart = options.quoteSmart
  /** @type {Node} */
  // @ts-expect-error Assume no `root` in `node`.
  const value = Array.isArray(node) ? {type: 'root', children: node} : node

  if (quote !== '"' && quote !== "'") {
    throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
  }

  return one(value, {
    dangerous: options.allowDangerousXml || false,
    close: options.closeEmptyElements || false,
    tight: options.tightClose || false,
    quote,
    alternative: smart ? alternative : undefined
  })
}
