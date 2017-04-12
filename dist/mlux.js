(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Mlux", [], factory);
	else if(typeof exports === 'object')
		exports["Mlux"] = factory();
	else
		root["Mlux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPlainObject = exports.forEach = exports.preventExtensions = exports.immutableProperty = exports.freezeProperty = exports.sealProperty = exports.defineProperty = exports.promiseNoop = exports.noop = exports.isNative = exports.isUndefined = exports.isBoolean = exports.isNumber = exports.isString = exports.isNull = exports.isEmpty = exports.isSameType = exports.isFunction = exports.isArray = exports.isObject = exports.type = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jsTypeDetector = __webpack_require__(6);

var _jsTypeDetector2 = _interopRequireDefault(_jsTypeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var type = _jsTypeDetector2.default.is;
function isString(source) {
    return type(source) === 'string';
}
function isNumber(source) {
    return type(source) === 'number';
}
function isBoolean(source) {
    return type(source) === 'boolean';
}
function isUndefined(source) {
    return type(source) === 'undefined';
}
function isObject(source) {
    return !Array.isArray(source) && source != null && (typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object';
}
function isPlainObject(source) {
    return (typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' && (source.constructor === Object || source.constructor === undefined);
}
function isArray(source) {
    return Array.isArray(source);
}
function isFunction(source) {
    return typeof source === 'function';
}
function isSameType(s1, s2) {
    return type(s1) === type(s2);
}
function isNull(source) {
    return source != null;
}
function isEmpty(source) {
    if (isArray(source) && source.length == 0) {
        return true;
    }
    if (isObject(source) && Object.keys(source).length == 0) {
        return true;
    }
    if (source == null) {
        return true;
    }
    if (source == '') {
        return true;
    }
    return false;
}
function isNative(fn) {
    return (/\[native code\]/.test(fn)
    );
}

function forEach(source, filter, callback) {
    var keys = [];
    if (isFunction(filter)) {
        callback = filter;
        filter = [];
    }
    if (!isFunction(callback)) {
        return;
    }
    if (isArray(source) || isObject(source)) {
        keys = Object.keys(source);
        if (!isArray(filter)) {
            keys.forEach(function (v) {
                callback(source[v], v, source);
            });
        } else {
            keys.forEach(function (v) {
                //不需要过滤
                if (filter.indexOf(v) < 0) {
                    callback(source[v], v, source);
                }
            });
        }
    }
}
function noop() {}
function promiseNoop() {
    return Promise.resolve();
}
/**
 * 
 * 
 */
/**
 * 
 * 
 * @param {any} object 
 * @param {any} property 
 * @param {any} config 
 * @returns 
 */
function defineProperty(object, property, config) {
    return Object.defineProperty(object, property, config);
}
function freezeProperty(object, property) {
    defineProperty(object, property, {
        value: object[property],
        writable: false,
        enumerable: false,
        configurable: false
    });
}
function sealProperty(object, property) {
    defineProperty(object, property, {
        value: object[property],
        writable: true,
        enumerable: false,
        configurable: false
    });
}
function immutableProperty(object, property) {
    defineProperty(object, property, {
        value: object[property],
        writable: false,
        enumerable: true,
        configurable: true
    });
}
function preventExtensions(object) {
    return Object.preventExtensions(object);
}
exports.type = type;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isSameType = isSameType;
exports.isEmpty = isEmpty;
exports.isNull = isNull;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isUndefined = isUndefined;
exports.isNative = isNative;
exports.noop = noop;
exports.promiseNoop = promiseNoop;
exports.defineProperty = defineProperty;
exports.sealProperty = sealProperty;
exports.freezeProperty = freezeProperty;
exports.immutableProperty = immutableProperty;
exports.preventExtensions = preventExtensions;
exports.forEach = forEach;
exports.isPlainObject = isPlainObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = StoreFactory;

var _EventEmitter = __webpack_require__(2);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _util = __webpack_require__(0);

var _Event = __webpack_require__(7);

var _Event2 = _interopRequireDefault(_Event);

var _constants = __webpack_require__(9);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    if ((0, _util.isArray)(flow)) {
        flow.forEach(function (storeName) {
            var store = storeManager[storeName];
            var event = new _Event2.default(_Event2.default.CHANGE, upstream);
            store.onFlow(event);
        });
    }
}
function setValue(model, key, value) {
    if (model[key] !== undefined && model[key] !== value && (0, _util.isSameType)(model[key], value)) {
        model[key] = value;
        return true;
    }
    return false;
}
function extend(dst, source) {
    if ((0, _util.isObject)(source)) {
        (0, _util.forEach)(source, function (v, key) {
            setValue(dst, key, v);
        });
    }
    return dst;
}
function StoreFactory(config, storeManager) {
    if (!(0, _util.isObject)(config.model)) {
        throw new Error('initialize ' + config.name + ' error, model can noly be an object');
    }
    var name = config.name;
    var flow = config.flow || [];
    var onflow = config.onflow || _util.noop;
    var _pump = config.pump;
    var onwillunload = config.onwillunload || _util.noop;
    var onload = config.onload || _util.noop;
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
                if ((0, _util.isArray)(result)) {
                    return result.slice();
                } else if ((0, _util.isObject)(result)) {
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
                (0, _util.forEach)(model, function (v, key) {
                    dst[key] = v;
                });
                return dst;
            }
            //遍历

        }, {
            key: 'forEach',
            value: function forEach(callback) {
                var _this = this;

                (0, _util.forEach)(model, function (v, key) {
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
                if ((0, _util.isFunction)(onflow)) {
                    onflow.call(this, event);
                }
            }
            //从一个特定的地方获取值

        }, {
            key: 'pump',
            value: function pump() {
                var _this3 = this;

                if ((0, _util.isFunction)(_pump)) {
                    return _pump.apply(undefined, arguments).then(function (data) {
                        _this3.assign(data);
                        return _this3;
                    });
                } else {
                    return (0, _util.promiseNoop)();
                }
            }
        }]);

        return Store;
    }();

    return new Store();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 1;
var PREFIX = 'RECEIVER_';

function token() {
    return PREFIX + ++id;
}

var Receiver = function () {
    function Receiver(channel, key) {
        _classCallCheck(this, Receiver);

        this._channel = channel;
        this._key = key;
    }

    _createClass(Receiver, [{
        key: 'remove',
        value: function remove() {
            this._channel.remove(this._key);
        }
    }]);

    return Receiver;
}();

var BordercastChannel = function () {
    function BordercastChannel() {
        _classCallCheck(this, BordercastChannel);

        this._listeners = {};
    }

    _createClass(BordercastChannel, [{
        key: 'emit',
        value: function emit() {
            for (var key in this._listeners) {
                var _listeners;

                (_listeners = this._listeners)[key].apply(_listeners, arguments);
            }
        }
    }, {
        key: 'addListener',
        value: function addListener(listener) {
            var key = token();
            this._listeners[key] = listener;
            return new Receiver(this, key);
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            delete this._listeners[key];
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners() {
            this._listeners = {};
        }
    }]);

    return BordercastChannel;
}();

var Bordercast = function () {
    function Bordercast() {
        _classCallCheck(this, Bordercast);

        this._channels = {};
    }

    _createClass(Bordercast, [{
        key: 'emit',
        value: function emit(type) {
            if (this._channels[type]) {
                var _channels$type;

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                (_channels$type = this._channels[type]).emit.apply(_channels$type, args);
            }
        }
    }, {
        key: 'addListener',
        value: function addListener(type, listener) {
            if (!this._channels[type]) {
                this._channels[type] = new BordercastChannel();
            }
            return this._channels[type].addListener(listener);
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(type) {
            if (type) {
                this._channels[type] && this._channels[type].removeAllListeners();
            } else {
                for (var channel in this._channels) {
                    this._channels[channel].removeAllListeners();
                }
            }
        }
    }]);

    return Bordercast;
}();

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._bordercast = new Bordercast();
    }

    _createClass(EventEmitter, [{
        key: 'addListener',
        value: function addListener(type, listener) {
            return this._bordercast.addListener(type, listener);
        }
    }, {
        key: 'removeListener',
        value: function removeListener(receiver) {
            receiver.remove();
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(type) {
            this._bordercast.removeAllListeners(type);
        }
    }, {
        key: 'emit',
        value: function emit(type) {
            var _bordercast;

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            (_bordercast = this._bordercast).emit.apply(_bordercast, [type].concat(args));
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = equlas;

var _util = __webpack_require__(0);

function equlas(s1, s2) {
    if (s1 == s2) {
        return true;
    }
    if (!(0, _util.isSameType)(s1, s2)) {
        return false;
    }
    if ((0, _util.isArray)(s1)) {
        if (s1.length !== s2.length) {
            return false;
        }
        for (var i = 1; i < s1.length; i++) {
            if (!equlas(s1[i], s2[i])) {
                return false;
            }
        }
        return true;
    }
    if ((0, _util.isObject)(s1)) {
        var keys1 = Object.keys(s1);
        var keys2 = Object.keys(s2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (var o in s1) {
            if (!equlas(s1[o], s2[o])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(0);

var hasDontEnumBug = !{
    'toString': null
}.propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var dontEnumsLength = dontEnums.length;
var ohasOwn = Object.prototype.hasOwnProperty;
if (!(0, _util.isNative)(Object.keys)) {
    Object.keys = function (object) {
        if (object === null || object === undefined) {
            throw new Error(' Cannot convert undefined or null to object');
        }
        var theKeys = [];
        var skipProto = hasProtoEnumBug && typeof object === 'function';
        if (typeof object === 'string' || object && object.callee) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        } else {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && ohasOwn.call(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    };
}
function assign(dst, source) {
    if (dst === null || dst === undefined) {
        throw new Error(' Cannot convert undefined or null to object');
    }
    if (source === null || source === undefined) {
        return;
    }
    var keys = Object.keys(source);

    for (var i = 0, l = keys.length; i < l; i++) {
        dst[keys[i]] = source[keys[i]];
    }
}
function boxing(type, value) {
    return Function('value', 'return new ' + type.replace(type[0], type[0].toUpperCase()) + '(value)')(value);
}
if (!(0, _util.isNative)(Object.assign)) {
    Object.assign = function (dst) {
        if (dst === null || dst === undefined) {
            throw new Error(' Cannot convert undefined or null to object');
        }
        dst = boxing(typeof dst === 'undefined' ? 'undefined' : _typeof(dst), dst);

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        for (var i = 0, l = args.length; i < l; i++) {
            var source = args[i];
            assign(dst, source);
        }
        return dst;
    };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter = __webpack_require__(2);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Store = __webpack_require__(1);

var _Store2 = _interopRequireDefault(_Store);

var _equlas = __webpack_require__(3);

var _equlas2 = _interopRequireDefault(_equlas);

var _Observer = __webpack_require__(8);

var _Observer2 = _interopRequireDefault(_Observer);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storageTool = {
    setter: _util.promiseNoop,
    getter: _util.promiseNoop
};
var eventEmitter = new _EventEmitter2.default();

//todo:脏值检测

var StoreManager = function () {
    function StoreManager() {
        _classCallCheck(this, StoreManager);
    }

    _createClass(StoreManager, [{
        key: 'addListener',
        value: function addListener() {
            eventEmitter.addListener.apply(eventEmitter, arguments);
        }
    }, {
        key: 'removeListener',
        value: function removeListener() {
            eventEmitter.removeListener.apply(eventEmitter, arguments);
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners() {
            eventEmitter.removeListener.apply(eventEmitter, arguments);
        }
    }, {
        key: 'emit',
        value: function emit() {
            eventEmitter.emit.apply(eventEmitter, arguments);
        }
    }, {
        key: 'setStorageTool',
        value: function setStorageTool(tool) {
            storageTool = tool;
        }
    }, {
        key: 'store',
        value: function store(config) {
            var _this = this;

            if (config.storage) {
                return this.syncStorage(config.name).then(function (cache) {
                    if ((0, _util.isObject)(cache)) {
                        for (var o in config.model) {
                            if (cache[o]) config.model[o] = cache[o];
                        }
                    }
                    return createStore(config, _this);
                });
            } else {
                return Promise.resolve(createStore(config, this));
            }
        }
        /**
         * 
         * @param {object|array} config 
         * @returns 
         * 
         * @memberOf StoreManager
         */

    }, {
        key: 'load',
        value: function load(configs) {
            var _this2 = this;

            if ((0, _util.isArray)(configs)) {
                var config = configs.pop();
                if (config) {
                    return this.store(config).then(function () {
                        return _this2.load(configs);
                    });
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

    }, {
        key: 'unload',
        value: function unload(name) {
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

    }, {
        key: 'syncStorage',
        value: function syncStorage(name, value) {
            if (value) {
                return storageTool.setter(name, value);
            } else {
                return storageTool.getter(name);
            }
        }
    }, {
        key: 'flow',
        value: function flow(flowIn, flows) {
            var _this3 = this;

            flows.forEach(function (storeName) {
                var store = _this3[storeName];
                if (store.onFlow) {
                    store.onFlow(flowIn);
                }
            });
        }
    }]);

    return StoreManager;
}();

function createStore(config, manager) {
    var store = (0, _Store2.default)(config, manager);
    manager[config.name] = store;
    //immutableProperty(manager, config.name);
    return store;
}
var manager = new StoreManager();

exports.default = manager;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : window.TypeDetector = factory();
})(function factory() {
    'use strict';

    var OPToString = Object.prototype.toString;
    var hasDontEnumBug = !{
        'toString': null
    }.propertyIsEnumerable('toString');
    var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var dontEnumsLength = dontEnums.length;
    var ohasOwn = Object.prototype.hasOwnProperty;

    var keys = Object.keys || function (object) {
        var theKeys = [];
        var skipProto = hasProtoEnumBug && typeof object === 'function';
        if (typeof object === 'string' || object && object.callee) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        } else {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && ohasOwn.call(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    };
    var testFunctionName = /function\s+(\w+)\s*\(/;

    function is(object) {
        var type = OPToString.call(object).slice(8, -1);
        if (type !== 'Object') {
            return type;
        } else if (typeof object.constructor === 'function' && testFunctionName.test(object.constructor.toString())) {
            type = RegExp.$1;
            return type;
        }
        return type;
    }
    var isArray = Array.isArray || function (value) {
        return OPToString.call(value) === '[object Array]';
    };
    function isEmptyArray(value) {
        return isArray(value) && value.length <= 0;
    }

    function isNative(fn) {
        return (/\[native code\]/.test(fn)
        );
    }

    function isUndefined(value) {
        return value === void 0;
    }

    function isNull(value) {
        return value === null;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function isZero(value) {
        return 0 === value;
    }
    function isNegative(value) {
        return isNumber(value) && value >>> 0 !== value;
    }
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    /**
     * @description 是否对象
     * 
     * @param {any} value 
     * @returns 
     */
    function isObject(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    }
    /**
     * @description 是否简单的对象 直接是Object的实例
     * 
     * @param {any} value 
     * @returns 
     */
    function isPlainObject(value) {
        return typeof value === '[object Object]' && !value.constructor || value.constructor == Object;
    }
    /**
     * @description 对象实例中是否含有可枚举的值（例如{}）
     * 
     * @param {any} value 
     * @returns 
     */
    function hasEnumerableProperty(value) {
        return is(value) === 'Object' && keys(value).length > 0;
    }
    /**
     * @description 是否字符串
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === 'string';
    }
    var testEmptyString = /^[\s\uFEFF\xA0]*&/;
    /**
     * @description 是否空字符串 '' ' '都被认为是空字符串
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isEmptyString(value) {
        return isString(value) && testEmptyString.test(value);
    }
    /**
     * @description 是否function类型
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isFunction(value) {
        return OPToString.call(value) === '[object Function]';
    }

    /**
     * @description 返回是否空值 空数组 对象中是否含有可枚举的值（例如{}） 空字符都认为是空对象
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isEmptyValue(value) {
        return isNull(value) || isUndefined(value) || isEmptyString(value) || isEmptyArray(value) || !hasEnumerableProperty(value);
    }

    function isStrictFalse(value) {
        return value === false;
    }
    function isFalse(value) {
        return !!value;
    }
    function isRegExp(value) {
        return OPToString(val) == '[object RegExp]';
    }
    /**
     * @description 返回空对象 null undefined ''
     * 
     * @param {any} value 
     * @returns 
     */
    function isEmpty(value) {
        return isNull(value) || isUndefined(value) || isEmptyString(value);
    }

    var TypeDetector = {
        is: is,
        isArray: isArray,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isNative: isNative,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isNull: isNull,
        isNumber: isNumber,
        isZero: isZero,
        isNegative: isNegative,
        isString: isString,
        isUndefined: isUndefined,
        isEmptyString: isEmptyString,
        isEmptyArray: isEmptyArray,
        isEmptyValue: isEmptyValue,
        isEmpty: isEmpty,
        isNaN: isNaN,
        isStrictFalse: isStrictFalse,
        isFalse: isFalse,
        isRegExp: isRegExp
    };
    return TypeDetector;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(type, target) {
    _classCallCheck(this, Event);

    this.type = type;
    this.target = target;
    this.timeStamp = Date.now();
};

Object.assign(Event, {
    CHANGE: 'change', //store change 
    ONLOAD: 'onload', //store onload
    STORAGE: 'storage', //store storage
    STORAGE_ERROR: 'storagerrror' });

exports.default = Event;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _equlas = __webpack_require__(3);

var _equlas2 = _interopRequireDefault(_equlas);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function observer(obj, callback) {
    for (var o in obj) {
        observerProp(obj, o, callback);
    }
}
function observerProp(object, prop, callback) {
    var _value = object[prop];
    (0, _util.defineProperty)(object, prop, {
        get: function get() {
            if ((0, _util.isArray)(_value)) {
                return _value.slice();
            }
            if ((0, _util.isObject)(_value)) {
                return Object.assign({}, _value);
            }
            return _value;
        },
        set: function set(value) {
            if (!(0, _util.isSameType)(value, _value)) {
                throw new Error('trying to change the type of store property ' + object.name + ' ' + prop + ' :you can not  change the type of store property');
            }
            _value !== value && (_value = value, callback(object));
        },
        configurable: false
    });
}
exports.default = observer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    PACKAGE_NAME: 'mlux',
    VERSION: '0.2.5'
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStore = exports.StoreManager = exports.default = undefined;

var _StoreManager = __webpack_require__(5);

var _StoreManager2 = _interopRequireDefault(_StoreManager);

var _Store = __webpack_require__(1);

var _Store2 = _interopRequireDefault(_Store);

var _shim = __webpack_require__(4);

var _shim2 = _interopRequireDefault(_shim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
    StoreManager: _StoreManager2.default,
    createStore: createStore
};

function createStore(config) {
    config.storage = false;
    return (0, _Store2.default)(config, _StoreManager2.default);
}
exports.default = _module;
exports.StoreManager = _StoreManager2.default;
exports.createStore = createStore;

/***/ })
/******/ ]);
});