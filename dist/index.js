'use strict';

var _shim = require('./shim.js');

var _shim2 = _interopRequireDefault(_shim);

var _StoreManager = require('./store/StoreManager');

var _StoreManager2 = _interopRequireDefault(_StoreManager);

var _Store = require('./store/Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = {
    StoreManager: _StoreManager2.default,
    createStore: createStore
};

function createStore(config) {
    config.storage = false;
    return (0, _Store2.default)(config, _StoreManager2.default);
}
module.exports = modules;