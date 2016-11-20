'use strict'
import React, { Component } from 'react';
import StoreManager from './StoreManager';
import equlas from './equlas';


function bindListener(stores, listener) {
    for(let o in stores){
        StoreManager.add
    }
}
function removeListener(stores,subscription) {

}
function parseBindProp(bindProp) {
    if (!bindProp) {
        return {};
    }
    var storeStrings = bindProp.split(/\s+/);
    var stores = {};
    for (let i = storeStrings.length - 1; i >= 0; i--) {
        let storeString = storeStrings[i];
        if (storeString.indexOf('.') != -1) {
            let params = storeString.split('.');
            let storeName = params[0];
            stores[storeName] = stores[storeName] || {
                name: storeName,
                keys: []
            }
            stores[storeName].keys.push(params[1]);
        } else {
            stores[storeString] = {
                name: storeString,
                keys: []
            }
        }
    }
    return stores;
}
export default class Binder extends Component {
    constructor(...props) {
        super(...props);
        this._stores = parseBindProp(this.props.bind);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.bind != this.props.bind) {
            this._stores = parseBindProp(this.props.bind);
        }
    }

    componentWillMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return this.props.children;
    }
}