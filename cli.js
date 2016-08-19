#! /usr/bin/env node

'use strict'

const escapeStringRegexp = require('escape-string-regexp')
const argv = require('minimist')(process.argv.slice(2))

const teardown = require('./index')

const start = argv.start && new RegExp(`^${escapeStringRegexp(argv.start)}`)
const end = argv.end && new RegExp(`${escapeStringRegexp(argv.end)}$`)
const regex = argv.regex

if (!start && !end && !regex) {
  throw new Error('Must pass one of: start, end, regex')
}

teardown(start || end || regex)
  .then(process.stdout.write.bind(process.stdout))
  .catch((err) => { throw err })
