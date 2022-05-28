/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Element} Element
 * @typedef {import('./index.js').Attributes} Attributes
 */

import {all} from './all.js'
import {name} from './name.js'
import {value} from './value.js'

const own = {}.hasOwnProperty

/**
 * Serialize an element.
 *
 * @type {Handle}
 * @param {Element} node
 */
export function element(node, ctx) {
  const nodeName = name(node.name)
  const content = all(node, ctx)
  /** @type {Attributes} */
  const attributes = node.attributes || {}
  const close = content ? false : ctx.close
  /** @type {Array<string>} */
  const attrs = []
  /** @type {string} */
  let key
  /** @type {Attributes[keyof Attributes]} */
  let result

  for (key in attributes) {
    if (own.call(attributes, key)) {
      result = attributes[key]

      if (result !== null && result !== undefined) {
        attrs.push(name(key) + '=' + value(result, ctx))
      }
    }
  }

  return (
    '<' +
    nodeName +
    (attrs.length === 0 ? '' : ' ' + attrs.join(' ')) +
    (close ? (ctx.tight ? '' : ' ') + '/' : '') +
    '>' +
    content +
    (close ? '' : '</' + nodeName + '>')
  )
}
