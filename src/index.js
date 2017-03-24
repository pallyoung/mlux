'use strict'
import StoreManager from './store/StoreManager';
import storeFactory from './store/Store';
import shim from './shim.js';

var module = {
    StoreManager,
    createStore,
}

function createStore(config){
    config.storage = false;
    return storeFactory(config,StoreManager);
}
export {
    module as default,
    StoreManager,
    createStore,
}