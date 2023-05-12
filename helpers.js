const fs = require("fs/promises");

// DICCIONARIO DE ESTADOS DE UN SERVICIO //
const SERVICE_STATUS = Object.freeze({
  DONE: "DONE",
  UNDONE: "UNDONE",
});

// DICCIONARIO DE VALORES DE UN SERVICIO //
const SERVICES_VALUES = Object.freeze({
  DONE: 1,
  UNDONE: 0,
});

// EXTENSIÓN DE ARCHIVOS PERMITIDOS //
const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "pdf", "doc"];

//Generar errores personalizados en respuesta a una solicitud HTTP en caso de error en el server
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//Comprobar si un directorio existe en el sistema de archivos y lo crea si no.
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

//Obtener la key de un diccionario por su value
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getExtensionFile(filename) {
  return filename.split(".").slice(-1);
}

function checkIfExtensionIsAllowed(fileExtension) {
  const [ext] = fileExtension;
  return ALLOWED_EXTENSIONS.includes(ext);
}

module.exports = {
  generateError,
  createPathIfNotExists,
  SERVICE_STATUS,
  SERVICES_VALUES,
  getKeyByValue,
  getExtensionFile,
  checkIfExtensionIsAllowed,
  ALLOWED_EXTENSIONS,
};
