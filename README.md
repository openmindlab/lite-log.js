# Lite-Log

Lite-Log is a simple easy-to-use library for managing all log line in console


### Here is an example

```js
  // STATIC METHODS
  Logger("Simple line with an object", {key: "value"});  // alias to `Logger.log`
  Logger.i("this is a test for static instance:", "this is another argument as string", {key: "argument as object"});  // alias to `Logger.info`
  Logger.w("this is a test for static instance:", "this is another argument as string", {key: "this is an argument as object"});  // alias to `Logger.warn`
  Logger.mute(true);
  Logger.i("this line will be ignored");  // alias to `Logger.info`
  Logger("this line will be ignored");    // alias to `Logger.log`

  // INSTANCE METHOD
  var Log = new Logger("ModuleName", true);
  Log.i("this is a test:", "this is another argument as string", {key: "argument as object"});  // alias to `Log.info`
  Log.w("this is a test:", "this is another argument as string", {key: "this is an argument as object"});  // alias to `Log.warn`
  Log.mute(true);
  Log.i("this line will be ignored");  // alias to "Log.info"

```


### Usage

##### Logger(args...)
Simply log all passed arguments. It is the same of `console.log`


##### Logger.e(args...)  or  Logger.error(args...)

Log all passed arguments as per `console.error`


##### Logger.w(args...)  or  Logger.warn(args...)

Log all passed arguments as per `console.warn`


##### Logger.i(args...)  or  Logger.info(args...)

Log all passed arguments as per `console.info`


##### Logger.l(args...)  or  Logger.log(args...)

Log all passed arguments as per `console.log`


##### Logger.d(args...)  or  Logger.debug(args...)

Log all passed arguments as per `console.debug`


##### Logger.mute(boolean)

Mute/Unmute the logger. Once logger has been muted, it will log nothing


##### new Logger(modulename, showline)

Create a new Logger instance.
Arguments:
`modulename` (String/Boolean): it is the name of the module just invoked the Logger.
If `String` it represent exactly the name of the module.
If `True` it will get the name of the module from the stacktrace.
If `False` it will not log the module name.

`showline` (Boolean): it enables/disables the `linenumber` in the log.

```js
var Log_1 = new Logger("ModuleName_1", false);
var Log_2 = new Logger("ModuleName_2", false);
Log_1.i("Log my argument");
Log_2.i("Log my argument");
// [ModuleName_1] Log my argument
// [ModuleName_2] Log my argument
```


```js
var Log_1 = new Logger("ModuleName_1", true);
var Log_2 = new Logger("ModuleName_2", false);
Log_1.i("Log my argument");
Log_2.i("Log my argument");
// [ModuleName_1:3] Log my argument
// [ModuleName_2] Log my argument
```

```js
// this code is in the `main.js` file
var Log_1 = new Logger(true, true);
var Log_2 = new Logger(false, true);
Log_1.i("Log my argument");
Log_2.i("Log my argument");
// [main:3] Log my argument
// Log my argument
```
