import {ccount} from 'ccount'
import {escape} from './util-escape.js'

export function value(value, config) {
  var primary = config.quote
  var secondary = config.alternative
  var result = String(value)
  var quote =
    secondary && ccount(result, primary) > ccount(result, secondary)
      ? secondary
      : primary

  return quote + escape(result, ['<', '&', quote]) + quote
}
