# surge-teardown-branches

[![NPM](https://nodei.co/npm/surge-teardown-branches.png)](https://nodei.co/npm/surge-teardown-branches/)
[![Build Status](https://travis-ci.org/lukekarrys/surge-teardown-branches.png?branch=master)](https://travis-ci.org/lukekarrys/surge-teardown-branches)

Teardown Surge projects that no longer have a corresponding remote branch on a git repository.

## Install

```sh
npm install surge-teardown-branches --save-dev
# Or for the CLI
npm install surge-teardown-branches --global
```


## Usage

[Surge.sh](https://surge.sh/) is a great tool for static hosting. Lately, I've been using it to host short lived branches of projects to visually review changes.

The problem is that Surge makes it so easy to create a project (you can use any subdomain on `surge.sh`) that I ended up with a ton of projects that I didn't want to be up anymore once the corresponding branch on GitHub was deleted (after the PR was closed or merged).

This tool will go through a filtered list of your Surge projects and then run `surge teardown PROJECT` for any project that doesn't have a corresponding remote branch.

### Assumptions

This tool makes a few assumptions so that it works

### Example Time

**Remote branches**
```
greenkeeper-yargs-5.0.0
master
development
```

**Surge projects**
```
greenkeeper-yargs-5.0.0-myproject.surge.sh
greenkeeper-async-2.0.0-myproject.surge.sh
greenkeeper-lodash-4.0.0-myproject.surge.sh
greenkeeper-async-2.0.0-otherproject.surge.sh
myproject.surge.sh
otherproject.surge.sh
```

**Result**
```sh
surge-teardown-branches -end -myproject.surge.sh
# The following projects will be torn down
# greenkeeper-async-5.0.0-myproject.surge.sh
# greenkeeper-lodash-4.0.0-myproject.surge.sh
```

The command is using the CLI param `-end` so it will first filter your surge projects down to those ending in `-myproject.surge.sh`. Then it will teardown the projects for `greenkeeper-async-5.0.0` and `greenkeeper-lodash-4.0.0` because those don't have any remote branches. The `greenkeeper-yargs-5.0.0` won't be torn down because a branch still exists with a matching name (presumably because the PR is still being worked on or waiting for review).

```js
const teardown = require('surge-teardown-branches')

teardown(/\-myproject\.surge\.sh$/).then(console.log.bind(console))
// Success - 
// Success - 
```
