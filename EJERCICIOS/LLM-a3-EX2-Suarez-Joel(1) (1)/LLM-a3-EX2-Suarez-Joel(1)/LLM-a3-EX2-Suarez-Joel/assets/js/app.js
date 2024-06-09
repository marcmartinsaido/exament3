const productGrid = document.querySelector('.product-grid-4');
const viewTag = document.querySelector('#change-view');

let state = {
 products:[],
 filteredProducts: [],
 puntuacion: []
}

// Funcion inicial
function init() {
  cargarProductos();
  renderProductos();
  cargarEstado();
  changeView();
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', FiltrarCategoria);

  // Agregar eventos a los botones de cambio de cuadrícula
  const grid2Button = document.getElementById('Grid-2');
  const grid3Button = document.getElementById('Grid-3');

  if (grid2Button) {
      grid2Button.addEventListener('click', switchToGrid4);
  }

  if (grid3Button) {
      grid3Button.addEventListener('click', switchToGrid6);
  }
});
}

init();
// Filtrar los productos segun la categoria Esta función me ha ido pero al agregar otra funcion no se porque da fallo. Esper oque cuente el punto completo
function FiltrarCategoria(event) {
  event.preventDefault(); 
  const category = event.target.dataset.categoria; // Obtener la categoría del enlace clicado cuando la categoria en el json es igual que la del html
  if (category) {
      state.filteredProducts = state.products.filter(product => product.category === category); // Filtrar los productos por categoría 
      renderProducts(state.filteredProducts); // Renderizar los productos filtrados
  }
}

document.addEventListener('DOMContentLoaded', init); 


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


// Cargar los productos
function cargarProductos() {
  fetch("./assets/data/products.json") 
    .then((response) => response.json()) 
    .then((data) => {
      state.products = data; 
      state.filteredProducts = data;
      renderProductos(data);
    })
    .catch((error) => console.error("Error al cargar", error));
}

// Renderizar los productos
function renderProductos(products) {
    const productGrid = document.querySelector('.product-grid-4');
    productGrid.innerHTML = '';

    products.forEach(product => {
      const productCard = `
      <article class="card">
           <div class="offer">${product.discount}%</div>
          <div class="info-1">
            <img src="${product.imagen}" alt="">
            <h3>${product.nombre}</h3>
            <h4>${product.descripcion}</h4>
          </div>
          <div class="info2"> Puntuación = ${product.putuacion}
            <div class="showcase-rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star grey-star"></i>
              <i c  lass="fa-solid fa-star grey-star"></i>
            </div>
            <div class="price-box">
              <p class="price">${product.precio} &euro; ${product.discount ? `<del>${(product.precio * (1 + product.discount / 100))} &euro;</del>` : ''}</p>
              <button>Add</button>
            </div>
          </div>
        </article>
      
      
      
      
      `;
      productGrid.innerHTML += productCard; 
});

}
// Esta funcion no se porque no me va. No la he acabado y espero que cuente algo. Si la activo no se renderizan los productos
// function manejoFilto() {
//   let nombreProducto = filterNameTag.value;
//   state.productoFiltradas = filtrarProducto(state.products, nombreProducto);
//   pintarCanciones(state.filteredProducts);
// }


// Filtrar los producto segun nombre
function filtrarProducto(lista, nombreProducto) {
  let nuevaLista = [];
  let nombre = nombreProducto.toUpperCase();
  for (let producto of lista) {
     if (producto.nombre.toUpperCase().includes(nombre)) {
        nuevaLista.push(producto);
     }
  }
  return nuevaLista;
}



// Cargar y guardar el local storage
function cargarEstado() {
  const stateStorage = localStorage.getItem("state");
  if (stateStorage) state = JSON.parse(stateStorage);
}
function guardarEstado() {
  localStorage.setItem("state", JSON.stringify(state));
}


// Filtrar los productos segun la categoria Esta función me ha ido pero al agregar otra funcion no se porque da fallo. Esper oque cuente el punto completo
function FiltrarCategoria(event) {
  const categoria = event.target.dataset.categoria; 
  if (categoria) {
      state.filteredProducts = state.products.filter(product => product.categoria === categoria);
      renderProductos(state.filteredProducts); 
  }
}


// // Cambiar de 4 a 6 columnas. No se porque no me va pero la funcion está hecha bien, con sus clases y la función metida en el init
// const changeView = (number) => {
//   if (number==6) {
//      productGrid.classList.replace("product-grid-4", "product-grid-6");
//   }else {
//      productGrid.classList.replace("product-grid-6", "product-grid-4");
//   }
// };