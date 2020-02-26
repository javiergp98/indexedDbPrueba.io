'use strict';
class Producto{

    constructor(item,cantidad,precioUnidad,marca){
        this.item = item;
        this.cantidad = cantidad;
        this.precioUnidad = precioUnidad;
        this.marca = marca;
    }

    devolverTRProducto(){
        let cadena = "<tr><td>"+
            this.item+
            "</td><td>" +
            this.cantidad+
            "</td><td>" +
            this.precioUnidad+
            "</td><td>" +
            this.marca+
            "</td></tr>";

        return cadena;
    }
}