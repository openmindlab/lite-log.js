jest.unmock('./index.js');
import Log from './index';

const Logger = new Log();
const NoLogger = new Log('Mute', false);

/*
 * Log test
 */

console.oldLog = Logger.log;
Logger.log = (val) => {
    console.oldLog(val);
    window.$log = '[~ 👀 Lite-log ~] ' + val;
};

Logger.log('hey!');

test('Console.log test', () => {
    expect($log).toBe('[~ 👀 Lite-log ~] hey!');
});

/*
 * Warn test
 */

console.oldWarn = Logger.warn;
Logger.warn = (val) => {
    console.oldWarn(val);
    window.$warn = '[~ ✋ Lite-log ~] ' + val;
};

Logger.warn('warning!');

test('Console.warn test', () => {
    expect(window.$warn).toBe('[~ ✋ Lite-log ~] warning!');
});

/*
 * Warn alias test
 */

console.oldWarnAlias = Logger.w;
Logger.w = (val) => {
    console.oldWarnAlias(val);
    window.$warning = '[~ ✋ Lite-log ~] ' + val;
};

Logger.w('warning, I\'m an alias!');

test('Console.w test', () => {
    expect(window.$warning).toBe('[~ ✋ Lite-log ~] warning, I\'m an alias!');
});

/*
 * Mute test test
 */

console.oldUnmutedLog = NoLogger.log;
NoLogger.log = (val) => {
    console.oldUnmutedLog(val);
    window.$muteLog = '';
};

NoLogger.log('I should not appear');

test('Mute logger test', () => {
    expect(window.$muteLog).toBe('');
});