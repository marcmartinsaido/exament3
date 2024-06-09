class Producto{

    constructor(id, nombre, descripcion, precio){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }


    calcularPrecioConIVA(){
        let precioIVA = this.precio * 1.21;
        return precioIVA;
    }

    calcularDescuentoSocio(tipoSocio){
        if (tipoSocio == "ORO"){
            return this.precio * 0.8;
        }else if(tipoSocio == "PLATA"){
            return this.precio * 0.9;
        }
        return this.precio;
    }

    rederProducto(){
        return `
            <div style="background-color:#ddd;margin:10px; padding:10px;">
                <p>${this.id}</p>
                <p>${this.nombre}</p>
                <p>${this.descripcion}</p>
                <p>${this.precio}</p>
            <div>
        `;
    }

}