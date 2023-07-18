import {stringifyEntitiesLight} from 'stringify-entities'

// eslint-disable-next-line no-control-regex -- XO is wrong.
const noncharacter = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g

/**
 * Escape a string.
 *
 * @param {string} value
 *   Raw string.
 * @param {Array<string>} subset
 *   Characters to escape.
 * @param {RegExp | null | undefined} [unsafe]
 *   Regex to scope `subset` to (optional).
 * @returns {string}
 *   Escaped string.
 */
export function escape(value, subset, unsafe) {
  const result = clean(value)

  return unsafe ? result.replace(unsafe, encode) : encode(result)

  /**
   * Actually escape characters.
   *
   * @param {string} value
   *   Raw value.
   * @returns {string}
   *   Copy of `value`, escaped.
   */
  function encode(value) {
    return stringifyEntitiesLight(value, {subset})
  }
}

/**
 * Remove non-characters.
 *
 * @param {string} value
 *   Raw value.
 * @returns {string}
 *   Copy of `value` with non-characters removed.
 */
function clean(value) {
  return String(value || '').replace(noncharacter, '')
}
