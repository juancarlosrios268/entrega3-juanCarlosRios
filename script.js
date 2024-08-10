

let productos = [
    {id: 1209, nombre:"play 5" , precio:2000000 , cantidad:7 , categoria:"consola", rutaImagen:"play5.png" },
    {id: 1529, nombre:"xbox" , precio:1400000 , cantidad:12 , categoria:"consola", rutaImagen:"xbox.png" },
    {id: 2234, nombre:"nintento" , precio:1000000 , cantidad:5 , categoria:"consola", rutaImagen:"nintendo.png" },
    {id: 5599, nombre:"mario bross" , precio:250000 , cantidad:11 , categoria:"video juego", rutaImagen:"mario.jpg" },
    {id: 4677, nombre:"fornite" , precio:100000 , cantidad:34 , categoria:"video juego", rutaImagen:"fortnite.png"},
    {id: 7689, nombre:"fifa" , precio:280000 , cantidad:75 , categoria:"video juego", rutaImagen:"fifa.jpeg" },
    {id: 1123, nombre:"audifono" , precio:25000 , cantidad:20 , categoria:"accesorio", rutaImagen:"diadema.jpeg" },
    {id: 1198, nombre:"microfono" , precio:80000 , cantidad:15 , categoria:"accesorio", rutaImagen: "microfono.jpeg"},
    {id: 4430, nombre:"pc gamer" , precio:4000000 , cantidad:2 , categoria:"consola", rutaImagen: "pcGamer.png"},
];

let contenedorProductos = document.getElementById("productos");

productos.forEach(producto => {
    let divProducto = document.createElement('div');
    divProducto.className = 'producto';

    divProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio}</p>
        <p>Cantidad de productos: ${producto.cantidad}</p>
        <img src="./images/${producto.rutaImagen}" alt="${producto.nombre}">
        <button class=botonAñadir id="${producto.id}">Añadir al Carrito</button>
    `;

    contenedorProductos.appendChild(divProducto);
});

let carrito = []
let carritoTotal = 0

productos.forEach(producto => {
    let botonAgregarAlCarrito = document.getElementById(producto.id);
        botonAgregarAlCarrito.addEventListener("click", function(e) {
            let productId = e.target.id
            let productoAgredado = productos.find((producto) => producto.id == productId)
            carrito.push({
                nombre: productoAgredado.nombre,
                precio:productoAgredado.precio,
                id: productoAgredado.id
            })
            carritoTotal+=productoAgredado.precio
            carritoTotalDiv.innerText= carritoTotal

            renderCarrito()
        });
})

let lista = document.querySelector("#dynamicList");
let carritoTotalDiv = document.querySelector("#carritoTotal");

function renderCarrito() {
    lista.innerHTML=""
    carrito.forEach(item => {
        console.log(item)
        let newItem= document.createElement("li");
        newItem.innerText= item.nombre + item.precio;
        lista.appendChild(newItem);
    })
    setearCarrito()
}

function setearCarrito() {
    let carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJSON)
}

obtenerCarrito()
function obtenerCarrito() {
    console.log("asd")

    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    
    renderCarrito()
}

let buttonDelete = document.getElementById('deleteButton')
buttonDelete.addEventListener('click', function() {
    console.log('click delete')
    localStorage.removeItem("carrito")
    carrito = []
    renderCarrito()
})