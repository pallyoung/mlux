'use strict'

export default function equlas(s1,s2){
    if (s1==s2){
        return true;
    }
    if(typeof s1 !== typeof s2){
        return false;
    }
    if(Array.isArray(s1)){
        for(var i = 1;i<s1.length;i++){
            if (!equlas(s1[i],s2[i])){
                return false;
            }
        }
        return true;
    }
    if(typeof s1 == 'object'){
        let keys1 = Object.keys(s1);
        let keys2 = Object.keys(s2);
        if(keys1.length!==keys2.length){
            return false;
        }
        for(var o in s1){
            if (!equlas(s1[o],s2[o])){
                return false;
            }
        }
        return true;
    }
    return false;
}