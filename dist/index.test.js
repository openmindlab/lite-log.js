'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('./index.js');


var Logger = new _index2.default();

/*
 * Log test
 */

console.oldLog = Logger.log;
Logger.log = function (val) {
    console.oldLog(val);
    window.$log = '[~ 👀 Lite-log ~] ' + val;
};

Logger.log('hey!');

test('Console.log test', function () {
    expect($log).toBe('[~ 👀 Lite-log ~] hey!');
});

/*
 * Warn test
 */

console.oldWarn = Logger.warn;
Logger.warn = function (val) {
    console.oldWarn(val);
    window.$warn = '[~ ✋ Lite-log ~] ' + val;
};

Logger.warn('warning!');

test('Console.warn test', function () {
    expect(window.$warn).toBe('[~ ✋ Lite-log ~] warning!');
});

/*
 * Warn alias test
 */

console.oldWarnAlias = Logger.w;
Logger.w = function (val) {
    console.oldWarnAlias(val);
    window.$warning = '[~ ✋ Lite-log ~] ' + val;
};

Logger.w('warning, I\'m an alias!');

test('Console.warn test', function () {
    expect(window.$warning).toBe('[~ ✋ Lite-log ~] warning, I\'m an alias!');
});
//# sourceMappingURL=index.test.js.map