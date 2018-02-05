jest.unmock('../dist/logger.umd');
const Logger = require('../dist/logger.umd');

const Log = new Logger();

/*
 * Log test
 */

console.oldLog = Log.log;
Log.log = (val) => {
    console.oldLog(val);
    window.$log = '[~ 👀 ~] ' + val;
};

Log.log('hey!');

test('Console.log test', () => {
    expect($log).toBe('[~ 👀 ~] hey!');
});