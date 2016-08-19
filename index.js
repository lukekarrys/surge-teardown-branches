'use strict'

const getProjects = require('./lib/getProjects')
const getBranches = require('./lib/getBranches')
const findMissingProjects = require('./lib/findMissingProjects')
const teardownProjects = require('./lib/teardownProjects')

module.exports = (domain) => {
  if (!domain || typeof domain !== 'string') {
    return Promise.reject('Must pass a string to match ending of projects')
  }

  return Promise.all([
    getProjects(),
    getBranches()
  ])
  .then((parts) => findMissingProjects({
    domain,
    projects: parts[0],
    branches: parts[1]
  }))
  .then(teardownProjects)
}
