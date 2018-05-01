import {def} from "../util/index";

const arrayProto = Array.prototype;

export const arrayMethods = Object.create(arrayProto);


['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(key => {
    const fn = arrayProto[key];
    def(arrayMethods, key, function (...rest) {
        const result = fn.apply(this, rest);
        const ob = this['__ob__']
        ob.dep.notify();
        return result;
    })
});