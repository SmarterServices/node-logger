'use strict';

const Logger = require('./index');

const logger = new Logger({
  'targets': [
    {
      'name': 'console',
      'options': {
        'wrapMethods': ['error']
      }
    },
    {
      'name': 'file',
      'options': {
        'directory': 'logs',
        'sync': true
      }
    }
  ]
});

function Foo() {
  this.abc = 'Hello';
  this.circular = this;
}

const foo = new Foo();

logger.log(foo);
logger.info('Testing', 'logger');
logger.warn('Warning');
logger.error('Danger! Your App is crashed!');

logger.with('console').log('This will only be printed in console');
logger.exclude('file').log('This will not be printed in file');
logger.exec(console.error, 'Print an error using given function');
