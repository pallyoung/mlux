'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
import emptyMethod from './../emptyMethod';
import equlas from './../equlas';
import observer from './../Observer';
import {
    isObject,
    isArray,
    isFunction,
    isSameType
} from './../util';

function isNative(fn) {
    return (/\[native code\]/.test(fn));
}
var hasDontEnumBug = !{
    'toString': null
}.propertyIsEnumerable('toString');
var hasProtoEnumBug = function () { }.propertyIsEnumerable('prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var dontEnumsLength = dontEnums.length;
var keys = Object.keys || function (object) {
    var theKeys = [];
    var skipProto = hasProtoEnumBug && typeof object === 'function';
    if (typeof object === 'string' || object && object.callee) {
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
var assign = Object.assign || function (dst, source) {
    if (!isObject(dst) || !isObject(source)) {
        throw new Error('the arguments of assign must be object');
    }
    var sourceKeys = keys(source);
    sourceKeys.forEach(function (name) {
        dst[name] = source[name];
    });
    return dst;

}
function sealProperty(object, property) {
    Object.defineProperty(object, property, {
        value: object[property],
        writable: true,
        enumerable: false,
        configurable: false
    });
}

function createStore(config, manager) {
    var store = new Store(config, manager);
    Object.defineProperty(manager, config.name, {
        value: store,
        writable: false,
        configurable: true,
        enumerable: true
    });
    Object.preventExtensions(store);
    return store;
}
//整合多个异步一起回调
function TaskRunner() {

}

//todo:脏值检测
class StoreManager extends EventEmitter {
    constructor() {
        super();
        this.storageTool = {
            setter: emptyMethod,
            getter: emptyMethod
        }
        for (let o in this) {
            sealProperty(this, o)
        }
    }
    setStorageTool(tool) {
        /**
         * setter(name,value) return promise
         * getter(name) return promise
         */
        this.storageTool = tool;
    }
    notifyChange(storeName) {
        var store = this[storeName];
        store.notifyChange();
        this.emit('change', storeName);
    }
    store(config) {
        if (config.storage) {
            return this.syncStorage(config.name).then((cache) => {
                if (isObject(cache)) {
                    for (let o in config.data) {
                        if (cache[o])
                            config.data[o] = cache[o];
                    }
                }
                return createStore(config, this);
            });
        } else {
            return Promise.resolve(createStore(config, this))
        }
    }
    /**
     * 
     * 
     * @param {any|array} config 
     * @returns 
     * 
     * @memberOf StoreManager
     */
    register(config) {
        if (isArray(config)) {
            var c = config.pop();
            if (c ) {
                return this.store(c).then(()=>{
                    return this.register(config);
                })
            }else{
                return Promise.resolve();
            }
        }else{
            return this.store(c);
        }


    }
    unregister(name) {
        var store = this[name];
        //移除所有监听事件
        store.removeAllListeners();
        delete this[name];
    }
    /**
     * 
     * 
     * @param {any} name 
     * @param {any} value 
     * @returns Promise
     * 
     * @memberOf StoreManager
     */
    syncStorage(name, value) {
        if (value) {
            return this.storageTool.setter(name, value);
        } else {
            return this.storageTool.getter(name);
        }
    }

    flow(flowIn, flows) {
        flows.forEach((storeName) => {
            let store = this[storeName];
            if (store.onFlow) {
                store.onFlow(flowIn);
            }
        })
    }

}
var manager = new StoreManager();
export default manager;