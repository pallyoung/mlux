'use strict';

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

Event.CHANGE = 'change';
Event.ONLOAD = 'onload';
Event.STORAGE = 'storage';
Event.STORAGE_ERROR = 'storagerrror';

exports.default = Event;