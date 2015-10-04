(function (DecoratorType) {
    DecoratorType[DecoratorType["ClassDecorator"] = 0] = "ClassDecorator";
    DecoratorType[DecoratorType["PropertyDecorator"] = 1] = "PropertyDecorator";
    DecoratorType[DecoratorType["MethodDecorator"] = 2] = "MethodDecorator";
    DecoratorType[DecoratorType["ParameterDecorator"] = 3] = "ParameterDecorator";
    DecoratorType[DecoratorType["None"] = 4] = "None";
})(exports.DecoratorType || (exports.DecoratorType = {}));
var DecoratorType = exports.DecoratorType;
function getDecoratorType(decorator, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
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
exports.getDecoratorType = getDecoratorType;
function isClassDecorator(decorator, target, key, value) {
    return getDecoratorType(decorator, target, key, value) == DecoratorType.ClassDecorator;
}
exports.isClassDecorator = isClassDecorator;
function isParameterDecorator(decorator, target, key, value) {
    return getDecoratorType(decorator, target, key, value) == DecoratorType.ParameterDecorator;
}
exports.isParameterDecorator = isParameterDecorator;
function isPropertyDecorator(decorator, target, key, value) {
    return getDecoratorType(decorator, target, key, value) == DecoratorType.PropertyDecorator;
}
exports.isPropertyDecorator = isPropertyDecorator;
function isMethodDecorator(decorator, target, key, value) {
    return getDecoratorType(decorator, target, key, value) == DecoratorType.MethodDecorator;
}
exports.isMethodDecorator = isMethodDecorator;
