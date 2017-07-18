'use strict'
class Event {
    constructor(type, target) {
        this.type = type;
        this.target = target;
        this.timeStamp = Date.now();
    }
}


Event.CHANGE = 'change';
Event.ONLOAD = 'onload';
Event.STORAGE = 'storage';
Event.STORAGE_ERROR = 'storagerrror';

export default Event;