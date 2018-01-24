'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {

  /*
   * Class' constructor.
   * @Params:
   *  logname @string
   *  showGog @boolean
   *
   * @Returns:
   *  @Object
   */
  function Log(logname, showLog) {
    _classCallCheck(this, Log);

    this.logname = logname || 'Lite-log';
    return this.exposeMethods(showLog);
  }

  /*
   * Methods currently supported by lite-log
   */


  _createClass(Log, [{
    key: 'methods',
    value: function methods() {
      return [{ name: 'log', alias: 'l', icon: '👀' }, { name: 'warn', alias: 'w', icon: '✋' }, { name: 'error', alias: 'e', icon: '‼️' }, { name: 'info', alias: 'i', icon: 'ℹ️' }, { name: 'count', alias: 'c', icon: '✏️' }, { name: 'group', alias: 'gs', icon: '☀️' }, { name: 'groupEnd', alias: 'ge', icon: '⛅️' }, { name: 'time', alias: 'ts', icon: '⏱' }, { name: 'timeEnd', alias: 'te', icon: '⏰' }];
    }
  }, {
    key: 'exposeMethods',


    /*
     * Expose supported methods by
     * overriding default console.
     */
    value: function exposeMethods(showLog) {
      var _this = this;

      /*
       * Should show logs?
       */
      showLog === undefined ? showLog = true : showLog;

      /*
       * Declare available methods as empty object.
       * It will be filled after the loop.
       */
      var availableMethods = {};

      /*
       * Apply basic styling to logs and assign
       * a new logging method looping the methods() function.
       */
      this.methods().map(function (method) {
        var _newMethods;

        /*
         * Get browser's default console instance.
         */
        var oldConsole = console[method.name];

        /*
         * Override default console behavior.
         * Add style to console output and write instance reference (logname).
         */
        console[method.name] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          args.unshift('[~ ' + method.icon + ' ' + _this.logname + ' ~] ');
          oldConsole.apply(null, args);
        };

        /*
         * Should the log to be displayed?
         * if false, point to null function.
         */
        var mayShow = function mayShow() {
          return showLog ? console[method.name] : function () {};
        };

        /*
         * Define if default methods and aliases
         * can be displayed.
         * Alias gets its method reference thanks to
         * mayShow() function.
         */
        var newMethods = (_newMethods = {}, _defineProperty(_newMethods, method.name, mayShow()), _defineProperty(_newMethods, method.alias, mayShow()), _newMethods);

        /*
         * Finally merge objects into an unique
         * object to be exposed to the user,
         * then end mapping.
         */
        Object.assign(availableMethods, newMethods);
      });

      return availableMethods;
    }
  }]);

  return Log;
}();

exports.default = Log;
//# sourceMappingURL=index.js.map