# 👀 Lite-Log 👀

[![Build Status](https://travis-ci.org/micheleriva/lite-log.js.svg?branch=master)](https://travis-ci.org/micheleriva/lite-log.js)
[![Coverage](https://img.shields.io/badge/coverage-100%25-green.svg)](https://img.shields.io/badge/coverage-100%25-green.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/b97de7b0fb25f63253dc/maintainability)](https://codeclimate.com/github/micheleriva/lite-log.js/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/micheleriva/lite-log.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/micheleriva/lite-log.js?targetFile=package.json)

Lite-Log is a lightweight (913 byte gziped) logging library for web browsers written in JavaScript with no dependencies. <br />
You will also be able to mute your logs, take a look at the examples below.

- [Installation](#installation)
- [Usage](#usage)
    - [Basic usage](#basic-usage)
    - [Different log instances](#different-log-instances)
    - [Mute a logger](#mute-a-logger)
    - [Mute a logger (more advanced usage)](#mute-a-logger-more-advanced-usage)
- [Available Methods](#available-methods)
- [Using aliases](#using-aliases)

### [Installation](#installation)

Install using `npm` **(still to be published)**
```bash
$ npm install lite-log
```

### [Usage](#usage)

#### [Basic usage](#basic-usage)
```js
import Log from 'lite-log'

const Logger = new Log();

Logger.warn('Hey pay attention here!');
// => [~ ✋ Lite-log ~] Hey pay attention here!
```

#### [Different log instances](#different-log-instances)
Let's make an example. If you want to debug only a shopping cart component, you can initalize your log instance passing a string as first argument in your `Log()` instance:
```js
import Log from 'lite-log'

const ShoppingCartLogger = new Log('Shopping cart');

ShoppingCartLogger.log('Debug here!');
// => [~ 👀 Shopping cart ~] Debug here!
```
As you can see, you will have a reference of your instanced logger in your console.

#### [Mute a logger](#mute-a-logger)
You're also able to mute a logger. Take a look at the following example:
```js
import Log from 'lite-log'

const ShoppingCartLogger = new Log('Shopping cart', false);

ShoppingCartLogger.log('Debug here!');
// => no output!
```
As you can see, the `Log()` instance accepts a boolean value as a second argument. If you need to mute your loggers, you will just need to pass a `false` value.

#### [Mute a logger (more advanced usage)](#mute-a-logger-more-advanced-usage)
```js
import Log from 'lite-log'
import { env } from 'app.env'

const environment = env === "development";
// If env === development, environment variable will be TRUE

const ShoppingCartLogger = new Log('Shopping cart', environment);

ShoppingCartLogger.log('Debug here!');
// => no output! In that case, environment variable results false!
```

### [Using aliases](#using-aliases)

Evey method has an alias. Check the example and the table below to learn more:
```javascript
import Log from 'lite-log'

const Logger = new Log();

Logger.l('Hey!');
// => [~ 👀 Lite-log ~] Hey!

Logger.w('What a bad error!');
// => [~ ✋ Lite-log ~] What a bad error!

```

### [Available methods](#available-methods)

| Method   | Alias | Js Api               | Output 
| -------- | ----- | -------------------- | ------
| log      | l     | `console.log()`      | [~ 👀 Lite-log ~]
| warn     | w     | `console.warn()`     | [~ ✋ Lite-log ~]
| error    | e     | `console.error()`    | [~ ‼️ Lite-log ~]
| info     | i     | `console.info()`     | [~ ℹ️ Lite-log ~]
| debug    | d     | `console.debug()`    | [~ 🐛 Lite-log ~]