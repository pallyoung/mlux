'use strict';

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