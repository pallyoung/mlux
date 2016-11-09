'use strict'

var id = 1;
const PREFIX = 'LISTENER_';

class ListenerCan {
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
        this._cans = {}
    }
    getCan(type) {
        if (!this._cans[type]) {
            this._cans[type] = new ListenerCan(type);
        }
        return this._cans[type];
    }
    addListener(type, listener) {
        return {
            token: this.getCan(type).addListener(listener),
            type:type
                };
    }
    removeListener(subscription) {
        this.getCan(subscription.type).removeListener(subscription.token);
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
    once(type, listener) {

    }
    emit(type, ...args) {
        var listeners = this._container.getCan(type).listeners;
        for(let l in listeners){
            listeners[l](...args);
        }
    }
}