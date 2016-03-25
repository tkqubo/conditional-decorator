export interface ClassDecorator {
  <TFunction extends Function>(target: TFunction): TFunction|void;
}

export interface PropertyDecorator {
  (target: Object, propertyKey: string|symbol): void;
}

export interface MethodDecorator {
  <T>(target: Object, propertyKey: string|symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>|void;
}

export interface ParameterDecorator {
  (target: Object, propertyKey: string|symbol, parameterIndex: number): void;
}

/**
 * Enum for decorator type
 */
export enum DecoratorType {
  Class,
  Parameter,
  Property,
  Method,
  None,
}

/**
 * Guesses which kind of decorator from its functional arguments
 * @param args
 * @returns {DecoratorType}
 */
export function getDecoratorTypeFromArguments(args: IArguments): DecoratorType {
  'use strict';
  if (args.length === 0 || args.length > 3) {
    return DecoratorType.None;
  }

  let kind: string = typeof (args.length === 1 ? args[0] : args[2]);
  switch (kind) {
    case 'function':
      return DecoratorType.Class;
    case 'number':
      return DecoratorType.Parameter;
    case 'undefined':
      return DecoratorType.Property;
    case 'object':
      return DecoratorType.Method;
    default:
      return DecoratorType.None;
  }
}

/**
 * Guesses whether the given function is a class decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isClassDecorator(decorator: Function, args: IArguments): decorator is ClassDecorator {
  'use strict';
  return getDecoratorTypeFromArguments(args) === DecoratorType.Class;
}

/**
 * Guesses whether the given function is a method parameter decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isParameterDecorator(decorator: Function, args: IArguments): decorator is ParameterDecorator {
  'use strict';
  return getDecoratorTypeFromArguments(args) === DecoratorType.Parameter;
}

/**
 * Guesses whether the given function is a property decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isPropertyDecorator(decorator: Function, args: IArguments): decorator is PropertyDecorator {
  'use strict';
  return getDecoratorTypeFromArguments(args) === DecoratorType.Property;
}

/**
 * Guesses whether the given function is a method decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isMethodDecorator(decorator: Function, args: IArguments): decorator is MethodDecorator {
  'use strict';
  return getDecoratorTypeFromArguments(args) === DecoratorType.Method;
}

