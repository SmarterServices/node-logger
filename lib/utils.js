'use strict';

const pify = require('pify');
const moment = require('moment');
const mkdirp = require('mkdirp');
const lodashCloneDeep = require('lodash.clonedeep');
const util = require('util');

const utils = {
  createDir: mkdirp,
  now: moment,
  promisify: pify,
  cloneDeep: lodashCloneDeep,
  stringify: util.inspect
};

module.exports = utils;
