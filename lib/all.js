/**
 * @typedef {import('./index.js').Parent} Parent
 * @typedef {import('./index.js').Context} Context
 * @typedef {import('./index.js').Child} Child
 */

import {one} from './one.js'

/**
 * Serialize all children of `parent`.
 *
 * @param {Parent} parent
 * @param {Context} ctx
 * @returns {string}
 *
 */
export function all(parent, ctx) {
  /** @type {Array.<Child>} */
  var children = (parent && parent.children) || []
  var index = -1
  /** @type {Array.<string>} */
  var results = []

  while (++index < children.length) {
    results[index] = one(children[index], ctx)
  }

  return results.join('')
}
