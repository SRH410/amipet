// ===== Datos =====
const mascotasIniciales = [
  { id: 1, nombre: "Luna", especie: "Perro", sexo: "Hembra", edad: "2 años", tamano: "Mediano", distrito: "Surco", estado: "Disponible", claseFoto: "pet-photo--luna", descripcion: "Cariñosa, sociable y juguetona." },
  { id: 2, nombre: "Milo", especie: "Gato", sexo: "Macho", edad: "5 años", tamano: "Pequeño", distrito: "Miraflores", estado: "Disponible", claseFoto: "pet-photo--milo", descripcion: "Tranquilo y curioso. Disfruta de espacios seguros." },
  { id: 3, nombre: "Hachi", especie: "Perro", sexo: "Macho", edad: "1 año", tamano: "Pequeño", distrito: "San Miguel", estado: "Disponible", claseFoto: "pet-photo--hachi", descripcion: "Activo y atento. Necesita rutinas de juego." },
  { id: 4, nombre: "Coco", especie: "Gato", sexo: "Macho", edad: "3 años", tamano: "Mediano", distrito: "Pueblo Libre", estado: "Disponible", claseFoto: "pet-photo--coco", descripcion: "Amigable y acostumbrado a paseos diarios." },
  { id: 5, nombre: "Bruno", especie: "Perro", sexo: "Macho", edad: "4 años", tamano: "Grande", distrito: "Surquillo", estado: "Disponible", claseFoto: "pet-photo--bruno", descripcion: "Leal y tranquilo con una rutina estable." },
  { id: 6, nombre: "Lola", especie: "Perro", sexo: "Hembra", edad: "2 años", tamano: "Mediano", distrito: "San Borja", estado: "Disponible", claseFoto: "pet-photo--lola", descripcion: "Independiente y cariñosa cuando gana confianza." }
];

const usuariosIniciales = [
  { nombre: "Ana Pérez", correo: "ana.perez@ejemplo.com", contrasena: "123456", rol: "adoptante" },
  { nombre: "Albergue Patitas Felices", correo: "rescatista@amipet.pe", contrasena: "123456", rol: "rescatista" }
];


// ===== Funciones =====
const guardarDatos = (clave, lista) => {
  localStorage.setItem(clave, JSON.stringify(lista));
};

const leerDatos = (clave, datosIniciales = []) => {
  const texto = localStorage.getItem(clave);
  return texto ? JSON.parse(texto) : datosIniciales;
};



