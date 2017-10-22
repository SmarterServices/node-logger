'use strict';

const expect = require('chai').expect;
const Logger = require('./../../index');

describe('Test Logger', function testLogger() {
  it('Should create new logger object', () => {
    const logger = new Logger({
      targets: [{name: 'console'}]
    });

    const logMethods = ['log', 'info', 'warn', 'error'];

    logMethods.forEach(logMethod => {
      expect(logger).to.have.property(logMethod);
    });
  });
});
