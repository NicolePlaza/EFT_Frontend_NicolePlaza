# GameZone — Tienda de Videojuegos Online

Sitio web para una tienda de venta de videojuegos online, desarrollado con **HTML5, CSS3, JavaScript y Bootstrap 5**, e incluye además una **versión construida con React** (componentes, `state` y `props`).

---

## Características

- Página principal con catálogo de videojuegos en **tarjetas** (imagen, nombre, precio y descripción).
- **Barra de navegación** responsiva (Bootstrap 5) para moverse entre secciones.
- **Filtro por categoría** de los videojuegos.
- **Formulario de contacto** (nombre, email y mensaje) con **validación** antes del envío.
- Catálogo generado **dinámicamente** mediante manipulación del DOM (JavaScript).
- Versión **React** dividida en componentes (`Navbar`, `GameList`, `GameCard`, `ContactForm`, formulario para **agregar** y **eliminar** juegos del `state`), con datos cargados desde un archivo JSON externo.
- Diseño **responsivo** (Flexbox, CSS Grid y la grilla de Bootstrap 5).

---

## Estructura del proyecto

```
NombreApellido_PFY2201_EFT_FRONT_END_I/
├── index.html              # Versión HTML/CSS/JS/Bootstrap (manipulación del DOM)
├── css/
│   └── styles.css          # Estilos personalizados (variables, Flexbox, Grid)
├── js/
│   └── app.js              # Objeto de juegos, render dinámico, filtro y validación
├── data/
│   └── videojuegos.json    # Datos de los videojuegos (usado por la versión React)
├── react/
│   ├── index.html          # Versión React (+ Babel para JSX)
│   └── app.jsx             # Componentes React: Navbar, GameList, GameCard, ContactForm
├── img/                    # Portadas de los videojuegos (SVG)
├── lib/                    # Librerías incluidas localmente (Bootstrap, React, Babel, iconos)
└── README.md
```

---

## Tecnologías utilizadas

- HTML5 (etiquetas semánticas: `header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 (Flexbox, CSS Grid, variables)
- JavaScript (ES6)
- Bootstrap 5.3 (incluido en `lib/`)
- Bootstrap Icons
- React 18 + Babel Standalone (incluidos en `lib/`)

---

## Instalación y uso

No requiere instalar dependencias: Bootstrap, React y Babel vienen **incluidos en la carpeta `lib/`**, por lo que el proyecto funciona **sin conexión a internet**.

### 2. Versión React

La versión React carga los datos con `fetch` desde `data/videojuegos.json`. Por seguridad, los navegadores **bloquean `fetch` al abrir el archivo con `file://`**, así que debe ejecutarse con un **servidor local**. Opciones:

## Uso del sitio

- **Filtrar por categoría:** usa los botones sobre el catálogo (Todos, Acción, RPG, Carreras, etc.).
- **Formulario de contacto:** completa nombre, email y mensaje; si falta información o el formato es incorrecto, se mostrará un mensaje de error.
- **Versión React — Agregar juego:** completa el mini-formulario de la sección *Agregar juego* y presiona `+`.
- **Versión React — Eliminar juego:** usa el botón *Eliminar* de cada tarjeta.
