let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const contenedorTag = document.getElementById('contenedor');

// Carga inical
window.onload = () => {
	cargarPeliculas();
	btnSiguiente.addEventListener('click', () => {
		if (pagina < 1000) {
			pagina += 1;
			cargarPeliculas();
		}
	});

	btnAnterior.addEventListener('click', () => {
		if (pagina > 1) {
			pagina -= 1;
			cargarPeliculas();
		}
	});
};

// Carga de películas
const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=${pagina}`);
		/*
		// Otra forma de realizar la petición con token de autorización
		const peticion ={
			method: 'GET',
			headers: {
				"Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzUzN2ZmMTlmMzgxZGQ3YjY3ZWVlMWVhOGI4MTY0YSIsInN1YiI6IjVlM2ExNmU1MGMyNzEwMDAxODc1NTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOpZ_nBtA93tbzr6-rxD0760tssAAaSppyjRv9anArs",
				'Content-Type': 'application/json'
			}
		};
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${pagina}`, peticion);
		*/

		// Si la respuesta es correcta
		if (respuesta.status === 200) {
			const datos = await respuesta.json();
			pintarPeliculas(datos.results);
		}
		else if (respuesta.status === 401) console.log('Pusiste la llave mal');
		else if (respuesta.status === 404) console.log('La película que buscas no existe');
		else  							   console.log('Hubo un error y no sabemos que pasó');
		

	} catch (error) {
		console.log(error);
	}

};

// Pinta las películas
const pintarPeliculas = (peliculas) => {
	let peliculasHTML = '';
	peliculas.forEach(pelicula => {
		peliculasHTML += `
			<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}">
				<h3 class="titulo">${pelicula.title}</h3>
			</div>
		`;
	});
	contenedorTag.innerHTML = peliculasHTML;
};
