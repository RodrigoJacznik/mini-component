import { addProps, onConnected } from './helpers';

function Component(conf) {
    let target = new.target;

    const self = Reflect.construct(HTMLElement, [], target);

    addProps.call(self);
    return self
}

Component.prototype = Object.create(HTMLElement.prototype);

Component.prototype.connectedCallback = onConnected;

module.exports = Component;
