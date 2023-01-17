/**
 * @typedef {import('xast').Comment} Comment
 */

import {escape} from './util-escape.js'

/**
 * Serialize a comment.
 *
 * @param {Comment} node
 *   xast comment node.
 * @returns {string}
 *   Serialized XML.
 */
export function comment(node) {
  return '<!--' + escape(node.value, ['-']) + '-->'
}
