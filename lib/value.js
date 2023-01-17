/**
 * @typedef {import('./index.js').State} State
 */

import {ccount} from 'ccount'
import {escape} from './util-escape.js'

/**
 * Serialize an attribute value.
 *
 * @param {string} value
 *   Raw attribute value.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized attribute value.
 */
export function value(value, state) {
  const result = String(value)
  let quote = state.options.quote || '"'

  if (state.options.quoteSmart) {
    const other = quote === '"' ? "'" : '"'

    if (ccount(result, quote) > ccount(result, other)) {
      quote = other
    }
  }

  return quote + escape(result, ['<', '&', quote]) + quote
}
