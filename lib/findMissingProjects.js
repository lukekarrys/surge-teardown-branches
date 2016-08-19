'use strict'

const escapeStringRegexp = require('escape-string-regexp')

/*
 * Find projects without a corresponding branch
 * Returns an array
 */
module.exports = (options) => {
  options || (options = {})

  const projects = options.projects
  const branches = options.branches
  const domain = options.domain

  if (!projects || !branches || !domain) {
    throw new Error('Required parameters: projects, branches, domain')
  }

  const projectHasNoBranch = (project) => {
    if (!project.endsWith(domain) || project === domain) return false

    const rBranch = new RegExp(`^(.*?)([^a-zA-Z0-9]{0,2})${escapeStringRegexp(domain)}$`)
    const matches = project.match(rBranch)
    const branch = matches && matches[1]

    return branches.indexOf(branch) === -1
  }

  return projects.filter(projectHasNoBranch)
}

