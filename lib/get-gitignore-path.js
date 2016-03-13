'use strict';

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

module.exports = function(type, callback) {
  let cmd;

  if (type === 'global') {
    cmd = 'git config --global core.excludesfile';
  } else {
    type = 'local';
    cmd = 'git rev-parse --show-toplevel';
  }

  exec(cmd, (error, stdout, stderr) => {
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
