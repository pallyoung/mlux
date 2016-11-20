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

function observerCallback(store){
    store.notifyChange();
}
export default class Store extends EventEmitter {
    constructor(config, storeManager) {
        super();
        if(!isObject(config.data)){
            throw new Error( 'initialize '+config.name+' error, data can noly be an object');
        }
        this._name = config.name;
        this._flow = config.flow;
        this._onFlow = config.onFlow;
        this.pump = config.pump;
        //是否同步到本地
        this._storage = config.storage;
        this._manager = storeManager;
        this._timeout;

        for(let o in this){
            Object.defineProperty(this,o,{
                value:this[o],
                writable:false,
                enumerable:false,
                configurable:false
            })
        }
        for(let o in config.data){
            this[o] = config.data[o];
        }
        observer(this,observerCallback);
    }
    notifyChange() {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {
            if(this.storage){
                this.manager.syncStorage(this._name, this.copy());
            }
            this.emit(EVENT_CHNAGE);
            this.manager.emit(EVENT_CHNAGE, this._name);
        }, 10);

    }
    copy(){
        var dst = {}
        for(let o in this){
            dst[o] = this[o];
        }
        return dst;
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