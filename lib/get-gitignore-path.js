'use strict';

const exec = require('child_process').exec;
const fs   = require('fs');
const path = require('path');

module.exports = function(type, callback) {
  let cmd;

  if (type === 'global') {
    cmd = 'git config --global core.excludesfile';
  }

  if (type === 'local') {
    cmd = 'git rev-parse --show-toplevel';
  }

  exec(cmd, (error, stdout, stderr) => {
    if (error !== null) {
      callback(error);
    }

    if (stderr.length > 0) {
      console.log(stderr);
    }

    let ignorePath = stdout.replace('\n', '');

    try {
      const ignoreStats = fs.statSync(ignorePath);
      ignorePath = ignoreStats.isFile() ? ignorePath : path.join(ignorePath, '.gitignore');
      callback(error, ignorePath);
    } catch (e) {
      callback(error);
    }
  });
};
