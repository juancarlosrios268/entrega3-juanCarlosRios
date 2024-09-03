
fetch("./info.json")
    .then(response => response.json())
    .then(productos =>principal(productos))
    .catch(error => console.log(error))


function principal(productos){

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

    function lanzarAlerta (){
        Toastify({
            text: "Se agregó el producto al carrito",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #deb887, #96c93d)",
            },
            onClick: function(){lanzarAlerta("prueba")} // Callback after click
        }).showToast();
    }

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
                lanzarAlerta ()
            });
    })



    let lista = document.querySelector("#dynamicList");
    let carritoTotalDiv = document.querySelector("#carritoTotal");

    function renderCarrito() {
        lista.innerHTML=""
        carrito.forEach(item => {
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

        if (localStorage.getItem("carrito")) {
            carrito = JSON.parse(localStorage.getItem("carrito"))
        }
        
        renderCarrito()
    }

    let buttonDelete = document.getElementById('deleteButton')
    buttonDelete.addEventListener('click', function() {
        localStorage.removeItem("carrito")
        carrito = []
        carritoTotalDiv.innerText=0
        carritoTotal=0
        renderCarrito()
    })

    }


    