// Referencia a las etiquetas HTML
const camisetasTag = document.querySelector('#camisetas-container');
const cartTag = document.querySelector('#cart-user');

let camisetasJSON = [];
let carrito=[];

// Cargar los datos JSON de las camisetas
const init= async () => {
    const respuesta = await fetch('./data/camisetas.json');
    camisetasJSON = await respuesta.json();
    printCamisetas(camisetasJSON);
    loadCarrito();
    //handleButtonBuy();
 };
 init();

//Pintar las camisetas en el grid de la página
 const printCamisetas = (camisetas) => {
    camisetasTag.innerHTML = "";
    camisetas.forEach(e => {
       let template = `    
       <article class="card">
            <img src="./img/${e.image}" alt="" />
            <h2 class="name">${e.name}</h2>
            <p>Precio ${e.price}€</p>
            <p>${ getColorsHTML(e.colors) }</p>
            <div class="favorite">
                <i class="fas fa-heart" data-id="${e.id}"></i>
            </div>
            <button type="button" class="btnBuy" data-id="${e.id}" onclick="addProduct(${e.id})">Comprar</button>
        </article>`;
        camisetasTag.innerHTML += template;
        
    });

 };

 const getColorsHTML = (colorsArray)=>{
    let coloresCamisetaHTML="";
    colorsArray.forEach(color => {
        coloresCamisetaHTML+=`<span class="colorTshit" 
                                    style="background-color:${color}"></span>
        `;
    });
    return coloresCamisetaHTML;
 };

 // Añadir un nuevo producto al carrito
 const addProduct=(idCamiseta)=>{
    let camiseta = camisetasJSON.find(e=>e.id==idCamiseta);
    let producto = {
        "id":camiseta.id,
        "name":camiseta.name,
        "price":camiseta.price,
        "quantity":1
    };

    if (carrito.some(e=>e.id==idCamiseta)){
        // Aumentamos en uno la cantidad de la camiseta que ya existe en el carrito
        carrito = carrito.map(e=>{
            if(e.id!=idCamiseta ) return e;

            if (camiseta.stock>e.quantity){
                e.quantity++;
            }else{
                alert("sin stock");
            }
            return e;
        });
    }else{
        // Si es un nuevo producto lo añadimos al carrito
        carrito.push(producto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));

    pintarCarrito();
 };

 // Borrar un producto del carrito
 const deleteProduct = (idCamiseta) =>{
   carrito = carrito.filter(e=>e.id!=idCamiseta);

   localStorage.setItem("carrito", JSON.stringify(carrito));
   pintarCarrito();
 };

 // Pintar el carrito en el lateral de la página
 const pintarCarrito = ()=>{
    cartTag.innerHTML="";
    carrito.forEach(e=>{
        cartTag.innerHTML+=`
            <article>
                <div>${e.name}</div>
                <div class="price">${e.price}€</div>
                <div  class="quantity">${e.quantity}</div>
                <div class="delete" onclick="deleteProduct(${e.id})">x</div>
            </article>
        `;
    });
    // cálculo total
    let total = carrito.reduce((total,producto) => total+=(producto.price*producto.quantity), 0);
    cartTag.innerHTML+=`<div class="total-container">
                            <div>Total compra</div>
                            <div>${total} €</div>
                        </div>`;
 };

 // Cambiar el número de camisetas del GRID en pantalla
 const changeView = (number)=>{
    if (number===4){
        camisetasTag.classList.replace("grid-6", "grid-4");
    }else if (number===6){
        camisetasTag.classList.replace("grid-4", "grid-6");
    }
 };

//  const handleButtonBuy = ()=>{
//      const botonesCamisetas = document.querySelectorAll(".btnBuy");
//      botonesCamisetas.forEach(boton =>{
//         boton.addEventListener("click", function(){
//             let idCamiseta = this.dataset.id;
//             // Añadir la camista al carrito
//             let camisetaJSON = camisetasJSON.find(e=>e.id==idCamiseta);
//             alert(camisetaJSON.name);
//         });
//      });

//  };


const loadCarrito =()=>{
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        console.table(carrito);
    }else{
        carrito=[];
    }
    pintarCarrito();
};
