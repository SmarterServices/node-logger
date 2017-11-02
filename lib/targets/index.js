'use strict';

const Rollbar = require('rollbar');
const FileLogger = require('./file-logger');
const consoleLogger = require('./console-logger');

const targets = {
  console: consoleLogger,
  rollbar: (options) => new Rollbar(options),
  file: (options) => new FileLogger(options)
};

module.exports = targets;
