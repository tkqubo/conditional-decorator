import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { conditional } from '../src/index';

function createParameterDecorator(spy: Sinon.SinonSpy): ParameterDecorator {
  return function decorator(target: Object, propertyKey: string|symbol, parameterIndex: number): void {
    spy.apply(spy, arguments);
  }
}
const spy1 = sinon.spy();
const decor1 = createParameterDecorator(spy1);
const spy2 = sinon.spy();
const decor2 = createParameterDecorator(spy2);
const spy3 = sinon.spy();
const decor3 = createParameterDecorator(spy3);
const spy4 = sinon.spy();
const decor4 = createParameterDecorator(spy4);
const spy5 = sinon.spy();
const decor5 = createParameterDecorator(spy5);
const spy6 = sinon.spy();
const decor6 = createParameterDecorator(spy6);

function testParameter(target: Object, propertyKey: string|symbol, parameterIndex: number): boolean {
  return propertyKey === 'methodOk' && parameterIndex === 1;
}

class TargetClass {
  method1(
      @conditional(true, decor1) param1: number,
      @conditional(false, decor2) param2: string) { }

  methodOk(
      @conditional(testParameter, decor3) param1: number,
      @conditional(testParameter, decor4) param2: string) { }

  methodNg(
      @conditional(testParameter, decor5) param1: number,
      @conditional(testParameter, decor6) param2: string) { }
}

describe('conditional', () => {
  describe('as parameter decorator', () => {
    describe('(test: boolean, decorator: ParameterDecorator): ParameterDecorator', () => {
      it('decorates if test is truthy', () => {
        assert(spy1.callCount === 1);
        assert(spy1.getCall(0).args[0] === TargetClass.prototype);
        assert(spy1.getCall(0).args[1] === 'method1');
        assert(spy1.getCall(0).args[2] === 0);
      });
      it('doesn\'t decorate if test is falsy', () => {
        assert(spy2.callCount === 0);
      });
    });

    describe('(test: (target?: Object, key?: string|symbol, index?: number) => boolean, decorator: ParameterDecorator): ParameterDecorator', () => {
      it('decorates if test function returns true', () => {
        assert(spy4.callCount === 1);
        assert(spy4.getCall(0).args[0] === TargetClass.prototype);
        assert(spy4.getCall(0).args[1] === 'methodOk');
        assert(spy4.getCall(0).args[2] === 1);
      });
      it('doesn\'t decorate if test function returns false', () => {
        assert(spy3.callCount === 0);
        assert(spy5.callCount === 0);
        assert(spy6.callCount === 0);
      });
    });
  });
});

