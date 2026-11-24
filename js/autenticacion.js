// ===== Elementos =====
const formLogin = document.querySelector(".auth-card form");
const alertaError = document.querySelector(".auth-card .alert--error");
const accionesHeader = document.querySelector(".site-header__actions");


// ===== Datos =====
const obtenerUsuarios = () => leerDatos("amipet_usuarios", usuariosIniciales);

const crearUsuario = (nuevoUsuario) => {
  const usuarios = obtenerUsuarios();
  usuarios.push(nuevoUsuario);
  guardarDatos("amipet_usuarios", usuarios);
};


// ===== Funciones =====
const iniciarSesion = (e) => {
  e.preventDefault();

  const datoIngresado = document.querySelector("#login-user").value.trim().toLowerCase();
  const claveIngresada = document.querySelector("#login-password").value.trim();

  const usuario = obtenerUsuarios().find(
    (u) =>
      (u.correo.toLowerCase() === datoIngresado || u.nombre.toLowerCase() === datoIngresado) &&
      u.contrasena === claveIngresada
  );

  if (!usuario) {
    if (alertaError) {
      alertaError.textContent = "Correo, usuario o contraseña incorrectos.";
      alertaError.style.display = "block";
    }
    return;
  }

  const sesion = {
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  };
  guardarDatos("amipet_sesion_actual", sesion);

  if (usuario.rol === "rescatista") {
    location.href = "../rescatista/dashboard.html";
  } else {
    location.href = "../adoptante/panel-adoptante.html";
  }
};

const registrarUsuario = (e) => {
  e.preventDefault();

  // Detecta automáticamente los inputs sin importar el id exacto del HTML de registro
  const inputsTexto = formLogin.querySelectorAll("input[type='text']");
  const inputEmail = formLogin.querySelector("input[type='email']");
  const inputPassword = formLogin.querySelector("input[type='password']");

  const nombre = inputsTexto.length > 0 ? inputsTexto[0].value.trim() : "Usuario AmiPet";
  const correo = inputEmail ? inputEmail.value.trim().toLowerCase() : "";
  const contrasena = inputPassword ? inputPassword.value.trim() : "123456";
  const esRescatista = location.pathname.includes("rescatista");

  if (!correo || !contrasena) return;

  if (obtenerUsuarios().some((u) => u.correo.toLowerCase() === correo)) {
    if (alertaError) {
      alertaError.textContent = "Ese correo ya está registrado.";
      alertaError.style.display = "block";
    } else {
      alert("Ese correo ya está registrado.");
    }
    return;
  }

  crearUsuario({
    nombre,
    correo,
    contrasena,
    rol: esRescatista ? "rescatista" : "adoptante"
  });

  location.href = "login.html";
};

const actualizarHeaderSesion = () => {
  const sesion = leerDatos("amipet_sesion_actual", null);
  if (!sesion || !accionesHeader) return;

  const rutaPanel = sesion.rol === "rescatista"
    ? (location.pathname.includes("/pages/") ? "../rescatista/dashboard.html" : "pages/rescatista/dashboard.html")
    : (location.pathname.includes("/pages/") ? "../adoptante/panel-adoptante.html" : "pages/adoptante/panel-adoptante.html");

  accionesHeader.innerHTML = `
    <a class="button button--outline" href="${rutaPanel}">${sesion.nombre}</a>
    <button type="button" class="button button--primary" id="btn-cerrar-sesion">Salir</button>
  `;

  document.querySelector("#btn-cerrar-sesion").addEventListener("click", cerrarSesion);
};

const cerrarSesion = () => {
  localStorage.removeItem("amipet_sesion_actual");
  location.href = location.pathname.includes("/pages/") ? "../../index.html" : "index.html";
};


// ===== Eventos =====
if (alertaError) {
  alertaError.style.display = "none";
}

if (formLogin) {
  if (location.pathname.includes("login.html")) {
    formLogin.addEventListener("submit", iniciarSesion);
  } else if (location.pathname.includes("registro")) {
    formLogin.addEventListener("submit", registrarUsuario);
  }
}

actualizarHeaderSesion();