'use strict'
import EventEmitter from './../EventEmitter';
import StoreFactory from './Store';
import equlas from './../equlas';
import observer from './../Observer';
import util from './../util';

var {
    isObject,
    isArray,
    isFunction,
    isSameType,
    promiseNoop,
    sealProperty,
    forEach,
} = util;
var storageTool = {
    setter: promiseNoop,
    getter: promiseNoop
}
var eventEmitter = new EventEmitter();


//todo:脏值检测
class StoreManager {
    constructor() {

    }
    addListener(...args) {
        eventEmitter.addListener(...args);
    }
    removeListener(...args) {
        eventEmitter.removeListener(...args);
    }
    removeAllListeners(...args) {
        eventEmitter.removeListener(...args);
    }
    emit(...args) {
        eventEmitter.emit(...args);
    }

    setStorageTool(tool) {
        storageTool = tool;
    }
    store(config) {
        if (config.storage) {
            return this.syncStorage(config.name).then((cache) => {
                if (isObject(cache)) {
                    for (let o in config.model) {
                        if (cache[o])
                            config.model[o] = cache[o];
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
     * @param {object|array} config 
     * @returns 
     * 
     * @memberOf StoreManager
     */
    load(configs) {
        if (isArray(configs)) {
            var config= configs.pop();
            if (config) {
                return this.store(config).then(() => {
                    return this.load(configs);
                })
            } else {
                return Promise.resolve();
            }
        } else {
            return this.store(configs);
        }
    }
    /**
     * 
     * @param {string|array} name 
     * 
     * @memberOf StoreManager
     */
    unload(name) {
        var store = this[name];
        store.onWillUnload();
        //移除所有监听事件
        store.removeAllListeners();
        delete this[name];
    }
    /**
     * 
     * 
     * @param {string} name 
     * @param {any} value 
     * @returns Promise
     * 
     * @memberOf StoreManager
     */
    syncStorage(name, value) {
        if (value) {
            return storageTool.setter(name, value);
        } else {
            return storageTool.getter(name);
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


function createStore(config, manager) {
    var store = StoreFactory(config, manager);
    manager[config.name] = store;
    //immutableProperty(manager, config.name);
    return store;
}
var manager = new StoreManager();


module.exports =  manager;