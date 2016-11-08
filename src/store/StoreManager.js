'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
import emptyMethod from './../emptyMethod';
var _storeVan = {}
//todo:脏值检测
class StoreManager extends EventEmitter{
    constructor(){
        super();
        this.storageTool = {
            setter:emptyMethod,
            getter:emptyMethod
        }
    }
    setStorageTool(tool){
        /**
         * setter(name,value) return promise
         * getter(name) return promise
         */
        this.storageTool = tool;
    }
    mapRegister(configArr){
        for(let i = 0;i<configArr.length;i++){
            let config = configArr[i];
            this.register(config)
        }
    }
    notifyChange(storeName){
        var store = _storeVan[storeName];
        store.notifyChange();
        this.emit('change',storeName);
    }
    register(config){
        var store = new Store(config,this);
        _storeVan[config.name] = store;
        Object.defineProperty(this,config.name,{
            get:()=>{
                return store.getter();
            },
            set:(value)=>{
                store.setter(value);
                store.notifyChange();
                this.emit('change',config.name);
            }
        });
        // this['get'+config.name.slice(0,1).toUpperCase()+config.name.slice(1)] = function(...args){
        //     return _storeVan[name].getter(...args);
        // }
    }
    unregister(name){
        var store = _storeVan[name];
        //移除所有监听事件
        store.removeAllListeners();
        delete _storeVan[name];
        delete this[name];
        //delete this['get'+name.slice(0,1).toUpperCase()+name.slice(1)];
    }
    // getter(name,...args){
    //     return _storeVan[name].getter(...args);
    // }
    // setter(name,data){
    //     return _storeVan[name].setter(data);
    // }
    syncStorage(name,value){
        if(value){
            return this.storageTool.setter(name,value);
        }else{
            return this.storageTool.getter(name);
        }    
    }
    // fetch(remote,...args){
    //     return this.remoteTool.fetch(remote,...args);
    // }
    flow(flowIn,flows,data){
        flows.forEach((storeName)=>{
            let store = _storeVan[storeName];
            if(store.onFlow){
                store.onFlow(flowIn,data);
            }         
        })      
    }
    
}

export default StoreManager;