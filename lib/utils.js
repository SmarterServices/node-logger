'use strict';

const pify = require('pify');
const moment = require('moment');
const mkdirp = require('mkdirp');
const lodashCloneDeep = require('lodash.clonedeep');

const utils = {
  createDir: mkdirp,
  now: moment,
  promisify: pify,
  cloneDeep: lodashCloneDeep
};

module.exports = utils;
