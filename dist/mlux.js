/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function type(source) {
    var typeString = Object.prototype.toString.call(source);
    return typeString.slice(8, -1).toLowerCase();
}
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
    return Object.prototype.toString.call(s1) === Object.prototype.toString.call(s2);
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

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(3);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _emptyMethod = __webpack_require__(5);

var _emptyMethod2 = _interopRequireDefault(_emptyMethod);

var _util = __webpack_require__(0);

var _Observer = __webpack_require__(4);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * todo
 */
var EVENT_CHNAGE = 'change'; //数据发生改变
var EVENT_ERROR = 'error'; //操作失败
var EVENT_STORAGE = 'storage'; //存储
var EVENT_GET = 'get'; //获取
var EVENT_SET = 'get'; //获取

function observerCallback(store) {
    store.notifyChange();
}

var Store = function (_EventEmitter) {
    _inherits(Store, _EventEmitter);

    function Store(config, storeManager) {
        _classCallCheck(this, Store);

        var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

        if (!(0, _util.isObject)(config.data)) {
            throw new Error('initialize ' + config.name + ' error, data can noly be an object');
        }
        _this.name = config.name;
        _this._flow = config.flow;
        _this._onFlow = config.onFlow;
        _this._pump = config.pump;
        //是否同步到本地
        _this._storage = config.storage;
        _this._manager = storeManager;
        _this._timeout;

        for (var o in _this) {
            Object.defineProperty(_this, o, {
                value: _this[o],
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
        Object.defineProperty(_this, '_timeout', {
            value: undefined,
            writable: true,
            enumerable: false,
            configurable: false
        });
        for (var _o in config.data) {
            _this[_o] = config.data[_o];
        }
        (0, _Observer2.default)(_this, observerCallback);
        return _this;
    }

    _createClass(Store, [{
        key: 'notifyChange',
        value: function notifyChange() {
            var _this2 = this;

            clearTimeout(this._timeout);
            this._timeout = setTimeout(function () {
                if (_this2._storage) {
                    _this2._manager.syncStorage(_this2.name, _this2.copy());
                }
                _this2.flowTo();
                _this2.emit(EVENT_CHNAGE);
                _this2._manager.emit(EVENT_CHNAGE, _this2.name);
            }, 10);
        }
    }, {
        key: 'copy',
        value: function copy() {
            var dst = {};
            for (var o in this) {
                dst[o] = this[o];
            }
            return dst;
        }
    }, {
        key: 'assign',
        value: function assign(data) {
            for (var o in data) {
                var oldValue = this[o];
                var newValue = data[o];
                if (oldValue && (0, _util.isSameType)(oldValue, newValue)) {
                    this[o] = newValue;
                }
            }
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
        key: 'flowTo',
        value: function flowTo() {
            var _this4 = this;

            if ((0, _util.isArray)(this._flow)) {
                this._flow.forEach(function (storeName) {
                    var store = _this4._manager[storeName];
                    store.onFlow(_this4);
                });
            }
        }
    }, {
        key: 'onFlow',
        value: function onFlow(store) {
            if ((0, _util.isFunction)(this._onFlow)) {
                this._onFlow(store);
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

    }]);

    return Store;
}(_EventEmitter3.default);

exports.default = Store;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _equlas = __webpack_require__(1);

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
    Object.defineProperty(object, prop, {
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return new Promise(promise);
};

function promise(res, rej) {
    res();
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(3);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _Store = __webpack_require__(2);

var _Store2 = _interopRequireDefault(_Store);

var _emptyMethod = __webpack_require__(5);

var _emptyMethod2 = _interopRequireDefault(_emptyMethod);

var _equlas = __webpack_require__(1);

var _equlas2 = _interopRequireDefault(_equlas);

var _Observer = __webpack_require__(4);

var _Observer2 = _interopRequireDefault(_Observer);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//todo:脏值检测
var StoreManager = function (_EventEmitter) {
    _inherits(StoreManager, _EventEmitter);

    function StoreManager() {
        _classCallCheck(this, StoreManager);

        var _this = _possibleConstructorReturn(this, (StoreManager.__proto__ || Object.getPrototypeOf(StoreManager)).call(this));

        _this.storageTool = {
            setter: _emptyMethod2.default,
            getter: _emptyMethod2.default
        };
        for (var o in _this) {
            Object.defineProperty(_this, o, {
                value: _this[o],
                writable: true,
                enumerable: false,
                configurable: false
            });
        }
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
        key: 'mapRegister',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(configArr) {
                var i, config;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                i = 0;

                            case 1:
                                if (!(i < configArr.length)) {
                                    _context.next = 8;
                                    break;
                                }

                                config = configArr[i];
                                _context.next = 5;
                                return this.register(config);

                            case 5:
                                i++;
                                _context.next = 1;
                                break;

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function mapRegister(_x) {
                return _ref.apply(this, arguments);
            }

            return mapRegister;
        }()
    }, {
        key: 'notifyChange',
        value: function notifyChange(storeName) {
            var store = _storeVan[storeName];
            store.notifyChange();
            this.emit('change', storeName);
        }
    }, {
        key: 'register',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(config) {
                var cache, o, store;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!config.storage) {
                                    _context2.next = 5;
                                    break;
                                }

                                _context2.next = 3;
                                return this.syncStorage(config.name);

                            case 3:
                                cache = _context2.sent;

                                if ((0, _util.isObject)(cache)) {
                                    for (o in config.data) {
                                        if (cache[o]) config.data[o] = cache[o];
                                    }
                                }

                            case 5:
                                store = new _Store2.default(config, this);

                                Object.defineProperty(this, config.name, {
                                    value: store,
                                    writable: false,
                                    configurable: true,
                                    enumerable: true
                                });
                                Object.preventExtensions(store);

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function register(_x2) {
                return _ref2.apply(this, arguments);
            }

            return register;
        }()
    }, {
        key: 'unregister',
        value: function unregister(name) {
            var store = this[name];
            //移除所有监听事件
            store.removeAllListeners();
            delete this[name];
        }
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
            var _this2 = this;

            flows.forEach(function (storeName) {
                var store = _this2[storeName];
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUndefined = exports.isBoolean = exports.isNumber = exports.isString = exports.isNull = exports.isEmpty = exports.isSameType = exports.isFunction = exports.isArray = exports.isObject = exports.type = exports.createStore = exports.StoreManager = exports.equlas = exports.default = undefined;

var _StoreManager = __webpack_require__(6);

var _StoreManager2 = _interopRequireDefault(_StoreManager);

var _Store = __webpack_require__(2);

var _Store2 = _interopRequireDefault(_Store);

var _util = __webpack_require__(0);

var _equlas = __webpack_require__(1);

var _equlas2 = _interopRequireDefault(_equlas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = {
    StoreManager: _StoreManager2.default,
    equlas: _equlas2.default,
    type: _util.type,
    isObject: _util.isObject,
    isArray: _util.isArray,
    isFunction: _util.isFunction,
    isSameType: _util.isSameType,
    isEmpty: _util.isEmpty,
    isNull: _util.isNull,
    isString: _util.isString,
    isNumber: _util.isNumber,
    isBoolean: _util.isBoolean,
    isUndefined: _util.isUndefined,
    Store: _Store2.default
};

function createStore(config) {
    config.storage = false;
    return new _Store2.default(config, _StoreManager2.default);
}
exports.default = _module;
exports.equlas = _equlas2.default;
exports.StoreManager = _StoreManager2.default;
exports.createStore = createStore;
exports.type = _util.type;
exports.isObject = _util.isObject;
exports.isArray = _util.isArray;
exports.isFunction = _util.isFunction;
exports.isSameType = _util.isSameType;
exports.isEmpty = _util.isEmpty;
exports.isNull = _util.isNull;
exports.isString = _util.isString;
exports.isNumber = _util.isNumber;
exports.isBoolean = _util.isBoolean;
exports.isUndefined = _util.isUndefined;

/***/ })
/******/ ]);