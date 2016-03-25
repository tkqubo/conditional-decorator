import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { conditional } from '../src/index';

function createClassDecorator(name: string, value: string): (clazz: Function) => Function {
  'use strict';
  return clazz => {
    clazz.prototype[name] = value;
    return clazz;
  };
}

let statusDecorator = createClassDecorator('status', 'status 1');
let spyWithTrue = sinon.spy(statusDecorator);
let spyWithFalse = sinon.spy(statusDecorator);

@conditional(true, spyWithTrue)
class ClazzSpiedWithTrue {
  status: string;
}

@conditional(false, spyWithFalse)
class ClazzSpiedWithFalse {
  status: string;
}

function checkClassName(clazz: Function): boolean {
  'use strict';
  return (<any>clazz).name === 'ClassSpiedWithFunctionReturningTrue';
}
let statusDecorator2 = createClassDecorator('status', 'status 2');
let spyWithFunctionReturningTrue = sinon.spy(statusDecorator2);
let spyWithFunctionReturningFalse = sinon.spy(statusDecorator2);

@conditional(checkClassName, spyWithFunctionReturningTrue)
class ClassSpiedWithFunctionReturningTrue {
  status: string;
}
@conditional(checkClassName, spyWithFunctionReturningFalse)
class ClassSpiedWithFunctionReturningFalse {
  status: string;
}

let deepDecorator = createClassDecorator('status', 'yes');
let deepSpy = sinon.spy(deepDecorator);
@conditional(
  true,
  conditional(
    true,
    conditional(
      true,
      conditional(
        true,
        deepSpy
      )
    )
  )
)
class HeavilyDecoratedClass {
  status: string;
}

describe('conditional', () => {
  describe('as class decorator', () => {
    describe('(test: boolean, decorator: ClassDecorator) => ClassDecorator', () => {
      it('decorates if test is truthy', () => {
        assert(spyWithTrue.callCount === 1);
        assert(new ClazzSpiedWithTrue().status === 'status 1');

        assert(deepSpy.callCount === 1);
        assert(new HeavilyDecoratedClass().status === 'yes');
      });
      it('doesn\'t decorate if test is falsy', () => {
        assert(spyWithFalse.callCount === 0);
        assert(new ClazzSpiedWithFalse().status === undefined);
      });
    });

    describe('(test: (clazz?: Function) => boolean, decorator: ClassDecorator): ClassDecorator', () => {
      it('decorates if test function returns true', () => {
        assert(spyWithFunctionReturningTrue.callCount === 1);
        assert(new ClassSpiedWithFunctionReturningTrue().status === 'status 2');
      });
      it('doesn\'t decorate if test function returns false', () => {
        assert(spyWithFunctionReturningFalse.callCount === 0);
        assert(new ClassSpiedWithFunctionReturningFalse().status === undefined);
      });
    });
  });
});

