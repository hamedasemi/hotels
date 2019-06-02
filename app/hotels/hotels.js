import { LitElement, html } from 'lit-element';

import { sharedStyle } from '../shared/style/style'

class Hotels extends LitElement {

    static get properties() {
        return {
            data: { type: Object },
            city: { type: String },
            result: { type: Array },
            searchTerm: { type: String }
        }
    }

    render() {
        return html`
            ${sharedStyle}
            
            <input @input='${this.input}'>
            <select @input='${this.selectInput}'>
                <option value="">Select city</option>
                <option value="Stockholm">Stockholm</option>
                <option value="Oslo">Oslo</option>
            </select>
            
            ${this.filter(this.data).map((hotel) => {
                return html`<div>${hotel.name}, ${hotel.address.city}</div>`
            })}
        `;
    }

    input(e){
        this.searchTerm = e.target.value;
    }

    selectInput(e){
        this.city = e.target.value;
    }

    filter(data) {
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "name"
            ]
        };
        var fuse = new Fuse(data.hotels, options);
        let result = fuse.search(this.searchTerm);

        if(this.city){
            result = result.filter((res)=>{
                return res.address.city === this.city;
            });
        }
        return result;
    }
}

customElements.define('x-hotels', Hotels);