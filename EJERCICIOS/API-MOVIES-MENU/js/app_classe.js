const contenedorTag = document.getElementById('contenedor');

const API_KEY = "192e0b9821564f26f52949758ea3c473";
const pathImageBase = "https://image.tmdb.org/t/p/w500/";

const cercarPelis = async(nom) => {
    let data;
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${nom}`);
        data = await resposta.json();
    } catch (error){
        console.log("Error al buscar películas");
    }
    return data.results;
}

const printPelicules = (pelicules) => {
    let peliculesHTML = "";
    pelicules.forEach(pelicula => {
        peliculesHTML += `
        <div class="pelicula" onclick="mostrarDetall(${pelicula.id})">
            <img class="poster" src="${pathImageBase}${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
        </div>
        `;
    });
    contenedorTag.innerHTML = peliculesHTML;
}

const mostrarDetall = async(id) => {
    let peliData = await getPeli(id);
    let peliHTML = `
    <article class="pelicula-detalle">
        <div><img class="poster" src="${pathImageBase}${peliData.poster_path}"></div>
        <div>
            <h2>${peliData.title}</h2>
            <h4>Popularitat: ${peliData.popularity}</h4>
            <h4>Puntuació: ${peliData["vote_average"]}</h4>
            <p>
                ${peliData.overview}
            </p>
        </div>
    </article>`;
    contenedorTag.innerHTML = peliHTML;
}

const getPeli = async(id) => {
    let data = "";
    try{
        const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`;
        const resposta = await fetch(URL);
        data = await resposta.json();
    } catch (error){
        console.log("Error al acceder a la película");
    }
    return data;
}

window.onload = async () => {
    const itemsMenu = document.querySelectorAll("nav a");

    let tot = [];

    for (const item of itemsMenu) {
        let pelisTemp = await cercarPelis(item.dataset.saga);
        tot = tot.concat(pelisTemp);

        item.addEventListener("click", async function(e) {
            let nomSaga = this.dataset.saga;
            let pelis = await cercarPelis(nomSaga);
            printPelicules(pelis);
        });
    }

    printPelicules(tot);
}