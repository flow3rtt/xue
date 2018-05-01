import {arrayMethods} from './array'
import {def, hasOwn, isObject, isPlainObject} from '../util/index'
import Dep from "./dep";

// const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        def(value, '__ob__', this);
        if (Array.isArray(value)) {
            argment(value, arrayMethods);
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(object) {
        const keys = Object.keys(object);
        keys.forEach(key => {
            let val = object[key];
            defineReactive(object, key, val)
        })
    }

    observeArray(array) {
        array.forEach(v => {
            observe(v)
        })
    }
}


function argment(target, src) {
    target['__proto__'] = src
}

export function observe(value) {
    if (!isObject(value)) {
        return;
    }
    let ob;
    if (hasOwn(value, '__ob__') && value['__ob__'] instanceof Observer) {
        ob = value['__ob__']
    } else if ((Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value)) {
        ob = new Observer(value)
    }
    return ob;
}


export function defineReactive(object, key, value) {
    const dep = new Dep();

    const property = Object.getOwnPropertyDescriptor(object, key);
    if (!!property && !property.configurable) {
        return;
    }
    const getter = property && property.get;
    const setter = property && property.set;
    let ob = observe(value);
    Object.defineProperty(object, key, {
        enumerable: true,
        configurable: true,
        get() {
            const val = getter ? getter.call(object) : value;
            if (Dep.target) {
                dep.depend();
                if (!!ob) {
                    ob.dep.depend();
                }
            }
            return val;
        },
        set(nv) {
            const val = getter ? getter.call(object) : value;
            if (nv === val) {
                return;
            }
            if (setter) {
                setter.call(object, nv)
            } else {
                value = nv;
            }
            ob = observe(nv);
            dep.notify();
        }
    })

}

export default Observer;