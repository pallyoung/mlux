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