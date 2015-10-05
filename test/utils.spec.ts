import * as assert from 'power-assert';
import {
  DecoratorType,
  getDecoratorTypeFromArguments,
  isClassDecorator,
  isMethodDecorator,
  isParameterDecorator,
  isPropertyDecorator
} from '../src/utils';

class Clazz {
  method(param: any): any {
  }
  prop: any;
}

let injectedArguments: IArguments;

function classDecorator(clazz: Function): Function {
  injectedArguments = arguments;
  return clazz;
}

function methodDecorator<T>(target: Object, propertyKey: string|symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>|void {
  injectedArguments = arguments;
  return null;
}

function parameterDecorator(target: Object, propertyKey: string|symbol, parameterIndex: number): void {
  injectedArguments = arguments;
}

function propertyDecorator(target: Object, propertyKey: string|symbol): void {
  injectedArguments = arguments;
}

function nonDecorator(): void {
  injectedArguments = arguments;
}

function yetAnotherNonDecorator(arg1: string, arg2: string, arg3: string): void {
  injectedArguments = arguments;
}

const DecoratorTypes = [
  DecoratorType.ClassDecorator,
  DecoratorType.MethodDecorator,
  DecoratorType.ParameterDecorator,
  DecoratorType.PropertyDecorator,
  DecoratorType.None
];

function invokeDecorator(type: DecoratorType) {
  switch (type) {
    case DecoratorType.ClassDecorator:
      classDecorator(Clazz);
      return;
    case DecoratorType.MethodDecorator:
      methodDecorator(Clazz.prototype, 'method', Object.getOwnPropertyDescriptor(Clazz.prototype, 'method'));
      return;
    case DecoratorType.ParameterDecorator:
      parameterDecorator(Clazz.prototype, 'method', 0);
      return;
    case DecoratorType.PropertyDecorator:
      propertyDecorator(Clazz.prototype, 'method');
      return;
    case DecoratorType.None:
      nonDecorator();
      return;
  }
}

function getDecoratorName(type: DecoratorType): string {
  switch (type) {
    case DecoratorType.ClassDecorator:
      return 'ClassDecorator';
    case DecoratorType.MethodDecorator:
      return 'MethodDecorator';
    case DecoratorType.ParameterDecorator:
      return 'ParameterDecorator';
    case DecoratorType.PropertyDecorator:
      return 'PropertyDecorator';
    case DecoratorType.None:
      return 'None';
  }
}

function getDecoratorText(type: DecoratorType): string {
  switch (type) {
    case DecoratorType.ClassDecorator:
      return 'class decorator';
    case DecoratorType.MethodDecorator:
      return 'method decorator';
    case DecoratorType.ParameterDecorator:
      return 'method parameter decorator';
    case DecoratorType.PropertyDecorator:
      return 'property decorator';
    case DecoratorType.None:
      return 'non-decorator';
  }
}

function getDecorator(type: DecoratorType): Function {
  switch (type) {
    case DecoratorType.ClassDecorator:
      return classDecorator;
    case DecoratorType.MethodDecorator:
      return methodDecorator;
    case DecoratorType.ParameterDecorator:
      return parameterDecorator;
    case DecoratorType.PropertyDecorator:
      return propertyDecorator;
    case DecoratorType.None:
      return nonDecorator;
  }
}

describe('utils', () => {
  beforeEach(() => injectedArguments = null);

  describe('getDecoratorTypeFromArguments', () => {
    DecoratorTypes.forEach(type => {
      it(`returns ${getDecoratorName(type)} for ${getDecoratorText(type)}`, () => {
        invokeDecorator(type);
        assert(getDecoratorTypeFromArguments(injectedArguments) == type);
      });
    });
    it('returns None for another non-decorator', () => {
      yetAnotherNonDecorator('foo', 'bar', 'baz');
      assert(getDecoratorTypeFromArguments(injectedArguments) == DecoratorType.None);
    });
  });

  class TestSuitConfig {
    target: Function;
    name: string;
    expected: DecoratorType[];
  }
  let testSuitConfig: TestSuitConfig[] = [
    {
      target: isClassDecorator,
      name: 'isClassDecorator',
      expected: [DecoratorType.ClassDecorator]
    },
    {
      target: isMethodDecorator,
      name: 'isMethodDecorator',
      expected: [DecoratorType.MethodDecorator]
    },
    {
      target: isParameterDecorator,
      name: 'isParameterDecorator',
      expected: [DecoratorType.ParameterDecorator]
    },
    {
      target: isPropertyDecorator,
      name: 'isPropertyDecorator',
      expected: [DecoratorType.PropertyDecorator]
    }
  ];
  testSuitConfig.forEach(config => {
    describe(config.name, () => {
      DecoratorTypes.forEach(type => {
        let expected = config.expected.indexOf(type) !== -1;
        it(`returns ${expected} for ${getDecoratorText(type)}`, () => {
          invokeDecorator(type);
          assert(config.target(getDecorator(type), injectedArguments) == expected);
        });
      });
      it('returns false for non-decorator', () => {
        nonDecorator();
        assert(config.target(nonDecorator, injectedArguments) == false);
      });
      it('returns false for yet another non-decorator', () => {
        yetAnotherNonDecorator('foo', 'bar', 'baz');
        assert(config.target(yetAnotherNonDecorator, injectedArguments) == false);
      });
    });
  });
});
