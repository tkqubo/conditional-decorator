"use strict";
var utils = require('./utils');
function conditional(test, decorator) {
    'use strict';
    return function (target, key, value) {
        if (utils.isClassDecorator(decorator, arguments)) {
            var clazz = target;
            var shouldDecorate = typeof test === 'function' ? test(clazz) : test;
            if (shouldDecorate && decorator) {
                return decorator(clazz);
            }
            return clazz;
        }
        if (utils.isParameterDecorator(decorator, arguments)) {
            var index = value;
            var shouldDecorate = typeof test === 'function' ? test(target, key, index) : test;
            if (shouldDecorate && decorator) {
                decorator(target, key, index);
            }
        }
        if (utils.isPropertyDecorator(decorator, arguments)) {
            var shouldDecorate = typeof test === 'function' ? test(target, key) : test;
            if (shouldDecorate && decorator) {
                decorator(target, key);
            }
        }
        if (utils.isMethodDecorator(decorator, arguments)) {
            var desc = value;
            var shouldDecorate = typeof test === 'function' ? test(target, key, desc) : test;
            if (shouldDecorate && decorator) {
                return decorator(target, key, desc);
            }
            return desc;
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = conditional;
