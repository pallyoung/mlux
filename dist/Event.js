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

Object.assign(Event, {
    CHANGE: 'change', //store change 
    ONLOAD: 'onload', //store onload
    STORAGE: 'storage', //store storage
    STORAGE_ERROR: 'storagerrror' });

exports.default = Event;