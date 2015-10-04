var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var assert = require('power-assert');
var sinon = require('sinon');
var index_1 = require('../src/index');
var createClassDecorator = function (name, value) { return function (clazz) {
    clazz.prototype[name] = value;
    return clazz;
}; };
var statusDecorator = createClassDecorator('status', 'status 1');
var spyWithTrue = sinon.spy(statusDecorator);
var spyWithFalse = sinon.spy(statusDecorator);
var ClazzSpiedWithTrue = (function () {
    function ClazzSpiedWithTrue() {
    }
    ClazzSpiedWithTrue = __decorate([
        index_1.conditional(true, spyWithTrue)
    ], ClazzSpiedWithTrue);
    return ClazzSpiedWithTrue;
})();
var ClazzSpiedWithFalse = (function () {
    function ClazzSpiedWithFalse() {
    }
    ClazzSpiedWithFalse = __decorate([
        index_1.conditional(false, spyWithFalse)
    ], ClazzSpiedWithFalse);
    return ClazzSpiedWithFalse;
})();
function checkClassName(clazz) {
    return clazz.name === 'ClassSpiedWithFunctionReturningTrue';
}
var statusDecorator2 = createClassDecorator('status', 'status 2');
var spyWithFunctionReturningTrue = sinon.spy(statusDecorator2);
var spyWithFunctionReturningFalse = sinon.spy(statusDecorator2);
var ClassSpiedWithFunctionReturningTrue = (function () {
    function ClassSpiedWithFunctionReturningTrue() {
    }
    ClassSpiedWithFunctionReturningTrue = __decorate([
        index_1.conditional(checkClassName, spyWithFunctionReturningTrue)
    ], ClassSpiedWithFunctionReturningTrue);
    return ClassSpiedWithFunctionReturningTrue;
})();
var ClassSpiedWithFunctionReturningFalse = (function () {
    function ClassSpiedWithFunctionReturningFalse() {
    }
    ClassSpiedWithFunctionReturningFalse = __decorate([
        index_1.conditional(checkClassName, spyWithFunctionReturningFalse)
    ], ClassSpiedWithFunctionReturningFalse);
    return ClassSpiedWithFunctionReturningFalse;
})();
describe('conditional', function () {
    describe('as class decorator', function () {
        describe('(test: boolean, decorator: ClassDecorator) => ClassDecorator', function () {
            it('decorates if test is truthy', function () {
                assert(spyWithTrue.callCount === 1);
                assert(new ClazzSpiedWithTrue().status === 'status 1');
            });
            it('doesn\'t decorate if test is falsy', function () {
                assert(spyWithFalse.callCount === 0);
                assert(new ClazzSpiedWithFalse().status === undefined);
            });
        });
        describe('(test: (clazz?: Function) => boolean, decorator: ClassDecorator): ClassDecorator', function () {
            it('decorates if test function returns true', function () {
                assert(spyWithFunctionReturningTrue.callCount === 1);
                assert(new ClassSpiedWithFunctionReturningTrue().status === 'status 2');
            });
            it('doesn\'t decorate if test function returns false', function () {
                assert(spyWithFunctionReturningFalse.callCount === 0);
                assert(new ClassSpiedWithFunctionReturningFalse().status === undefined);
            });
        });
    });
});
