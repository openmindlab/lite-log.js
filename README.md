# 👀 Lite-Log 👀

[![Build Status](https://travis-ci.org/micheleriva/lite-log.js.svg?branch=master)](https://travis-ci.org/micheleriva/lite-log.js)
[![Maintainability](https://api.codeclimate.com/v1/badges/b97de7b0fb25f63253dc/maintainability)](https://codeclimate.com/github/micheleriva/lite-log.js/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/micheleriva/lite-log.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/micheleriva/lite-log.js?targetFile=package.json)

Lite-Log is a lightweight (~700 byte gziped) logging library for web browsers written in JavaScript with no dependencies. <br />
You will also be able to mute your logs, take a look at the examples below.

- [Installation](#-installation)
- [Usage](#!)
    - [Basic usage](#%EF%B8%8F-basic-usage)
    - [Static Method](#%EF%B8%8F-static-method)
    - [Different log instances](#%EF%B8%8F-different-log-instances)
    - [Mute a logger](#mute-a-logger)
    - [Mute a logger (more advanced usage)](#%EF%B8%8F-mute-a-logger-more-advanced-usage)
    - [Mute all loggers](#%EF%B8%8F-mute-all-loggers)
    - [Using aliases](#%EF%B8%8F-using-aliases)
- [Available Methods](#--available-methods)

### 📦 [Installation](#installation)

Install using `npm` or `yarn` **(still to be published)**
```bash
$ npm install @openmind/litelog --save
```

```bash
$ yarn add @openmind/litelog
```

### ⚡️ [Basic usage](#basic-usage)
```js
import Log from '@openmind/litelog'

const Logger = new Log();

Logger.warn('Hey pay attention here!');
// => [~ ✋ Lite-log ~] Hey pay attention here!
```

### ⚡️ [Static Method](#static-method)
```js
Logger('Log this!');
// => [~ 👀 ~] Log this!
```

### ⚡️ [Different log instances](#different-log-instances)
Let's make an example. If you want to debug only a shopping cart component, you can initalize your log instance passing a string as first argument in your `Log()` instance:
```js
import Log from '@openmind/litelog'

const ShoppingCartLogger = new Log('Shopping cart');

ShoppingCartLogger.log('Debug here!');
// => [~ 👀 Shopping cart ~] Debug here!
```
As you can see, you will have a reference of your instanced logger in your console.

### ⚡️ [Mute a logger](#mute-a-logger)
You're also able to mute a logger. Take a look at the following example:
```js
import Log from '@openmind/litelog'

const ShoppingCartLogger = new Log('Shopping cart');

ShoppingCartLogger.mute(true);

ShoppingCartLogger.log('Debug here!');
// => no output!
```

### ⚡️ [Mute a logger (more advanced usage)](#mute-a-logger-more-advanced-usage)
```js
import Log from '@openmind/litelog'
import { env } from 'app.env'

const environment = env === "development";
// If env === development, environment variable will be TRUE

const ShoppingCartLogger = new Log('Shopping cart');

ShoppingCartLogger.mute(environment);

ShoppingCartLogger.log('Debug here!');
// => no output! In that case, environment variable results false!
```

### ⚡️ [Mute all loggers](#mute-all-loggers)
```js
import Log from '@openmind/litelog'

Log.mute(true);
```

### ⚡️ [Using aliases](#using-aliases)

Evey method has an alias. Check the example and the table below to learn more:
```javascript
import Log from '@openmind/litelog'

const Logger = new Log();

Logger.l('Hey!');
// => [~ 👀 Lite-log ~] Hey!

Logger.w('What a bad error!');
// => [~ ✋ Lite-log ~] What a bad error!

```

### 🚀  [Available methods](#available-methods)

| Method   | Alias | Js Api               | Output 
| -------- | ----- | -------------------- | ------
| log      | l     | `console.log()`      | [~ 👀 Lite-log ~]
| warn     | w     | `console.warn()`     | [~ ✋ Lite-log ~]
| error    | e     | `console.error()`    | [~ ‼️ Lite-log ~]
| info     | i     | `console.info()`     | [~ ℹ️ Lite-log ~]
| debug    | d     | `console.debug()`    | [~ 🐛 Lite-log ~]

