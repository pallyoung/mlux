### mlux
flux规范的一种实现，具有双向绑定、数据流动等特性。


***

#### 特点

*提供数据持久化方案。
*兼容react和react-native。
*提供数据结构不可变得store来管理数据。
*可以通过事件监听store变化。
*通过Binder组件可以快速构建和store双向绑定的组件。

#### demo 
请移步 https://github.com/pallyoung/lottery;
#### usage

#####引入mulx
 在项目根目录下 npm install mlux --save
 然后在项目文件中引入 import Mlux from 'mlux';
#####如何创建store
import {createStore,StoreManager} from 'mlux';

var storeConfig = {
  name:'teststore',
  data:{
    value:'test'
  }
}
var testStore  = createStore(storeConfig);
或者
StoreManager.register(storeConfig);
testStore = StoreManager.teststore;
#####监听store数据变化

testStore.addListener('change',()=>{console.log(testStore)});

StoreManager.addListener('change',()=>{console.log(testStore)});

#####StoreManager
可以通过StoreManager去管理store
所有通过register方法创建的store都可以通过StoreManager直接访问。
可以将StoreManager设置为全局变量方便访问。
任何store数据发生变化时，StoreManager都可以接收到通知

####Binder
Binder




 
 
 




