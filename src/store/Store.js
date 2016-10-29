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
        this._remote = config.remote;
        //更新间隔  
        this.interval = -1;
        //
        this.data = null;
        this.piple = config.piple;
        //是否设置缓存，如果设置缓存 可以通过storageManager直接访问 
        this.cache = true;
        //是否同步到本地
        this.storage = config.storage;
        this.timestamp = 0;
        this.manager = storeManager;
    }
    setter(data) {
        var promise = new Promise((res, rej) => {
            res();
        });

        if (this.storage) {
            promise = promise.then(() => {
                return this.manager.syncStorage(this.name, data);
            }, () => {
                this.emit(EVENT_ERROR);
            }).then((result) => {
                this.data = data;
                this.manager[this.name] = data;
                this.emit(EVENT_CHNAGE);
                this.emit(EVENT_STORAGE);
                this.emit(EVENT_SET);
            }, (result) => {
                //this.data = null;
                //this.manager[this.name] = null;
                //this.emit(EVENT_STORAGE);
                this.emit(EVENT_ERROR);
            });
        } else {
            this.data = data;
            this.manager[this.name] = data;
            this.emit(EVENT_CHNAGE);
            this.emit(EVENT_SET);
        }
        return promise;

    }
    /**
     * 
     * 
     * @param {any} args
     * @returns
     * 
     * @memberOf Store
     * @获取流程
     * 是否有远程地址
     *      |
     *      |--是--fetch
     *      |
     *      |--否--是否有本地存储
     *      |           |
     *      |           |--是-return this.stroage
     *      |           |
     *      |           |--否-return this.data
     * 
     * 
     */
    getter(...args) {
        var promise = new Promise((res) => {
            res();
        });
        if (this._remote && this.manager.isConnected()) {
            promise = promise.then(() => {
                return this.manager.fetch(this._remote.getter, ...args)
            }).then((result) => {
                this.setter(result);
                return result;
            }, (result) => {
                this.emit(EVENT_ERROR, {
                    type: EVENT_ERROR,
                    target: this.data
                });
            })
        } else if (this.storage) {
            promise = promise.then(() => {
                this.manager.syncStorage(this.name);
            }, () => {

            });
        } else {
            promise = promise.then(() => {
                return this.data;
            });
        }
        return promise;
    }
}

Store.interval = interval;