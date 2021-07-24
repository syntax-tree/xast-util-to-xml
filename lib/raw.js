/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Raw} Raw
 */

import {text} from './text.js'

/**
 * Serialize a (non-standard) raw.
 *
 * @type {Handle}
 * @param {Raw} node
 */
export function raw(node, ctx) {
  // @ts-expect-error Looks like a text.
  return ctx.dangerous ? node.value : text(node)
}
