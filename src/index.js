'use strict'
import StoreManager from './store/StoreManager';
import Store from './store/Store';
import Binder from './Binder';
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
var module = {
    StoreManager,
    Binder,
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
    return new Store(config,manager);
}
export {
    module as default,
    StoreManager,
    createStore,
    Binder,
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