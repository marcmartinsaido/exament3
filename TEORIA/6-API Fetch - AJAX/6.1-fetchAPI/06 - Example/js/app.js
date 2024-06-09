document.getElementById('txtBtn').addEventListener('click', cargarTXT);
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);
document.getElementById('apiBTN').addEventListener('click', cargarREST);

function cargarTXT() {
    fetch('datos.txt')
        .then(function(res) {
            return res.text();
        })
        .then(function(empleados) {
            console.log(empleados);
            document.getElementById('resultado').innerHTML = empleados;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function cargarJSON() {
    fetch('empleados.json')
        .then(function(res) {
            return res.json();
        })
        .then(function(data){
            let html = '';
            data.forEach(function(empleado) {
                html += `
                    <li>${empleado.nombre} ${empleado.puesto}</li>
                `;
            })
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function cargarREST() {
    fetch('https://picsum.photos/list')
        .then(function(res) {
            return res.json();
        })
        .then(function(imagenes) {
            let html ='';

            imagenes.forEach(function(imagen) {
                    html += `
                        <li>
                            <a target="_blank" href="${imagen.post_url}">Ver Imagen</a>
                            ${imagen.author}
                        </li>
                    `;
            });
            document.getElementById('resultado').innerHTML = html;
        })
}