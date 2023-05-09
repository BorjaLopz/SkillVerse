const { nanoid } = require("nanoid");
const { createService } = require("../db/services");
const { generateError, createPathIfNotExists } = require("../helpers");
const chalk = require("chalk");
const path = require("path");

const newServiceController = async (req, res, next) => {
  try {
    const { title, request_body, required_type } = req.body;

    //Comprobamos titulo
    if (!title || title.lenght > 50 || title.lenght < 15) {
      throw generateError(
        "El titulo debe existir y debe ser mayor que 15 caracteres y menor que 50",
        400
      );
    }

    //Comprobamos request_body
    if (
      !request_body ||
      request_body.lenght > 500 ||
      request_body.lenght < 15
    ) {
      throw generateError(
        "La descripcion debe existir y debe ser mayor que 15 caracteres y menor que 500",
        400
      );
    }

    //Comprobamos required_type
    if (!required_type || required_type.lenght > 20) {
      throw generateError(
        "El servicio debe existir y debe ser menor que 20 caracteres",
        400
      );
    }

    //Tratamos el fichero
    let fileName;
    let uploadPath;

    if (req.files && req.files.file) {
      let sampleFile = req.files.file;

      //Creamos el path
      const uploadDir = path.join(__dirname, "../uploads");

      //Creamos directorio si no existe
      await createPathIfNotExists(uploadDir);

      console.log(sampleFile)

      fileName = `${nanoid(24)}.${sampleFile.name.split(".").slice(-1)}`; //Obtenemos la extension del fichero para guardarlo de la misma manera

      uploadPath = uploadDir + "\\" + fileName;

      console.log(uploadPath)

      //Subimos el fichero
      sampleFile.mv(uploadPath, function(e) {
        if(e){
          throw generateError("No se ha podido mandar el fichero", 400);
        }
        console.log("Fichero subido con exito!");
      });

    }

    const id_services = await createService(
      title,
      request_body,
      req.userId,
      required_type,
      fileName
    );

    res.send({
      status: "ok",
      message: `Services created with id ${id_services}`, //${id_services}
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { newServiceController };
