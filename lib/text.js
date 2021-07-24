/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Text} Text
 */

import {escape} from './util-escape.js'

const subset = ['&', '<']

/**
 * Serialize a text.
 *
 * @type {Handle}
 * @param {Text} node
 */
export function text(node) {
  return escape(node.value, subset)
}
