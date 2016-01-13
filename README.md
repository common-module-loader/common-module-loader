modulejs
==========

模块化JS实现


## 加载modulejs
```
// 基础模块
http://common-module.github.io/modulejs/src/modulejs.js

// 注册模块
http://common-module.github.io/modulejs/src/modulejs-register.js

// 加载模块
http://common-module.github.io/modulejs/src/modulejs-importer.js

// 包裹后的加载模块
http://common-module.github.io/modulejs/src/modulejs-wrapped-importer.js
```


## modulejs.define
定义一个模块


### 模块命名原则
- 模块名用中横线连接，并且小写  
    正确：`define('my-module:my-module')`  
    错误：`define('MyModule:MyModule')`  

- 模块名后面不要接文件格式  
    正确：`define('my-module:my-module')`  
    错误：`define('my-module:my-module.js')`  

- 如果一个模块是属于某个项目的，则用`项目名:模块名`的格式  
    比如：`define('my-project:my-module')`  

- 如果一个模块开发出来是公用的，则用重复`模块名`的格式  
    比如：`define('my-module:my-module')`  


## modulejs.require
加载一个模块


## 暴露到全局

`window.define`

`window.require`

## 加载模块时，如果模块路径不包含冒号，则转换为path:path格式
```
define('foo:foo', function (require, exports, module) {
    module.exports = Foo;

    function Foo() {
        this.name = 'foo';
    }
});

define('foo:bar', function (require, exports, module) {});

// foo会自动转换为foo:foo
var Foo = require('foo');
var Bar = requrie('foo:bar');
```


## Todo
- Rename modulejs to common-module-laoder


---

Copyright (c) 2014 Shallker Wang - MIT License (enclosed)
