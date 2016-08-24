'use strict'

const test = require('tape')

const getBranches = require('../lib/getBranches')

test('Finds the only master branch', (t) => {
  getBranches().then((branches) => {
    t.ok(Array.isArray(branches))
    t.ok(branches.indexOf('master') > -1)
    t.ok(branches.length)
    t.end()
  }).catch((err) => {
    t.notOk(err)
    t.end()
  })
})
