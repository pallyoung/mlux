'use strict'
import StoreManager from './store/StoreManager';
import Store from './store/Store';
import {
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
    isUndefined
} from './util';
import equlas from './equlas';
var module = {
    StoreManager,
    equlas,
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
    Store
}

function createStore(config){
    config.storage = false;
    return new Store(config,StoreManager);
}
export {
    module as default,
    equlas,
    StoreManager,
    createStore,
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
    isUndefined
}