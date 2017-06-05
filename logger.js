(function _define (global, factory) {
  if (typeof module !== 'undefined' && typeof module.exports === 'object' ) {
    module.exports = factory(); // NodeJs
  } else if (typeof define === 'function' && define.amd) {
    define('litelog', factory); // AMD
  } else {
    // general: browser
    global.Logger = factory();
  }
})(window, function build() {
  'use strict';

  var instances = [];

  var _mute = false;
  /**
   * INFO: 3
   * WARN: 2
   * ERROR: 1
   * NONE: 0
   */
  var Levels = {
    "error": 1,
    "warn": 2,
    "info": 3,
    "log": 4,
    "debug": 4
  };
  var _level = Levels.log; // default LOG

  function Logger(module, showline){

    if ( !(this instanceof Logger) ) {
      return Logger.l.apply( null, arguments );
    }

    if ( typeof module == 'string') {
      this.modulename = module;
    } else if ( typeof module == 'boolean') {

      if ( module ) {
        // get the module name from stacktrace
        this.modulename = _modulenamefromstack();
      } else {
        // No module name in the log strings
        this.modulename = "";
      }

    } else {
      Logger.w("Invalid 'module name' for logger.", "use 'default'");
      this.modulename = "*";
    }

    instances.push(this);

    this.showline = !!showline;

    this.mute( _mute );
    this.level( _level );

  }

  Logger.prototype = {

    e: _wrap("error"),
    w: _wrap("warn"),
    i: _wrap("info"),
    l: _wrap("log"),
    d: _wrap("debug"),

    mute: function(mute, all) {
      if ( this instanceof Logger ) {
        this._mute = !!mute;
        return this;
      } else {
        _mute = !!mute;
        if ( all === true ) {
          for( var i = 0, log; log = instances[i]; i++ ) {
            log.mute( _mute );
          }
        }
        return Logger;
      }
    },
    level: function(lvl, all) {
      if ( arguments.length === 0 ) {
        if ( this instanceof Logger ) {
          return this._level;
        } else {
          return _level;
        }
      }
      lvl = parseInt(lvl, 10);
      if ( isNaN( lvl ) )
        throw "No valid 'level' specified: " + lvl;

      if ( this instanceof Logger ) {
        this._level = lvl;
        return this;
      } else {
        _level = lvl;
        if ( all === true ) {
          for( var i = 0, log; log = instances[i]; i++ ) {
            log.level( _level );
          }
        }
        return Logger;
      }
    }


  };

  function _wrap(level) {
    return function(/* args... */) {
      var args = Array.prototype.slice.call(arguments, 0);
      var _current_level = null;
      if ( this instanceof Logger ) {
        if ( this._mute ) return false;
        args.unshift(this.showline);
        args.unshift(this.modulename);
        _current_level = this._level;
      } else {
        if ( _mute ) return false;
        args.unshift(false);  // showline
        args.unshift(undefined); // modulename
        _current_level = _level;
      }

      if ( _current_level !== null && ! isNaN( _current_level ) ) {
        var n_lvl = Levels[ level ];
        if ( n_lvl > _current_level ){
          return false;
        }
      }

      args.unshift(level);

      return Logger._write.apply( null, args);
    };

  }


  function _getstack() {
    var
      error = null;
    if ( window.Error ) {
      error = new Error("nothing");
    } else {
      try{ __unexisting_function_42__() } catch(e) { error = e; }
    }
    return error.stack;
  }

  function _getlinenumber() {
    var
      stacktrace = _getstack(),
      stacktracelines = stacktrace.split("\n"),
      line = stacktracelines[5],
      matches = line.match(/([^\/]+$)/),
      match = matches[1],
      parts = match.split(":"),
      part = parts[1];

    return part;

  }

  function _modulenamefromstack() {

    var
      stacktrace = _getstack(),
      stacktracelines = stacktrace.split("\n"),
      line = stacktracelines[4],
      matches = line.match(/([^\/]+$)/),
      match = matches[1],
      parts = match.split(":"),
      part = parts[0],
      fileparts = part.split(".");

      fileparts.pop();
      return fileparts.join(".");
  };

  Logger._write = function(level, module, showline /*, args... */) {

    var args = Array.prototype.slice.call(arguments, 3);

    if ( module ) {
      var module_str = "";
      if ( showline ) {
        var line = _getlinenumber();
        module_str = "[" + module + ":" + line + "]";
      } else {
        module_str = "[" + module + "]";
      }
      if ( typeof args[0] === "string" ) {
        args[0] = module_str + " " + args[0];
      } else {
        args.unshift( module_str );
      }
    }

    args.unshift(level);

    return Logger.__write_stream__.apply(Logger, args);
  };

  Logger.__write_stream__ = function(/* args... */) {
    var
      args = Array.prototype.slice.call(arguments),
      level = args.shift();

    if ( typeof console !== "undefined" ){
      if ( ! console[ level ] && console.log ) {
        level = "log";
      }
      return console[ level ] && console[ level ].apply && console[ level ].apply( console, args );
    } else {
      return false;
    }
  };

  Logger.prototype.error = Logger.prototype.e;
  Logger.prototype.warn = Logger.prototype.w;
  Logger.prototype.info = Logger.prototype.i;
  Logger.prototype.log = Logger.prototype.l;
  Logger.prototype.debug = Logger.prototype.d;

  for ( var fn in Logger.prototype ) {
    if ( Logger.prototype.hasOwnProperty(fn) ) {
      Logger[ fn ] = Logger.prototype[ fn ];
    }
  }

  return Logger;
});
