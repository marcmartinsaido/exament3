const mainContainer = document.querySelector('#main-container');


async function getCoins() {
    //const url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const url="./data/coins.json";
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderCoins(data);
        
    } catch (error) {
        console.log(error);
    }
    
}

// Renderiza la información de las monedas
function renderCoins(list) {
    mainContainer.innerHTML = `
        <div>#</div>
        <div>Name</div>
        <div>Price</div>
        <div>Price change</div>
    `; 
    list.forEach((coin,index )=> {
        mainContainer.innerHTML += `
            <div>${index+1}</div>
            <div>
                <img src='${coin.image}' /> 
                ${coin.name}
            </div>
            <div>${coin.current_price}$</div>
            <div class="${coin.price_change_24h>0?"green":"red"}">
                ${coin.price_change_24h}
            </div>
        `;
        
    });
    
}

function init() {
    getCoins();
}
init();