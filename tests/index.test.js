jest.unmock('../dist/logger.umd');
const Logger = require('../dist/logger.umd').default;


const Log = new Logger('Test');

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

/*
 * Debug test
 */

console.oldDebug = Log.debug;
Log.debug = (val) => {
    console.oldDebug(val);
    window.$debug = '[~ ⚙️ ~] ' + val;
};

Log.debug('hey!');

test('Console.log test', () => {
    expect($debug).toBe('[~ ⚙️ ~] hey!');
});

/*
 * Debug alias test
 */

console.oldDebug = Log.d;
Log.d = (val) => {
    console.oldDebug(val);
    window.$debug = '[~ ⚙️ ~] ' + val;
};

Log.d('hey!');

test('Console.log test', () => {
    expect($debug).toBe('[~ ⚙️ ~] hey!');
});

test('get Logger instance', () => {
    const tLog = Logger.getLogger('Test');
    expect( !!tLog ).toBe( true );
});

test('mute Logger instance', () => {
    const tLog = Logger.getLogger('Test');
    let done = false;
    console.info = function() {
      done = true;
    };
    tLog.info('test info');
    expect(done).toBe(true);
    done = false;
    tLog.mute = true;
    tLog.info('test info');
    expect(tLog.mute).toBe(true);
    expect(done).toBe(false);
});
