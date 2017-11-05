'use strict';

function consoleLogger(options, loggerInstance) {
  const globalConsole = Object.assign({}, global.console);
  if(options && options.wrapMethods) {
    options.wrapMethods.forEach(logMethod => {
      global.console[logMethod] = loggerInstance[logMethod].bind(loggerInstance);
    });
  }
  return globalConsole;
}

module.exports = consoleLogger;
