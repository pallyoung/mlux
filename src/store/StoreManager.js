'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
import equlas from './../equlas';
import observer from './../Observer';
import {
    isObject,
    isArray,
    isFunction,
    isSameType,
    promiseNoop,
    sealProperty,
    forEach,
    freezeProperty,
    immutableProperty,
    preventExtensions
} from './../util';





function createStore(config, manager) {
    var store = new Store(config, manager);
    manager[config.name] = store;
    immutableProperty(manager, config.name);
    preventExtensions(store);
    return store;
}

//todo:脏值检测
class StoreManager extends EventEmitter {
    constructor() {
        super();
        for (let o in this) {
            freezeProperty(this, o)
        }
        this.storageTool = {
            setter: promiseNoop,
            getter: promiseNoop
        }
    }
    setStorageTool(tool) {
        /**
         * setter(name,value) return promise
         * getter(name) return promise
         */
        this.storageTool = tool;
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
     * 
     * @param {any|array} config 
     * @returns 
     * 
     * @memberOf StoreManager
     */
    load(config) {
        if (isArray(config)) {
            var c = config.pop();
            if (c) {
                return this.store(c).then(() => {
                    return this.load(config);
                })
            } else {
                return Promise.resolve();
            }
        } else {
            return this.store(c);
        }


    }
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