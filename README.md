modulejs
==========

模块化JS实现


## modulejs.define
定义一个模块


### 模块命名原则
- 模块名用中横线连接，并且小写  
    正确：`define('my-module')`  
    错误：`define('MyModule')`  

- 模块名后面不要接文件格式  
    正确：`define('my-module')`  
    错误：`define('my-module.js')`  

- 如果一个模块是属于某个项目的，则用`项目名:模块名`的格式  
    比如：`define('my-project:my-module')`  

- 如果一个模块开发出来是公用的，则用`模块名`的格式  
    比如：`define('my-module')`  


## modulejs.require
加载一个模块


## 暴露到全局
`window.define`
`window.require`


---

Copyright (c) 2014 Shallker Wang - MIT License (enclosed)
