const fs = require("fs/promises");

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
createPathIfNotExists("./uploads");

module.exports = {
  generateError,
  createPathIfNotExists,
};
