'use strict'

var id = 1;
const PREFIX = 'LISTENER_';

class Vendor {
    constructor(type) {
        this.type = type;
        this.listeners = {}
    }
    addListener(listener) {
        var token = PREFIX + id++;
        this.listeners[token] = listener;
        return token;
    }
    removeListener(token) {
        delete this._listeners[token];
    }
}

class Container {
    constructor() {
        this._vendors = {}
    }
    getVendor(type) {
        if (!this._vendors[type]) {
            this._vendors[type] = new Vendor(type);
        }
        return this._vendors[type];
    }
    addListener(type, listener) {
        return {
            token: this.getVendor(type).addListener(listener),
            type:type
                };
    }
    removeListener(subscription) {
        this.getVendor(subscription.type).removeListener(subscription.token);
    }
    removeAllListeners(type){
        if(type){
            this._vendors[type] = undefined;
        }else{
            this._vendors = {}
        }   
    }

}
export default class EventEmitter {
    constructor() {
        this._container = new Container();
        this._currentSubcription = null;
    }
    addListener(type, listener) {
        return this._container.addListener(type,listener);
    }
    removeListener(subscription) {
        this._container.removeListener(subscription);
    }
    removeAllListeners(type){
        this._container.removeAllListeners(type)
    }
    once(type, listener) {

    }
    emit(type, ...args) {
        var listeners = this._container.getCan(type).listeners;
        for(let l in listeners){
            listeners[l](...args);
        }
    }
}