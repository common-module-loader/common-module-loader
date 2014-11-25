
/**
 * modulejs-register
 * 模块注册器
 *
 * @description 
 * 使用 define 来定义模块
 * 使用 require 来加载模块
 */
;(function (modulejs, global) {
    // 模块储存
    var moduleStore = {};

    // 已被执行的模块储存
    var moduleExecutedStore = {};

    /**
     * 检测是否为空对象
     * @param {Mix} object 检测对象
     */
    function isEmpty(object) {
        if (typeof object === 'function') {
            return false;
        }

        if (object == null || object === undefined) {
            return true;
        }

        for (var i in object) {
            if (object.hasOwnProperty(i)) return false;
        }

        return true;
    }

    /**
     * 定义模块
     *
     * 使用：
     * define('CDOM:Event.js', function () {});
     * 
     * @param  {String} path   路径
     * @param  {Function} module 模块代码
     */
    function define(path, module) {
        // 参数检测，path
        if (typeof path !== 'string') {
            throw new Error('path is not a string');
        }

        // 参数检测，module
        if (typeof module !== 'function') {
            throw new Error('module is not a function');
        }

        path = path.toLowerCase();

        moduleStore[path] = module;
    }

    /**
     * 引入模块
     *
     * 使用：
     * 不区分大小写
     * var Event = require('CDOM:Event.js');
     * 
     * @param {String} path 模块路径
     */
    function require(path) {
        var me = this;

        // 参数检测，path
        if (typeof path !== 'string') {
            throw new Error('path is not a string');
        }

        // 路径小写
        path = path.toLowerCase();

        // 判断模块路径是否存在
        if (typeof moduleStore[path] === 'undefined') {
            throw new Error(['module', path, 'is not defined'].join(' '));
        }

        // 分割路径
        var pathSegment = path.split(':');

        // 主要路径
        var moduleRepo = pathSegment.shift();
        var modulePath = pathSegment.join('');

        // 判断是否是已执行过的模块
        if (typeof moduleExecutedStore[path] !== 'undefined') {
            return moduleExecutedStore[path].moduleExports;
        }

        // 获取模块函数
        var moduleFunc = moduleStore[path];

        // 定义module对象
        var emptyObject1 = {};
        var emptyObject2 = {};
        var module = emptyObject1;
        var exports = module.exports = emptyObject2;

        moduleFunc.call({}, require, exports, module);

        // 将执行过的模块记录起来，下次不再执行，直接返回结果
        moduleExecutedStore[path] = {
            func: moduleFunc,
            module: module,
            moduleExports: module.exports
        }

        // 如果没有输出，则默认输出undefined
        if (isEmpty(module.exports)) {
            module.exports = undefined;
        }

        return module.exports;
    }

    // 向modulejs挂载define，require
    modulejs.define = define;
    modulejs.require = require;

    // 向全局环境输出define，require
    global.define = define;
    global.require = require;
})(modulejs, this);
