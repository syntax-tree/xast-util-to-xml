/**
 * @typedef {import('./index.js').Context} Context
 */

import {ccount} from 'ccount'
import {escape} from './util-escape.js'

/**
 * Serialize an attribute value.
 *
 * @param {string} value
 * @param {Context} ctx
 * @returns {string}
 */
export function value(value, ctx) {
  var primary = ctx.quote
  var secondary = ctx.alternative
  var result = String(value)
  var quote =
    secondary && ccount(result, primary) > ccount(result, secondary)
      ? secondary
      : primary

  return quote + escape(result, ['<', '&', quote]) + quote
}
