'use strict'
import Dispatcher from './dispatcher/Dispatcher';
import ControllerManager from './controller/ControllerManager';
import StoreManager from './Store/StoreManager';


var dispatcher = new Dispatcher();
var cm = new ControllerManager();
var storeManager = new StoreManager();


export default {
    Dispatcher:dispatcher,
    ControllerManager:cm,
    StoreManager:storeManager
}