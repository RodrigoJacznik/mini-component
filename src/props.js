const propsFactory = {
    String(attr) {
        return {
            get () { return this.getAttribute(attr); },
            set (val) {
                if (val != null) {
                    this.setAttribute(attr, val);
                } else {
                    this.removeAttribute(attr);
                }
            }
        }
    },

    Array(attr) {
        return {
            get () { return JSON.parse(this.getAttribute(attr)); },
            set (val) {
                if (val) {
                    val = JSON.stringify(val);
                    this.setAttribute(attr, val);
                } else {
                    this.removeAttribute(attr);
                }
            }
        }
    },

    Number(attr) {
        return {
            get () { return +this.getAttribute(attr); },
            set (val) {
                if (val != null) {
                    this.setAttribute(attr, +val);
                } else {
                    this.removeAttribute(attr);
                }
            }
        }
    },

    Boolean(attr) {
        return {
            get () { return JSON.parse(this.getAttribute(attr)); },
            set (val) {
                this.setAttribute(attr, Boolean(val));
            }
        }
    }
};

const observableProps = {
    get () {
        if (!this.props) { return; }

        const props = this.props();

        return Object.keys(props)
            .filter(function isReactive(propName) {
                return props[propName].reactive
            })
            .map(function toLowerCase(propName) {
                return propName.toLowerCase();
            });
    }
}

module.exports = {
    observableProps,
    propsFactory
}
