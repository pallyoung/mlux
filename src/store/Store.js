'use strict'
import EventEmitter from './../EventEmitter';
import emptyMethod from './../emptyMethod';
import {
    isObject,
    isArray,
    isFunction,
} from './../util';

import observer from './../Observer';

/**
 * todo
 */
const EVENT_CHNAGE = 'change';//数据发生改变
const EVENT_ERROR = 'error';//操作失败
const EVENT_STORAGE = 'storage';//存储
const EVENT_GET = 'get';//获取
const EVENT_SET = 'get';//获取

function observerCallback(store) {
    store.notifyChange();
}
export default class Store extends EventEmitter {
    constructor(config, storeManager) {
        super();
        if (!isObject(config.data)) {
            throw new Error('initialize ' + config.name + ' error, data can noly be an object');
        }
        this.name = config.name;
        this._flow = config.flow;
        this._onFlow = config.onFlow;
        this._pump = config.pump;
        //是否同步到本地
        this._storage = config.storage;
        this._manager = storeManager;
        this._timeout;

        for (let o in this) {
            Object.defineProperty(this, o, {
                value: this[o],
                writable: false,
                enumerable: false,
                configurable: false
            })
        }
        Object.defineProperty(this, '_timeout', {
            value: undefined,
            writable: true,
            enumerable: false,
            configurable: false
        })
        for (let o in config.data) {
            this[o] = config.data[o];
        }
        observer(this, observerCallback);
    }
    notifyChange() {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {
            if (this._storage) {
                this.manager.syncStorage(this.name, this.copy());
            }
            this.emit(EVENT_CHNAGE);
            this._manager.emit(EVENT_CHNAGE, this.name);
        }, 10);

    }
    copy() {
        var dst = {}
        for (let o in this) {
            dst[o] = this[o];
        }
        return dst;
    }
    assign(data){
        for(var o in data){
            if(this[o]&&isSameType(this[o],data[o])){
                this[o] = data[o]
            }
        }
    }
    pump(...args){
        if(isFunction(this._pump)){
            return this._pump(...args).then((data)=>{
                this.assign(data);
                return this;
            })
        }else {
            return new Promise(function(res,rej){
                res(this);
            })
        }
    }
    // setter(data) {
    //     if (this.storage) {
    //         this.manager.syncStorage(this.name, data);
    //     }
    //     this.data = data;
    // }
    /**
     * 
     * 
     * @param {any} args
     * @returns
     * 
     * @memberOf Store
     * @获取流程
     * 
     * 
     */
    // getter() {
    //     return this.data;
    // }
}