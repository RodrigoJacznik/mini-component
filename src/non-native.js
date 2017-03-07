import { addProps, onConnected } from './helpers';

function Component() {};

Component.prototype = Object.create(HTMLElement.prototype);

Component.prototype.createdCallback = addProps;

Component.prototype.attachedCallback = function () {
    onConnected.call(this)

    if (this.connectedCallback) {
        this.connectedCallback();
    }
}

Component.prototype.dettachedCallback = function () {
    if (this.disconnectedCallback) {
        this.disconnectedCallback();
    }
}

module.exports = Component;
