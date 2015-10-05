import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { conditional } from '../src/index';

class TargetClass {
}

xdescribe('conditional', () => {
  describe('as a property decorator', () => {
    describe('(test: boolean, decorator: PropertyDecorator): PropertyDecorator', () => {
      it('decorates if test is truthy', () => {
      });
      it('doesn\'t decorate if test is falsy', () => {
      });
    });

    describe('(test: (target?: Object, key?: string|symbol) => boolean, decorator: PropertyDecorator): PropertyDecorator', () => {
      it('decorates if test function returns true', () => {
      });
      it('doesn\'t decorate if test function returns false', () => {
      });
    });
  });
});

