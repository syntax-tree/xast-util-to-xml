/**
 * @typedef {import('xast').Instruction} Instruction
 */

import {escape} from './util-escape.js'
import {name} from './name.js'

const unsafe = /\?>/g
const subset = ['>']

/**
 * Serialize an instruction.
 *
 * @param {Instruction} node
 *   xast instruction node.
 * @returns {string}
 *   Serialized XML.
 */
export function instruction(node) {
  const nodeName = name(node.name) || 'x'
  const result = escape(node.value, subset, unsafe)
  return '<?' + nodeName + (result ? ' ' + result : '') + '?>'
}
