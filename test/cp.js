'use strict'

const test = require('tape')

const cp = require('../lib/cp')

test('Output is as expected for a basic command', (t) => {
  cp('ls -lha').then((output) => {
    t.ok(Array.isArray(output))
    t.ok(output.length)
    t.ok(output.every(Boolean))
    t.end()
  }).catch((err) => {
    t.notOk(err)
    t.end()
  })
})

test('Can catch for an error', (t) => {
  cp('sdfsdfsdfsdfsdfsdfsf').catch((err) => {
    t.ok(err instanceof Error)
    t.ok(err.message.indexOf('Command failed') > -1)
    t.ok(err.message.indexOf('sdfsdfsdfsdfsdfsdfsf') > -1)
    t.end()
  })
})

test('Can find surge', (t) => {
  cp('which surge').then((output) => {
    t.ok(output[0].endsWith('/surge'))
    t.end()
  }).catch((err) => {
    t.notOk(err)
    t.end()
  })
})
