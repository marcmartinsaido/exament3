const filterNameTag = document.querySelector('#filterName');

let state = {
   "canciones": [],
   "cansonsFiltrades": [],
   "favoritos": [],
   "cansoPlay": 1
}

init();

function init() {
   carregarEstatStorage();
   carregarCansons();
   filterNameTag.addEventListener("keyup", handleFilter);
}

function carregarEstatStorage() {
   let stateStorage = localStorage.getItem("state");
   if (stateStorage) state = JSON.parse(stateStorage);
}

function carregarCansons(){
   fetch("./data/canciones.json")
      .then(response => response.json())
      .then(data =>{
         state.canciones = data.canciones;
         printCansons(state.canciones);
         carregarFavoritos();
         configurarMarcarFavoritos();
         configurarMarcarCansoPlay();
         setCansoPlay(state.cansoPlay);
      });
}

function printCansons(llista){
   const contenidor = document.getElementById('contenedorCanciones');
   contenidor.innerHTML = "";
   llista.forEach(canso =>{
      contenidor.innerHTML += `
      <tr id="canso-${canso.id}" data-id="${canso.id}" class="canso">
         <th scope="row" class="volumen"></th>
         <th><i id="icono-${canso.id}" class="bi bi-heart"></i></th>
         <td class="titol">${canso.titulo}</td>
         <td>${canso.artista}</td>
         <td>${canso.album}</td>
         <td>${canso.publicacion}</td>
         <td>${canso.duracion}</td>
      </tr>
      `;
   });
}

function carregarFavoritos(){
   if(state.favoritos){
      state.favoritos.forEach(favorito => {
         let iconoFavorito = document.querySelector("#icono-"+favorito.id);
         if(iconoFavorito) iconoFavorito.classList.replace("bi-heart","bi-heart-fill");
      });
   }
}

function handleFilter(){
   let nomCanso = filterNameTag.value;
   state.cansonsFiltrades = filtrarCansons(state.canciones,nomCanso);
   carregarFavoritos();
   configurarMarcarFavoritos();
   configurarMarcarCansoPlay();
}

function configurarMarcarFavoritos(){
   let llistaCors = document.querySelectorAll(".bi-heart,.bi-heart-fill");
   for(let icono of llistaCors){
      icono.addEventListener("click",function(){
         let idFavorito = this.id.split("-")[1];

         if(this.classList.contains("bi-heart")){
            this.classList.replace("bi-heart","bi-heart-fill");
            addFavoritoStorage(idFavorito);
         }
         else{
            this.classList.remove("bi-heart-fill");
            this.classList.add("bi-heart");
            deleteFavoritoStorage(idFavorito);
         }
      });
   }
}

function configurarMarcarCansoPlay(){
   let files = document.querySelectorAll(".canso");
   files.forEach(fila =>{
      fila.addEventListener("click", function(event){
         if(event.target.classList.contains("titol")){
            setCansoPlay(this.dataset.id);
         }
      });
   });
}

function addFavoritoStorage(idFavorito){
   state.favoritos.push({"id":idFavorito});
   localStorage.setItem("state",JSON.stringify(state));
}

function deleteFavoritoStorage(idFavorito){
   let novaLlistaFavoritos = state.favoritos.filter(favorito => favorito.id != idFavorito);
   state.favoritos = novaLlistaFavoritos;
   localStorage.setItem("state",JSON.stringify(state));
}

function filtrarCansos(llista, nomCanso){
   let novaLlista = [];
   let nom = nomCanso.toUpperCase();
   for(let canso of llista){
      if(canso.titulo.toUpperCase().includes(nom)){
         novaLlista.push(canso);
      }
   }
   return novaLlista;
}

function setCansoPlay(id){
   let filaPlayAbans = document.querySelector(".playing");
   if(filaPlayAbans){
      filaPlayAbans.classList.remove("playing");
      filaPlayAbans.querySelector(".volumen").innerHTML = "";
   }

   state.cansoPlay = id;
   localStorage.setItem("state",JSON.stringify(state));

   let filaPlayAra = document.querySelector(`#canso-${id}`);
   filaPlayAra.classList.add("playing");
   filaPlayAra.querySelector(".volumen").innerHTML = `<i class="bi bi-volume-up"></i>`;
}
