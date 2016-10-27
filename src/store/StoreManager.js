'use strict'
import EventEmitter from './../EventEmitter';
import Store from './Store';
var STORE_VAN = {}
class StoreManager extends EventEmitter{
    constructor(){
        super();
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
    piple(data,pipleArr){

    }
    
}

export default new StoreManager();