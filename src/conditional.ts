import * as utils from './utils';

function conditional(test: boolean, decorator: ClassDecorator): ClassDecorator;
function conditional(test: (clazz?: Function) => boolean, decorator: ClassDecorator): ClassDecorator;

function conditional(test: boolean, decorator: PropertyDecorator): PropertyDecorator;
function conditional(test: (target?: Object, key?: string|symbol) => boolean, decorator: PropertyDecorator): PropertyDecorator;

function conditional(test: boolean, decorator: ParameterDecorator): ParameterDecorator;
function conditional(test: (target?: Object, key?: string|symbol, index?: number) => boolean, decorator: ParameterDecorator): ParameterDecorator;

function conditional(test: boolean, decorator: MethodDecorator): MethodDecorator;
function conditional(test: (target?: Object, key?: string|symbol, desc?: PropertyDescriptor) => boolean, decorator: MethodDecorator): MethodDecorator;

function conditional(test: any, decorator: Function): any {
  return function (target: Object, key: string|symbol, value: any): any {
    if (utils.isClassDecorator(decorator, arguments)) {
      let clazz = target as Function;
      let shouldDecorate = typeof test === 'function' ? test(clazz) : test;
      if (shouldDecorate && decorator) {
        return decorator(clazz);
      }
      return clazz;
    }
    if (utils.isParameterDecorator(decorator, arguments)) {
      let index = value as number;
      let shouldDecorate = typeof test === 'function' ? test(target, key, index) : test;
      if (shouldDecorate && decorator) {
        decorator(target, key, index);
      }
    }
    if (utils.isPropertyDecorator(decorator, arguments)) {
      let shouldDecorate = typeof test === 'function' ? test(target, key) : test;
      if (shouldDecorate && decorator) {
        decorator(target, key);
      }
    }
    if (utils.isMethodDecorator(decorator, arguments)) {
      let desc = value as PropertyDescriptor;
      let shouldDecorate = typeof test === 'function' ? test(target, key, desc) : test;
      if (shouldDecorate && decorator) {
        return decorator(target, key, desc);
      }
      return desc;
    }
  }
}

export default conditional;
