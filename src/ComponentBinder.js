'use strict'
import React, { Component, PropTypes } from 'react';
import { isArray, type } from './util';

var id = 1;
const PERFIX = 'BINDER_STORE_';

function getId() {
    id++;
    return PERFIX + id;
}
export default class BaseBinder extends Component {
    constructor(...props) {
        super(...props);
        this.stores = this._getStoreFromProps(this.props.store);
        this.listener = () => {
            clearTimeout(this.timeout);
            this.timeout =  setTimeout(()=> this.mounted && this.forceUpdate(),10);          
        };
        this.mounted;
        this.timeout;
        this.listenerTokens = {};
    }
    _getStoreFromProps(props) {
        var stores = {};
        if (isArray(props.store)) {
            props.store.forEach(function (s) {
                stores[getId()] = s;
            });
        } else {
            stores[getId()] = props.store;
        }
        return stores;

    }
    _bind() {
        var stores = this.stores;
        this.listenerTokens = {};
        for (let s in stores) {
            this.listenerTokens[s] = stores[s].addListener('change', this.listener);
        }
    }
    _unbind() {
        for (let s in stores) {
            stores[s].removeListener(this.listenerTokens[s]);
        }
        this.listenerTokens = {}
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.store != this.store) {
        //     this.store.removeListener(this.listener)
        //     this.store = nextProps.store;
        //     this.listener = this.
        // }
    }
    componentDidMount() {
        this.mounted = true
        this._bind();
    }
    componentWillUnmount() {
        this.mounted = false;
        this._unbind();
    }
    render() {
        var Component = this.props.component;
        var passProps = this.props.passProps || {};
        return <Component {...passProps} />
    }
}