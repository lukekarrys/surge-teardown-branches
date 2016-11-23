'use strict'

const test = require('tape')

const getProjects = require('../lib/getProjects')

const kindaUrlLike = /([^.]\.)?[^.]\.[^.]/

test('Finds surge projects', (t) => {
  getProjects().then((projects) => {
    t.ok(Array.isArray(projects))
    t.ok(projects.length)
    t.equal(projects.length, projects.filter(Boolean).length)
    t.ok(projects.every((p) => kindaUrlLike.test(p)))
    t.end()
  }).catch((err) => {
    t.notOk(err)
    t.end()
  })
})

test('Given a bad token will fail', (t) => {
  const options = {
    cwd: process.cwd(),
    env: Object.assign({}, process.env, {SURGE_LOGIN: 'a', SURGE_TOKEN: 'b'})
  }
  getProjects(options).catch((err) => {
    t.ok(err instanceof Error)
    t.equal(err.code, 1)
    t.end()
  })
})
