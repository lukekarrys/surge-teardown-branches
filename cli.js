#! /usr/bin/env node

'use strict'

require('./index')(process.argv[2])
  .then(process.stdout.write.bind(process.stdout))
  .catch((err) => { throw err })
