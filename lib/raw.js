/**
 * @typedef {import('../index.js').Raw} Raw
 * @typedef {import('./index.js').State} State
 */

import {text} from './text.js'

/**
 * Serialize a (non-standard) raw.
 *
 * @param {Raw} node
 *   xast raw node.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized XML.
 */
export function raw(node, state) {
  return state.options.allowDangerousXml ? node.value : text(node)
}
