const gridTag = document.querySelector('#grid-characters');
const viewTag = document.querySelector('#change-view');
const btnFiltrarTag = document.querySelector('#btnFiltrar');
const textSearchTag = document.querySelector('#textSearch');
const orderFilterTag = document.querySelector('#orderFilter');
const viewModeTag = document.querySelector('#view-mode');
const windowDialogTag = document.querySelector('#window-dialog');
const btnCloseDialogTag = document.querySelector('#btnCloseDialog');
const modalBackgroundTag = document.querySelector('.modal');

let charactersJSON = [];

window.onload = async function () {
   const respuesta = await fetch('./data/characters.json');
   charactersJSON = await respuesta.json();
   pintarPersonajes(charactersJSON);

   btnFiltrarTag.addEventListener("click", filtrarPersonajes);
   orderFilterTag.addEventListener("change", ordenarPersonajes);
   viewModeTag.addEventListener("click", changeViewMode);
   btnCloseDialogTag.addEventListener("click", function () {
      windowDialogTag.close();
      modalBackgroundTag.style.display = "none";
   });
};

function ordenarPersonajes() {
   let index = orderFilterTag.selectedIndex;
   let option = orderFilterTag.options[index];
   let nuevaLista = [];
   if (option.value === 'P') {
      nuevaLista = charactersJSON.sort(function (a, b) {
         return b.power - a.power;
      });
   } else if (option.value === 'N') {
      nuevaLista = charactersJSON.sort(function (a, b) {
         if (a.name > b.name) return 1;
         else if (a.name < b.name) return -1;
         else return 0;
      });
   } else {
      return;
   }

   pintarPersonajes(nuevaLista);
}

function filtrarPersonajes() {
   if (textSearchTag.value === "") {
      pintarPersonajes(charactersJSON);
      return;
   }
   const nuevaLista = charactersJSON.filter(function (e) {
      return (
         e.name.toUpperCase().includes(textSearchTag.value.toUpperCase()) ||
         e.planet.toUpperCase() === textSearchTag.value.toUpperCase()
      );
   });
   pintarPersonajes(nuevaLista);
}

function changeView(number) {
   if (number == 6) {
      gridTag.classList.replace("grid-4", "grid-6");
   } else {
      gridTag.classList.replace("grid-6", "grid-4");
   }
}

function pintarPersonajes(characters) {
   gridTag.innerHTML = "";
   characters.forEach(function (e) {
      let template = `    
            <article>
                <img src="./img/${e.image}" alt="">
                <h3>Name:${e.name}</h3>
                <h4>Planet:${e.planet}</h4>
                <h4>Power:${e.power}</h4>
                <button onclick="handleDialog(${e.id})">Ver detalle</button>
            </article>`;
      gridTag.innerHTML += template;
   });

   // Control 
   if (viewModeTag.classList.contains("fa-moon")) {
      const articles = document.querySelectorAll('article');
      articles.forEach(function (e) {
         e.classList.add("dark");
      });
   }
}

function changeViewMode() {
   if (viewModeTag.classList.contains("fa-sun"))
      viewModeTag.classList.replace("fa-sun", "fa-moon");
   else
      viewModeTag.classList.replace("fa-moon", "fa-sun");

   const elements = document.querySelectorAll('body, .filter, article');
   elements.forEach(function (e) {
      e.classList.toggle("dark");
   });
}

function handleDialog(id) {
   const info = document.querySelector('#info-character');
   const character = charactersJSON.find(function (e) {
      return e.id === id;
   });

   info.innerHTML = `
      <div class="card-image">
         <img src="./img/${character.image}">
         <h4>${character.name}</h4>
      </div>
      <div class="card-info">
         <p>Power:${character.power}</p>
        
         <h3>Description</h3>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero reiciendis ipsum illo ut ab, consectetur consequuntur non quis, officiis ullam dolorum ipsam cupiditate aperiam corporis repudiandae accusamus? Quod deserunt itaque necessitatibus doloremque? Accusantium amet ipsam cupiditate eos placeat numquam repellendus ducimus enim? Reprehenderit tempore ipsa, mollitia consectetur debitis laboriosam ullam impedit minima odit sit, ducimus, maxime voluptas. Nulla quos aspernatur, esse, amet impedit rem quia quod delectus natus error tempora, porro fugit accusamus! Ad adipisci minima molestias, hic similique dignissimos iste quae maxime distinctio dicta ab fugit eos. Beatae voluptatibus amet, itaque laborum culpa illo facere fugit molestias ipsa tempora?</p>
      </div>
   `;
   windowDialogTag.show();
   const modal = document.querySelector('.modal');
   modalBackgroundTag.style.display = "block";
}