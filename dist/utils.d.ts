export interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}
export interface PropertyDecorator {
    (target: Object, propertyKey: string | symbol): void;
}
export interface MethodDecorator {
    <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
}
export interface ParameterDecorator {
    (target: Object, propertyKey: string | symbol, parameterIndex: number): void;
}
/**
 * Enum for decorator type
 */
export declare enum DecoratorType {
    Class = 0,
    Parameter = 1,
    Property = 2,
    Method = 3,
    None = 4,
}
/**
 * Guesses which kind of decorator from its functional arguments
 * @param args
 * @returns {DecoratorType}
 */
export declare function getDecoratorTypeFromArguments(args: IArguments): DecoratorType;
/**
 * Guesses whether the given function is a class decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export declare function isClassDecorator(decorator: Function, args: IArguments): decorator is ClassDecorator;
/**
 * Guesses whether the given function is a method parameter decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export declare function isParameterDecorator(decorator: Function, args: IArguments): decorator is ParameterDecorator;
/**
 * Guesses whether the given function is a property decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export declare function isPropertyDecorator(decorator: Function, args: IArguments): decorator is PropertyDecorator;
/**
 * Guesses whether the given function is a method decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
export declare function isMethodDecorator(decorator: Function, args: IArguments): decorator is MethodDecorator;
