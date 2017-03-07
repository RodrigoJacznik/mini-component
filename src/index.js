'use strict';

require('document-register-element')(window, 'force');

import { observableProps } from './props';
import { onChange } from './helpers';

const Component = require('./non-native');

Component.prototype.render = function render() {}

Component.prototype.attributeChangedCallback = onChange

Object.defineProperty(Component, 'observedAttributes', observableProps);

module.exports = {
    Component
};
