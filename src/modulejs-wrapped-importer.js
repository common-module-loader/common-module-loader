
/**
 * modulejs-wrapped-importer
 * 已包裹模块引入器
 *
 * @description 
 * 使用 importJSON 来引入一个module.json模块定义文件
 * 使用 importModule 来引入一个模块
 */
;(function (modulejs, global) {
    // 模块列表JSON文件储存
    var JSONPathStore = {};

    /**
     * 引入一个modules.json模块定义文件
     *
     * @description 
     * 最终的设计是 importJSON 只导入模块的名和路径，不下载和执行模块代码
     * 前期先下载和执行模块代码，稍后有时间和精力再完善
     *
     * @note
     * 注意：
     * 由于浏览器的同源策略（Same Origin Policy），
     * JSON文件必须放置在站点的域名上，
     * JSON文件里定义的模块路径可以是跨域名的。
     * 
     * @param  {String} jsonPath json文件路径
     * @param  {Function} onImport 引入完成回调函数
     */
    function importJSON(jsonPath, onImportJSON) {
        if (typeof JSONPathStore[jsonPath] !== 'undefined') {
            throw new Error('already imported json');
        }

        var xhr = new XMLHttpRequest();
        // 是否异步加载
        var xhrAsync = false;
        // JSON文件路径字符串按斜杠分割
        var jsonPathSplitArray = jsonPath.split('/');
        // JSON文件名
        var jsonFileName = jsonPathSplitArray.pop();
        // JSON文件路径
        var jsonFileFolderPath = jsonPathSplitArray.join('/');

        xhr.onreadystatechange = function (XMLHttpRequestProgressEvent) {
            if (xhr.readyState === 4) {
                // JSON文件内容字符串
                var jsonFileContent = xhr.responseText

                // 将JSON文件内容储存起来
                JSONPathStore[jsonPath] = jsonFileContent;

                // 将JSON文件内容字符串解析为对象
                var modules = JSON.parse(jsonFileContent);

                // 记录模块数量
                var recordModules = 0;

                for (var i in modules) {
                    // 递增模块数量
                    recordModules++;
                }

                for (var moduleName in modules) {
                    // 模块文件路径
                    var modulePath = modules[moduleName];

                    // 替换路径的第一个点
                    if (modulePath.indexOf('./') > -1) {
                        modulePath = modulePath.substring(2);
                    }

                    var scriptElement = document.createElement('script');

                    scriptElement.onload = function () {
                        // 递减模块数量
                        recordModules--;

                        // 模块都加载完了
                        if (recordModules === 0) {
                            onImportJSON && onImportJSON();
                        }
                    }

                    scriptElement.type = 'text/javascript';

                    if (modulePath.indexOf('http') > 0) {
                        // 绝对路径的模块
                        scriptElement.src = modulePath;
                    } else {
                        scriptElement.src = jsonFileFolderPath + '/' + modulePath;
                        // 相对路径的模块
                    }

                    document.head.appendChild(scriptElement);
                }
            }
        }

        xhr.open('GET', jsonPath, xhrAsync);
        xhr.send();

        // 将已经载入列表的json文件路径状态标明起来
        JSONPathStore[jsonPath] = true;
    }

    function importModule(modulePath, onImportModule) {

    }

    // 向modulejs挂载importJSON，importModule
    modulejs.importJSON = importJSON;
    modulejs.importModule = importModule;
})(modulejs, this);
