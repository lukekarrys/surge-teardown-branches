'use strict'

const getProjects = require('./lib/getProjects')
const getBranches = require('./lib/getBranches')
const findMissingProjects = require('./lib/findMissingProjects')
const teardownProjects = require('./lib/teardownProjects')

module.exports = (regex) => Promise.all([
  getProjects(regex),
  getBranches()
])
.then((parts) => findMissingProjects({
  projects: parts[0],
  branches: parts[1]
}))
.then(teardownProjects)
