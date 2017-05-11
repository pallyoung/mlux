'use strict'
import shim from './shim.js';
import StoreManager from './store/StoreManager';
import storeFactory from './store/Store';

var modules= {
    StoreManager,
    createStore,
}

function createStore(config){
    config.storage = false;
    return storeFactory(config,StoreManager);
}
module.exports = modules;