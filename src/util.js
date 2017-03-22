'use strict'
function type(source) {
    var typeString = Object.prototype.toString.call(source);
    return typeString.slice(8, -1).toLowerCase();
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
    return !Array.isArray(source) && source != null && typeof source == 'object';
}
function isArray(source) {
    return Array.isArray(source);
}
function isFunction(source) {
    return typeof source === 'function';
}
function isSameType(s1, s2) {
    return Object.prototype.toString.call(s1) === Object.prototype.toString.call(s2);
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
    isNative
}