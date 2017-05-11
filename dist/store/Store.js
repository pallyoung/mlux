'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = StoreFactory;

var _EventEmitter = require('./../EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _util = require('./../util');

var _util2 = _interopRequireDefault(_util);

var _Event = require('./../Event');

var _Event2 = _interopRequireDefault(_Event);

var _constants = require('./../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isObject = _util2.default.isObject,
    isArray = _util2.default.isArray,
    isFunction = _util2.default.isFunction,
    isSameType = _util2.default.isSameType,
    noop = _util2.default.noop,
    promiseNoop = _util2.default.promiseNoop,
    _forEach = _util2.default.forEach;

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
            var store = storeManager[storeName];
            var event = new _Event2.default(_Event2.default.CHANGE, upstream);
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
        _forEach(source, function (v, key) {
            setValue(dst, key, v);
        });
    }
    return dst;
}
function StoreFactory(config, storeManager) {
    if (!isObject(config.model)) {
        throw new Error('initialize ' + config.name + ' error, model can noly be an object');
    }
    var name = config.name;
    var flow = config.flow || [];
    var onflow = config.onflow || noop;
    var _pump = config.pump;
    var onwillunload = config.onwillunload || noop;
    var onload = config.onload || noop;
    var storage = config.storage || false;
    var manager = storeManager;
    var eventEmitter = new _EventEmitter2.default();
    var timeoutHandles = {
        change: undefined
    };
    var model = {};
    Object.assign(model, config.model);

    var Store = function () {
        function Store() {
            _classCallCheck(this, Store);
        }

        _createClass(Store, [{
            key: 'getStoreName',
            value: function getStoreName() {
                return name;
            }
        }, {
            key: 'get',
            value: function get(key) {
                var result = model[key];
                if (isArray(result)) {
                    return result.slice();
                } else if (isObject(result)) {
                    return Object.assign({}, result);
                }
                return result;
            }
        }, {
            key: 'set',
            value: function set(key, value) {
                if (setValue(model, key, value)) {
                    this.notifyChange();
                    return true;
                };
                return false;
            }
        }, {
            key: 'assign',
            value: function assign() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                for (var i = 0, l = args.length; i < l; i++) {
                    extend(model, args[i]);
                }
                this.notifyChange();
                return this;
            }
            //复制store中的值

        }, {
            key: 'copy',
            value: function copy() {
                var dst = {};
                _forEach(model, function (v, key) {
                    dst[key] = v;
                });
                return dst;
            }
            //遍历

        }, {
            key: 'forEach',
            value: function forEach(callback) {
                var _this = this;

                _forEach(model, function (v, key) {
                    callback(v, key, _this);
                });
            }
        }, {
            key: 'addListener',
            value: function addListener(type, listener) {
                return eventEmitter.addListener(type, listener);
            }
        }, {
            key: 'removeListener',
            value: function removeListener() {
                return eventEmitter.removeListener.apply(eventEmitter, arguments);
            }
        }, {
            key: 'removeAllListeners',
            value: function removeAllListeners() {
                return eventEmitter.removeAllListeners.apply(eventEmitter, _toConsumableArray(args));
            }
        }, {
            key: 'notifyChange',
            value: function notifyChange() {
                var _this2 = this;

                clearTimeout(timeoutHandles.change);
                timeoutHandles.change = setTimeout(function () {
                    var event = new _Event2.default(_Event2.default.CHANGE, _this2);
                    eventEmitter.emit(_Event2.default.CHANGE, event);
                    manager.emit(_Event2.default.CHANGE, event);
                    if (storage) {
                        manager.syncStorage(name, _this2.copy());
                    }
                    flowTo(flow, _this2, manager);
                }, 10);
            }
            //hook

        }, {
            key: 'onWillUnload',
            value: function onWillUnload() {
                clearTimeout(timeoutHandles.change);
                onwillunload();
            }
            //hook

        }, {
            key: 'onFlow',
            value: function onFlow(event) {
                if (isFunction(onflow)) {
                    onflow.call(this, event);
                }
            }
            //从一个特定的地方获取值

        }, {
            key: 'pump',
            value: function pump() {
                var _this3 = this;

                if (isFunction(_pump)) {
                    return _pump.apply(undefined, arguments).then(function (data) {
                        _this3.assign(data);
                        return _this3;
                    });
                } else {
                    return promiseNoop();
                }
            }
        }]);

        return Store;
    }();

    return new Store();
}