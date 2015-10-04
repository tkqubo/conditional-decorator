(function (DecoratorType) {
    DecoratorType[DecoratorType["ClassDecorator"] = 0] = "ClassDecorator";
    DecoratorType[DecoratorType["ParameterDecorator"] = 1] = "ParameterDecorator";
    DecoratorType[DecoratorType["PropertyDecorator"] = 2] = "PropertyDecorator";
    DecoratorType[DecoratorType["MethodDecorator"] = 3] = "MethodDecorator";
    DecoratorType[DecoratorType["None"] = 4] = "None";
})(exports.DecoratorType || (exports.DecoratorType = {}));
var DecoratorType = exports.DecoratorType;
function getDecoratorTypeFromArguments(target, key, value) {
    var kind = typeof (arguments.length == 1 ? value = target : value);
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
exports.getDecoratorTypeFromArguments = getDecoratorTypeFromArguments;
function isClassDecorator(decorator, target, key, value) {
    return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.ClassDecorator;
}
exports.isClassDecorator = isClassDecorator;
function isParameterDecorator(decorator, target, key, value) {
    return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.ParameterDecorator;
}
exports.isParameterDecorator = isParameterDecorator;
function isPropertyDecorator(decorator, target, key, value) {
    return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.PropertyDecorator;
}
exports.isPropertyDecorator = isPropertyDecorator;
function isMethodDecorator(decorator, target, key, value) {
    return getDecoratorTypeFromArguments(target, key, value) == DecoratorType.MethodDecorator;
}
exports.isMethodDecorator = isMethodDecorator;
function decorateClass(test, decorator, clazz) {
    var shouldDecorate = typeof test === 'function' ? test(clazz) : test;
    if (shouldDecorate && decorator) {
        return decorator(clazz);
    }
    return clazz;
}
exports.decorateClass = decorateClass;
function decorateParameter(test, decorator, target, key, index) {
    var shouldDecorate = typeof test === 'function' ? test(target, key, index) : test;
    if (shouldDecorate && decorator) {
        decorator(target, key, index);
    }
}
exports.decorateParameter = decorateParameter;
function decorateProperty(test, decorator, target, key) {
    var shouldDecorate = typeof test === 'function' ? test(target, key) : test;
    if (shouldDecorate && decorator) {
        decorator(target, key);
    }
}
exports.decorateProperty = decorateProperty;
function decorateMethod(test, decorator, target, key, desc) {
    var shouldDecorate = typeof test === 'function' ? test(target, key, desc) : test;
    if (shouldDecorate && decorator) {
        return decorator(target, key, desc);
    }
    return desc;
}
exports.decorateMethod = decorateMethod;
