const instances = [];

const LEVELS = Object.freeze({
  LOG: 4,
  DEBUG: 4,
  INFO: 3,
  WARN: 2,
  ERROR: 1,
  NONE: 0
});

let muted = { mute: false, all: false};

const DEFAULT_LEVEL = window.LOG_LEVEL || LEVELS.LOG;
let level = DEFAULT_LEVEL;

const SetLevel = function(value) {
  let lvl = null;
  if (typeof value == 'string') {
    lvl = LEVELS[value.toUpperCase()];
  } else if (typeof value == 'boolean') {
    if (value) {
      lvl = DEFAULT_LEVEL;
    } else {
      lvl = LEVELS.NONE;
    }
  } else if ( typeof value == 'number') {
    lvl = value >= 0 && value <= 4 ? value : null;
  }

  if (typeof lvl != 'number') {
    console.trace();
    throw new Error(`invalid logger level ${value} -> ${lvl}`);
  }
  return lvl;
}


class Logger {

  static get VERSION() {
    return process.env.VERSION;
  }

  constructor(instanceName){

    if ( this instanceof Logger ) {
      this.__instance_name__ = instanceName || `[${instances.length}]`;
      this.level = level;
      instances.push(this)
    } else {
      Logger.print('', ...arguments);
    }
  }

  get NAME() {
    return this.__instance_name__;
  }

  static mute(bool, all){
    Logger.level(bool ? LEVELS.NONE : DEFAULT_LEVEL, all );
  }


  static level(value, all) {
    if ( arguments.length <= 0 ){
      return level;
    }
    level = SetLevel(value);
    if ( all === true ) {
      for (let instance of instances) {
        instance.level = level;
      }
    }
  }

  static getLogger(name) {
    for( let instance of instances ) {
      if ( instance && instance.__instance_name__ === name ){
        return instance;
      }
    }
    return null;
  }


  get mute() {
    return this.__level__ === LEVELS.NONE;
  }
  set mute(bool) {
    this.__level__ = bool ? LEVELS.NONE : DEFAULT_LEVEL;
  }

  get level() {
    return this.__level__;
  }
  set level(value) {
    this.__level__ = SetLevel(value);
  }

  static print(type, ...args){
    let obj;
    switch (type){
      case 'w': obj = {icon: '\u270B',       method: 'warn'};  break;
      case 'i': obj = {icon: '\u2139\uFE0F', method: 'info'};  break;
      case 'd': obj = {icon: '\uD83D\uDC1B', method: typeof console.debug !== 'undefined' ? 'debug' : 'log'};  break;
      case 'e': obj = {icon: '\u203C\uFE0F', method: 'error'}; break;
      case 'l':
      default:  obj = {icon: '\uD83D\uDC40', method: 'log'};   break;
    }

    if (this instanceof Logger) {
      if (this.mute) {
        return;
      }
    } else if ( muted.mute ) {
      return;
    }

    return console[obj.method](`[~ ${obj.icon} ${this.NAME || ''} ~]`, ...args);
  };

}

const methods  = ['log', 'warn', 'info', 'error', 'debug'];

(function addMethods(){
  methods.map((method) => {
    let alias = method.charAt(0);
    [method, alias].map( (k) =>
      Logger[k] = Logger.prototype[k] = function() {

        let check_level = level;
        if ( this instanceof Logger ){
          check_level = this.level;
        }

        if ( check_level < LEVELS[ method.toUpperCase() ]  ) {
          // logger level has been muted
          return;
        }

        let args = Array.prototype.slice.call(arguments, 0);
        args.unshift( alias );
        Logger.print.apply(this, args );
      }
    );
  });
})();

export default Logger;
