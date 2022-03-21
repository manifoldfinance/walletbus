(function (global, bindFn) {
    'use strict';
    if (!global.console) {
        global.console = {};
    }
    var con = global.console;
    var prop, method;
    var dummy = function () {};
    var properties = ['memory'];
    var methods = (
        'assert,clear,count,debug,dir,dirxml,error,exception,group,' +
        'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
        'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn,timeLog'
    ).split(',');
    while ((prop = properties.pop()))
        if (!con[prop]) con[prop] = {};
    while ((method = methods.pop())) {
        if (!con[method]) con[method] = dummy;
        else if (bindFn && typeof con[method] === 'object') con[method] = bindFn.call(con[method], con);
    }
    // Using `this` for web workers & supports Browserify / Webpack.
})(typeof window === 'undefined' ? this : window, Function.prototype.bind);
