import { propsFactory } from './props';

function addProps() {
    if (this.constructor.props) {
        const props = this.constructor.props();

        for (let propName in props) {
            let prop = props[propName];

            Object.defineProperty(
                this,
                propName,
                propsFactory[prop.type.name](propName)
            );

            if (this[propName] == null) {
                this[propName] = prop.default;
            } else {
                this[propName] = this[propName];
            }
        }

        Object.defineProperty(this, 'props', {
            get () {
                return Object.keys(props)
                    .reduce(function collectProps(props, prop) {
                        props[prop] = this[prop];

                        return props;
                    }.bind(this), {});
            }
        });
    }
}

function onConnected () {
    this.__connected = true;
    this.render();
}

function onChange(attrName, oldVal, newVal, namespace) {
    if (this.__connected) {
        this.render();
    }
}

module.exports = {
    addProps,
    onConnected,
    onChange
}
