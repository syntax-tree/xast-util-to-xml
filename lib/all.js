'use strict'

var one = require('./one')

module.exports = all

// Serialize all children of `parent`.
function all(parent, config) {
  var children = parent && parent.children
  var length = children && children.length
  var index = -1
  var results = []

  while (++index < length) {
    results[index] = one(children[index], config)
  }

  return results.join('')
}
