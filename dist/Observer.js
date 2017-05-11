'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _equlas = require('./equlas');

var _equlas2 = _interopRequireDefault(_equlas);

var _util = require('./util');

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