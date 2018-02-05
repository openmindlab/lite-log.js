(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Logger = factory());
}(this, (function () {

var instances = [];
var muted = {
    mute: false,
    all: false
};
var Logger = function Logger(instanceName) {
    var i = arguments.length, argsArray = Array(i);
    while ( i-- ) argsArray[i] = arguments[i];

    if (this instanceof Logger) {
        this.__instance_name__ = instanceName || '';
        muted.all && (this.mute = muted.mute);
        instances.push(this);
    } else {
        Logger.print.apply(Logger, [ '' ].concat( argsArray ));
    }
};

var prototypeAccessors = { NAME: { configurable: true },mute: { configurable: true } };
prototypeAccessors.NAME.get = function () {
    return this.__instance_name__;
};
Logger.mute = function mute (bool, instance) {
    muted = {
        mute: !(!bool),
        all: !(!instance)
    };
    if (muted.all) {
        for (var i = 0, list = instances; i < list.length; i += 1) 
            {
                var instance$1 = list[i];

                instance$1.mute = muted.mute;
            }
    }
};
prototypeAccessors.mute.get = function () {
    return this.__mute__;
};
prototypeAccessors.mute.set = function (bool) {
    this.__mute__ = bool;
};
Logger.print = function print (type) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    var obj;
    switch (type) {
        case 'w':
            obj = {
                icon: '✋',
                method: 'warn'
            };
            break;
        case 'i':
            obj = {
                icon: 'ℹ️',
                method: 'info'
            };
            break;
        case 'd':
            obj = {
                icon: '🐛',
                method: 'log'
            };
            break;
        case 'e':
            obj = {
                icon: '‼️',
                method: 'error'
            };
            break;
        case 'l':
        default:
            obj = {
                icon: '👀',
                method: 'log'
            };
            break;
    }
    if (this instanceof Logger) {
        if (this.mute) {
            return;
        }
    } else if (muted.mute) {
        return;
    }
    return console[obj.method].apply(console, [ ("[~ " + (obj.icon) + " " + (this.NAME || '') + " ~]") ].concat( args ));
};

Object.defineProperties( Logger.prototype, prototypeAccessors );
var methods = ['log','warn','info','error','debug'];
(function addMethods() {
    methods.map(function (method) {
        var alias = method[0];
        [method,alias].map(function (k) { return Logger[k] = (Logger.prototype[k] = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(alias);
            Logger.print.apply(this, args);
        }); });
    });
})();

return Logger;

})));
