'use strict'
import EventEmitter from './../EventEmitter';
import emptyMethod from './../emptyMethod';
const interval = 10 * 60 * 1000;//默认10分钟更新一次
const EVENT_CHNAGE = 'change';
const EVENT_ERROR = 'error';
class Store extends EventEmitter {
    constructor(config,storeManager) {
        super();
        this.name = config.name;
        this._setter = config.setter;
        this._getter = config.getter;
        this.interval = config.interval || -1;
        this.data = config.initialData;
        this.piple = config.piple;
        this.cache = config.cache || false;
        this.needCommit = config.needCommit;
        this.timestamp = 0;
        this.manager = storeManager;
    }
    setter(data) {
        if (!this._setter) {

        } else {
            return this._setter(data, ...args).then((result) => {
                this.data = result;
                if (this.cache) {
                    this.manager[this.name] = result;
                    if(this.piple&&this.piple.length>0){
                         this.manager.piple(this.piple,result);
                    }  
                    if(this.needCommit){
                        //提交成功或者失败 不管
                        this.manager.commit(this.name,result);
                    }                
                }
                this.emit(EVENT_CHNAGE);
            }, () => {
                this.emit(EVENT_ERROR);
            });
        }


    }
    getter(...args) {
        if (!this._getter) {

        } else {
            let interval = this.interval == -1 ? Store.interval : this.interval;
            let now = Date.now();
            if (interval + this.timestamp < now) {
                //小于更新时间 直接返回上次的值
                return new Promise((res) => {
                    res(this.data);
                });
            } else {
                return this._getter(...args).then((result) => {
                    this.setter(result);
                }, () => {
                    this.emit(EVENT_ERROR);
                });
            }

        }
    }
}

Store.interval = interval;