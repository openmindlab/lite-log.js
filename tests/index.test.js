jest.unmock('../dist/index.umd');
const Logger = require('../dist/logger');

const Log = new Logger();

/*
 * Log test
 */

console.oldLog = Log.log;
Log.log = (val) => {
    console.oldLog(val);
    window.$log = '[~ 👀 lite-log ~] ' + val;
};

Log.log('hey!');

test('Console.log test', () => {
    expect($log).toBe('[~ 👀 lite-log ~] hey!');
});