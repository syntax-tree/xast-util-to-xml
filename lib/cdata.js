/**
 * @typedef {import('xast').Cdata} Cdata
 */

import {escape} from './util-escape.js'

const unsafe = /]]>/g
const subset = ['>']

/**
 * Serialize a CDATA section.
 *
 * @param {Cdata} node
 *   xast cdata node.
 * @returns {string}
 *   Serialized XML.
 */
export function cdata(node) {
  return '<![CDATA[' + escape(node.value, subset, unsafe) + ']]>'
}
