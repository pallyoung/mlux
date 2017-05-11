'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter = require('./../EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _equlas = require('./../equlas');

var _equlas2 = _interopRequireDefault(_equlas);

var _Observer = require('./../Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _util = require('./../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isObject = _util2.default.isObject,
    isArray = _util2.default.isArray,
    isFunction = _util2.default.isFunction,
    isSameType = _util2.default.isSameType,
    promiseNoop = _util2.default.promiseNoop,
    sealProperty = _util2.default.sealProperty,
    forEach = _util2.default.forEach;

var storageTool = {
    setter: promiseNoop,
    getter: promiseNoop
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
                    if (isObject(cache)) {
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

            if (isArray(configs)) {
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

module.exports = manager;