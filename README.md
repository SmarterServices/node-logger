# Node Logger
Logger module for node applications.

## Usage

Initialize by providing config object in the constructor.
```js
const logger = new Logger({
  "targets": [
    {
      "name": "console"
    },
    {
      "name": "file",
      "options": {
        "directory": "logs",
        "sync": false
      }
    }
  ]
});
```

After initializing, all standard logging functions can be used.

```js
logger.log('Hello', 'World!'); // Logs 'Hello world'
logger.info('Testing', 'logger'); // Logs 'Testing logger'
logger.warn('Warning'); // Logs 'Warning'
logger.error('Danger! Your App is crashed!') // Logs 'Danger! Your App is crashed!'
```

Additionally, it supports following methods
```js
// Executes the arguments with provided arguments
logger.exec(func, ...args)
// Receive a logger instance with only selected target from configured loggers
logger.with(target)
// Receive a logger instance with only given configuration
logger.only(target)
// Receive a logger instance which contains given target as well as existing targets
logger.include(target)
// Receive a logger instance excluding input target
logger.exclude(target)
```

## Targets
Currently this module supports the following targets-

### **Console:** Logs to console.
### **File:** Logs to file. Path must be given in configuration options.
### **Rollbar:** Logs to [rollbar](https://rollbar.com/). Api key must be given in configuration options.

## External Dependencies
All packages pulled in by the package.json file.

## Deployment

N/A

## Cronjobs
N/A

## Credits

**Original Author**

* [Md. Badiul Haque Shawon](https://github.com/EnosisShawon)
