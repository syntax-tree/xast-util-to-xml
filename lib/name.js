import {escape} from './util-escape.js'

const subset = ['\t', '\n', ' ', '"', '&', "'", '/', '<', '=', '>']

/**
 * Encode a node name.
 *
 * @param {string} value
 *   Raw name.
 * @returns {string}
 *   Escaped name.
 */
export function name(value) {
  return escape(value, subset)
}
