'use strict'
import Dispatcher from './dispatcher/Dispatcher';
import StoreManager from './store/StoreManager';

import Binder from './Binder';
var dispatcher = new Dispatcher();
var cm = new ControllerManager();

// storeManager.actions = {};
// storeManager.handleAction = function (action, data) {
//     var actionHanler = storeManager.actions[action];
//     if (actionHanler) {
//         actionHanler(data);
//     }
// }
// storeManager.addAction = function (action, actionHanler) {
//     storeManager.actions[action] = actionHanler;
// }
// storeManager.addActions = function (actionMap) {
//     for (let action in actionMap) {
//         storeManager.actions[action] = actionMap[action];
//     }
// }
// dispatcher.register(function (payload) {
//     storeManager.handleAction(payload.action, payload.data);
// });
export default {
    StoreManager,
    Binder
}