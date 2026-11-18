// ===== Elementos =====
const chipsPostulaciones = document.querySelectorAll(".chip-list .chip");
const itemsPostulacion = document.querySelectorAll(".list-item");


// ===== Datos =====
const mapaFiltros = {
  "todos": "todos",
  "en revisión": "en revisión",
  "en revision": "en revisión",
  "aprobadas": "aprobada",
  "rechazadas": "rechazada"
};


// ===== Funciones =====
const filtrarPostulaciones = (e) => {
  e.preventDefault();

  // Actualizar estado visual del chip activo (morado)
  chipsPostulaciones.forEach((chip) => chip.classList.remove("chip--active"));
  e.currentTarget.classList.add("chip--active");

  const textoBoton = e.currentTarget.textContent.trim().toLowerCase();
  const estadoBuscado = mapaFiltros[textoBoton] || textoBoton;

  itemsPostulacion.forEach((item) => {
    const etiquetaEstado = item.querySelector(".status");
    const estadoActual = etiquetaEstado ? etiquetaEstado.textContent.trim().toLowerCase() : "";

    if (estadoBuscado === "todos" || estadoActual === estadoBuscado) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
};


// ===== Eventos =====
if (chipsPostulaciones.length > 0 && itemsPostulacion.length > 0) {
  chipsPostulaciones.forEach((chip) => {
    chip.addEventListener("click", filtrarPostulaciones);
  });
}