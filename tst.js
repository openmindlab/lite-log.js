const Logger = require('./dist/logger.umd');

const a = new Logger('StoreLocator', false);
const b = new Logger('StoreLocator/GoogleMap', true);

a.log('1 Log');       b.l('1 Log alias');
a.warn('1 Warn');     b.w('1 Warn alias');
a.info('1 Info');     b.i('1 Info alias');
a.debug('1 Debug');   b.d('1 Debug alias');
a.error('1 Error');   b.e('1 Error alias');

Logger.mute(true, true);

let c = new Logger("Other");
c.l("No LOG");
c.mute = false;
c.l("Yes LOG");

Logger('Is "a" instance of Logger?', a instanceof Logger);
Logger('Is "b" instance of Logger?', b instanceof Logger);
Logger('I\'m writing random stuff');
Logger.print( '', 'I\'m writing random stuff with print');
Logger.warn('Warn static');


a.debug('2 Debug');   b.d('2 Debug alias');
a.error('2 Error');   b.e('2 Error alias');

console.log('----------------------------------');

Logger.mute(false, true);

// STATIC METHODS
Logger("Simple line with an object", {key: "value"});  // alias to `Logger.log`
Logger.i("this is a test for static instance:", "this is another argument as string", {key: "argument as object"});  // alias to `Logger.info`
Logger.w("this is a test for static instance:", "this is another argument as string", {key: "this is an argument as object"});  // alias to `Logger.warn`
Logger.mute(true);
Logger.i("this line will be ignored");  // alias to `Logger.info`
Logger("this line will be ignored");    // alias to `Logger.log`

// INSTANCE METHOD
var Log = new Logger("ModuleName");
Log.i("this is a test:", "this is another argument as string", {key: "argument as object"});  // alias to `Log.info`
Log.w("this is a test:", "this is another argument as string", {key: "this is an argument as object"});  // alias to `Log.warn`
Log.mute = true;
Log.i("this line will be ignored");  // alias to "Log.info"
