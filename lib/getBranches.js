'use strict'

const cp = require('./cp')

/*
 * Get all remote branches by name
 * Returns a promise
 */
module.exports = (options) => cp('git ls-remote --heads', options).then((lines) => lines
  .map((b) => b.split(/\t/)[1].replace('refs/heads/', ''))
)
