var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var assert = require('power-assert');
var index_1 = require('../src/index');
var Hoge = (function () {
    function Hoge() {
    }
    Hoge.prototype.method = function () {
    };
    Object.defineProperty(Hoge.prototype, "method",
        __decorate([
            index_1.conditional('33', null)
        ], Hoge.prototype, "method", Object.getOwnPropertyDescriptor(Hoge.prototype, "method")));
    return Hoge;
})();
describe('index', function () {
    it('()', function () {
        assert(true);
    });
});
