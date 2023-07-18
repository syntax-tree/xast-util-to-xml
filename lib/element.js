/**
 * @typedef {import('xast').Element} Element
 * @typedef {import('./index.js').State} State
 */

import {name} from './name.js'
import {all} from './one.js'
import {value} from './value.js'

const own = {}.hasOwnProperty

/**
 * Serialize an element.
 *
 * @param {Element} node
 *   xast element node.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized XML.
 */
export function element(node, state) {
  const nodeName = name(node.name)
  const content = all(node, state)
  const attributes = node.attributes || {}
  const close = content ? false : state.options.closeEmptyElements
  /** @type {Array<string>} */
  const attrs = []
  /** @type {string} */
  let key

  for (key in attributes) {
    if (own.call(attributes, key)) {
      const result = attributes[key]

      if (result !== null && result !== undefined) {
        attrs.push(name(key) + '=' + value(result, state))
      }
    }
  }

  return (
    '<' +
    nodeName +
    (attrs.length === 0 ? '' : ' ' + attrs.join(' ')) +
    (close ? (state.options.tightClose ? '' : ' ') + '/' : '') +
    '>' +
    content +
    (close ? '' : '</' + nodeName + '>')
  )
}
