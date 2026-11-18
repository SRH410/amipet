// ===== Elementos =====
const ventanaChat = document.querySelector(".chat-window");
const formChat = document.querySelector(".chat-compose");
const campoChat = document.querySelector("#agent-answer");


// ===== Datos =====
// Para usar Gemini gratis:
// urlApi = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
// modelo = "gemini-2.5-flash"
const urlApi = "https://api.openai.com/v1/chat/completions";
const claveApi = "TU_CLAVE_DE_API_AQUI";
const modelo = "gpt-4o-mini";

const instruccionesAgente =
  "Eres el asistente de adopción de AmiPet. Responde en español, de forma breve, cálida y en texto plano (sin Markdown ni asteriscos). Tu tarea es guiar al adoptante haciendo preguntas cortas una por una sobre: 1) tipo de vivienda y espacio, 2) experiencia previa con mascotas, 3) otros animales en casa y 4) cuántas horas estaría sola la mascota. Cuando tengas esos 4 datos, felicítalo y dile que ya puede confirmar su postulación.";

const historialMensajes = [
  { role: "system", content: instruccionesAgente }
];


// ===== Funciones =====
const obtenerHoraActual = () => {
  return new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
};

const agregarBurbujaChat = (texto, esUsuario = false) => {
  if (!ventanaChat || !formChat) return;

  const div = document.createElement("div");
  div.className = esUsuario ? "chat-message chat-message--user" : "chat-message";
  div.innerHTML = `
    <span class="chat-message__time">${obtenerHoraActual()}</span>
    <div class="chat-message__bubble">${texto}</div>
  `;

  ventanaChat.insertBefore(div, formChat);
  ventanaChat.scrollTop = ventanaChat.scrollHeight;
  return div;
};

const pedirRespuestaAgente = async (pregunta) => {
  historialMensajes.push({ role: "user", content: pregunta });

  const respuestaApi = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${claveApi}`
    },
    body: JSON.stringify({
      model: modelo,
      messages: historialMensajes
    })
  });

  const datos = await respuestaApi.json();
  const textoBot = datos.choices[0].message.content;
  historialMensajes.push({ role: "assistant", content: textoBot });
  return textoBot;
};

const enviarMensajeAgente = async (e) => {
  e.preventDefault();
  const pregunta = campoChat.value.trim();
  if (!pregunta) return;

  campoChat.value = "";
  agregarBurbujaChat(pregunta, true);

  const burbujaCargando = agregarBurbujaChat("Escribiendo...", false);

  try {
    const respuesta = await pedirRespuestaAgente(pregunta);
    burbujaCargando.querySelector(".chat-message__bubble").textContent = respuesta;
  } catch (error) {
    burbujaCargando.querySelector(".chat-message__bubble").textContent =
      "Gracias por tu respuesta. Hemos registrado tus datos para la postulación (revisa tu clave API para activar respuestas con IA).";
  }
};


if (formChat) {
  formChat.addEventListener("submit", enviarMensajeAgente);
}