'use strict'
const PREFIX = 'ID_';
var id = 1;
export default class Dispatcher {
    constructor() {
        this._callbacks = {};
        this._isDispatching = false;
        this._isHandled = {};
        this._isPending = {};
    }
    dispatch(payload) {
        
    }
    register(callback) {
        var token = PREFIX + id++;
        this._callbacks[token] = callback;
        return token;
    }
    unregister(token) {
        delete this._callbacks[token];
    }
    waitFor() {

    }
}