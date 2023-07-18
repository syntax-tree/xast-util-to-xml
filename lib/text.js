/**
 * @typedef {import('xast').Text} Text
 * @typedef {import('../index.js').Raw} Raw
 */

import {escape} from './util-escape.js'

const subset = ['&', '<']

/**
 * Serialize a text.
 *
 * @param {Raw | Text} node
 *   xast text node (or raw).
 * @returns {string}
 *   Serialized XML.
 */
export function text(node) {
  return escape(node.value, subset)
}
