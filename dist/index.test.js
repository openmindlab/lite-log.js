'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('./index.js');


var Logger = new _index2.default();

console.oldLog = Logger.log;
Logger.log = function (val) {
    console.oldLog(val);
    window.$log = '[~ 👀 Lite-log ~] ' + val;
};

Logger.log('hey!');

test('Console.log test', function () {
    expect($log).toBe('[~ 👀 Lite-log ~] hey!');
});
//# sourceMappingURL=index.test.js.map