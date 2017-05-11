'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = require('./util');

var hasDontEnumBug = !{
    'toString': null
}.propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var dontEnumsLength = dontEnums.length;
var ohasOwn = Object.prototype.hasOwnProperty;
if (!(0, _util.isNative)(Object.keys)) {
    Object.keys = function (object) {
        if (object === null || object === undefined) {
            throw new Error(' Cannot convert undefined or null to object');
        }
        var theKeys = [];
        var skipProto = hasProtoEnumBug && typeof object === 'function';
        if (typeof object === 'string' || object && object.length) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        } else {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && ohasOwn.call(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    };
}
function assign(dst, source) {
    if (dst === null || dst === undefined) {
        throw new Error(' Cannot convert undefined or null to object');
    }
    if (source === null || source === undefined) {
        return;
    }
    var keys = Object.keys(source);

    for (var i = 0, l = keys.length; i < l; i++) {
        dst[keys[i]] = source[keys[i]];
    }
}
function boxing(type, value) {
    return Function('value', 'return new ' + type.replace(type[0], type[0].toUpperCase()) + '(value)')(value);
}
if (!(0, _util.isNative)(Object.assign)) {
    Object.assign = function (dst) {
        if (dst === null || dst === undefined) {
            throw new Error(' Cannot convert undefined or null to object');
        }
        dst = boxing(typeof dst === 'undefined' ? 'undefined' : _typeof(dst), dst);

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        for (var i = 0, l = args.length; i < l; i++) {
            var source = args[i];
            assign(dst, source);
        }
        return dst;
    };
}