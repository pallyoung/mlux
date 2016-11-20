'use strict'
import equlas from './equlas';
function observer(obj, callback) {
    for (var o in obj) {
        observerProp(obj,o,callback);
    }
}
function observerProp(object, prop, callback) {
    var _value = object[prop];
    Object.defineProperty(object, prop, {
        get: function () {
            return _value;
        },
        set: function (value) {
            if(!equlas(_value,value)){
                _value = value;
            }
            callback(object);
        },
        configurable:false
    });
}