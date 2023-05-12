const fs = require("fs/promises");

/* DICCIONARIO DE ESTADOS DE UN SERVICIO */
const SERVICE_STATUS = Object.freeze({
  DONE: "DONE",
  UNDONE: "UNDONE",
});

/* DICCIONARIO DE VALORES DE UN SERVICIO */
const SERVICES_VALUES = Object.freeze({
  DONE: 1, 
  UNDONE: 0
})

/* EXTENSION DE ARCHIVOS PERMITIDOS*/
const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "pdf", "doc"]

//Genera errores personalizados que pueden enviarse como respuesta a una solicitud HTTP en caso de error en el server
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//Comprueba si un directorio existe en el sistema de archivos y lo crea sino.
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

//Obtenemos la key de un diccionario por su value
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getExtensionFile(filename) {
  return filename.split(".").slice(-1);
}

function checkIfExtensionIsAllowed(fileExtension)
{
  return ALLOWED_EXTENSIONS.includes(fileExtension);
}


// createPathIfNotExists("./uploads");

module.exports = {
  generateError,
  createPathIfNotExists,
  SERVICE_STATUS, //Exportamos el diccionario para poder utilizarlo desde fuera del fichero
  SERVICES_VALUES, //Exportamos el valor que tendra cada key,
  getKeyByValue,
  getExtensionFile,
  checkIfExtensionIsAllowed,
  ALLOWED_EXTENSIONS,
};
