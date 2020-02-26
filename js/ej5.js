'use strict';
let bodyTabla;
let nombre;
let cantidad;
let precio;
let marca;


function mostrarTodos() {
    bodyTabla.innerHTML = "";

    ManejadorDB.abrirDB().then(database => {
        ManejadorDB.db = database;
        return ManejadorDB.obtenerTodosLosProductos(ManejadorDB.db);
    }).then(productos => {
        if (productos.length !== 0) {
            for (let producto of productos) {
                console.log(producto);
                bodyTabla.innerHTML += producto.devolverTRProducto();
            }
        } else {
            console.log("No hay productos");
        }
        ManejadorDB.db.close();
    }).catch(error => console.log(error.message));
}

function nuevoProducto(producto) {
    ManejadorDB.abrirDB().then(database => {
        ManejadorDB.db = database;
        return ManejadorDB.insertarProducto(ManejadorDB.db, producto);
    }).catch(error => console.log(error.message));
}

document.addEventListener("DOMContentLoaded", function () {
    bodyTabla = document.getElementById('bodyTabla');
    nombre = document.getElementById('nombre');
    cantidad = document.getElementById('cantidad');
    precio = document.getElementById('precio');
    marca = document.getElementById('marca');

    mostrarTodos();

    let accionForm = event => {
        event.preventDefault();
        nuevoProducto({
            item: nombre.value,
            cantidad: cantidad.value,
            precioUnidad: precio.value,
            marca: marca.value
        });

        mostrarTodos();
    };

    document.getElementById('btnAdd').addEventListener('click', accionForm);
});