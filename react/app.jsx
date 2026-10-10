/* ============================================================
   GameZone - Versión React
   La aplicación se divide en componentes para modularizar el código:
     - Navbar      : barra de navegación (recibe el título por props)
     - GameCard    : tarjeta individual de un videojuego (recibe props)
     - GameList    : lista de tarjetas (recibe la lista y callbacks por props)
     - ContactForm : formulario de contacto con validación
     - App         : componente raíz que maneja el estado (state)
   Se usa state para agregar/eliminar videojuegos y props para comunicar
   la información entre componentes. Los datos se cargan desde un archivo
   JSON externo (../data/videojuegos.json).
   ============================================================ */

const { useState, useEffect } = React;

/* Formatea el precio como moneda chilena */
function formatearPrecio(valor) {
  return Number(valor).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

/* -------------------- Componente Navbar -------------------- */
function Navbar({ titulo }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#inicio">
            <i className="bi bi-controller"></i> {titulo}
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#menuReact" aria-controls="menuReact"
                  aria-expanded="false" aria-label="Abrir menú">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuReact">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#catalogo">Catálogo</a></li>
              <li className="nav-item"><a className="nav-link" href="#agregar">Agregar juego</a></li>
              <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* -------------------- Componente GameCard --------------------
   Recibe por props un videojuego y la función para eliminarlo. */
function GameCard({ juego, onEliminar }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <article className="card card-juego shadow-sm">
        {/* Las imágenes del JSON son relativas a la raíz del proyecto */}
        <img src={"../" + juego.imagen} className="card-img-top" alt={"Portada de " + juego.nombre} />
        <div className="card-body">
          <span className="badge badge-categoria mb-2 align-self-start">{juego.categoria}</span>
          <h3 className="card-title h5">{juego.nombre}</h3>
          <p className="card-text text-muted small">{juego.descripcion}</p>
          <p className="precio mb-2">{formatearPrecio(juego.precio)}</p>
          <button className="btn btn-outline-danger w-100" onClick={() => onEliminar(juego.id)}>
            <i className="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </article>
    </div>
  );
}

/* -------------------- Componente GameList --------------------
   Recibe la lista de juegos (ya filtrada) y la propaga a cada GameCard. */
function GameList({ juegos, onEliminar }) {
  if (juegos.length === 0) {
    return <p className="text-center text-muted mt-4">No hay videojuegos en esta categoría.</p>;
  }
  return (
    <div className="row g-4">
      {juegos.map((juego) => (
        <GameCard key={juego.id} juego={juego} onEliminar={onEliminar} />
      ))}
    </div>
  );
}

/* -------------------- Componente FormularioAgregar --------------------
   Permite agregar un nuevo videojuego al estado de la lista. */
function FormularioAgregar({ onAgregar, categorias }) {
  const inicial = { nombre: "", categoria: "", precio: "", descripcion: "" };
  const [datos, setDatos] = useState(inicial);
  const [error, setError] = useState("");

  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!datos.nombre.trim() || !datos.categoria.trim() || !datos.precio) {
      setError("Completa al menos nombre, categoría y precio.");
      return;
    }
    onAgregar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria.trim(),
      precio: parseInt(datos.precio, 10),
      descripcion: datos.descripcion.trim() || "Sin descripción.",
      imagen: "img/galaxia-guerra.svg" // portada por defecto para los juegos agregados
    });
    setDatos(inicial);
    setError("");
  };

  return (
    <form onSubmit={manejarEnvio} className="row g-2 justify-content-center">
      <div className="col-md-3">
        <input className="form-control" name="nombre" value={datos.nombre}
               onChange={manejarCambio} placeholder="Nombre" />
      </div>
      <div className="col-md-3">
        <input className="form-control" name="categoria" value={datos.categoria}
               onChange={manejarCambio} placeholder="Categoría" list="listaCategorias" />
        <datalist id="listaCategorias">
          {categorias.map((c) => <option key={c} value={c} />)}
        </datalist>
      </div>
      <div className="col-md-2">
        <input type="number" className="form-control" name="precio" value={datos.precio}
               onChange={manejarCambio} placeholder="Precio" min="0" />
      </div>
      <div className="col-md-3">
        <input className="form-control" name="descripcion" value={datos.descripcion}
               onChange={manejarCambio} placeholder="Descripción (opcional)" />
      </div>
      <div className="col-md-1 d-grid">
        <button className="btn btn-success" type="submit"><i className="bi bi-plus-lg"></i></button>
      </div>
      {error && <div className="col-12 text-center text-danger small mt-1">{error}</div>}
    </form>
  );
}

/* -------------------- Componente ContactForm --------------------
   Formulario de contacto controlado con validación por state. */
function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validar = () => {
    const err = {};
    if (form.nombre.trim().length < 3) err.nombre = "Ingresa tu nombre (mínimo 3 caracteres).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = "Ingresa un email válido.";
    if (form.mensaje.trim().length < 10) err.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return err;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    if (Object.keys(err).length === 0) {
      setEnviado(true);
      setForm({ nombre: "", email: "", mensaje: "" });
      setTimeout(() => setEnviado(false), 4000);
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="c-nombre">Nombre</label>
        <input id="c-nombre" name="nombre" className={"form-control" + (errores.nombre ? " is-invalid" : "")}
               value={form.nombre} onChange={manejarCambio} placeholder="Tu nombre" />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" className={"form-control" + (errores.email ? " is-invalid" : "")}
               value={form.email} onChange={manejarCambio} placeholder="tucorreo@ejemplo.com" />
        {errores.email && <div className="invalid-feedback">{errores.email}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="c-mensaje">Mensaje</label>
        <textarea id="c-mensaje" name="mensaje" rows="4"
                  className={"form-control" + (errores.mensaje ? " is-invalid" : "")}
                  value={form.mensaje} onChange={manejarCambio} placeholder="Escribe tu mensaje"></textarea>
        {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
      </div>
      <div className="d-grid">
        <button className="btn btn-primary" type="submit"><i className="bi bi-send"></i> Enviar mensaje</button>
      </div>
      {enviado && (
        <div className="alert alert-success mt-3" role="alert">
          <i className="bi bi-check-circle"></i> ¡Mensaje enviado correctamente!
        </div>
      )}
    </form>
  );
}

/* -------------------- Componente raíz App --------------------
   Maneja el estado global: la lista de juegos y la categoría activa. */
function App() {
  const [juegos, setJuegos] = useState([]);          // lista de videojuegos (state)
  const [categoria, setCategoria] = useState("Todos"); // filtro activo
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);

  // Carga dinámica de los datos desde el archivo JSON externo
  useEffect(() => {
    fetch("../data/videojuegos.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el archivo de datos");
        return res.json();
      })
      .then((data) => { setJuegos(data); setCargando(false); })
      .catch(() => { setErrorCarga(true); setCargando(false); });
  }, []);

  // Agregar un videojuego a la lista (actualiza el state)
  const agregarJuego = (nuevo) => {
    const nuevoId = juegos.length ? Math.max(...juegos.map((j) => j.id)) + 1 : 1;
    setJuegos([...juegos, { ...nuevo, id: nuevoId }]);
  };

  // Eliminar un videojuego de la lista (actualiza el state)
  const eliminarJuego = (id) => setJuegos(juegos.filter((j) => j.id !== id));

  // Categorías únicas para el filtro
  const categorias = ["Todos", ...new Set(juegos.map((j) => j.categoria))];

  // Lista filtrada que se pasa por props a GameList
  const juegosFiltrados = categoria === "Todos"
    ? juegos
    : juegos.filter((j) => j.categoria === categoria);

  return (
    <React.Fragment>
      <Navbar titulo="GameZone (React)" />

      <main style={{ paddingTop: "70px" }}>

        <section id="inicio" className="hero text-center text-white d-flex align-items-center">
          <div className="container">
            <h1 className="display-5 fw-bold">GameZone — Versión React</h1>
            <p className="lead">Catálogo construido con componentes React, state y props.</p>
          </div>
        </section>

        <section id="catalogo" className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Catálogo de videojuegos</h2>

            {cargando && <p className="text-center text-muted">Cargando videojuegos…</p>}
            {errorCarga && (
              <div className="alert alert-warning text-center">
                No se pudieron cargar los datos. Ejecuta el proyecto con un servidor local
                (ver <strong>README.md</strong>), ya que <code>fetch</code> no funciona abriendo el archivo directamente.
              </div>
            )}

            {!cargando && !errorCarga && (
              <React.Fragment>
                {/* Filtro por categoría */}
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                  {categorias.map((cat) => (
                    <button key={cat} type="button"
                            className={"btn btn-outline-dark btn-sm" + (categoria === cat ? " activo" : "")}
                            onClick={() => setCategoria(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Lista de juegos (componente hijo vía props) */}
                <GameList juegos={juegosFiltrados} onEliminar={eliminarJuego} />
              </React.Fragment>
            )}
          </div>
        </section>

        {/* Agregar nuevos videojuegos al state */}
        <section id="agregar" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">Agregar un videojuego</h2>
            <FormularioAgregar onAgregar={agregarJuego} categorias={[...new Set(juegos.map((j) => j.categoria))]} />
          </div>
        </section>

        {/* Formulario de contacto */}
        <section id="contacto" className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Contacto</h2>
            <div className="row justify-content-center">
              <div className="col-lg-7"><ContactForm /></div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-1"><i className="bi bi-controller"></i> <strong>GameZone (React)</strong></p>
          <p className="mb-0 small text-secondary">Proyecto académico EFT Desarrollo Frontend I (PFY2201).</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

/* Montaje de la aplicación */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
