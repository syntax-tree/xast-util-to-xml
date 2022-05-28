import {stringifyEntitiesLight} from 'stringify-entities'

// eslint-disable-next-line no-control-regex
const noncharacter = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g

/**
 * Escape a string.
 *
 * @param {string} value
 * @param {Array<string>} subset
 * @param {RegExp} [unsafe]
 * @returns {string}
 */
export function escape(value, subset, unsafe) {
  const result = clean(value)

  return unsafe ? result.replace(unsafe, encode) : encode(result)

  /**
   * @param {string} $0
   * @returns {string}
   */
  function encode($0) {
    return stringifyEntitiesLight($0, {subset})
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function clean(value) {
  return String(value || '').replace(noncharacter, '')
}
