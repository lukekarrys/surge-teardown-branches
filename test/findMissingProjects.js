'use strict'

const test = require('tape')

const findMissingProjects = require('../lib/findMissingProjects')

test('Can find missing projects', (t) => {
  const missing = findMissingProjects({
    projects: ['project1.com', 'project2.com', 'project3.surge.sh', 'greenkeeper-project4.test.com'],
    branches: ['project1', 'project3', 'project4']
  })

  t.deepEqual(missing, ['project2.com'])
  t.end()
})

test('Returns all projects without branches', (t) => {
  const missing = findMissingProjects({
    projects: ['test.com', 'test2.com', 'test3.com']
  })

  t.deepEqual(missing, ['test.com', 'test2.com', 'test3.com'])
  t.end()
})

test('Empty', (t) => {
  const missing = findMissingProjects()

  t.deepEqual(missing, [])
  t.end()
})

