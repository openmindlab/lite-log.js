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

/*
 * Log alias test
 */

console.oldLog = Log.l;
Log.l = (val) => {
    console.oldLog(val);
    window.$l = '[~ 👀 ~] ' + val;
};

Log.l('hey!');

test('Console.log test', () => {
    expect($l).toBe('[~ 👀 ~] hey!');
});

/*
 * Warn test
 */

console.oldWarn = Log.warn;
Log.warn = (val) => {
    console.oldWarn(val);
    window.$warn = '[~ ✋ ~] ' + val;
};

Log.warn('hey!');

test('Console.log test', () => {
    expect($warn).toBe('[~ ✋ ~] hey!');
});

/*
 * Warn alias test
 */

console.oldWarn = Log.w;
Log.w = (val) => {
    console.oldWarn(val);
    window.$w = '[~ ✋ ~] ' + val;
};

Log.w('hey!');

test('Console.log test', () => {
    expect($w).toBe('[~ ✋ ~] hey!');
});

/*
 * Error test
 */

console.oldError = Log.error;
Log.error = (val) => {
    console.oldError(val);
    window.$error = '[~ ‼️ ~] ' + val;
};

Log.error('hey!');

test('Console.log test', () => {
    expect($error).toBe('[~ ‼️ ~] hey!');
});

/*
 * Error alias test
 */

console.oldError = Log.e;
Log.e = (val) => {
    console.oldError(val);
    window.$e = '[~ ‼️ ~] ' + val;
};

Log.e('hey!');

test('Console.log test', () => {
    expect($e).toBe('[~ ‼️ ~] hey!');
});
