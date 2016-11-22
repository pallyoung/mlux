'use strict'
import React, { Component, PropTypes } from 'react';
export default class BaseBinder extends Component {
    constructor(...props) {
        super(...props);
        this.store = this.props.store;
        this.listener;
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.store!=this.store){
            this.store.removeListener(this.listener)
            this.store = nextProps.store;
            this.listener = this.store.addListener('change',()=>{
                this.forceUpdate();
            });
        }
    }
    componentDidMount() {
        this.listener = this.store.addListener('change',()=>{
            this.forceUpdate();
        })
    }
    componentWillUnmount() {
        this.store.removeListener(this.listener)
    }      
    render() {
        var Component = this.props.component;
        var passProps = this.props.passProps || {};
        return <Component {...passProps} />
    }
}