'use strict'

const cp = require('./cp')

const teardown = (options) => (project) => cp(`surge teardown ${project}`, options).then((lines) => lines.slice(4))

/*
 * Teardown a surge project
 * Returns a string with the output response
 */
module.exports = (projects, options) => {
  if (!projects || !projects.length) {
    return 'No matching projects to teardown'
  }

  // Teardown all matching projects
  return Promise.all(projects.map(teardown(options))).then((output) => output.join('\n'))
}
