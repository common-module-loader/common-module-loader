;(function (env) {
    /**
     * 模块管理器
     *
     * @pattern
     * 单一实例设计
     */
    var moduleManager = {};

    /**
     * 从字符串中分析出引入的模块名称
     * @param  {String} string 字符串
     * @return {Array}        模块列表
     */
    function getRequiredModulesFromString(string) {
        // 先将所有字符串小写
        string = string.toLowerCase();

        // 将字符串里的所有双引号变成单引号
        string = string.replace(/"/g, "'");

        // 将字符串中的 require('\w') 匹配出来
        var matchedRequireList = string.match(/require\('\w+'\)/g);

        // 没有匹配到任何 require
        if (matchedRequireList === null) {
            return null;
        }

        var requiredModules = [];

        for (var i = 0, matchedRequire; matchedRequire = matchedRequireList[i]; i++) {
            requiredModules.push(matchedRequire.match(/\('(\w+)'\)/)[1]);
        }

        return requiredModules;
    }
})(this);
