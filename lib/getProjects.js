'use strict'

const isRegExp = require('util').isRegExp
const cp = require('./cp')

/*
 * Get all surge projects filtered by a regex
 * Returns a promise
 */
module.exports = (regex, options) => cp('surge list', isRegExp(regex) ? options : regex).then((lines) => lines
    .slice(3).filter((p) => isRegExp(regex) ? regex.test(p) : true)
)
