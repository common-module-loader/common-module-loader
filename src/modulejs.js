/**
 * 定义全局的对象，modulejs
 */
;(function (global) {
    if (typeof global.modulejs !== 'undefined') {
        throw new Error('global modulejs is defined');
    }

    // 定义全局的modulejs
    global.modulejs = {};
})(this);
