'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function Config() {
    _classCallCheck(this, Config);

    this.model;
    this.name;
    this.storage;
    this.pump;
    this.flow;
    this.onflow;
    this.onwillunload;
    this.onload;
};

exports.default = Config;