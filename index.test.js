jest.unmock('./index.js');
import Log from './index';

const Logger = new Log();

console.oldLog = Logger.log;
Logger.log = (val) => {
    console.oldLog(val);
    window.$log = '[~ 👀 Lite-log ~] ' + val;
};

Logger.log('hey!');

test('Console.log test', () => {
    expect($log).toBe('[~ 👀 Lite-log ~] hey!');
});