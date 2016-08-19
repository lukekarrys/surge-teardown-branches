'use strict'

const test = require('tape')

const getBranches = require('../lib/getBranches')

test('Finds the only master branch', (t) => {
  getBranches().then((branches) => {
    t.deepEqual(branches, ['master'])
    t.end()
  })
})
