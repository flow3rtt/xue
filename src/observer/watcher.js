import {popTarget, pushTarget} from "./dep";

export default class Watcher {
    constructor(vm, expOrFn) {
        this.vm = vm;
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        }
        this.deps = [];
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        const vm = this.vm;
        let value;
        try {
            value = this.getter.call(vm.vm)
        } catch (e) {

        } finally {
            popTarget();
            this.cleanupDeps();
        }
        return value;
    }

    addDep(dep) {
        const id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    cleanupDeps() {
        let i = this.deps.length;
        while (i--) {
            const dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let t = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = t;
        this.newDepIds.clear();
        t = this.deps;
        this.deps = this.newDeps;
        this.newDeps = t;
        this.newDeps = []
    }

    update() {
        this.run();
    }

    run() {
        const value = this.get()
    }

}