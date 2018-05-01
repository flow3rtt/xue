import {remove} from "../util/lang";

let uid = 0;


export default class Dep {
    constructor() {
        this.id = uid++;
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        const subs = [].concat(this.subs);
        subs.forEach(v => {
            v.update()
        })
    }
}


Dep.target = null;

const targetStack = [];

export function pushTarget(target) {
    if (!!Dep.target) {
        targetStack.push(target)
    }
    Dep.target = target;

}


export function popTarget() {
    Dep.target = targetStack.pop();
}