'use strict'

/*
 * Find projects without a corresponding branch
 * Returns an array
 */
module.exports = (options) => {
  options || (options = {})
  const projects = options.projects || []
  const branches = options.branches || []

  // Look for projects that dont have a matching remote branch
  const projectHasMissingBranch = (p) => branches.every((b) => p.indexOf(b) === -1)
  return projects.filter(projectHasMissingBranch)
}

