'use strict';

const pify = require('pify');
const moment = require('moment');
const mkdirp = require('mkdirp');

const utils = {
  createDir: mkdirp,
  now: moment,
  promisify: pify
};

module.exports = utils;
