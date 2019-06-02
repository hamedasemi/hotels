import { LitElement, html } from 'lit-element';

import { } from './hotels/hotels';

import { sharedStyle } from './shared/style/style';

class App extends LitElement {

    static get properties() {
        return {
            data: { type: Object }
        }
    }

    constructor() {
        super();
        fetch('/app/assets/data/data.json')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.data = myJson;
            });
    }

    render() {

        return html`
            ${sharedStyle}
            <style>
                
            </style>
            ${this.data ? html`<x-hotels data='${JSON.stringify(this.data)}'></x-hotels>` : html`loading`}
        `;
    }
}

customElements.define('x-app', App);