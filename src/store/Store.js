'use strict'
import EventEmitter from './../EventEmitter';
import util from './../util';
import Event from './../Event';
import constants from './../constants';

var {
    isObject,
    isArray,
    isFunction,
    isSameType,
    noop,
    promiseNoop,
    forEach,
}  = util;

/**
 * @store config
 * 
 * {
 *  name:''
 *  model:{},
 *  flow:[],
 *  onflow:function(){
 *  },
 *  pump:function(){
 *  },
 *  onwillunload:function(){
 *  },
 *  onload:function(){
 *  },
 *  storage:true|false,
 *  manager:storeManager,
 *  eventEmitter:new EventEmitter(),
 *  timeoutHandles:{
 *    change: undefined
 *  }
 *  
 * 
 * }
 */
// var _storeConfigContainer = {

// }
// function setStoreConfigByConfig(config,storeManager) {
//     var storeConfig = {
//         model: {},
//         flow: [],
//         onflow: function () {
//         },
//         pump: function () {
//         },
//         onwillunload: function () {
//         },
//         onload: function () {
//         },
//         storage: true | false,
//         manager: storeManager,
//         eventEmitter: new EventEmitter(),
//         timeoutHandles: {
//             change: undefined
//         }
//     }
// }

function flowTo(flow, upstream, storeManager) {
    if (isArray(flow)) {
        flow.forEach(function (storeName) {
            let store = storeManager[storeName];
            let event = new Event(Event.CHANGE, upstream);
            store.onFlow(event);
        });
    }
}
function setValue(model, key, value) {
    if (model[key] !== undefined && model[key] !== value && isSameType(model[key], value)) {
        model[key] = value;
        return true;
    }
    return false;
}
function extend(dst, source) {
    if (isObject(source)) {
        forEach(source, (v, key) => {
            setValue(dst, key, v);
        });
    }
    return dst;
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
    var model = {

    };
    Object.assign(model, config.model);

    class Store {
        constructor() {
        }
        getStoreName() {
            return name;
        }
        get(key) {
            var result = model[key];
            if (isArray(result)) {
                return result.slice();
            } else if (isObject(result)) {
                return Object.assign({}, result);
            }
            return result;
        }
        set(key, value) {
            if (setValue(model, key, value)) {
                this.notifyChange();
                return true;
            };
            return false;
        }
        assign(...args) {
            for (var i = 0, l = args.length; i < l; i++) {
                extend(model, args[i]);
            }
            this.notifyChange();
            return this;
        }
        //复制store中的值
        copy() {
            var dst = {}
            forEach(model, function (v, key) {
                dst[key] = v;
            });
            return dst;
        }
        //遍历
        forEach(callback) {
            forEach(model, (v, key) => {
                callback(v, key, this);
            });
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
        notifyChange() {
            clearTimeout(timeoutHandles.change);
            timeoutHandles.change = setTimeout(() => {
                var event = new Event(Event.CHANGE, this);
                eventEmitter.emit(Event.CHANGE, event);
                manager.emit(Event.CHANGE, event);
                if (storage) {
                    manager.syncStorage(name, this.copy());
                }
                flowTo(flow, this, manager);
            }, 10);

        }
        //hook
        onWillUnload() {
            clearTimeout(timeoutHandles.change);
            onwillunload();
        }
        //hook
        onFlow(event) {
            if (isFunction(onflow)) {
                onflow.call(this, event);
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

