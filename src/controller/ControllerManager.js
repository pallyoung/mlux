'use strict'
import constants  from './../constants';
const SEPREATOR = '_';
function upperCase(string){
    return string.toUpperCase();
}
function keyMaker(moduleName,controllerName){
    return moduleName+SEPREATOR+controllerName
}
class ControllerManager{
    constructor(){
        this._CR = {

        }
        this.cmds = {

        }
    }
    post(cmd,...args){
        var cmdArr = cmd.split(SEPREATOR);
        var module = this._CR[cmdArr[0]];
        if(module&&module[cmdArr[1]]){
            console.log(constants.PACKAGE_NAME+':invoke controller '+cmd);
            module[cmdArr[1]](...args);
        }else{
            throw new Error(constants.PACKAGE_NAME+':cant find controller for cmd '+cmd);
        }
    }
    register(name,module){
        this._CR[name] = module;
        for(let controller in module){
            let cmd = keyMaker(name,controller);
            this.cmds[upperCase(cmd)] = cmd;
        }
        
    }
    unregister(name){
        var module = this._CR[name];
        for(let controller in module){
            let cmd = keyMaker(name,controller);
            delete this.cmds[upperCase(cmd)]
        }
        delete this._CR[name];
    }
}
export default ControllerManager;