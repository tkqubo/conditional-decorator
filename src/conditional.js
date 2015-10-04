function conditional(value, decorator) {
    var result;
    if (typeof value === 'boolean') {
        result = value;
    }
    else if (typeof value === 'function') {
        result = value();
    }
    return null;
    //return function descriptor<T>(target: Object, propertyKey: string|symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>|void {
    //  return result ? decorator(target, propertyKey, descriptor) : descriptor;
    //};
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = conditional;
