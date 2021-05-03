import {escape} from './util-escape.js'

var subset = ['\t', '\n', ' ', '"', '&', "'", '/', '<', '=', '>']

/**
 * Serialize a node name.
 *
 * @param {string} value
 * @returns {string}
 */
export function name(value) {
  return escape(value, subset)
}
