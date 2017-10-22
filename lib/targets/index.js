'use strict';

const Rollbar = require('rollbar');
const FileLogger = require('./file-logger');

const targets = {
  console: () => console,
  rollbar: (options) => new Rollbar(options),
  file: (options) => new FileLogger(options)
};

module.exports = targets;
