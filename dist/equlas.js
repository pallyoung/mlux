'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = equlas;

var _util = require('./util');

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