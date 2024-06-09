// Paso 1: Variables de estado de la aplicación
let state = {
    products: [], // Almacena los productos cargados desde el archivo JSON
    filteredProducts: [], // Almacena los productos filtrados
    favorites: [] // Almacena los productos favoritos
};

// Paso 2: Cargar el estado desde el sessionStorage
function loadState() {
    const stateStorage = sessionStorage.getItem('state');
    if (stateStorage) {
        state = JSON.parse(stateStorage);
    }
}

// Paso 3: Guardar el estado en el sessionStorage
function saveState() {
    sessionStorage.setItem('state', JSON.stringify(state));
}

// Paso 4: Cargar productos desde el archivo JSON
function loadProducts() {
    fetch('./assets/data/products.json') // Ruta al archivo JSON con los productos
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            state.products = data; // Almacenar los productos en el estado
            state.filteredProducts = data; // Inicializar los productos filtrados
            renderProducts(data); // Renderizar los productos en la interfaz
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Paso 5: Renderizar productos en la interfaz
function renderProducts(products) {
    const productGrid = document.querySelector('#productGrid'); // Seleccionar el contenedor de productos
    productGrid.innerHTML = ''; // Eliminar contenido existente

    // Paso 6: Iterar sobre los productos y generar el HTML de cada tarjeta
    products.forEach(product => {
        const productCard = `
        <article class="card">
          <div class="info-1">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h5>${product.brand}</h5>
            <h4>${product.description}</h4>
          </div>
          <div class="info-2">
            <div class="price-box">
              <p class="price">${product.price} &euro; ${product.discount ? `<del>${(product.price * (1 + product.discount / 100)).toFixed(2)} &euro;</del>` : ''}</p>
              <button>Add</button>
            </div>
          </div>
          <div class="favorite" data-id="${product.id}">
            <i class="fa${state.favorites.includes(product.id) ? 's' : 'r'} fa-heart"></i>
          </div>
        </article>
      `;
        productGrid.innerHTML += productCard; // Añadir el HTML de la tarjeta al contenedor
    });

    // Paso 7: Añadir eventos a los iconos de favoritos
    document.querySelectorAll('.favorite').forEach(favIcon => {
        favIcon.addEventListener('click', toggleFavorite); // Añadir evento de clic para alternar el estado de favorito
    });
}

// Paso 8: estado de los favoritos
function toggleFavorite(event) {
    const productId = parseInt(event.currentTarget.dataset.id); 

    if (state.favorites.includes(productId)) {
        // Si el producto ya es favorito, eliminarlo de favoritos
        state.favorites = state.favorites.filter(id => id !== productId);
    } else {
        // Si el producto no es favorito, añadirlo a favoritos
        state.favorites.push(productId);
    }
    saveState(); // Guardar el estado actualizado en el sessionStorage
    renderProducts(state.filteredProducts); // Renderizar los productos con el estado actualizado
}
// Paso 9: Filtrar productos por marca
function filterByBrand(event) {
    const brand = event.target.dataset.marca; // Obtener la marca del enlace clicado
    if (brand) {
        state.filteredProducts = state.products.filter(product => product.brand === brand); // Filtrar los productos por marca
        renderProducts(state.filteredProducts); // Renderizar los productos filtrados
    }
}

// Paso 10: Ordenar productos
function sortProducts(event) {
    const criteria = event.target.value;
    switch (criteria) {
        case 'nameAsc':
            state.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDesc':
            state.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'priceAsc':
            state.filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            state.filteredProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            return;
    }
    renderProducts(state.filteredProducts);
}

// Paso 11: Inicializar la aplicación
function init() {
    loadState(); // Cargar el estado desde el sessionStorage
    loadProducts(); // Cargar los productos desde el archivo JSON

    // Agregar eventos a los enlaces de las marcas
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', filterByBrand); // Agregar el evento de clic para filtrar por marca
    });

    // Agregar evento al desplegable de ordenación
    document.querySelector('#orderSelect').addEventListener('change', sortProducts);
}

document.addEventListener('DOMContentLoaded', init); // Ejecutar la función init cuando el DOM esté cargado
