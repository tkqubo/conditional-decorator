export interface ClassDecorator {
  <TFunction extends Function>(target: TFunction): TFunction|void;
}
export interface PropertyDecorator {
  (target: Object, propertyKey: string|symbol): void;
}
export interface MethodDecorator {
  <TFunction>(target: Object, propertyKey: string|symbol, descriptor: TypedPropertyDescriptor<TFunction>): TypedPropertyDescriptor<TFunction>|void;
}
export interface ParameterDecorator {
  (target: Object, propertyKey: string|symbol, parameterIndex: number): void;
}
export interface TypedMethodDecorator<TFunction extends Function> extends MethodDecorator {
  (target: Object, propertyKey: string|symbol, descriptor: TypedPropertyDescriptor<TFunction>): TypedPropertyDescriptor<TFunction>|void;
}

export enum DecoratorType {
  ClassDecorator,
  ParameterDecorator,
  PropertyDecorator,
  MethodDecorator,
  None,
}

export function getDecoratorType(decorator: Function, target: Object, key: string|symbol, value: any): DecoratorType {
  var kind: string = typeof (arguments.length == 2 ? value = target : value);
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

export function isClassDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is ClassDecorator {
  return getDecoratorType(decorator, target, key, value) == DecoratorType.ClassDecorator;
}

export function isParameterDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is ParameterDecorator {
  return getDecoratorType(decorator, target, key, value) == DecoratorType.ParameterDecorator;
}

export function isPropertyDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is PropertyDecorator {
  return getDecoratorType(decorator, target, key, value) == DecoratorType.PropertyDecorator;
}

export function isMethodDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is MethodDecorator {
  return getDecoratorType(decorator, target, key, value) == DecoratorType.MethodDecorator;
}
