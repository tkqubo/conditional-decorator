import * as utils from './utils';

function conditional(test: boolean, decorator: ClassDecorator): ClassDecorator;
function conditional(test: (clazz?: Function) => boolean, decorator: ClassDecorator): ClassDecorator;

function conditional(test: boolean, decorator: ParameterDecorator): ParameterDecorator;
function conditional(test: (target?: Object, key?: string|symbol, index?: number) => boolean, decorator: ParameterDecorator): ParameterDecorator;

function conditional(test: boolean, decorator: PropertyDecorator): PropertyDecorator;
function conditional(test: (target?: Object, key?: string|symbol) => boolean, decorator: PropertyDecorator): PropertyDecorator;

function conditional(test: boolean, decorator: MethodDecorator): MethodDecorator;
function conditional(test: (target?: Object, key?: string|symbol, desc?: PropertyDescriptor) => boolean, decorator: MethodDecorator): MethodDecorator;

function conditional(test: any, decorator: Function): any {
  return function (target: Object, key: string|symbol, value: any): any {
    if (utils.isClassDecorator(decorator, arguments)) {
      return utils.decorateClass(test, decorator, target as Function);
    }
    if (utils.isParameterDecorator(decorator, arguments)) {
      return utils.decorateParameter(test, decorator, target, key, value as number);
    }
    if (utils.isPropertyDecorator(decorator, arguments)) {
      return utils.decorateProperty(test, decorator, target, key);
    }
    if (utils.isMethodDecorator(decorator, arguments)) {
      return utils.decorateMethod(test, decorator, target, key, value as PropertyDescriptor);
    }
    return null;
  }
}

export default conditional;
