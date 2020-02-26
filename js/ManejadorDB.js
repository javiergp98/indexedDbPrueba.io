'use strict';

let nombreBD = 'Productos';
let versionBD = 1;
let almacen = 'AlmacenProductos';
let db = null;
class ManejadorDB {

    //Devuelve una promise con la apertura de la BD
    static abrirDB() {
        return new Promise((resolve, reject) => {
            let openReq = indexedDB.open(nombreBD, versionBD);
            openReq.addEventListener('upgradeneeded', e => {
                console.log("db actualizada a v"+versionBD);
                let db = e.target.result;
                if (!db.objectStoreNames.contains(almacen)) {
                    db.createObjectStore(almacen, {autoIncrement: true, keyPath: 'id'});
                }
            });

            openReq.addEventListener('success', e => {
                resolve(e.target.result);
            });

            openReq.addEventListener('error', e => reject('Error al abrir'));
            openReq.addEventListener('blocked', e => reject('BD ya en uso'));
        });
    }

    //Devuelve una promise para obtener todos los productos de la BD
    static obtenerTodosLosProductos(db) {
        return new Promise((resolve,reject)=>{
            let store = db.transaction(almacen,'readonly').objectStore(almacen);
            let getReq = store.getAll();

            getReq.addEventListener('success',e=>resolve(e.target.result));
            getReq.addEventListener('error',e=>reject('Error al obtener productos'));
        });
    }


    //Devuelve una Promise para insertar un producto
    static insertarProducto(db,producto) {
        return new Promise((resolve,reject)=>{
            let store = db.transaction(almacen,'readwrite').objectStore(almacen);
            let addReq  = store.add(producto);

            addReq.addEventListener('success',e=>resolve(e.target.result));
            addReq.addEventListener('error',e=>reject('No se puede añadir el producto'));
        })
    }

    //Para llamarla en consola y limpiar la basura (es una promesa)
    static eliminarBD() {
        return new Promise((resolve,reject)=>{
            let deleteReq = indexedDB.deleteDatabase(nombreBD);
            deleteReq.addEventListener('success',e=>resolve());
            deleteReq.addEventListener('error',e=>reject('Error al borrar'));
            deleteReq.addEventListener('blocked',e=>reject('Cerrar antes!!'));
        });
    }
}