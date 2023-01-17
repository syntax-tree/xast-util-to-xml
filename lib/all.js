/**
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('xast').Root} Root
 * @typedef {import('xast').RootChildMap} RootChildMap
 * @typedef {import('./index.js').State} State
 */

/**
 * @typedef {Root | RootChildMap[keyof RootChildMap]} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 * @typedef {Parent['children'][number]} Child
 */

import {one} from './one.js'

/**
 * Serialize all children of `parent`.
 *
 * @param {Parent} parent
 *   xast parent node.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized XML.
 */
export function all(parent, state) {
  /** @type {Array<Child>} */
  const children = (parent && parent.children) || []
  let index = -1
  /** @type {Array<string>} */
  const results = []

  while (++index < children.length) {
    results[index] = one(children[index], state)
  }

  return results.join('')
}
