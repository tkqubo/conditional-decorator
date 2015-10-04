export enum DecoratorType {
  ClassDecorator,
  ParameterDecorator,
  PropertyDecorator,
  MethodDecorator,
  None,
}

export function getDecoratorTypeFromArguments(target: Object, key: string|symbol, value: any): DecoratorType {
  var kind: string = typeof (arguments.length == 1 ? value = target : value);
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
  return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.ClassDecorator;
}

export function isParameterDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is ParameterDecorator {
  return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.ParameterDecorator;
}

export function isPropertyDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is PropertyDecorator {
  return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.PropertyDecorator;
}

export function isMethodDecorator(decorator: Function, target: Object, key: string|symbol, value: any): decorator is MethodDecorator {
  return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.MethodDecorator;
}

export function decorateClass(test: any, decorator: ClassDecorator, clazz: Function): Function|void {
  let shouldDecorate = typeof test === 'function' ? test(clazz) : test;
  if (shouldDecorate && decorator) {
    return decorator(clazz);
  }

  return clazz;
}

export function decorateParameter(test: any, decorator: ParameterDecorator, target: Object, key: string|symbol, index: number): void  {
  let shouldDecorate = typeof test === 'function' ? test(target, key, index) : test;
  if (shouldDecorate && decorator) {
    decorator(target, key, index);
  }
}

export function decorateProperty(test: any, decorator: PropertyDecorator, target: Object, key: string|symbol): void {
  let shouldDecorate = typeof test === 'function' ? test(target, key) : test;
  if (shouldDecorate && decorator) {
    decorator(target, key);
  }
}

export function decorateMethod(test: any, decorator: MethodDecorator, target: Object, key: string|symbol, desc: PropertyDescriptor): PropertyDescriptor|void {
  let shouldDecorate = typeof test === 'function' ? test(target, key, desc) : test;
  if (shouldDecorate && decorator) {
    return decorator(target, key, desc);
  }

  return desc;
}
