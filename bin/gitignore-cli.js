#! /usr/bin/env node
'use strict';

const meow = require('meow');
const gitignore = require('../lib/gitignore');

const cli = meow(`
  Usage
    $ gitignore [options] [<pathspec>...]    Add paths to .gitignore

  Options
    -l, --local    Use local .gitignore (default)
    -g, --global   Use global .gitignore

  Examples
    $ gitignore build/.tmp *.zip
      Added to local .gitignore (Z:\_projects\gitignore-cli\.gitignore):
      build/.tmp
      *.zip

    $ gitignore --local
      Local .gitignore (Z:\_projects\gitignore-cli\.gitignore)
      build/.tmp
      *.zip
`, {
  alias: {
    l: 'local',
    g: 'global'
  }
});

gitignore(cli.input, cli.flags, (error, data) => {
  if (error !== null) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }

  console.log(data);
});
