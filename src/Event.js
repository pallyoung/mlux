'use strict'
class Event {
    constructor(type, target) {
        this.type = type;
        this.target = target;
        this.timeStamp = Date.now();
    }
}


Object.assign(Event, {
    CHANGE: 'change',//store change 
    ONLOAD: 'onload',//store onload
    STORAGE: 'storage',//store storage
    STORAGE_ERROR: 'storagerrror',//storage error
});

export default Event;