'use strict'
import TypeDetector from 'js-type-detector';
var type = TypeDetector.is;
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
    return !Array.isArray(source) && source != null && typeof source == 'object';
}
function isPlainObject(source){
    return typeof source === 'object' && (source.constructor === Object ||source.constructor === undefined);
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
    return (/\[native code\]/.test(fn));
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
            })
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
function noop() {

}
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
export {
    type,
    isObject,
    isArray,
    isFunction,
    isSameType,
    isEmpty,
    isNull,
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNative,
    noop,
    promiseNoop,
    defineProperty,
    sealProperty,
    freezeProperty,
    immutableProperty,
    preventExtensions,
    forEach,
    isPlainObject
}