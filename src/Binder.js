'use strict'
import React, { Component, PropTypes } from 'react';
import StoreManager from './store/StoreManager';
import equlas from './equlas';
import BaseBinder from './BaseBinder';
import { isString, type,isFunction } from './util';
const PREFIX = 'binder_';
var binders = {

};

var changedStores = {}
var id = 1;

var timeout;
StoreManager.addListener('change', function (storeName) {
    clearTimeout(timeout);
    changedStores[storeName] = true;
    timeout = setTimeout(function () {
        //派发更新
        for (let id in binders) {
            let binder = binders[id];
            let subscriptions = binder.subscriptions;
            for (let storeName in changedStores) {
                if (subscriptions[storeName]) {
                    let subscription = subscriptions[storeName];
                    setTimeout((function (binder) {
                        return function () {
                            binder.update();
                        }
                    })(binder), 1);
                    break;
                }
            }
        }
        changedStores = {};
    }, 10);
});
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
        this.subscriptions = parseBindProp(this.props.bind);
        this.id = PREFIX + id;
        this.state = {
            update: Date.now()
        }
        id++;

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.bind != this.props.bind) {
            this.subscriptions = parseBindProp(nextProps.bind);
        }
    }
    componentDidMount() {
        binders[this.id] = this;
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
        delete binders[this.id];
    }
    bindListener() {

    }
    removeListener() {

    }
    update() {
        this.mounted && this.forceUpdate();
    }
    render() {
        return this.props.render();
    }
}

Binder.propTypes = {
    bind: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    render: PropTypes.func
}
Binder.createElement = function (Component, bind, props) {
    props = props || {};
    if (isString(bind)) {
        return <Binder bind={bind} render={() => <Component {...props} />} />
    }
    if (type(bind) == 'store') {
        return <BaseBinder store={bind} getProps={()=>props} component={Component} />
    }
}
Binder.createClass = function (Component) {
    return React.createClass({
        render: function () {
            var bind = this.props.bind || '';
            var props = {};
            if(isFunction(this.props.getProps)){
                props = this.props.getProps()||{}
            }
            if (isString(bind)) {        
                return <Binder bind={bind} render={() => <Component {...props} />} />
            }
            if (type(bind) == 'store') {
                return <BaseBinder store={bind} passProps = {props} component={Component} />
            }
            return null;
        }
    })
}