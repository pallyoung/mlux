'use strict'
import React,{Component} from 'react';

export default class Binder extends Component{
    constructor(...props) {
        super(...props);       
    }
    
    componentWillMount() {
        
    }
    componentWillUnmount() {
        
    }   
    render(){
        return this.props.children;
    }
}