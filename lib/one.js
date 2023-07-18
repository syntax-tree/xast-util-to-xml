/**
 * @typedef {import('xast').Nodes} Nodes
 * @typedef {import('xast').Parents} Parents
 * @typedef {import('xast').RootContent} RootContent
 * @typedef {import('./index.js').State} State
 */

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
 * @param {Nodes} node
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

/**
 * Serialize all children of `parent`.
 *
 * @param {Parents} parent
 *   xast parent node.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized XML.
 */
export function all(parent, state) {
  /** @type {Array<RootContent>} */
  const children = (parent && parent.children) || []
  let index = -1
  /** @type {Array<string>} */
  const results = []

  while (++index < children.length) {
    results[index] = one(children[index], state)
  }

  return results.join('')
}
