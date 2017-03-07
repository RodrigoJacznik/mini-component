'use strict';

const elementOpen = IncrementalDOM.elementOpen;
const elementClose = IncrementalDOM.elementClose;
const elementVoid = IncrementalDOM.elementClose;
const text = IncrementalDOM.text;
const patch = IncrementalDOM.patch;

class UnorderedList extends Mini.Component {
    static props() {
        return {
            items: { type: Array, reactive: true }
        }
    }

    update(render, state) {
        render`<ul>${
            state.items.map((item) => `<li>${item}</li>`)
        }</ul>`;
    }

    render() {
        this.update(
            hyperHTML.bind(this),
            this.props
        );
    }
}

class UnorderedListvdom extends Mini.Component {
    static props() {
        return {
            items: { type: Array, reactive: true },
            searchTerm: { type: String, reactive: true }
        };
    }

    keydown(e) {
        this.searchTerm = e.target.value;
    }

    incrementalRender(items) {
        elementOpen('input', '', ['type', 'text', 'placeholder', 'buscar', 'onkeyup', this.keydown.bind(this)]);
        elementClose('input');

        elementOpen('ul');
            items.forEach((item, idx) => {
                let color = item.indexOf(this.searchTerm) > -1 ? 'red': 'black';

                elementOpen('li', idx, null, 'style', { color });
                    text(item);
                elementClose('li');
            });
        elementClose('ul');
    }

    render() {
        patch(this, () => {
            this.incrementalRender(this.items);
        });
    }
}

class Grid extends Mini.Component {
    static props() {
        return {
            items: { type: Array, reactive: true, default: [] },
            header: { type: Array, reactive: true },
            searchTerm: { type: String, reactive: true },
            hasSearch: { type: Boolean, default: true, reactive: true }
        };
    }

    keydown(e) {
        this.searchTerm = e.target.value;
    }

    incrementalRender(header, items) {
        elementOpen('style')
            text("table { background-color: red }");
        elementClose('style')

        if (this.hasSearch) {
            elementOpen('input', '', ['type', 'text', 'placeholder', 'buscar', 'onkeyup', this.keydown.bind(this)]);
            elementClose('input');
        }

        elementOpen('table');
            elementOpen('thead');
                header.forEach((h, idx) => {
                    elementOpen('th', idx);
                        text(h);
                    elementClose('th');
                })
            elementClose('thead');
            elementOpen('tbody');
                items.forEach((row, idx) => {
                    elementOpen('tr', idx);
                    header.forEach((header, idx) => {
                        elementOpen('td', idx);
                            text(row[header]);
                        elementClose('td');
                    });
                    elementClose('tr');
                });
            elementClose('tbody');
        elementClose('table');
        if (!items.length) {
            elementOpen('p');
                text('No existen datos');
            elementOpen('p');
        }
    }

    render() {
        let filteredItems;

        if (this.searchTerm) {
            filteredItems = this.items.filter((item) => {
                for (let prop in item) {
                    if (item[prop].indexOf(this.searchTerm) > -1) {
                        return true;
                    }
                }

                return false;
            })
        } else {
            filteredItems = this.items;
        }

        patch(this, () => {
            this.incrementalRender(this.header, filteredItems);
        });
    }
}

class Counter extends Mini.Component {
    static props() {
        return {
            count: { type: Number, default: 10, reactive: true }
        };
    }

    decrement() {
        this.count -= 1;
    }

    increment() {
        this.count += 1;
    }

    incrementalRender() {
        elementOpen('button', null, null, 'onclick', this.decrement.bind(this));
            text('-')
        elementClose('button');

        elementOpen('span')
            text(this.count)
        elementClose('span')

        elementOpen('button', null, null, 'onclick', this.increment.bind(this));
            text('+')
        elementClose('button');
    }

    render() {
        patch(this, () => {
            this.incrementalRender();
        });
    }
}

function Progress () {}
Progress.prototype = Object.create(Mini.Component.prototype);
Progress.prototype.render = function () {
    this.innerHTML = 'RODRIGO';
}

window.customElements.define('ui-ul', UnorderedList);
//window.customElements.define('ui-ul-vdom', UnorderedListvdom);
window.customElements.define('ui-grid', Grid);
window.customElements.define('ui-count', Counter);
window.customElements.define('ui-progress', Progress);

//let grid = document.querySelector('ui-grid')

//fetch('http://uinames.com/api/?amount=500')
    //.then((resp) => resp.json())
    //.then((data) => grid.items = data);
