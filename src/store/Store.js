'use strict'
import EventEmitter from './../EventEmitter';
import {
    isObject,
    isArray,
    isFunction,
    isSameType,
    noop,
    promiseNoop,
    defineProperty,
    sealProperty,
    forEach,
    freezeProperty
} from './../util';

import constants from './../constants';
var Event = constants.EVNET;
import observer from './../Observer';

/**
 * todo
 */


function observerCallback(store) {
    store.notifyChange();
}
var DONT_ENMU_KEYS = [
    '_timeout',
    'name',
    '_flow',
    'onflow',
    '_storage',
    '_manager',
    '_pump',
    'notifyChange',
    'copy',
    'assign',
    'pump',
    'flowTo',
    'onFlow',
    '_extends',
    'onWillUnload',
    '_onwillunload',
    '_clearTimeout',
    '_timeoutHandles'
];
export default class Store extends EventEmitter {
    constructor(config, storeManager) {
        super();
        if (!isObject(config.model)) {
            throw new Error('initialize ' + config.name + ' error, model can noly be an object');
        }
        this.name = config.name;
        this._flow = config.flow || [];
        this._onflow = config.onflow || noop;
        this._pump = config.pump;
        this._onwillunload = config.onwillunload || noop;
        this._onload = config.onload || noop;
        //是否同步到本地
        this._storage = config.storage || false;
        this._manager = storeManager;
        
        this._timeoutHandles = {
            change: undefined
        }
        forEach(this,function(v,key,self){
            freezeProperty(self, key);
        });
        
        for (let o in config.model) {
            this[o] = config.model[o];
        }
        observer(this, observerCallback);
    }


    _extends(source) {
        if (!isObject(source)) {
            return this;
        }
        Object.keys(source).forEach((key) => {
            if (DONT_ENMU_KEYS.indexOf(key)) {
                return;
            }
            let oldValue = this[key];
            let newValue = source[key];
            if (!oldValue || oldValue === newValue || !isSameType(newValue, oldValue)) {
                return;
            }
            this[key] = newValue;
        });
    }
    copy() {
        var dst = {}
        forEach(this,DONT_ENMU_KEYS,function(v,key){
            dst[key] = v;
        });
        return dst;
    }

    assign(...args) {
        for (var i = 0, l = args.length; i < l; i++) {
            this._extends(args[i]);
        }
        return this;
    }
    pump(...args) {
        if (isFunction(this._pump)) {
            return this._pump(...args).then((data) => {
                this.assign(data);
                return this;
            })
        } else {
            return new Promise(function (res, rej) {
                res(this);
            })
        }
    }
    notifyChange() {
        clearTimeout(this._timeoutHandles.change);
        this._timeoutHandles.change = setTimeout(() => {
            if (this._storage) {
                this._manager.syncStorage(this.name, this.copy());
            }
            this.flowTo();
            this.emit(Event.CHANGE);
            this._manager.emit(Event.CHANGE, this.name);
        }, 10);

    }
    flowTo() {
        if (isArray(this._flow)) {
            this._flow.forEach((storeName) => {
                let store = this._manager[storeName];
                store.onFlow(this);
            });
        }
    }
    onFlow(store) {
        if (isFunction(this._onflow)) {
            this._onFlow(store);
        }
    }
    onWillUnload() {
        clearTimeout(this._timeoutHandles.change);
        this._onwillunload();
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