var pagina = 1;
const btnAnterior = document.querySelector('#btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const contenidorTag = document.getElementById('contenedor');

window.onload = () => {
    carregarPelis();

    btnSiguiente.addEventListener('click', () => {
        if(pagina < 500){
            pagina += 1;
            carregarPelis();
        }
    });

    btnAnterior.addEventListener('click', () => {
        if(pagina > 1){
            pagina -= 1;
            carregarPelis();
        }
    });
}

const carregarPelis = async() => {
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=${pagina}`);
        if(resposta.status == 200) {
            const dades = await resposta.json();
            console.log(dades.results);
            printPelicules(dades.results);
        }
        else console.log("Error al accedir a la pàgina de IMDB");
    }catch (error){
        console.log(error);
    }
}

const printPelicules = (pelicules) => {
    let peliculesHTML = "";
    pelicules.forEach(pelicula => {
        peliculesHTML +=
        `<div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"></img>
            <h3 class="titulo">${pelicula.title}</h3>
        </div>`;
    });
    contenidorTag.innerHTML = peliculesHTML;
}



