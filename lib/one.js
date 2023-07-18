/**
 * @typedef {import('xast').Nodes} Nodes
 * @typedef {import('xast').Parents} Parents
 * @typedef {import('xast').RootContent} RootContent
 * @typedef {import('./index.js').State} State
 */

import {cdata} from './cdata.js'
import {comment} from './comment.js'
import {doctype} from './doctype.js'
import {element} from './element.js'
import {instruction} from './instruction.js'
import {raw} from './raw.js'
import {text} from './text.js'

const own = {}.hasOwnProperty

const handlers = {
  cdata,
  comment,
  doctype,
  element,
  instruction,
  raw,
  root: all,
  text
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
