!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Logger=t()}(this,function(){var e=[],t={mute:!1,all:!1},n=function n(o){for(var i=arguments.length,r=Array(i);i--;)r[i]=arguments[i];this instanceof n?(this.__instance_name__=o||"",t.all&&(this.mute=t.mute),e.push(this)):n.print.apply(n,[""].concat(r))},o={NAME:{configurable:!0},mute:{configurable:!0}};return o.NAME.get=function(){return this.__instance_name__},n.mute=function(n,o){if((t={mute:!!n,all:!!o}).all)for(var i=0,r=e;i<r.length;i+=1){r[i].mute=t.mute}},o.mute.get=function(){return this.__mute__},o.mute.set=function(e){this.__mute__=e},n.print=function(e){for(var o,i=[],r=arguments.length-1;r-- >0;)i[r]=arguments[r+1];switch(e){case"w":o={icon:"✋",method:"warn"};break;case"i":o={icon:"ℹ️",method:"info"};break;case"d":o={icon:"🐛",method:void 0!==console.debug?"debug":"log"};break;case"e":o={icon:"‼️",method:"error"};break;case"l":default:o={icon:"👀",method:"log"}}if(this instanceof n){if(this.mute)return}else if(t.mute)return;return console[o.method].apply(console,["[~ "+o.icon+" "+(this.NAME||"")+" ~]"].concat(i))},Object.defineProperties(n.prototype,o),["log","warn","info","error","debug"].map(function(e){var t=e[0];[e,t].map(function(e){return n[e]=n.prototype[e]=function(){var e=Array.prototype.slice.call(arguments);e.unshift(t),n.print.apply(this,e)}})}),n});