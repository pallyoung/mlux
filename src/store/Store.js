'use strict'
import EventEmitter from './../EventEmitter';
import emptyMethod from './../emptyMethod';
/**
 * todo
 */
const interval = 10 * 60 * 1000;//默认10分钟更新一次

const EVENT_CHNAGE = 'change';//数据发生改变
const EVENT_ERROR = 'error';//操作失败
const EVENT_STORAGE = 'storage';//存储
const EVENT_GET = 'get';//获取
const EVENT_SET = 'get';//获取

class Store extends EventEmitter {
    constructor(config, storeManager) {
        super();
        this.name = config.name;
        //远程地址，只配置一个
        //this._remote = config.remote;
        //更新间隔  
        //this.interval =  config.interval||-1;
        //
        this.data = null;
        this.flow = config.flow;
        this.onFlow = config.onFlow;
        //是否设置缓存，如果设置缓存 可以通过storageManager直接访问 
        this.cache = true;
        //是否同步到本地
        this.storage = config.storage;
        this.timestamp = 0;
        this.manager = storeManager;
    }
    notifyChange(){
        this.emit(EVENT_CHNAGE);
    }
    clear(){
        delete this.data;
    }
    async setter(data) {

        if (this.storage) {
            await this.manager.syncStorage(this.name, data);
        }
        this.data = data;
        //this.manager[this.name] = data;
        //this.emit(EVENT_CHNAGE);
    }
    /**
     * 
     * 
     * @param {any} args
     * @returns
     * 
     * @memberOf Store
     * @获取流程
     *      |----是否有本地存储
     *      |           |
     *      |           |--是-return this.stroage
     *      |           |
     *      |           |--否-return this.data
     * 
     * 
     */
    async getter() {
        var data;
        if (this.storage) {
            data = await this.manager.syncStorage(this.name);
        } else {
            data = this.data;
        }
        return data;
    }
}

Store.interval = interval;