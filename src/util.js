'use strict'
function isObject(source){
    return !Array.isArray(source)&& source!=null && typeof source == 'object';
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
function isNull(source){
    return source!=null;
}
function isEmpty(source){
    if(isArray(source)&&source.length==0){
        return true;
    }
    if(isObject(source)&&Object.keys(source).length==0){
        return true;
    }
    if(source==null){
        return true;
    }
    if(source==''){
        return true;
    }
    return false;
}
export {
    isObject,
    isArray,
    isFunction,
    isSameType
}