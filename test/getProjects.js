'use strict'

const test = require('tape')

const getProjects = require('../lib/getProjects')

const kindaUrlLike = /([^\.]\.)?[^\.]\.[^\.]/

test('Finds surge projects', (t) => {
  getProjects().then((projects) => {
    t.ok(Array.isArray(projects))
    t.ok(projects.length)
    t.ok(projects.every((p) => kindaUrlLike.test(p)))
    t.end()
  })
})

test('Finds only one project', (t) => {
  getProjects(/tweetyourbracket.com$/).then((projects) => {
    t.ok(Array.isArray(projects))
    t.ok(projects.length)
    t.equal(projects.length, 1)
    t.end()
  })
})

test('Finds no projects for a bad regex', (t) => {
  getProjects(/asadsasdasdasdasdasdasdasdas/).then((projects) => {
    t.ok(Array.isArray(projects))
    t.notOk(projects.length)
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
