define('foo:foo', function (require, exports, module) {
    module.exports = Foo;

    function Foo() {
        this.name = 'foo';
    }
});
