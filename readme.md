# Entrega final de Proyecto TATECH-BUE: Tienda Online


##  Resumen del Proyecto (Punto 5)
Hacer la página de comercio electrónico hecha desde cero, interactiva y responsive, que se conecta a internet para traer los productos y tiene un carrito de compras funcional. 

---

## Detalles del Desarrollo :

*   **HTML y CSS:** en el diseño use Flexbox en las tarjetas de los productos (así se acomodan solas) y CSS Grid para armar la grilla de las opiniones de los clientes. Es responsive, se ve bien en el celu.
*   **Consumo de API (JavaScript):** use l archivo `script.js` hice un `fetch()` a la API de `fakestoreapi.com`. El código se conecta, se baja las imágenes, los títulos y los precios en tiempo real y los muestra en la pantalla de forma asíncrona.
*   **Carrito de Compras:** el carro, deja agregar productos, sumar o restar cantidades, borrar lo que no queres y la página calcula el total en pesos al toque o lo borra. Tambien se actualiza en el numero del carrito.
*   **LocalStorage:** en el almacenamiento local para que los productos que se cargan al carrito se queden guardados ahí. incluso si se cierra la apgina sin querer o la recargás, el carrito sigue estando como lo dejaste.
*   **Contacto:** El formulario de la sección de contacto está conectado con Formspree para que los mensajes lleguen directo a mi mail.

---

## Mejores Prácticas
*   Las imágenes que vienen de la API se cargan con su texto: alt, dinamico para cumplir con la accesibilidad.
*   usada la Logica separada y funciones ordenadas en el script.js para que se lea bien
*   ya esta Subido y funcionando en GitHub Pages.