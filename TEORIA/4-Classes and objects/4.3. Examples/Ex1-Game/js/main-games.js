// Función para pintar la tabla de juegos
function printTableGames(lGames){

	console.log("print:llista jocs");
	let bodyGameList = document.getElementById("content-games");
	bodyGameList.innerHTML="";
	lGames.forEach(function(value){
				let currentGame = value;
				bodyGameList.innerHTML+=`
						<tr>
						 <td scope="row">${currentGame.id}</td>
						 <td>${currentGame.name}</td>
						 <td>${currentGame.developer}</td>
						 <td>${currentGame.pegi}</td>
						</tr>
						`;
			}
	);

}
