'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
import emptyMethod from './../emptyMethod';
var _storeVan = {}
class StoreManager extends EventEmitter{
    constructor(){
        super();
        this.storageTool = {
            setter:emptyMethod,
            getter:emptyMethod
        }
        this._fetch = emptyMethod;
    }
    isConnected(){
        return true;
    }
    setFetchTool(tool){
        this._fetch = tool;
    }
    setStorageTool(tool){
        /**
         * setter(name,value) return promise
         * getter(name) return promise
         */
        this.storageTool = tool;
    }
    loadConfig(configArr){
        for(let i = 0;i<configArr.length;i++){
            let config = configArr[i];
            _storeVan[config.name] = new Store(config,this);
        }
    }
    register(config){
        _storeVan[config.name] = new Store(config,this);
    }
    unregister(name){
        var store = _storeVan[name];
        //移除所有监听事件
        store.removeAllListeners();
        delete _storeVan[name];
    }
    getter(name,...args){
        return _storeVan[name].getter(...args);
    }
    setter(name,data){
        return _storeVan[name].setter(data);
    }
    syncStorage(name,value){
        if(value){
            return this.storageTool.setter(name,value);
        }else{
            return this.storageTool.getter(name);
        }    
    }
    fetch(remote,...args){
        return this.remoteTool.fetch(remote,...args);
    }
    piple(storeName,data){
        var store = _storeVan[storeName];
        store.setter(data);
    }
    
}

export default StoreManager;