'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
import emptyMethod from './../emptyMethod';
var STORE_VAN = {}
class StoreManager extends EventEmitter{
    constructor(){
        super();
        this.commitTool = {
            setter:emptyMethod,
            getter:emptyMethod
        }
    }
    setCommitTool(tool){
        /**
         * setter(name,value)
         * getter(name)
         */
        this.commitTool = tool;
    }
    loadConfig(configArr){
        for(let i = 0;i<configArr.length;i++){
            let config = configArr[i];
            STORE_VAN[config.name] = new Store(configArr,this);
        }
    }
    register(){

    }
    unregister(){

    }
    getStore(){

    }
    setStore(){

    }
    commit(name,value){
      return this.commitTool.setter(name,value);
    }
    fetch(name){
        return this.commitTool.getter(name);
    }
    piple(data,pipleArr){

    }
    
}

export default new StoreManager();