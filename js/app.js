/* ============================================================
   GameZone - Lógica de la aplicación (JavaScript)
   - Objeto con la información de los videojuegos
   - Generación dinámica de tarjetas (manipulación del DOM)
   - Filtrado por categoría
   - Validación del formulario de contacto
   ============================================================ */

"use strict";

/* -----------------------------------------------------------
   1. Objeto con la información de los videojuegos
   (nombre, categoría, precio, descripción, imagen)
----------------------------------------------------------- */
const videojuegos = [
  { id: 1, nombre: "Neón Racer",          categoria: "Carreras",   precio: 19990, descripcion: "Carreras futuristas a toda velocidad por circuitos llenos de neón y adrenalina.", imagen: "img/neon-racer.svg" },
  { id: 2, nombre: "Sombras del Reino",   categoria: "RPG",        precio: 34990, descripcion: "Un RPG épico de fantasía donde tus decisiones moldean el destino del reino.",         imagen: "img/sombras-reino.svg" },
  { id: 3, nombre: "Galaxia en Guerra",   categoria: "Acción",     precio: 29990, descripcion: "Acción espacial frenética: defiende la galaxia en intensos combates.",               imagen: "img/galaxia-guerra.svg" },
  { id: 4, nombre: "Isla Perdida",        categoria: "Aventura",   precio: 24990, descripcion: "Explora una isla misteriosa, resuelve enigmas y sobrevive a lo desconocido.",         imagen: "img/isla-perdida.svg" },
  { id: 5, nombre: "Táctica Suprema",     categoria: "Estrategia", precio: 27990, descripcion: "Estrategia por turnos donde cada movimiento define la victoria o la derrota.",         imagen: "img/tactica-suprema.svg" },
  { id: 6, nombre: "Copa Mundial 25",     categoria: "Deportes",   precio: 39990, descripcion: "El simulador de fútbol más completo con ligas, torneos y modo carrera.",             imagen: "img/copa-mundial.svg" },
  { id: 7, nombre: "Puzzle Mente",        categoria: "Puzzle",     precio: 9990,  descripcion: "Cientos de acertijos para ejercitar la mente, del nivel fácil al experto.",           imagen: "img/puzzle-mente.svg" },
  { id: 8, nombre: "Terror en la Niebla", categoria: "Terror",     precio: 22990, descripcion: "Una experiencia de survival horror que pondrá a prueba tus nervios.",                imagen: "img/terror-niebla.svg" }
];

/* Referencias a elementos del DOM */
const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorFiltros   = document.getElementById("filtros");
const sinResultados       = document.getElementById("sinResultados");

/* Formatea el precio como moneda chilena (CLP) */
function formatearPrecio(valor) {
  return valor.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

/* -----------------------------------------------------------
   2. Generación dinámica de las tarjetas (manipulación del DOM)
----------------------------------------------------------- */
function mostrarProductos(lista) {
  contenedorProductos.innerHTML = ""; // limpia el contenedor

  if (lista.length === 0) {
    sinResultados.classList.remove("d-none");
    return;
  }
  sinResultados.classList.add("d-none");

  lista.forEach(function (juego) {
    // Columna responsiva de Bootstrap
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

    col.innerHTML = `
      <article class="card card-juego shadow-sm">
        <img src="${juego.imagen}" class="card-img-top" alt="Portada de ${juego.nombre}">
        <div class="card-body">
          <span class="badge badge-categoria mb-2 align-self-start">${juego.categoria}</span>
          <h3 class="card-title h5">${juego.nombre}</h3>
          <p class="card-text text-muted small">${juego.descripcion}</p>
          <p class="precio mb-2">${formatearPrecio(juego.precio)}</p>
          <button class="btn btn-primary w-100">
            <i class="bi bi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </article>
    `;
    contenedorProductos.appendChild(col);
  });
}

/* -----------------------------------------------------------
   3. Filtro por categoría
----------------------------------------------------------- */
function generarFiltros() {
  // Obtiene las categorías únicas y antepone "Todos"
  const categorias = ["Todos", ...new Set(videojuegos.map((j) => j.categoria))];

  categorias.forEach(function (cat) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-outline-dark btn-sm";
    btn.textContent = cat;
    if (cat === "Todos") btn.classList.add("activo");

    btn.addEventListener("click", function () {
      // Marca el botón activo
      document.querySelectorAll("#filtros .btn").forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");

      // Filtra y vuelve a renderizar
      const filtrados = cat === "Todos"
        ? videojuegos
        : videojuegos.filter((j) => j.categoria === cat);
      mostrarProductos(filtrados);
    });

    contenedorFiltros.appendChild(btn);
  });
}

/* -----------------------------------------------------------
   4. Validación del formulario de contacto
----------------------------------------------------------- */
function inicializarFormulario() {
  const form = document.getElementById("formContacto");
  const mensajeExito = document.getElementById("mensajeExito");

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let valido = true;

    const nombre  = document.getElementById("nombre");
    const email   = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    // Validación: nombre (mínimo 3 caracteres)
    if (nombre.value.trim().length < 3) {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
    }

    // Validación: email con expresión regular
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      email.classList.add("is-invalid");
      valido = false;
    } else {
      email.classList.remove("is-invalid");
    }

    // Validación: mensaje (mínimo 10 caracteres)
    if (mensaje.value.trim().length < 10) {
      mensaje.classList.add("is-invalid");
      valido = false;
    } else {
      mensaje.classList.remove("is-invalid");
    }

    // Si todo es válido, muestra el mensaje de éxito y limpia el formulario
    if (valido) {
      mensajeExito.classList.remove("d-none");
      form.reset();
      setTimeout(() => mensajeExito.classList.add("d-none"), 4000);
    } else {
      mensajeExito.classList.add("d-none");
    }
  });

  // Quita el estado de error mientras el usuario corrige
  ["nombre", "email", "mensaje"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
  });
}

/* -----------------------------------------------------------
   Inicialización al cargar la página
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  generarFiltros();
  mostrarProductos(videojuegos);
  inicializarFormulario();
  document.getElementById("anio").textContent = new Date().getFullYear();
});
