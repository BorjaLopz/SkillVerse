const fs = require("fs/promises");

/* DICCIONARIO DE ESTADOS DE UN SERVICIO */
const SERVICE_STATUS = Object.freeze({
  DONE: "DONE",
  UNDONE: "UNDONE",
});

const SERVICES_VALUES = Object.freeze({
  DONE: 1, 
  UNDONE: 0
})

//Genera errores personalizados que pueden enviarse como respuesta a una solicitu HTTP en caso de error en el server
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


// createPathIfNotExists("./uploads");

module.exports = {
  generateError,
  createPathIfNotExists,
  SERVICE_STATUS, //Exportamos el diccionario para poder utilizarlo desde fuera del fichero
  SERVICES_VALUES, //Exportamos el valor que tendra cada key,
  getKeyByValue,
  getExtensionFile,
};
