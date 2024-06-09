// paso 1: variables
let state = {
    products: [], // Almacena los productos cargados desde el archivo JSON
    filteredProducts: [], // Almacena los productos filtrados
};

//  Paso 2: Cargar los datos desde local storage
function loadProducts() {
    fetch("./assets/data/products.json") // Ruta al archivo JSON con los productos
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            state.products = data; // Almacenar los productos en el estado
            state.filteredProducts = data; // Inicializar los productos filtrados
            renderProducts(data); // Renderizar los productos en la interfaz
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Paso 3: Renderizar productos
function renderProducts(products) {
    // seleccionamos donde renderizar los productos
    const productGrid = document.querySelector('.product-grid-4');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = `
        <article class="card">
        ${product.discount > 20 ? `<div class="offer">${product.discount}%</div>` : ''}
            <div class="info-1">
              <img src="${product.image}" alt="">
              <h3>${product.name}</h3>
              <h4>${product.description}</h4>
              <h5>${product.category}</h5>
            </div>
              <div class="showcase-rating">
              ${generateStars(product.puntuacion)}
              </div>
              <div class="price-box">
                <p class="price">${product.price} &euro; ${product.discount ? `<del>${(product.price * (1 + product.discount / 100))} &euro;</del>` : ''}</p>
                <button>Add</button>
              </div>
            </div>
          </article>
        `;
        productGrid.innerHTML += productCard;
    });
}

// paso 4: funcion para filtrar los productos por categoria
function filterByCategory(event) {
    event.preventDefault();
    const category = event.target.dataset.categoria; // Obtener la categoría del enlace clicado cuando la categoria en el json es igual que la del html
    if (category) {
        state.filteredProducts = state.products.filter(product => product.category === category); // Filtrar los productos por categoría 
        renderProducts(state.filteredProducts); // Renderizar los productos filtrados
    }
}

// paso 5: funcion para las estrellas
function generateStars(puntuacion) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= puntuacion) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        } else {
            starsHTML += '<i class="fa-solid fa-star grey-star"></i>';
        }
    }
    return starsHTML;
}

// paso 6: Cargar y guardar el local storage
function loadlocal() {
    const stateStorage = localStorage.getItem("state");
    if (stateStorage) state = JSON.parse(stateStorage);
}

function guardarEstado() {
    localStorage.setItem("state", JSON.stringify(state));
}

// paso 7: funcion para comprobar si el codigo ha sido cargado correctamente
// Filtrar por nombre
function filtrarPornombre() {
    const textSearchTag = document.getElementById("textSearchTag");
    if (textSearchTag.value === "") {
        renderProducts(state.products);
        return;
    }
    const nuevaLista = state.products.filter(e => {
        return (e.name.toUpperCase().includes(textSearchTag.value.toUpperCase())) ||
            (e.description.toUpperCase().includes(textSearchTag.value.toUpperCase()));
    });
    renderProducts(nuevaLista);
}

// paso 8: Función para cambiar a la cuadrícula de 4 productos
function switchToGrid4() {
    const productGrid = document.querySelector('.product-grid-4, .product-grid-6');
    if (productGrid) {
        productGrid.classList.remove('product-grid-6');
        productGrid.classList.add('product-grid-4');
    }
}

// paso 9: Función para cambiar a la cuadrícula de 6 productos
function switchToGrid6() {
    const productGrid = document.querySelector('.product-grid-4, .product-grid-6');
    if (productGrid) {
        productGrid.classList.remove('product-grid-4');
        productGrid.classList.add('product-grid-6');
    }
}

// paso 10: Función de inicialización
function init() {
    // Cargar el estado desde el localStorage
    loadlocal();

    // Cargar los productos desde el archivo JSON
    loadProducts();

    // Agregar eventos a los enlaces de las categorías
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', filterByCategory);
    });

    // Agregar eventos a los botones de cambio de cuadrícula
    const grid2Button = document.getElementById('Grid-2');
    const grid3Button = document.getElementById('Grid-3');

    if (grid2Button) {
        grid2Button.addEventListener('click', switchToGrid4);
    }

    if (grid3Button) {
        grid3Button.addEventListener('click', switchToGrid6);
    }

    // Agregar evento al botón de filtrar por nombre
    const btnFiltrarTag = document.getElementById("btnFiltrarTag");
    const textSearchTag = document.getElementById("textSearchTag");

    if (btnFiltrarTag && textSearchTag) {
        btnFiltrarTag.addEventListener("click", filtrarPornombre);
    } else {
        console.error("Elementos btnFiltrarTag o textSearchTag no encontrados");
    }
}

// Ejecutar la función init
init();
