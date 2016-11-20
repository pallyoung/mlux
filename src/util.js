'use strict'
function isObject(source){
    return !Array.isArray(source)&& typeof source == 'object';
}
function isArray(source){
    return Array.isArray(source);
}
function isFunction(source){
    return typeof source === 'function';
}
function isSameType(s1,s2){
    return Object.prototype.toString.call(s1)===Object.prototype.toString.call(s2);
}
export {
    isObject,
    isArray,
    isFunction,
    isSameType
}