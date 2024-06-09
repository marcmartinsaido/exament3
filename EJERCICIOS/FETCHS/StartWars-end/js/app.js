// Contants amb les referencies als elements HTML
const listTag = document.querySelector('#figures-list');
const priceTag = document.querySelector('#filter-price');
const priceMinTag = document.querySelector('#filter-min-price');
const btnFiltrarTag = document.getElementById("btn-filter");

let figuresList = [];

// Petició asíncona per recuperar les figures
function getFigures() {
    fetch('./data/star-wars-figures.json')
        .then(response => response.json())
        .then(data => {
            // Carregan les daddes JSON a una variable global
            figuresList = data;
            printFigures(data);
        });
}


// Crea les cards HTML de cada figura 
function printFigures(listJSON) {
    listTag.innerHTML = "";
    listJSON.forEach(figure => {
        listTag.innerHTML += `
            <article class="card">
                <img src="./img/${figure.photo}" alt="">
                <h3>${figure.name}</h3>
                <span>${figure.price}€</span>
                <div class="favorite">
                    <i class="fas fa-heart"></i>
                </div>
            </article>
        `;
    });
    setFavourites();
}

// Intercanvia el icone de favorit
function setFavourites() {
    const favouriteFigures = document.querySelectorAll('.fa-heart');
    favouriteFigures.forEach(e => {
        e.addEventListener("click", function () {
            this.classList.toggle("on");
        });
    });
}

// Filtra les figures per preu i les ordena
function filterFigures() {
    let list = figuresList
        .filter(e => (e.price >= priceMinTag.value && e.price <= priceTag.value))
        .sort((a, b) => {
            // Ordena de major a menor pel nom
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });

    if (list.length === 0)
        listTag.innerHTML = "No hay figuras que coincidan con el filtro";
    else
        printFigures(list);
}

/*
// Filtre amb programació funcional
function filterFigures() {
    let list =[];
    for (let figure of figuresList){
        // El valor de la figura debe estar entre el mínimo y el máximo especificado
        if (figure.price>=priceMinTag.value && figure.price<=priceTag.value ){
            list.push(figure);
        }
    }
    if (list.length == 0) {
        listTag.innerHTML = "No hay figuras que coincidan con el filtro";
    } else {
        printFigures(list);
    }
}
*/

// Funció inicial de càrrega de la página
function init() {
    getFigures();
    btnFiltrarTag.addEventListener("click", filterFigures);
}
init();