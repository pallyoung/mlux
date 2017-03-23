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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.forEach = exports.preventExtensions = exports.immutableProperty = exports.freezeProperty = exports.sealProperty = exports.defineProperty = exports.promiseNoop = exports.noop = exports.isNative = exports.isUndefined = exports.isBoolean = exports.isNumber = exports.isString = exports.isNull = exports.isEmpty = exports.isSameType = exports.isFunction = exports.isArray = exports.isObject = exports.type = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jsTypeDetector = __webpack_require__(7);

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
    if (!isArray(filter)) {
        throw new Error('filter can only be Array');
    }
    if (isArray(source) || isObject(source)) {
        keys = Object.keys(source);
        keys.forEach(function (v) {
            //不需要过滤
            if (filter.indexOf(v) < 0) {
                callback(source[v], v, source);
            }
        });
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(2);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _util = __webpack_require__(0);

var _constants = __webpack_require__(8);

var _constants2 = _interopRequireDefault(_constants);

var _Observer = __webpack_require__(3);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Event = _constants2.default.EVNET;


/**
 * todo
 */

function observerCallback(store) {
    store.notifyChange();
}
var DONT_ENMU_KEYS = ['_timeout', 'name', '_flow', 'onflow', '_storage', '_manager', '_pump', 'notifyChange', 'copy', 'assign', 'pump', 'flowTo', 'onFlow', '_extends', 'onWillUnload', '_onwillunload', '_clearTimeout', '_timeoutHandles'];

var Store = function (_EventEmitter) {
    _inherits(Store, _EventEmitter);

    function Store(config, storeManager) {
        _classCallCheck(this, Store);

        var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

        if (!(0, _util.isObject)(config.model)) {
            throw new Error('initialize ' + config.name + ' error, model can noly be an object');
        }
        _this.name = config.name;
        _this._flow = config.flow || [];
        _this._onflow = config.onflow || _util.noop;
        _this._pump = config.pump;
        _this._onwillunload = config.onwillunload || _util.noop;
        _this._onload = config.onload || _util.noop;
        //是否同步到本地
        _this._storage = config.storage || false;
        _this._manager = storeManager;

        _this._timeoutHandles = {
            change: undefined
        };
        (0, _util.forEach)(_this, function (v, key, self) {
            (0, _util.freezeProperty)(self, key);
        });

        for (var o in config.model) {
            _this[o] = config.model[o];
        }
        (0, _Observer2.default)(_this, observerCallback);
        return _this;
    }

    _createClass(Store, [{
        key: '_extends',
        value: function _extends(source) {
            var _this2 = this;

            if (!(0, _util.isObject)(source)) {
                return this;
            }
            Object.keys(source).forEach(function (key) {
                if (DONT_ENMU_KEYS.indexOf(key)) {
                    return;
                }
                var oldValue = _this2[key];
                var newValue = source[key];
                if (!oldValue || oldValue === newValue || !(0, _util.isSameType)(newValue, oldValue)) {
                    return;
                }
                _this2[key] = newValue;
            });
        }
    }, {
        key: 'copy',
        value: function copy() {
            var dst = {};
            (0, _util.forEach)(this, DONT_ENMU_KEYS, function (v, key) {
                dst[key] = v;
            });
            return dst;
        }
    }, {
        key: 'assign',
        value: function assign() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            for (var i = 0, l = args.length; i < l; i++) {
                this._extends(args[i]);
            }
            return this;
        }
    }, {
        key: 'pump',
        value: function pump() {
            var _this3 = this;

            if ((0, _util.isFunction)(this._pump)) {
                return this._pump.apply(this, arguments).then(function (data) {
                    _this3.assign(data);
                    return _this3;
                });
            } else {
                return new Promise(function (res, rej) {
                    res(this);
                });
            }
        }
    }, {
        key: 'notifyChange',
        value: function notifyChange() {
            var _this4 = this;

            clearTimeout(this._timeoutHandles.change);
            this._timeoutHandles.change = setTimeout(function () {
                if (_this4._storage) {
                    _this4._manager.syncStorage(_this4.name, _this4.copy());
                }
                _this4.flowTo();
                _this4.emit(Event.CHANGE);
                _this4._manager.emit(Event.CHANGE, _this4.name);
            }, 10);
        }
    }, {
        key: 'flowTo',
        value: function flowTo() {
            var _this5 = this;

            if ((0, _util.isArray)(this._flow)) {
                this._flow.forEach(function (storeName) {
                    var store = _this5._manager[storeName];
                    store.onFlow(_this5);
                });
            }
        }
    }, {
        key: 'onFlow',
        value: function onFlow(store) {
            if ((0, _util.isFunction)(this._onflow)) {
                this._onFlow(store);
            }
        }
    }, {
        key: 'onWillUnload',
        value: function onWillUnload() {
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

    }]);

    return Store;
}(_EventEmitter3.default);

exports.default = Store;

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
var PREFIX = 'LISTENER_';

var Vendor = function () {
    function Vendor(type) {
        _classCallCheck(this, Vendor);

        this.type = type;
        this.listeners = {};
    }

    _createClass(Vendor, [{
        key: 'addListener',
        value: function addListener(listener) {
            var token = PREFIX + id++;
            this.listeners[token] = listener;
            return token;
        }
    }, {
        key: 'removeListener',
        value: function removeListener(token) {
            delete this.listeners[token];
        }
    }]);

    return Vendor;
}();

var Container = function () {
    function Container() {
        _classCallCheck(this, Container);

        this._vendors = {};
    }

    _createClass(Container, [{
        key: 'getVendor',
        value: function getVendor(type) {
            if (!this._vendors[type]) {
                this._vendors[type] = new Vendor(type);
            }
            return this._vendors[type];
        }
    }, {
        key: 'addListener',
        value: function addListener(type, listener) {
            return {
                token: this.getVendor(type).addListener(listener),
                type: type
            };
        }
    }, {
        key: 'removeListener',
        value: function removeListener(subscription) {
            if (!subscription) {
                return;
            }
            this.getVendor(subscription.type).removeListener(subscription.token);
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(type) {
            if (type) {
                delete this._vendors[type];
            } else {
                this._vendors = {};
            }
        }
    }]);

    return Container;
}();

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._container = new Container();
    }

    _createClass(EventEmitter, [{
        key: 'addListener',
        value: function addListener(type, listener) {
            return this._container.addListener(type, listener);
        }
    }, {
        key: 'removeListener',
        value: function removeListener(subscription) {
            this._container.removeListener(subscription);
        }
    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(type) {
            this._container.removeAllListeners(type);
        }
    }, {
        key: 'emit',
        value: function emit(type) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this._container.getVendor(type).listeners;

            var _loop = function _loop(l) {
                setTimeout(function () {
                    listeners[l].apply(listeners, args);
                }, 0);
            };

            for (var l in listeners) {
                _loop(l);
            }
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

var _equlas = __webpack_require__(4);

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
            if (!(0, _equlas2.default)(_value, value)) {
                _value = value;
                callback(object);
            }
        },
        configurable: false
    });
}
exports.default = observer;

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(2);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _Store = __webpack_require__(1);

var _Store2 = _interopRequireDefault(_Store);

var _equlas = __webpack_require__(4);

var _equlas2 = _interopRequireDefault(_equlas);

var _Observer = __webpack_require__(3);

var _Observer2 = _interopRequireDefault(_Observer);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createStore(config, manager) {
    var store = new _Store2.default(config, manager);
    manager[config.name] = store;
    (0, _util.immutableProperty)(manager, config.name);
    (0, _util.preventExtensions)(store);
    return store;
}

//todo:脏值检测

var StoreManager = function (_EventEmitter) {
    _inherits(StoreManager, _EventEmitter);

    function StoreManager() {
        _classCallCheck(this, StoreManager);

        var _this = _possibleConstructorReturn(this, (StoreManager.__proto__ || Object.getPrototypeOf(StoreManager)).call(this));

        for (var o in _this) {
            (0, _util.freezeProperty)(_this, o);
        }
        _this.storageTool = {
            setter: _util.promiseNoop,
            getter: _util.promiseNoop
        };
        return _this;
    }

    _createClass(StoreManager, [{
        key: 'setStorageTool',
        value: function setStorageTool(tool) {
            /**
             * setter(name,value) return promise
             * getter(name) return promise
             */
            this.storageTool = tool;
        }
    }, {
        key: 'store',
        value: function store(config) {
            var _this2 = this;

            if (config.storage) {
                return this.syncStorage(config.name).then(function (cache) {
                    if ((0, _util.isObject)(cache)) {
                        for (var o in config.model) {
                            if (cache[o]) config.model[o] = cache[o];
                        }
                    }
                    return createStore(config, _this2);
                });
            } else {
                return Promise.resolve(createStore(config, this));
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

    }, {
        key: 'load',
        value: function load(config) {
            var _this3 = this;

            if ((0, _util.isArray)(config)) {
                var c = config.pop();
                if (c) {
                    return this.store(c).then(function () {
                        return _this3.load(config);
                    });
                } else {
                    return Promise.resolve();
                }
            } else {
                return this.store(c);
            }
        }
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
         * @param {any} name 
         * @param {any} value 
         * @returns Promise
         * 
         * @memberOf StoreManager
         */

    }, {
        key: 'syncStorage',
        value: function syncStorage(name, value) {
            if (value) {
                return this.storageTool.setter(name, value);
            } else {
                return this.storageTool.getter(name);
            }
        }
    }, {
        key: 'flow',
        value: function flow(flowIn, flows) {
            var _this4 = this;

            flows.forEach(function (storeName) {
                var store = _this4[storeName];
                if (store.onFlow) {
                    store.onFlow(flowIn);
                }
            });
        }
    }]);

    return StoreManager;
}(_EventEmitter3.default);

var manager = new StoreManager();
exports.default = manager;

/***/ }),
/* 7 */
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
        } else if (testFunctionName.test(object.constructor.toString())) {
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
     * @description 对象实例中是否含有可枚举的值（例如{}）
     * 
     * @param {any} value 
     * @returns 
     */
    function hasEnumerableProperty(value) {
        return is(value) === 'Object' && keys(value).length <= 0;
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
        return isNull(value) || isUndefined(value) || isEmptyString(value) || isEmptyArray(value) || hasEnumerableProperty(value);
    }

    function isStrictFalse(value) {
        return value === false;
    }
    function isFalse(value) {
        return !!value;
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
        isFalse: isFalse
    };
    return TypeDetector;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    PACKAGE_NAME: 'mlux',
    VERSION: '0.2.4',
    EVNET: {
        CHANGE: 'change', //store change 
        REGISTER: 'register', //store register
        STORAGE: 'storage', //store storage
        STORAGE_ERROR: 'storagerrror' }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStore = exports.StoreManager = exports.default = undefined;

var _StoreManager = __webpack_require__(6);

var _StoreManager2 = _interopRequireDefault(_StoreManager);

var _Store = __webpack_require__(1);

var _Store2 = _interopRequireDefault(_Store);

var _shim = __webpack_require__(5);

var _shim2 = _interopRequireDefault(_shim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
    StoreManager: _StoreManager2.default,
    createStore: createStore
};

function createStore(config) {
    config.storage = false;
    return new _Store2.default(config, _StoreManager2.default);
}
exports.default = _module;
exports.StoreManager = _StoreManager2.default;
exports.createStore = createStore;

/***/ })
/******/ ]);
});