'use strict'

const test = require('tape')

const findMissingProjects = require('../lib/findMissingProjects')

const DOMAIN = 'project.surge.sh'
const PROJECTS = [
  'project.com',
  'project.co',
  'project.surge.sh',
  'greenkeeper-test-project.com',
  'greenkeeper-test-project.surge.sh',
  'greenkeeper-test2-project.surge.sh',
  'greenkeeper-test4project.surge.sh',
  'greenkeeper-test4.project.surge.sh',
  'greenkeeper-test45project.surge.sh',
  'greenkeeper-test45.project.surge.sh',
  'greenkeeper-test5_project.surge.sh'
]

const testWithFixtures = (branches) => findMissingProjects({
  domain: DOMAIN,
  projects: PROJECTS,
  branches
})

test('Errors without domain', (t) => {
  t.throws(() => findMissingProjects())
  t.end()
})

test('Can find all missing projects with no branches', (t) => {
  const missing = testWithFixtures([])

  t.deepEqual(missing, [
    'greenkeeper-test-project.surge.sh',
    'greenkeeper-test2-project.surge.sh',
    'greenkeeper-test4project.surge.sh',
    'greenkeeper-test4.project.surge.sh',
    'greenkeeper-test45project.surge.sh',
    'greenkeeper-test45.project.surge.sh',
    'greenkeeper-test5_project.surge.sh'
  ])
  t.end()
})

test('Can find all missing projects with no matching branches', (t) => {
  const missing = testWithFixtures(['master', 'greenkeeper'])

  t.deepEqual(missing, [
    'greenkeeper-test-project.surge.sh',
    'greenkeeper-test2-project.surge.sh',
    'greenkeeper-test4project.surge.sh',
    'greenkeeper-test4.project.surge.sh',
    'greenkeeper-test45project.surge.sh',
    'greenkeeper-test45.project.surge.sh',
    'greenkeeper-test5_project.surge.sh'
  ])
  t.end()
})

test('Filter out a few projects', (t) => {
  const missing = testWithFixtures(['master', 'greenkeeper-test', 'greenkeeper-test2'])

  t.deepEqual(missing, [
    'greenkeeper-test4project.surge.sh',
    'greenkeeper-test4.project.surge.sh',
    'greenkeeper-test45project.surge.sh',
    'greenkeeper-test45.project.surge.sh',
    'greenkeeper-test5_project.surge.sh'
  ])
  t.end()
})

test('Filter out similar projects', (t) => {
  const missing = testWithFixtures(['greenkeeper-test4'])

  t.deepEqual(missing, [
    'greenkeeper-test-project.surge.sh',
    'greenkeeper-test2-project.surge.sh',
    'greenkeeper-test45project.surge.sh',
    'greenkeeper-test45.project.surge.sh',
    'greenkeeper-test5_project.surge.sh'
  ])
  t.end()
})

test('Filter out similar projects', (t) => {
  const missing = testWithFixtures(['greenkeeper-test45'])

  t.deepEqual(missing, [
    'greenkeeper-test-project.surge.sh',
    'greenkeeper-test2-project.surge.sh',
    'greenkeeper-test4project.surge.sh',
    'greenkeeper-test4.project.surge.sh',
    'greenkeeper-test5_project.surge.sh'
  ])
  t.end()
})

test('Filter out similar projects', (t) => {
  const missing = testWithFixtures(['greenkeeper-test4', 'greenkeeper-test45'])

  t.deepEqual(missing, [
    'greenkeeper-test-project.surge.sh',
    'greenkeeper-test2-project.surge.sh',
    'greenkeeper-test5_project.surge.sh'
  ])
  t.end()
})
