'use strict'
function promise(res,rej){
    res();
}
export default function(){
    return new Promise(promise);
}