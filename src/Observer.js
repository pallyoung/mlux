'use strict'
import equlas from './equlas';
import {isSameType,isArray,isObject,defineProperty} from './util';
function observer(obj, callback) {
    for (var o in obj) {
        observerProp(obj,o,callback);
    }
}
function observerProp(object, prop, callback) {
    var _value = object[prop];
    defineProperty(object, prop, {
        get: function () {
            if(isArray(_value)){
                return _value.slice();
            } 
            if(isObject(_value)) {
                return Object.assign({},_value);
            } 
            return _value;     
        },
        set: function (value) {
            if(!isSameType(value,_value)){
                throw new Error('trying to change the type of store property '+object.name+' '
                +prop +' :you can not  change the type of store property');
            }
            _value!==value&&(_value = value,callback(object));
        },
        configurable:false
    });
}
export default observer;