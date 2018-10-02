const instances = [];
let muted = {mute: false, all: false};

class Logger {

    constructor(instanceName){

      if ( this instanceof Logger ) {
          this.__instance_name__ = instanceName || '';
          muted.all && (this.mute = muted.mute);
          instances.push(this)
      } else {
          Logger.print('', ...arguments);
      }
  }

  get NAME() {
      return this.__instance_name__;
  }

  static mute(bool, instance){
    muted = {mute: !!bool, all: !!instance};
    if ( muted.all ) {
        for( let instance of instances )
            instance.mute = muted.mute;
    }
  }

  get mute() {
        return this.__mute__;
  }
  set mute(bool) {
        this.__mute__ = bool;
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
        let alias = method[0];
        [method, alias].map( (k) =>
            Logger[k] = Logger.prototype[k] = function() {
                let args = Array.prototype.slice.call(arguments);
                args.unshift( alias );
                Logger.print.apply(this, args );
            }
        );
    });
})();

export default Logger;