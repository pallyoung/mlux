'use strict'
import {
    isNative
} from './util';
var hasDontEnumBug = !{
    'toString': null
}.propertyIsEnumerable('toString');
var hasProtoEnumBug = function () { }.propertyIsEnumerable('prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var dontEnumsLength = dontEnums.length;
var ohasOwn = Object.prototype.hasOwnProperty;
if (!isNative(Object.keys)) {
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
    }
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
    return Function('value', 'return new ' + type.replace(type[0], type[0].toUpperCase()) + '(value)')(value)
}
if (!isNative(Object.assign)) {
    Object.assign = function (dst, ...args) {
        if (dst === null || dst === undefined) {
            throw new Error(' Cannot convert undefined or null to object');
        }
        dst = boxing(typeof dst, dst);
        for (var i = 0, l = args.length; i < l; i++) {
            var source = args[i];
            assign(dst, source);
        }
        return dst;
    }
}