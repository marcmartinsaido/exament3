const filterNameTag = document.querySelector('#filterName');

// JSON para manejar el estado de la app
let state = {
   "canciones": [],
   "cancionesFiltradas": [],
   "favoritos": [],
   "cancionPlay": 1
};


// Ejecución de la app
init();

// Acciones a realizar al cargar la página
function init() {
   cargarEstadoStorage();
   cargarCanciones();
   filterNameTag.addEventListener("keyup", handleFilter);
}

// Maneja la acción de filtrar una canción
function handleFilter() {
   let nombreCancion = filterNameTag.value;
   state.cancionesFiltradas = filtrarCanciones(state.canciones, nombreCancion);
   pintarCanciones(state.cancionesFiltradas);
   loadFavoritos();
   configurarMarcarFavorito();
   configurarMarcarCancionSonando();
}

// Carga el JSON de las canciones
function cargarCanciones() {
   fetch("./data/canciones.json")
      .then(respuesta => respuesta.json())
      .then((datos) => {
         // Guardamos el JSON en el estado para usos posteriores (filtrar...)
         state.canciones = datos.canciones;
         pintarCanciones(datos.canciones);
         loadFavoritos();
         configurarMarcarFavorito();
         configurarMarcarCancionSonando();
         setCancionSonando(state.cancionPlay);
      });
}

// Renderiza las canciones en la página
function pintarCanciones(lista) {
   const contenedor = document.querySelector('#contenedorCanciones');
   contenedor.innerHTML = "";
   lista.forEach(cancion => {
      // Añadir fila de la nueva canción
      contenedor.innerHTML += `
            <tr id="song-${cancion.id}" data-id="${cancion.id}" class="song">
                <th scope="row" class="volume"></th>
                <th><i id="icono-${cancion.id}" class="bi bi-heart"></i></th>
                <td class="title">${cancion.titulo}</td>
                <td>${cancion.artista}</td>
                <td>${cancion.album}</td>
                <td>${cancion.publicacion}</td>
                <td>${cancion.duracion}</td>
            </tr>
        `;
   });
}

// Configura la acción al realizar click en un icono favorito
function configurarMarcarFavorito() {
   const listaCorazones = document.querySelectorAll('.bi-heart, .bi-heart-fill');
   for (const icono of listaCorazones) {
      icono.addEventListener("click", function () {
         // Recuperamo el id del favorito 
         let idFavorito = this.id.split("-")[1];

         // Cambiamos la clase del icono del favorito
         if (this.classList.contains("bi-heart")) {
            // Si estaba marcada la desmarcamos (clase por defecto bi-heart)
            this.classList.replace("bi-heart", "bi-heart-fill");
            addFavoritoStorage(idFavorito);
         } else {
            /* Otra formar de cmbiar la clase con los métodos remove y add de classList
            this.classList.remove("bi-heart-fill");
            this.classList.add("bi-heart");*/
            this.classList.replace("bi-heart-fill", "bi-heart");
            deleteFavoritoStorage(idFavorito);
         }
      });
   }
}

// Configura la acción al realizar click en el título de la canción
function configurarMarcarCancionSonando() {
   let filas = document.querySelectorAll(".song");
   filas.forEach(fil => {
      fil.addEventListener("click", function (event) {
         // Si ha clicado sobre el título, esta fila se marcará
         if (event.target.classList.contains("title")) {
            setCancionSonando(this.dataset.id);
         }
      });
   });
}

// Recuperamos el estado de la aplicación del storage
function cargarEstadoStorage() {
   let stateStorage = localStorage.getItem("state");
   if (stateStorage) state = JSON.parse(stateStorage);
}

// Carga los favoritos desde el storage
function loadFavoritos() {
   if (state.favoritos) {
      state.favoritos.forEach((item) => {
         let favoritoIcono = document.querySelector("#icono-" + item.id);
         if (favoritoIcono) favoritoIcono.classList.replace("bi-heart", "bi-heart-fill");
      });
   }
}

// Añadir un favorito del storage
function addFavoritoStorage(idFavorito) {
   state.favoritos.push({ "id": idFavorito });
   localStorage.setItem("state", JSON.stringify(state));
}

// Quitar un favorito del storage
function deleteFavoritoStorage(idFavorito) {
   // Nos quedamos sólo con los favoritos que no coinciden con el id pasado por parámetro
   let nuevaListafavoritos = state.favoritos.filter(fav => fav.id != idFavorito);
   state.favoritos = nuevaListafavoritos;
   localStorage.setItem("state", JSON.stringify(state));
}

// Busca las canciones que coinciden con el parámetro nombreCancion
function filtrarCanciones(lista, nombreCancion) {
   let nuevaLista = [];
   let nombre = nombreCancion.toUpperCase();
   for (let cancion of lista) {
      if (cancion.titulo.toUpperCase().includes(nombre)) {
         nuevaLista.push(cancion);
      }
   }
   return nuevaLista;
}

// Destaca la canción que está sonando
function setCancionSonando(id) {
   // Quitar los estilos de la canción anterior
   let filaAnterior = document.querySelector(".playing");
   if (filaAnterior) {
      filaAnterior.classList.remove("playing");
      filaAnterior.querySelector(".volume").innerHTML = ``;
   }

   // Establecer estilos de la canción que suena actualmente
   state.cancionPlay = id;
   localStorage.setItem("state", JSON.stringify(state));

   let fila = document.querySelector(`#song-${state.cancionPlay}`);
   fila.classList.add("playing");
   fila.querySelector(".volume").innerHTML = `<i class="bi bi-volume-up"></i>`;
}

