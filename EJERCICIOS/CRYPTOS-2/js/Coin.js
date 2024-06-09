export default class Coin{

    constructor({index, image, name, current_price, price_change_24h}){
        this.index=index;
        this.name=name;
        this.image=image;
        this.price=current_price;
        this.priceChange=price_change_24h;
    }

    render(){
        return `
            <div>${this.index}</div>
            <div>
                <img src='${this.image}' /> 
                ${this.name}
            </div>
            <div>${this.price}$</div>
            <div class="${this.priceChange>0?"green":"red"}">
                ${this.priceChange}
            </div>
        `;
    }
}
