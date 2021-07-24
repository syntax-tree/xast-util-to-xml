import {escape} from './util-escape.js'

const subset = ['\t', '\n', ' ', '"', '&', "'", '/', '<', '=', '>']

/**
 * Serialize a node name.
 *
 * @param {string} value
 * @returns {string}
 */
export function name(value) {
  return escape(value, subset)
}
