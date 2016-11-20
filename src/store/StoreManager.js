'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
import emptyMethod from './../emptyMethod';
import equlas from './../equlas';
import observer from './../Observer';
import {
isObject,
isArray,
isFunction,
isSameType
}from './../util';
//todo:脏值检测
class StoreManager extends EventEmitter{
    constructor(){
        super();
        this.storageTool = {
            setter:emptyMethod,
            getter:emptyMethod
        }
        for(let o in this){
            Object.defineProperty(this,o,{
                value:this[o],
                writable:true,
                enumerable:false,
                configurable:false
            })
        }
    }
    setStorageTool(tool){
        /**
         * setter(name,value) return promise
         * getter(name) return promise
         */
        this.storageTool = tool;
    }
    async mapRegister(configArr){
        for(let i = 0;i<configArr.length;i++){
            let config = configArr[i];
            await this.register(config)
        }
    }
    notifyChange(storeName){
        var store = _storeVan[storeName];
        store.notifyChange();
        this.emit('change',storeName);
    }
    async register(config){
        if(config.storage){
            let cache =  await this.manager.syncStorage(config.name);
            if(isObject(cache)){
                for(let o in config.data){
                    if(cache[o])
                    config.data[o]  = cache[o];
                }
            }       
        }
        let store = new Store(config,this);
        Object.defineProperty(this,config.name,{
            value:store,
            writable:false,
            configurable:true,
            enumerable:true
        });
        Object.preventExtensions(store);
    }
    unregister(name){
        var store = this[name];
        //移除所有监听事件
        store.removeAllListeners();
        delete this[name];
    }
    syncStorage(name,value){
        if(value){
            return this.storageTool.setter(name,value);
        }else{
            return this.storageTool.getter(name);
        }    
    }

    flow(flowIn,flows){
        flows.forEach((storeName)=>{
            let store = this[storeName];
            if(store.onFlow){
                store.onFlow(flowIn);
            }         
        })      
    }
    
}
var manager = new StoreManager();
export default manager;