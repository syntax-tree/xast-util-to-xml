/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Cdata} Cdata
 */

import {escape} from './util-escape.js'

var unsafe = /]]>/g
var subset = ['>']

/**
 * Serialize a CDATA section.
 *
 * @type {Handle}
 * @param {Cdata} node
 */
export function cdata(node) {
  return '<![CDATA[' + escape(node.value, subset, unsafe) + ']]>'
}
