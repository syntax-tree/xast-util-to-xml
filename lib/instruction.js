/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Instruction} Instruction
 */

import {escape} from './util-escape.js'
import {name} from './name.js'

var unsafe = /\?>/g
var subset = ['>']

/**
 * Serialize an instruction.
 *
 * @type {Handle}
 * @param {Instruction} node
 */
export function instruction(node) {
  var nodeName = name(node.name) || 'x'
  var result = escape(node.value, subset, unsafe)
  return '<?' + nodeName + (result ? ' ' + result : '') + '?>'
}
