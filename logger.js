var Logger = (function(){

  var _mute = false;

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

    this.showline = !!showline;

  }

  Logger.prototype = {

    e: _wrap("error"),
    w: _wrap("warn"),
    i: _wrap("info"),
    l: _wrap("log"),
    d: _wrap("debug"),

    mute: function(mute) {
      if ( this instanceof Logger ) {
        this._mute = !!mute;
        return this;
      } else {
        _mute = !!mute;
        return Logger;
      }
    }

  };

  function _wrap(level) {
    return function(args) {
      args = Array.prototype.slice.call(arguments, 0);
      if ( this instanceof Logger ) {
        if ( this._mute ) return false;
        args.unshift(this.showline);
        args.unshift(this.modulename);
      } else {
        if ( _mute ) return false;
        args.unshift(false);  // showline
        args.unshift(undefined); // modulename
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

  Logger._write = function(level, module, showline, args) {

    args = Array.prototype.slice.call(arguments, 3);

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

    if ( window.console ){
      return console[ level ].apply( console, args );
    } else {
      return false;
    }
  };

  Logger.prototype.error = Logger.prototype.e;
  Logger.prototype.warn = Logger.prototype.w;
  Logger.prototype.info = Logger.prototype.i;
  Logger.prototype.log = Logger.prototype.l;
  Logger.prototype.debug = Logger.prototype.d;

  for ( fn in Logger.prototype ) {
    if ( Logger.prototype.hasOwnProperty(fn) ) {
      Logger[ fn ] = Logger.prototype[ fn ];
    }
  }

  return Logger;
})();
