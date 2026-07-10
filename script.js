const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("items-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const totalPrecio = document.getElementById("total-precio");
const botonVaciar = document.getElementById("vaciar-carrito");
const botonCompra = document.getElementById("simular-compra");

// traigo lo que quedo en el localstorage o arranca vacio
let carrito = JSON.parse(localStorage.getItem("carrito-pctime")) || [];

const URL_API = "https://fakestoreapi.com/products/category/electronics";

// funcion para traer los productos de la api
async function pedirProductos() {
    try {
        const response = await fetch(URL_API);
        const productos = await response.json();
        renderizarProductos(productos);
    } catch (error) {
        console.error("rompio la api:", error);
        contenedorProductos.innerHTML = "<p>Error al cargar productos.</p>";
    }
}

// aca dibujo las cards en el html
function renderizarProductos(listaProductos) {
    contenedorProductos.innerHTML = ""; 

    listaProductos.forEach(producto => {
        const article = document.createElement("article");
        article.classList.add("tarjeta-producto");

        article.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" style="width: 100%; height: 150px; object-fit: contain; margin-bottom: 10px;">
            <h3>${producto.title.substring(0, 20)}...</h3>
            <p>Precio: $${(producto.price * 1000).toLocaleString('es-AR')}</p>
            <button class="btn-agregar" data-id="${producto.id}" data-titulo="${producto.title.substring(0, 20)}" data-precio="${producto.price * 1000}">Comprar</button>
        `;

        contenedorProductos.appendChild(article);
    });

    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const id = e.target.getAttribute("data-id");
    const titulo = e.target.getAttribute("data-titulo");
    const precio = parseFloat(e.target.getAttribute("data-precio"));

    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++; 
    } else {
        carrito.push({ id, titulo, precio, cantidad: 1 });
    }

    actualizarInterfazCarrito();
}

// actualizo todo el carrito y los totales
function actualizarInterfazCarrito() {
    contenedorCarrito.innerHTML = ""; 

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p style="color: #666;">El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justify = "space-between";
            div.style.marginBottom = "10px";
            div.style.borderBottom = "1px solid #ddd";
            div.style.paddingBottom = "5px";

            div.innerHTML = `
                <span>${item.titulo} (x${item.cantidad})</span>
                <div>
                    <span style="margin-right: 15px;">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                    <button class="btn-restar" data-id="${item.id}" style="padding: 2px 5px; cursor:pointer;">-</button>
                    <button class="btn-eliminar" data-id="${item.id}" style="padding: 2px 5px; background:#e74c3c; color:white; border:none; cursor:pointer; margin-left:5px;">X</button>
                </div>
            `;
            contenedorCarrito.appendChild(div);
        });
    }

    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.innerText = totalUnidades;

    const dineroTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalPrecio.innerText = dineroTotal.toLocaleString('es-AR');

    // guardo en el localstorage
    localStorage.setItem("carrito-pctime", JSON.stringify(carrito));

    asignarEventosCarrito();
}

function asignarEventosCarrito() {
    // restar cantidad
    document.querySelectorAll(".btn-restar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const producto = carrito.find(item => item.id === id);
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito = carrito.filter(item => item.id !== id);
            }
            actualizarInterfazCarrito();
        });
    });

    // borrar el producto
    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            carrito = carrito.filter(item => item.id !== id);
            actualizarInterfazCarrito();
        });
    });
}

botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarInterfazCarrito();
});

botonCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío, no podés comprar nada todavía.");
    } else {
        alert("¡Gracias por tu compra simulada en PC.TIME! El pedido fue procesado con éxito. 🎉");
        carrito = [];
        actualizarInterfazCarrito();
    }
});

// arranco la app
pedirProductos();
actualizarInterfazCarrito();