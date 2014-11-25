define('foo:lib/bar', function (require, exports, module) {
    module.exports = Bar;

    function Bar() {
        this.name = 'bar';
    }
});
