'use strict'
import React, { Component, PropTypes } from 'react';
import StoreManager from './store/StoreManager';
import equlas from './equlas';
import { isString, type, isFunction, isArray } from './util';
var id = 1;
const PERFIX = 'BINDER_STORE_';

function getId() {
    id++;
    return PERFIX + id;
}

export default class Binder extends Component {
    constructor(...props) {
        super(...props);
        this.stores = this._getStoreFromProps(this.props);
        this.listener = () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.mounted && this.forceUpdate(), 10);
        };
        this.mounted;
        this.timeout;
        this.listenerTokens = {};
    }
    _getStoreFromProps(props) {
        var stores = {};
        if (isArray(props.bind)) {
            props.bind.forEach(function (s) {
                stores[getId()] = s;
            });
        } else {
            stores[getId()] = props.bind;
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
        var stores = this.stores;
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
        return this.props.render()
    }
}

Binder.propTypes = {
    bind: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    render: PropTypes.func
}
Binder.createElement = function (Component, bind, props) {
    props = props || {};
    return <Binder bind={bind} render={() => <Component {...props} />} />;

}
Binder.createClass = function (Component) {
    return React.createClass({
        render: function () {
            var bind = this.props.bind || [];
            var getProps = this.props.getProps;
            return <Binder 
                    bind={bind}
                    render={() =>{
                         var props = {};
                         var props = {};
                         if (isFunction(getProps)) {
                            props = getProps() || {}
                         }
                        return  <Component {...props} />}} />
        }
    })
}