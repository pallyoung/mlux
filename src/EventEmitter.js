'use strict'

var id = 1;
const PREFIX = 'RECEIVER_';

function token() {
    return PREFIX + ++id;
}
class Receiver {
    constructor(channel,key) {
        this._channel = channel;
        this._key = key;
    }
    remove() {
        this._channel.remove(this._key);
    }
}
class BordercastChannel {
    constructor() {
        this._listeners = {

        }
    }
    emit(...args){
        for(var key in this._listeners){
            this._listeners[key](...args);
        }
    }
    addListener(listener) {
        var key = token();
        this._listeners[key] = listener;
        return new Receiver(this,key);
    }
    remove(key){
        delete this._listeners[key];
    }
    removeAllListeners() {
        this._listeners = {

        }
    }
}
class Bordercast {
    constructor() {
        this._channels = {

        }
    }
    emit(type,...args){
        if(this._channels[type]){
            this._channels[type].emit(...args);
        }
    }

    addListener(type, listener) {
        if (!this._channels[type]) {
            this._channels[type] = new BordercastChannel();
        }
        return this._channels[type].addListener(listener);
    }
    removeAllListeners(type) {
        if (type) {
            this._channels[type] && this._channels[type].removeAllListeners();
        }else{
            for(var channel  in  this._channels){
                this._channels[channel].removeAllListeners();
            }
        }

    }
}

export default class EventEmitter {
    constructor() {
        this._bordercast = new Bordercast();
    }
    addListener(type, listener) {
        return this._bordercast.addListener(type, listener);
    }
    removeListener(receiver) {
        receiver.remove();
    }
    removeAllListeners(type) {
        this._bordercast.removeAllListeners(type)
    }
    emit(type, ...args) {
        this._bordercast.emit(type,...args);
    }
}