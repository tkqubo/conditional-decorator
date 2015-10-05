import * as utils from './utils';

/**
 * Apply `decorator` on a class if `test` is true
 * @param test
 * @param decorator
 */
function conditional(test: boolean, decorator: ClassDecorator): ClassDecorator;
/**
 * Apply `decorator` on a class if `test` function returns true
 * @param test function which receives a target class itself as an argument and returns boolean value
 * @param decorator
 */
function conditional(test: (clazz?: Function) => boolean, decorator: ClassDecorator): ClassDecorator;

/**
 * Apply `decorator` on a property if `test` is true
 * @param test
 * @param decorator
 */
function conditional(test: boolean, decorator: PropertyDecorator): PropertyDecorator;
/**
 * Apply `decorator` on a property if `test` function returns true
 * @param test function which receives a class' prototype and property name as arguments and returns boolean value
 * @param decorator
 */
function conditional(test: (target?: Object, key?: string|symbol) => boolean, decorator: PropertyDecorator): PropertyDecorator;

/**
 * Apply `decorator` on a method parameter if `test` is true
 * @param test
 * @param decorator
 */
function conditional(test: boolean, decorator: ParameterDecorator): ParameterDecorator;
/**
 * Apply `decorator` on a method parameter if `test` function returns true
 * @param test function which receives a class' prototype, property name and parameter position as arguments and returns boolean value
 * @param decorator
 */
function conditional(test: (target?: Object, key?: string|symbol, index?: number) => boolean, decorator: ParameterDecorator): ParameterDecorator;

/**
 * Apply `decorator` on a method (which includes property accessor) if `test` is true
 * @param test
 * @param decorator
 */
function conditional(test: boolean, decorator: MethodDecorator): MethodDecorator;
/**
 * Apply `decorator` on a method (which includes property accessor) if `test` function returns true
 * @param test function which receives a class' prototype, method name and property descriptor as arguments and returns boolean value
 * @param decorator
 */
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
