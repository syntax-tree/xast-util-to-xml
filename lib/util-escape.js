import {stringifyEntitiesLight} from 'stringify-entities'

var noncharacter = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g

export function escape(value, subset, unsafe) {
  var result = clean(value)

  return unsafe ? result.replace(unsafe, encode) : encode(result)

  function encode($0) {
    return stringifyEntitiesLight($0, {subset})
  }
}

function clean(value) {
  return String(value || '').replace(noncharacter, '')
}
