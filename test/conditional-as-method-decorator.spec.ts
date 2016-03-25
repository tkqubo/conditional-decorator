import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { conditional } from '../src/index';

enum PropertyType {
  Set, Get, Value,
}

function getDecoratee<T>(type: PropertyType, descriptor: TypedPropertyDescriptor<T>): any {
  'use strict';
  switch (type) {
    case PropertyType.Get:
      return descriptor.get;
    case PropertyType.Set:
      return descriptor.set;
    case PropertyType.Value:
      return descriptor.value;
    default:
      return null;
  }
}

function setDecoratee<T>(type: PropertyType, descriptor: TypedPropertyDescriptor<T>, decoratee: any): any {
  'use strict';
  switch (type) {
    case PropertyType.Get:
      descriptor.get = decoratee;
      return;
    case PropertyType.Set:
      descriptor.set = decoratee;
      return;
    case PropertyType.Value:
      descriptor.value = decoratee;
      return;
    default:
      return;
  }
}

function createSideEffectMethodDecorator(applicationSpy: Sinon.SinonSpy,
                                         invocationSpy: Sinon.SinonSpy,
                                         type: PropertyType): MethodDecorator {
  'use strict';
  return function <T>(target: Object,
                      propertyKey: string|symbol,
                      descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {
    'use strict';
    applicationSpy.apply(applicationSpy, arguments);
    let decoratee = getDecoratee(type, descriptor);
    setDecoratee(type, descriptor, (...args: any[]) => {
      invocationSpy.apply(invocationSpy, args);
      return decoratee.call(target, ...args);
    });
    return descriptor;
  };
}

function testMethodName(target?: Object, key?: string|symbol, desc?: PropertyDescriptor): boolean {
  'use strict';
  return key === 'decoratableMethod';
}

const applicationSpy1 = sinon.spy();
const invocationSpy1 = sinon.spy();
const instanceMethodSpy1 = sinon.spy();
const decor1 = createSideEffectMethodDecorator(applicationSpy1, invocationSpy1, PropertyType.Value);

const applicationSpy2 = sinon.spy();
const invocationSpy2 = sinon.spy();
const instanceMethodSpy2 = sinon.spy();
const decor2 = createSideEffectMethodDecorator(applicationSpy2, invocationSpy2, PropertyType.Value);

const applicationSpy3 = sinon.spy();
const invocationSpy3 = sinon.spy();
const instanceMethodSpy3 = sinon.spy();
const decor3 = createSideEffectMethodDecorator(applicationSpy3, invocationSpy3, PropertyType.Value);

const applicationSpy4 = sinon.spy();
const invocationSpy4 = sinon.spy();
const instanceMethodSpy4 = sinon.spy();
const decor4 = createSideEffectMethodDecorator(applicationSpy4, invocationSpy4, PropertyType.Value);

const applicationSpy5 = sinon.spy();
const invocationSpy5 = sinon.spy();
const instanceMethodSpy5 = sinon.spy();
const decor5 = createSideEffectMethodDecorator(applicationSpy5, invocationSpy5, PropertyType.Get);

const applicationSpy6 = sinon.spy();
const invocationSpy6 = sinon.spy();
const instanceMethodSpy6 = sinon.spy();
const decor6 = createSideEffectMethodDecorator(applicationSpy6, invocationSpy6, PropertyType.Get);

const applicationSpy7 = sinon.spy();
const invocationSpy7 = sinon.spy();
const instanceMethodSpy7 = sinon.spy();
const decor7 = createSideEffectMethodDecorator(applicationSpy7, invocationSpy7, PropertyType.Set);

const applicationSpy8 = sinon.spy();
const invocationSpy8 = sinon.spy();
const instanceMethodSpy8 = sinon.spy();
const decor8 = createSideEffectMethodDecorator(applicationSpy8, invocationSpy8, PropertyType.Set);

class TargetClass {
  @conditional(true, decor1)
  method1(name: string) {
    instanceMethodSpy1.apply(instanceMethodSpy1, arguments);
  }

  @conditional(false, decor2)
  method2(name: string) {
    instanceMethodSpy2.apply(instanceMethodSpy2, arguments);
  }

  @conditional(testMethodName, decor3)
  decoratableMethod(name: string) {
    instanceMethodSpy3.apply(instanceMethodSpy3, arguments);
  }

  @conditional(testMethodName, decor4)
  undecoratableMethod(name: string) {
    instanceMethodSpy4.apply(instanceMethodSpy4, arguments);
  }

  @conditional(true, decor5)
  get age(): number {
    instanceMethodSpy5.apply(instanceMethodSpy5, arguments);
    return 42;
  }

  @conditional(false, decor6)
  get sex(): boolean {
    instanceMethodSpy6.apply(instanceMethodSpy6, arguments);
    return true;
  }

  @conditional(true, decor7)
  set id(id: number) {
    instanceMethodSpy7.apply(instanceMethodSpy7, arguments);
  }

  @conditional(false, decor8)
  set country(country: string) {
    instanceMethodSpy8.apply(instanceMethodSpy8, arguments);
  }
}

describe('conditional', () => {
  describe('as a method decorator', () => {
    describe('(test: boolean, decorator: MethodDecorator): MethodDecorator', () => {
      describe('for ordinary method', () => {
        it('decorates if test is truthy', () => {
          assert(applicationSpy1.callCount === 1);
          assert(applicationSpy1.getCall(0).args[0] === TargetClass.prototype);
          assert(applicationSpy1.getCall(0).args[1] === 'method1');
          assert(invocationSpy1.callCount === 0);
          assert(instanceMethodSpy1.callCount === 0);

          new TargetClass().method1('hello');
          assert(invocationSpy1.callCount === 1);
          assert(invocationSpy1.getCall(0).args.length === 1);
          assert(invocationSpy1.getCall(0).args[0] === 'hello');
          assert(instanceMethodSpy1.callCount === 1);
          assert(instanceMethodSpy1.getCall(0).args.length === 1);
          assert(instanceMethodSpy1.getCall(0).args[0] === 'hello');
        });

        it('doesn\'t decorate if test is falsy', () => {
          assert(applicationSpy2.callCount === 0);
          assert(invocationSpy2.callCount === 0);
          assert(instanceMethodSpy2.callCount === 0);

          new TargetClass().method2('world');
          assert(applicationSpy2.callCount === 0);
          assert(invocationSpy2.callCount === 0);
          assert(instanceMethodSpy2.callCount === 1);
          assert(instanceMethodSpy2.getCall(0).args.length === 1);
          assert(instanceMethodSpy2.getCall(0).args[0] === 'world');
        });
      });

      describe('for getter', () => {
        it('decorates if test is truthy', () => {
          assert(applicationSpy5.callCount === 1);
          assert(applicationSpy5.getCall(0).args[0] === TargetClass.prototype);
          assert(applicationSpy5.getCall(0).args[1] === 'age');
          assert(invocationSpy5.callCount === 0);
          assert(instanceMethodSpy5.callCount === 0);

          let age = new TargetClass().age;
          assert(age === 42);
          assert(invocationSpy5.callCount === 1);
          assert(invocationSpy5.getCall(0).args.length === 0);
          assert(instanceMethodSpy5.callCount === 1);
          assert(instanceMethodSpy5.getCall(0).args.length === 0);
        });

        it('doesn\'t decorate if test is falsy', () => {
          assert(applicationSpy6.callCount === 0);
          assert(invocationSpy6.callCount === 0);
          assert(instanceMethodSpy6.callCount === 0);

          let sex = new TargetClass().sex;
          assert(sex === true);
          assert(applicationSpy6.callCount === 0);
          assert(invocationSpy6.callCount === 0);
          assert(instanceMethodSpy6.callCount === 1);
          assert(instanceMethodSpy6.getCall(0).args.length === 0);
        });
      });

      describe('for setter', () => {
        it('decorates if test is truthy', () => {
          assert(applicationSpy7.callCount === 1);
          assert(applicationSpy7.getCall(0).args[0] === TargetClass.prototype);
          assert(applicationSpy7.getCall(0).args[1] === 'id');
          assert(invocationSpy7.callCount === 0);
          assert(instanceMethodSpy7.callCount === 0);

          new TargetClass().id = 999;
          assert(invocationSpy7.callCount === 1);
          assert(invocationSpy7.getCall(0).args.length === 1);
          assert(invocationSpy7.getCall(0).args[0] === 999);
          assert(instanceMethodSpy7.callCount === 1);
          assert(instanceMethodSpy7.getCall(0).args.length === 1);
          assert(instanceMethodSpy7.getCall(0).args[0] === 999);
        });

        it('doesn\'t decorate if test is falsy', () => {
          assert(applicationSpy8.callCount === 0);
          assert(invocationSpy8.callCount === 0);
          assert(instanceMethodSpy8.callCount === 0);

          new TargetClass().country = 'Japan';
          assert(applicationSpy8.callCount === 0);
          assert(invocationSpy8.callCount === 0);
          assert(instanceMethodSpy8.callCount === 1);
          assert(instanceMethodSpy8.getCall(0).args.length === 1);
          assert(instanceMethodSpy8.getCall(0).args[0] === 'Japan');
        });
      });
    });

    describe(
      '(test: (target?: Object, key?: string|symbol, desc?: PropertyDescriptor) => boolean, decorator: MethodDecorator): MethodDecorator',
      () => {
        it('decorates if test function returns true', () => {
          assert(applicationSpy3.callCount === 1);
          assert(applicationSpy3.getCall(0).args[0] === TargetClass.prototype);
          assert(applicationSpy3.getCall(0).args[1] === 'decoratableMethod');
          assert(invocationSpy3.callCount === 0);
          assert(instanceMethodSpy3.callCount === 0);

          new TargetClass().decoratableMethod('hello');
          assert(invocationSpy3.callCount === 1);
          assert(invocationSpy3.getCall(0).args.length === 1);
          assert(invocationSpy3.getCall(0).args[0] === 'hello');
          assert(instanceMethodSpy3.callCount === 1);
          assert(instanceMethodSpy3.getCall(0).args.length === 1);
          assert(instanceMethodSpy3.getCall(0).args[0] === 'hello');
        });

        it('doesn\'t decorate if test function returns false', () => {
          assert(applicationSpy4.callCount === 0);
          assert(invocationSpy4.callCount === 0);
          assert(instanceMethodSpy4.callCount === 0);

          new TargetClass().undecoratableMethod('world');
          assert(applicationSpy4.callCount === 0);
          assert(invocationSpy4.callCount === 0);
          assert(instanceMethodSpy4.callCount === 1);
          assert(instanceMethodSpy4.getCall(0).args.length === 1);
          assert(instanceMethodSpy4.getCall(0).args[0] === 'world');
        });
      });
  });
});

