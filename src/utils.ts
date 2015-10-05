export enum DecoratorType {
  ClassDecorator,
  ParameterDecorator,
  PropertyDecorator,
  MethodDecorator,
  None,
}

export function getDecoratorTypeFromArguments(args: IArguments): DecoratorType {
  var kind: string = typeof (args.length == 1 ? args[0]: args[2]);
  switch (kind) {
    case "function":
      return DecoratorType.ClassDecorator;
    case "number":
      return DecoratorType.ParameterDecorator;
    case "undefined":
      return DecoratorType.PropertyDecorator;
    case "object":
      return DecoratorType.MethodDecorator;
  }
  return DecoratorType.None;
}

export function isClassDecorator(decorator: Function, args: IArguments): decorator is ClassDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.ClassDecorator;
}

export function isParameterDecorator(decorator: Function, args: IArguments): decorator is ParameterDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.ParameterDecorator;
}

export function isPropertyDecorator(decorator: Function, args: IArguments): decorator is PropertyDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.PropertyDecorator;
}

export function isMethodDecorator(decorator: Function, args: IArguments): decorator is MethodDecorator {
  return getDecoratorTypeFromArguments(args) == DecoratorType.MethodDecorator;
}

