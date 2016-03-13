'use strict';

const path = require('path');
const fs = require('fs');
const getIgnorePath = require('./get-gitignore-path');

module.exports = function(paths, options, callback) {
  let target;

  if (options.local) {
    target = 'local';
  } else if (options.global) {
    target = 'global';
  } else {
    target = 'local';
  }

  if (Array.isArray(paths) && paths.length > 0) { // We have an input to add

    getIgnorePath(target, (error, ignorePath) => {
      if (error !== null) {
        callback(error);
      }

      fs.appendFile(ignorePath, paths.join('\n') + '\n', 'utf-8', error => {
        if (error !== null) {
          callback(error);
        }

        const msg = `Added to ${target} .gitignore (${ignorePath}):\n${paths.join('\n')}`;
        callback(null, msg);
      });
    });

  } else { // No input given, we return existing .gitignore content

    getIgnorePath(target, (error, ignorePath) => {
      if (error !== null) {
        callback(error);
      }

      fs.readFile(ignorePath, 'utf-8', (error, data) => {
        if (error !== null) {
          callback(error);
        }

        const gitignoreContent = `${target.charAt(0).toUpperCase() + target.slice(1)} .gitignore (${ignorePath}):\n${data}`;
        callback(null, gitignoreContent);
      });
    });

  }
};
