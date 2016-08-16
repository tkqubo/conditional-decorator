"use strict";
/**
 * Enum for decorator type
 */
(function (DecoratorType) {
    DecoratorType[DecoratorType["Class"] = 0] = "Class";
    DecoratorType[DecoratorType["Parameter"] = 1] = "Parameter";
    DecoratorType[DecoratorType["Property"] = 2] = "Property";
    DecoratorType[DecoratorType["Method"] = 3] = "Method";
    DecoratorType[DecoratorType["None"] = 4] = "None";
})(exports.DecoratorType || (exports.DecoratorType = {}));
var DecoratorType = exports.DecoratorType;
/**
 * Guesses which kind of decorator from its functional arguments
 * @param args
 * @returns {DecoratorType}
 */
function getDecoratorTypeFromArguments(args) {
    'use strict';
    if (args.length === 0 || args.length > 3) {
        return DecoratorType.None;
    }
    var kind = typeof (args.length === 1 ? args[0] : args[2]);
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
exports.getDecoratorTypeFromArguments = getDecoratorTypeFromArguments;
/**
 * Guesses whether the given function is a class decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
function isClassDecorator(decorator, args) {
    'use strict';
    return getDecoratorTypeFromArguments(args) === DecoratorType.Class;
}
exports.isClassDecorator = isClassDecorator;
/**
 * Guesses whether the given function is a method parameter decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
function isParameterDecorator(decorator, args) {
    'use strict';
    return getDecoratorTypeFromArguments(args) === DecoratorType.Parameter;
}
exports.isParameterDecorator = isParameterDecorator;
/**
 * Guesses whether the given function is a property decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
function isPropertyDecorator(decorator, args) {
    'use strict';
    return getDecoratorTypeFromArguments(args) === DecoratorType.Property;
}
exports.isPropertyDecorator = isPropertyDecorator;
/**
 * Guesses whether the given function is a method decorator
 * @param decorator
 * @param args
 * @returns {boolean}
 */
function isMethodDecorator(decorator, args) {
    'use strict';
    return getDecoratorTypeFromArguments(args) === DecoratorType.Method;
}
exports.isMethodDecorator = isMethodDecorator;
