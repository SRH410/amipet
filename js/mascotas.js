// ===== Elementos =====
const grillaMascotas = document.querySelector(".pet-grid");
const buscadorMascotas = document.querySelector("#pet-search");
const formBusqueda = document.querySelector(".search-box");
const chipsFiltro = document.querySelectorAll(".chip-list .chip");


// ===== Datos =====
let especieActiva = "";
const obtenerMascotas = () => leerDatos("amipet_mascotas", mascotasIniciales);


// ===== Funciones =====
const crearHtmlMascota = (mascota) => `
  <article class="pet-card">
    <div aria-label="Fotografía de ${mascota.nombre}" class="pet-photo ${mascota.claseFoto}" role="img"></div>
    <div class="pet-card__body">
      <header class="pet-card__top">
        <span class="status status--available">${mascota.estado}</span>
        <span class="text text--muted">${mascota.especie}</span>
      </header>
      <h3>${mascota.nombre}</h3>
      <p class="pet-card__meta">${mascota.especie} · ${mascota.edad} · ${mascota.tamano} · ${mascota.distrito}</p>
      <p class="text text--soft">${mascota.descripcion}</p>
      <a class="button button--outline button--block" href="mascota-luna.html?id=${mascota.id}">Ver perfil</a>
    </div>
  </article>
`;

const mostrarMascotas = () => {
  if (!grillaMascotas) return;

  const texto = buscadorMascotas ? buscadorMascotas.value.trim().toLowerCase() : "";

  const filtradas = obtenerMascotas().filter((m) => {
    const coincideTexto =
      m.nombre.toLowerCase().includes(texto) ||
      m.descripcion.toLowerCase().includes(texto) ||
      m.distrito.toLowerCase().includes(texto);

    const coincideEspecie = !especieActiva || m.especie.toLowerCase() === especieActiva.toLowerCase();

    return coincideTexto && coincideEspecie;
  });

  if (filtradas.length === 0) {
    grillaMascotas.innerHTML = `<p class="text text--soft">No se encontraron mascotas con esos criterios.</p>`;
    return;
  }

  grillaMascotas.innerHTML = filtradas.map(crearHtmlMascota).join("");
};

const manejarFiltroChip = (e) => {
  e.preventDefault();
  const etiqueta = e.currentTarget.textContent.trim();

  chipsFiltro.forEach((c) => c.classList.remove("chip--active"));

  if (etiqueta === "Limpiar filtros") {
    especieActiva = "";
    if (buscadorMascotas) buscadorMascotas.value = "";
  } else if (etiqueta === "Perro" || etiqueta === "Gato") {
    especieActiva = etiqueta;
    e.currentTarget.classList.add("chip--active");
  }

  mostrarMascotas();
};


// ===== Eventos =====
if (grillaMascotas) {
  chipsFiltro.forEach((chip) => {
    chip.classList.remove("chip--active");
    chip.addEventListener("click", manejarFiltroChip);
  });

  if (buscadorMascotas) {
    buscadorMascotas.addEventListener("input", mostrarMascotas);
  }

  if (formBusqueda) {
    formBusqueda.addEventListener("submit", (e) => {
      e.preventDefault();
      mostrarMascotas();
    });
  }

  mostrarMascotas();
}