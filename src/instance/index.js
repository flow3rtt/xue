import Watcher from "../observer/watcher";
import Observer from "../observer/index";

function Xue(options) {
    const _this = this;
    if (options && typeof options.data === 'function') {
        _this['_data'] = options.data.call(_this)
    }
    _this.mount = function () {
        new Watcher(_this, _this.render)
    }
    _this.render = function () {
        let el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        let text = _this['_data'].text;
        let items = _this['_data'].items;
        el.querySelector('span').innerText = text;
        let ul = el.querySelector('ul');
        ul.innerHTML = '';
        items.forEach(v => {
            const el = document.createElement('li');
            el.innerText = v;
            ul.appendChild(el)
        })
        return _this['_data'];
    }
    new Observer(_this['_data'])
    this.mount();
}

export default Xue;