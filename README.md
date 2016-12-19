# mlux
flux规范的一种实现。

* [features](#features)
* [demo](#demo)
* [usage](#usage)
* [API Reference](#api-reference)
    * [StoreManager](#storemanager)
    * [Store](#storemanager)
* [Binder](#binder)

## Features

* 提供数据持久化方案。
* 兼容react和react-native。
* 提供数据结构不可变得store来管理数据。
* 可以通过事件监听store变化。
* 通过Binder组件可以快速构建和store双向绑定的组件。

## Demo 

请移步[Lottery](https://github.com/pallyoung/lottery)项目;

## Usage

 在项目根目录下执行 `npm install mlux --save`。      
 在项目文件中引入 `import mlux from 'mlux'`;

## API Reference

  * [EventEmitter](#eventemitter)
  * [StoreManager](#storemanager)
  * [createStore] (#createStore)
  * [Store](#storemanager)

*Note:StoreManager和Store都继承EventEmitter，所有都可以用EventEmitter中的方法*

### EventEmitter

  * [addListener](#addlistener):添加监听事件。
  * [removeListener](#removelistener):移除监听事件。
  * [removeAllListeners](#removealllisteners):添加全部监听事件。
  * [emit](#emit):触发事件。

#### addListener

```javascript
eventEmitter.addListener(type:String,listener:function(...args:...Object)): EventToken;
```

#### removeListener

```javascript
eventEmitter.removeListener(eventToken:EventToken);
```

#### removeAllListeners

```javascript
//如果有type参数，就移除指定type的所有监听时间，否则移除所有监听事件。
eventEmitter.removeAllListeners(?type:String);
```

#### emit

```javascript
//触发实践
eventEmitter.emit(type:String,...args:...Object);
```

### StoreManager
  
  * [register](#storemanagerregister):向StoreManager注册一个Store。
  * [unregister](#storemanagerunregister):移除StoreManager中注册的Store。
  * [mapRegister](#storemanagermapregister):注册Store。
  * [setStorageTool](#storemanagersetstoragetool):设置StorageManager的持久化工具。

#### StoreManager.register
```javascript
//注册store
// @returnValue:Promise
StoreManager.register(storeConfig);
```
##### StoreConfig

通过向register方法提供storeConfig参数来配置store的默认属性。

* __name__ *(String)* - store的名字，必须是唯一的，各个store之间通过name来区别。通过register方法创建的store可以直接用`StoreManager[name]`的方式来访问。必须。
* __data__ *(JSONObject)* - store的数据结构。数据结构一旦确定，将不可更改。不可以删除或者添加store中的字段。必须。
* __storage__ *(Boolean)* - 表示该store是否要数据持久化。如果设置了true，StoreManager讲通过setStorageTool方法设置的持久化工具来持久化该store。可选
* __pump__ *(()=>Promise)* - 为store设置数据源。可以是http请求或者其他的来源。返回值必须是Promise对象。可选。
* __flow__ *(StringArray)* - 配置当store数据发生改变时，需要通知到哪几个store知道。可选。
* __onFlow__ *((fromStore:Store)=>Promise)* - 配置当另外的是store数据发生改变且该store在另外的store的flow清单中，就会通过该方法来接受。

#### StoreManager.unregister

```javascript
StoreManager.unregister(storeName);
```
移除StoreManager中注册的Store。通过是移除该store中所有的监听事件。

#### StoreManager.mapRegister

```javascript
// @returnValue:Promise
StoreManager.mapRegister(storeConfigArray);
```
通过一个StoreConfig数组批量注册store;

#### StoreManager.setStorageTool

```javascript
//设置StorageManager的持久化工具
StoreManager.setStorageTool(storageTool);
```

##### storageTool

* __setter__ *((key:String,value:String)=>Promise)* - 数据存储接口。
* __getter__ *((key:String)=>Promise)* - 数据获取接口。

### createStore

*note:通过createStore方法创建的store不可以通过`StorageManager[name]`的方法访问，且即使设置了storage为true，也不不会做本地持久化。*

```javascript
let store = mlux.createStore(storeConfig);
```

### Store

store是mlux的数据核心。在storeConfig中配置了store的数据结构之后，就可以用store[property]的方法访问和赋值。store中的数据发生变化的时候，会触发change事件，并且storeManager也会触发change事件。可以用for in来遍历store中的数据。

* [assign](#assign):向store中批量更新数据。
* [copy](#copy):复制store中的数据。
* [pump](#pump):通过storeConfig中配置的pump方法获取数据更新store。

#### assign

```javascript
store.assign(data);
```

#### copy

```javascript
let data = store.copy();
```
#### pump

```javascript
store.pump();
```
### Binder
请移步[react-mlux-binder](https://github.com/pallyoung/react-mlux-binder)。



 
 
 




