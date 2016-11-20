'use strict'
import equlas from './equlas';
import {isSameType} from './util';
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
            if(!isSameType(value,_value)){
                throw new Error('trying to change the type of store property '+object.name+' '
                +prop +' :you can not  change the type of store property');
            }
            if(!equlas(_value,value)){
                _value = value;
                callback(object);
            }
        },
        configurable:false
    });
}
export default observer;