import {escape} from './util-escape.js'

var subset = ['\t', '\n', ' ', '"', '&', "'", '/', '<', '=', '>']

export function name(value) {
  return escape(value, subset)
}
