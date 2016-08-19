'use strict'

const exec = require('child_process').exec
const stripAnsi = require('strip-ansi')

/*
 * Helper to run a command and resolve it with the stdout split up by non-blank
 * lines with all ansi characters stripped
 */
module.exports = (command, options) => new Promise((resolve, reject) => exec(command, options || {}, (err, stdout, stderr) => {
  if (process.env.NODE_ENV === 'test') {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
  }

  if (err) {
    return reject(err)
  }

  return resolve(stripAnsi(stdout).split('\n').map((s) => s.trim()).filter(Boolean))
}))
