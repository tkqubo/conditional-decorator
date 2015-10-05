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
  prop: any;
  method(param: any) {
    return;
  }
}

let injectedArguments: IArguments;

function classDecorator(clazz: Function): Function {
  'use strict';
  injectedArguments = arguments;
  return clazz;
}

function methodDecorator<T>(target: Object,
                            propertyKey: string|symbol,
                            descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>|void {
  'use strict';
  injectedArguments = arguments;
  return null;
}

function parameterDecorator(target: Object, propertyKey: string|symbol, parameterIndex: number): void {
  'use strict';
  injectedArguments = arguments;
}

function propertyDecorator(target: Object, propertyKey: string|symbol): void {
  'use strict';
  injectedArguments = arguments;
}

function nonDecorator(): void {
  'use strict';
  injectedArguments = arguments;
}

function yetAnotherNonDecorator(arg1: string, arg2: string, arg3: string): void {
  'use strict';
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
  'use strict';
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
    default:
      return;
  }
}

function getDecoratorName(type: DecoratorType): string {
  'use strict';
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
    default:
      return null;
  }
}

function getDecoratorText(type: DecoratorType): string {
  'use strict';
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
    default:
      return null;
  }
}

function getDecorator(type: DecoratorType): Function {
  'use strict';
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
    default:
      return null;
  }
}

describe('utils', () => {
  beforeEach(() => injectedArguments = null);

  describe('getDecoratorTypeFromArguments', () => {
    DecoratorTypes.forEach(type => {
      it(`returns ${getDecoratorName(type)} for ${getDecoratorText(type)}`, () => {
        invokeDecorator(type);
        assert(getDecoratorTypeFromArguments(injectedArguments) === type);
      });
    });
    it('returns None for another non-decorator', () => {
      yetAnotherNonDecorator('foo', 'bar', 'baz');
      assert(getDecoratorTypeFromArguments(injectedArguments) === DecoratorType.None);
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
          assert(config.target(getDecorator(type), injectedArguments) === expected);
        });
      });
      it('returns false for non-decorator', () => {
        nonDecorator();
        assert(config.target(nonDecorator, injectedArguments) === false);
      });
      it('returns false for yet another non-decorator', () => {
        yetAnotherNonDecorator('foo', 'bar', 'baz');
        assert(config.target(yetAnotherNonDecorator, injectedArguments) === false);
      });
    });
  });
});
