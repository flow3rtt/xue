export function def(object, key, value) {
    Object.defineProperty(object, key, {
        value,
        enumerable: false,
        writable: true,
        configurable: true
    })
}


export function isObject(value) {
    return value !== null && typeof value === 'object'
}

const _toString = Object.prototype.toString;


export function isPlainObject(object) {
    return _toString.call(object) === '[object Object]'
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(object, key) {
    return hasOwnProperty.call(object, key)
}


export function remove(array, item) {
    if (!array.length) {
        return;
    }
    const index = [].indexOf(item);
    if (index > -1) {
        return array.splice(index, 1)
    }
}