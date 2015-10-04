var utils = require('./utils');
function conditional(test, decorator) {
    return function (target, key, value) {
        if (utils.isClassDecorator(decorator, target, key, value)) {
            return utils.decorateClass(test, decorator, target);
        }
        if (utils.isParameterDecorator(decorator, target, key, value)) {
            return utils.decorateParameter(test, decorator, target, key, value);
        }
        if (utils.isPropertyDecorator(decorator, target, key, value)) {
            return utils.decorateProperty(test, decorator, target, key);
        }
        if (utils.isMethodDecorator(decorator, target, key, value)) {
            return utils.decorateMethod(test, decorator, target, key, value);
        }
        return null;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = conditional;
