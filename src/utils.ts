/**
 * Enum for decorator type
 */
export enum DecoratorType {
  ClassDecorator,
  ParameterDecorator,
  PropertyDecorator,
  MethodDecorator,
  None,
}

/**
 * Guesses which kind of decorator from its functional arguments
 * @param args
 * @returns {DecoratorType}
 */
export function getDecoratorTypeFromArguments(args: IArguments): DecoratorType {
  if (args.length === 0 || args.length > 3) {
    return DecoratorType.None;
  }

  var kind: string = typeof (args.length === 1 ? args[0]: args[2]);
  switch (kind) {
    case "function":
      return DecoratorType.ClassDecorator;
    case "number":
      return DecoratorType.ParameterDecorator;
    case "undefined":
      return DecoratorType.PropertyDecorator;
    case "object":
      return DecoratorType.MethodDecorator;
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
  return getDecoratorTypeFromArguments(args) == DecoratorType.ClassDecorator;
}

/**
 * Guesses whether the given function is a method parameter decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isParameterDecorator(decorator: Function, args: IArguments): decorator is ParameterDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.ParameterDecorator;
}

/**
 * Guesses whether the given function is a property decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isPropertyDecorator(decorator: Function, args: IArguments): decorator is PropertyDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.PropertyDecorator;
}

/**
 * Guesses whether the given function is a method decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export function isMethodDecorator(decorator: Function, args: IArguments): decorator is MethodDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.MethodDecorator;
}

