/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Comment} Comment
 */

import {escape} from './util-escape.js'

/**
 * Serialize a comment.
 *
 * @type {Handle}
 * @param {Comment} node
 */
export function comment(node) {
  return '<!--' + escape(node.value, ['-']) + '-->'
}
