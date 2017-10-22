'use strict';

const utils = require('./utils');
const targets = require('./targets/index');

class Logger {
  constructor(config) {
    this._config = utils.cloneDeep(config);
    this._loggers = config.targets.map(target => {
      return targets[target.name](target.options);
    });
  }

  /**
   * @param {any} args
   * @memberof Logger
   */
  log(...args) {
    this._log('log', args);
  }

  /**
   * @param {any} args
   * @memberof Logger
   */
  info(...args) {
    this._log('info', args);
  }

  /**
   * @param {any} args
   * @memberof Logger
   */
  error(...args) {
    this._log('error', args);
  }

  /**
   * @param {any} args
   * @memberof Logger
   */
  warn(...args) {
    this._log('warn', args);
  }

  /**
   * Log using selected method
   * @param {function} logMethod
   * @param {any} args
   * @memberof Logger
   */
  _log(logMethod, args) {
    try {
      this._loggers.forEach(logger => {
        logger[logMethod](...args);
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Log with only selected loggers
   * Selected loggers must be in existing targets
   * @param {any} args
   * @returns {Object<Logger>}
   * @memberof Logger
   */
  with(...args) {
    let targets = this._config.targets.filter(target => args.includes(target.name));
    return new Logger({ targets });
  }

  /**
   * Log with only give targets.
   * Targets may or may not be in existing targets
   * @param {any} args
   * @returns {Object<Logger>}
   * @memberof Logger
   */
  only(...args) {
    return new Logger({ targets: args });
  }

  /**
   * Include the given targets in existing targets
   * @param {any} args
   * @returns {Object<Logger>}
   * @memberof Logger
   */
  include(...args) {
    let targets = [...this._config.targets, ...args];
    return new Logger({ targets });
  }

  /**
   * Exclude the given targets by name
   * @param {string} args
   * @returns
   * @memberof Logger
   */
  exclude(...args) {
    let targets = this._config.targets.filter(target => !args.includes(target.name));
    return new Logger({ targets });
  }

  /**
   * Execute the given method with provided arguments
   * @param {any} logMethod
   * @param {any} args
   * @memberof Logger
   */
  exec(logMethod, ...args) {
    logMethod(...args);
  }
}

module.exports = Logger;
