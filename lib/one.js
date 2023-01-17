/**
 * @typedef {import('xast').Root} Root
 * @typedef {import('xast').RootChildMap} RootChildMap
 * @typedef {import('./index.js').State} State
 */

/**
 * @typedef {Root | RootChildMap[keyof RootChildMap]} Node
 */

import {all} from './all.js'
import {element} from './element.js'
import {text} from './text.js'
import {comment} from './comment.js'
import {doctype} from './doctype.js'
import {instruction} from './instruction.js'
import {cdata} from './cdata.js'
import {raw} from './raw.js'

const own = {}.hasOwnProperty

const handlers = {
  root: all,
  element,
  text,
  comment,
  doctype,
  instruction,
  cdata,
  raw
}

/**
 * Serialize a node.
 *
 * @param {Node} node
 *   xast node.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized XML.
 */
export function one(node, state) {
  const type = node && node.type

  if (!type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, type)) {
    throw new Error('Cannot compile unknown node `' + type + '`')
  }

  const handle = handlers[type]
  // @ts-expect-error hush, node matches `type`.
  const result = handle(node, state)

  return result
}
