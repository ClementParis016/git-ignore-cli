'use strict';

const exec = require('child_process').exec;
const fs   = require('fs');
const path = require('path');

const GLOBAL_GITIGNORE_CMD = 'git config --global core.excludesfile';
const LOCAL_GITIGNORE_CMD  = 'git rev-parse --show-toplevel';

module.exports = function(type, callback) {
  let cmd;

  if (type === 'global') {
    cmd = GLOBAL_GITIGNORE_CMD;
  } else if (type === 'local') {
    cmd = LOCAL_GITIGNORE_CMD;
  } else {
    callback('Invalid .gitignore path');
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
      // Add '.gitignore' to the end of the path if missing
      ignorePath = ignoreStats.isFile() ? ignorePath : path.join(ignorePath, '.gitignore');
      callback(error, ignorePath);
    } catch (e) {
      callback(error);
    }
  });
};
