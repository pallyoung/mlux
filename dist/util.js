'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var testFunctionName = /function\s+(\w+)\s*\(/;
var OPToString = Object.prototype.toString;
function type(object) {
    var type = OPToString.call(object).slice(8, -1);
    if (type !== 'Object') {
        return type;
    } else if (typeof object.constructor === 'function' && testFunctionName.test(object.constructor.toString())) {
        type = RegExp.$1;
        return type;
    }
    return type;
}
function isString(source) {
    return type(source) === 'string';
}
function isNumber(source) {
    return type(source) === 'number';
}
function isBoolean(source) {
    return type(source) === 'boolean';
}
function isUndefined(source) {
    return type(source) === 'undefined';
}
function isObject(source) {
    return !Array.isArray(source) && source != null && (typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object';
}
function isPlainObject(source) {
    return (typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' && (source.constructor === Object || source.constructor === undefined);
}
function isArray(source) {
    return Array.isArray(source);
}
function isFunction(source) {
    return typeof source === 'function';
}
function isSameType(s1, s2) {
    return type(s1) === type(s2);
}
function isNull(source) {
    return source != null;
}
function isEmpty(source) {
    if (isArray(source) && source.length == 0) {
        return true;
    }
    if (isObject(source) && Object.keys(source).length == 0) {
        return true;
    }
    if (source == null) {
        return true;
    }
    if (source == '') {
        return true;
    }
    return false;
}
function isNative(fn) {
    return (/\[native code\]/.test(fn)
    );
}

function forEach(source, filter, callback) {
    var keys = [];
    if (isFunction(filter)) {
        callback = filter;
        filter = [];
    }
    if (!isFunction(callback)) {
        return;
    }
    if (isArray(source) || isObject(source)) {
        keys = Object.keys(source);
        if (!isArray(filter)) {
            keys.forEach(function (v) {
                callback(source[v], v, source);
            });
        } else {
            keys.forEach(function (v) {
                //不需要过滤
                if (filter.indexOf(v) < 0) {
                    callback(source[v], v, source);
                }
            });
        }
    }
}
function noop() {}
function promiseNoop() {
    return Promise.resolve();
}
/**
 * 
 * 
 */
/**
 * 
 * 
 * @param {any} object 
 * @param {any} property 
 * @param {any} config 
 * @returns 
 */
function defineProperty(object, property, config) {
    return Object.defineProperty(object, property, config);
}
function freezeProperty(object, property) {
    defineProperty(object, property, {
        value: object[property],
        writable: false,
        enumerable: false,
        configurable: false
    });
}
function sealProperty(object, property) {
    defineProperty(object, property, {
        value: object[property],
        writable: true,
        enumerable: false,
        configurable: false
    });
}
function immutableProperty(object, property) {
    defineProperty(object, property, {
        value: object[property],
        writable: false,
        enumerable: true,
        configurable: true
    });
}
function preventExtensions(object) {
    return Object.preventExtensions(object);
}
module.exports = {
    type: type,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    isSameType: isSameType,
    isEmpty: isEmpty,
    isNull: isNull,
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isUndefined: isUndefined,
    isNative: isNative,
    noop: noop,
    promiseNoop: promiseNoop,
    defineProperty: defineProperty,
    sealProperty: sealProperty,
    freezeProperty: freezeProperty,
    immutableProperty: immutableProperty,
    preventExtensions: preventExtensions,
    forEach: forEach,
    isPlainObject: isPlainObject
};