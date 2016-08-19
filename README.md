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

This tool makes a few assumptions so that it works in an expected way and will never teardown any projects by mistake!

So if you want this to be able to teardown your Surge projects you must name them so:

- They all end with the same unique project name / domain
- They all start with a branch name
- Between the branch and domain there can be one character (like `-`, `_`, or `.`)

So if your feature branches are named like `feature-name-issue-99` and you call your project `awsomesauce`, then when they are deployed to surge they should look like `feature-name-issue-99_awesomesauce.surge.sh` or `feature-name-issue-99.awesomesauce.com` if you are using a custom domain (and subdomains).


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
surge-teardown-branches myproject.surge.sh
# The following projects will be torn down
# greenkeeper-async-5.0.0-myproject.surge.sh
# greenkeeper-lodash-4.0.0-myproject.surge.sh
# Note that myproject.surge.sh WILL NOT be torn down
# because thats not what you want and would be silly
```

**What's going on?**
1. Looks for all projects that look like `SOMEBRANCHNAME-myproject.surge.sh`
2. Looks for all remote branches
3. Teardown all projects where `SOMEBRANCHNAME` isn't a remote branch
4. `greenkeeper-yargs-5.0.0-myproject.surge.sh` won't be torn down because a branch still exists with a matching name (presumably because the PR is still being worked on or waiting for review).


## API

**CLI**
```sh
surge-teardown-branches myproject.surge.sh
```

**JS**
```js
require('surge-teardown-branches')('myproject.surge.sh')
```

## LICENSE

MIT
