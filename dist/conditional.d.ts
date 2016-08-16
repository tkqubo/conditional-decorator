/**
 * Apply `decorator` on a class if `test` is true
 * @param test
 * @param decorator
 */
declare function conditional(test: boolean, decorator: ClassDecorator): ClassDecorator;
/**
 * Apply `decorator` on a class if `test` function returns true
 * @param test function which receives a target class itself as an argument and returns boolean value
 * @param decorator
 */
declare function conditional(test: (clazz?: Function) => boolean, decorator: ClassDecorator): ClassDecorator;
/**
 * Apply `decorator` on a property if `test` is true
 * @param test
 * @param decorator
 */
declare function conditional(test: boolean, decorator: PropertyDecorator): PropertyDecorator;
/**
 * Apply `decorator` on a property if `test` function returns true
 * @param test function which receives a class' prototype and property name as arguments and returns boolean value
 * @param decorator
 */
declare function conditional(test: (target?: Object, key?: string | symbol) => boolean, decorator: PropertyDecorator): PropertyDecorator;
/**
 * Apply `decorator` on a method parameter if `test` is true
 * @param test
 * @param decorator
 */
declare function conditional(test: boolean, decorator: ParameterDecorator): ParameterDecorator;
/**
 * Apply `decorator` on a method parameter if `test` function returns true
 * @param test function which receives a class' prototype, property name and parameter position as arguments and returns boolean value
 * @param decorator
 */
declare function conditional(test: (target?: Object, key?: string | symbol, index?: number) => boolean, decorator: ParameterDecorator): ParameterDecorator;
/**
 * Apply `decorator` on a method (which includes property accessor) if `test` is true
 * @param test
 * @param decorator
 */
declare function conditional(test: boolean, decorator: MethodDecorator): MethodDecorator;
/**
 * Apply `decorator` on a method (which includes property accessor) if `test` function returns true
 * @param test function which receives a class' prototype, method name and property descriptor as arguments and returns boolean value
 * @param decorator
 */
declare function conditional(test: (target?: Object, key?: string | symbol, desc?: PropertyDescriptor) => boolean, decorator: MethodDecorator): MethodDecorator;
export default conditional;
