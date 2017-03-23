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
    '_timeoutHandles',
    'set',
    'get'
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
        forEach(this, function (v, key, self) {
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
        forEach(source, DONT_ENMU_KEYS, (v, key) => {
            this.set(key,v);
        });
    }
    //复制store中的值
    copy() {
        var dst = {}
        forEach(this, DONT_ENMU_KEYS, function (v, key) {
            dst[key] = v;
        });
        return dst;
    }
    //遍历
    forEach(callback) {
        forEach(this, DONT_ENMU_KEYS, (v, key) => {
            callback(v, key, this);
        })
    }
    assign(...args) {
        for (var i = 0, l = args.length; i < l; i++) {
            this._extends(args[i]);
        }
        return this;
    }
    //从一个特定的地方获取值
    pump(...args) {
        if (isFunction(this._pump)) {
            return this._pump(...args).then((data) => {
                this.assign(data);
                return this;
            })
        } else {
            return promiseNoop();
        }
    }
    notifyChange() {
        clearTimeout(this._timeoutHandles.change);
        this._timeoutHandles.change = setTimeout(() => {
            this.emit(Event.CHANGE);
            this._manager.emit(Event.CHANGE, this.name);
            if (this._storage) {
                this._manager.syncStorage(this.name, this.copy());
            }
            this.flowTo();
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
    set(key, value) {
        let oldValue = this[key];
        if (!oldValue || oldValue === value || !isSameType(value, oldValue)) {
            return false;
        }
        this[key] = value;
        this.notifyChange();
        return true;
    }
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
    get(key) {
        return this[key];
    }
}