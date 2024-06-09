const containerTag = document.getElementById('contenedor');

const API_KEY = "192e0b9821564f26f52949758ea3c473";
const pathImageBase = "https://image.tmdb.org/t/p/w500/";

// Buscar películas
const searchMovies = async (name) => {
	let data;
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`);
		data = await respuesta.json();
	} catch (error) {
		console.log("Error en la petición");
	}
	return data.results;
};

// Pinta las películas
const populateFilms = (peliculas) => {
	let peliculasHTML = '';
	peliculas.forEach(pelicula => {
		peliculasHTML += `
			<div class="pelicula" onclick="showDetail(${pelicula.id})">
				<img class="poster" src="${pathImageBase}${pelicula.poster_path}">
				<h3 class="titulo">${pelicula.title}</h3>
			</div>
		`;
	});
	containerTag.innerHTML = peliculasHTML;
};

const showDetail = async(id) => {
	let movieData = await getMovie(id);
	let movieHTML = `<article class="pelicula-detalle">
		<div><img class="poster" src="${pathImageBase}${movieData.poster_path}"></div>
		<div>
			<h2>${movieData.title}</h2>
			<h4>Popularity: ${movieData.popularity}</h4>
			<h4>Average: ${movieData["vote_average"]}</h4>
			<p>
				${movieData.overview}
			</p>
		</div>
	</article>`;
	containerTag.innerHTML=movieHTML;
};

const getMovie = async (id) => {
	let data ='';
	try{
		const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`;
		const respuesta = await fetch(URL);
		data = await respuesta.json();
	}catch(error){
		console.log("Error en la petición");
	}
	
	return data;
};

// Carga inicial
window.onload = async () => {
	const itemsMenu = document.querySelectorAll("nav a");
	// ["<a data-saga='Vengadores'>", "<a>", "a"]
	// Enlaces del header
	let todas =[];
	itemsMenu.forEach( async(item) => {
		// Añadir evento click al enlace
		item.addEventListener('click', async function (e) {
			let nameSaga = this.dataset.saga;
			let films = await searchMovies(nameSaga);
			populateFilms(films);
		});
		let filmsTemp = await searchMovies(item.dataset.saga); 
		todas.concat(filmsTemp);
	});

	
	console.log(todas);
	// Primera saga
	//let films = await searchMovies(itemsMenu[0].dataset.saga);
	populateFilms(todas);

};