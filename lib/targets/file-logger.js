'use strict';

const fs = require('fs');
const utils = require('./../utils');
const EOL = require('os').EOL;
const promisifiedCreateDir = utils.promisify(utils.createDir);
const promisifiedAppendFile = utils.promisify(fs.appendFile);

class FileLogger {
  constructor(options) {
    this._config = utils.cloneDeep(options);
    this._logDir = options.directory;
    // Initialize promise for async logging
    this._logPromise = Promise.resolve();
  }

  /**
   * @param {any} args
   * @memberof FileLogger
   */
  log(...args) {
    this._log('log', args);
  }

  /**
   * @param {any} args
   * @memberof FileLogger
   */
  info(...args) {
    this._log('info', args);
  }

  /**
   * @param {any} args
   * @memberof FileLogger
   */
  error(...args) {
    this._log('error', args);
  }

  /**
   * @param {any} args
   * @memberof FileLogger
   */
  warn(...args) {
    this._log('warn', args);
  }

  /**
   * Log to file with given tag
   * @param {string} tag
   * @param {any} args
   * @memberof FileLogger
   */
  _log(tag, args) {
    const currentTime = utils.now();
    const directory = `${this._logDir}/${currentTime.format('MMMM-YY')}`;
    const fileName = `${directory}/${currentTime.format('YYYY-M-D')}.txt`;
    const data = args
      .map(this._stringify)
      .join(' ');
    const content = tag + ': ' + data + EOL;

    if (this._config.sync) {
      try {
        utils.createDir.sync(directory);
        fs.appendFileSync(fileName, content);
      } catch (error) {
        console.error(error);
      }
    } else {
      this._logPromise = this._logPromise
        .then(() => promisifiedCreateDir(directory))
        .then(() => promisifiedAppendFile(fileName, content))
        .catch(console.error);
    }
  }

  /**
   * Convert provided data into a string
   * @param {any} data
   * @return {string}
   * @memberof FileLogger
   */
  _stringify(data) {
    const dataType = typeof data;
    if (dataType === 'object') {
      return utils.stringify(data);
    } else if (dataType === 'function' || dataType === 'number') {
      return data.toString();
    } else {
      return data;
    }
  }
}

module.exports = FileLogger;
