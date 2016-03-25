import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { conditional } from '../src/index';

function createPropertyDecorator(spy: Sinon.SinonSpy): PropertyDecorator {
  'use strict';
  return function decorator(target?: Object, key?: string|symbol): void {
    'use strict';
    spy.apply(spy, arguments);
  };
}

const spy1 = sinon.spy();
const decor1: PropertyDecorator = createPropertyDecorator(spy1);
const spy2 = sinon.spy();
const decor2 = createPropertyDecorator(spy2);

class TargetClass1 {
  @conditional(true, decor1)
  name: string;
  @conditional(false, decor2)
  age: number;
}

const spy3 = sinon.spy();
const decor3 = createPropertyDecorator(spy3);
const spy4 = sinon.spy();
const decor4 = createPropertyDecorator(spy4);

class TargetClass2 {
  @conditional(testProperty, decor3) name: string;
  @conditional(testProperty, decor4) age: number;
}

function testProperty(target?: Object, key?: string|symbol): boolean {
  'use strict';
  return key === 'name';
}

describe('conditional', () => {
  describe('as a property decorator', () => {
    describe('(test: boolean, decorator: PropertyDecorator): PropertyDecorator', () => {
      it('decorates if test is truthy', () => {
        assert(spy1.callCount === 1);
        assert(spy1.getCall(0).args[0] === TargetClass1.prototype);
        assert(spy1.getCall(0).args[1] === 'name');
      });
      it('doesn\'t decorate if test is falsy', () => {
        assert(spy2.callCount === 0);
      });
    });

    describe('(test: (target?: Object, key?: string|symbol) => boolean, decorator: PropertyDecorator): PropertyDecorator', () => {
      it('decorates if test function returns true', () => {
        assert(spy3.callCount === 1);
        assert(spy3.getCall(0).args[0] === TargetClass2.prototype);
        assert(spy3.getCall(0).args[1] === 'name');
      });
      it('doesn\'t decorate if test function returns false', () => {
        assert(spy4.callCount === 0);
      });
    });
  });
});

