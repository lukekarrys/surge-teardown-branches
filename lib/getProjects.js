'use strict'

const cp = require('./cp')

/*
 * Get all surge projects
 * Returns a promise
 */
module.exports = (options) => cp('surge list', options).then((lines) => lines.slice(3))
