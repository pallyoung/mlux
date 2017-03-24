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
    '_name',
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
class BaseStore {
    constructor() {
    }
    _extends(source) {
        if (!isObject(source)) {
            return this;
        }
        forEach(source, (v, key) => {
            this.set(key, v);
        });
    }
    //复制store中的值
    copy() {
        var dst = {}
        forEach(this, function (v, key) {
            dst[key] = v;
        });
        return dst;
    }
    //遍历
    forEach(callback) {
        forEach(this, (v, key) => {
            callback(v, key, this);
        })
    }
    assign(...args) {
        for (var i = 0, l = args.length; i < l; i++) {
            this._extends(args[i]);
        }
        return this;
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
export default function StoreFactory(config, storeManager) {
    if (!isObject(config.model)) {
        throw new Error('initialize ' + config.name + ' error, model can noly be an object');
    }
    var name = config.name;
    var flow = config.flow || [];
    var onflow = config.onflow || noop;
    var pump = config.pump;
    var onwillunload = config.onwillunload || noop;
    var onload = config.onload || noop;
    var storage = config.storage || false;
    var manager = storeManager;
    var eventEmitter = new EventEmitter();
    var timeoutHandles = {
        change: undefined
    }
    class Store extends BaseStore {
        constructor() {
            super();
            for (let o in config.model) {
                this[o] = config.model[o];
            }
            observer(this, observerCallback);
        }
        getStoreName() {
            return name;
        }
        addListener(type, listener) {
            return eventEmitter.addListener(type, listener);
        }
        removeListener(...args) {
            return eventEmitter.removeListener(...args);
        }
        removeAllListeners() {
            return eventEmitter.removeAllListeners(...args);
        }
        emit(type, ...args) {
            return eventEmitter.emit(type, ...args);
        }
        notifyChange() {
            clearTimeout(timeoutHandles.change);
            timeoutHandles.change = setTimeout(() => {
                this.emit(Event.CHANGE);
                manager.emit(Event.CHANGE, name);
                if (storage) {
                    manager.syncStorage(name, this.copy());
                }
                this.flowTo();
            }, 10);

        }
        onWillUnload() {
            clearTimeout(timeoutHandles.change);
            onwillunload();
        }
        flowTo() {
            if (isArray(flow)) {
                flow.forEach((storeName) => {
                    let store = manager[storeName];
                    store.onFlow(this);
                });
            }
        }
        onFlow(store) {
            if (isFunction(onflow)) {
                onFlow(store).call(this);
            }
        }
        //从一个特定的地方获取值
        pump(...args) {
            if (isFunction(pump)) {
                return pump(...args).then((data) => {
                    this.assign(data);
                    return this;
                })
            } else {
                return promiseNoop();
            }
        }
    }
    return new Store();
}

