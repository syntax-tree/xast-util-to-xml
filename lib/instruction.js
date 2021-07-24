/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Instruction} Instruction
 */

import {escape} from './util-escape.js'
import {name} from './name.js'

const unsafe = /\?>/g
const subset = ['>']

/**
 * Serialize an instruction.
 *
 * @type {Handle}
 * @param {Instruction} node
 */
export function instruction(node) {
  const nodeName = name(node.name) || 'x'
  const result = escape(node.value, subset, unsafe)
  return '<?' + nodeName + (result ? ' ' + result : '') + '?>'
}
