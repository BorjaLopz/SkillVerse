const { nanoid } = require("nanoid");
// const fileType = require("file-type");//detecta el tipo de archivo cargado
const {
  createService,
  getServiceByID,
  getAllServices,
  updateServiceStatus,
  getServiceByType,
  createComment,
} = require("../db/services");
const {
  generateError,
  createPathIfNotExists,
  SERVICE_STATUS,
  SERVICES_VALUES,
  getKeyByValue,
  getExtensionFile,
} = require("../helpers");
const chalk = require("chalk");
const path = require("path");

const newServiceController = async (req, res, next) => {
  try {
    const { title, request_body, required_type } = req.body;

    //Comprobamos titulo
    if (!title || title.lenght > 50 || title.lenght < 15) {
      throw generateError(
        "The title must be greater than 15 characters and less than 50",
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
        "The description must be greater than 15 characters and less than 500",
        400
      );
    }

    //Comprobamos required_type
    if (!required_type || required_type.lenght > 20) {
      throw generateError("Service type must be less than 20 characters", 400);
    }

    console.log(chalk.magenta(req.userId));

    //Tratamos el fichero
    let fileName;
    let uploadPath;

    if (req.files && req.files.file) {
      let sampleFile = req.files.file;

      //Creamos el path
      const uploadDir = path.join(__dirname, "../uploads");

      //Creamos directorio si no existe
      await createPathIfNotExists(uploadDir);

      // console.log(sampleFile);

      fileName = `${nanoid(24)}.${getExtensionFile(sampleFile.name)}`; //Obtenemos la extension del fichero para guardarlo de la misma manera

      uploadPath = uploadDir + "\\" + fileName;
      //uploadPath = path.join(uploadDir, fileName);????

      // console.log(uploadPath);

      //Subimos el fichero
      sampleFile.mv(uploadPath, function (e) {
        if (e) {
          throw generateError("The file could not be sent", 400);
        }
        // console.log(chalk.green("File uploaded"));
      });
    }

    const id_services = await createService(
      title,
      request_body,
      req.userId,
      required_type,
      fileName
    );

    console.log(chalk.green("Service created"));
    res.send({
      status: "ok",
      message: `Services created with id ${id_services}`, //${id_services}
    });
  } catch (e) {
    next(e);
  }
};

const getServiceByIDController = async (req, res, next) => {
  try {
    //Obtenemos el id que le pasamos por params
    const { id } = req.params;

    //Obtenemos el servicio
    const service = await getServiceByID(id);

    //Lo mandamos a postman
    res.send({
      status: "ok",
      message: service,
    });
  } catch (e) {
    next(e);
  }
};

const getAllServicesController = async (req, res, next) => {
  try {
    // const services = await getAllServices();
    const services = await (!req.userId
      ? getAllServices()
      : getAllServices(req.userId));

    //Lo mandamos a postman
    res.send({
      status: "ok",
      message: services,
    });
  } catch (e) {
    next(e);
  }
};

const updateServiceStatusByIDController = async (req, res, next) => {
  try {
    const { id, status } = req.params; //Obtenemos el id del servicio y el estado

    //Comprobamos si  el estado que le hemos pasado es valido
    if (!Object.values(SERVICE_STATUS).includes(status.toUpperCase())) {
      throw generateError("Invalid status", 401);
    }

    /* dev */
    // console.log(
    //   SERVICES_VALUES[getKeyByValue(SERVICE_STATUS, status.toUpperCase())]
    // );
    // console.log(status);

    const service = await updateServiceStatus(
      id,
      SERVICES_VALUES[getKeyByValue(SERVICE_STATUS, status.toUpperCase())] //Obtenemos el valor que tiene la key done:1 o undone:2 segun el status que le pasemos en el endpoint
    );

    //Lo mandamos a postman
    res.send({
      status: "ok",
      message: service,
    });
  } catch (e) {
    next(e);
  }
};

const getServiceByTypeController = async (req, res, next) => {
  try {
    const { type } = req.params;

    const service = await getServiceByType(type);

    res.send({
      status: "ok",
      message: service,
    });
  } catch (e) {
    next(e);
  }
};

const commentsFileController = async (req, res, next) => {
  try {
    const { comments } = req.body;
    const { id } = req.params;

    //Comprobamos titulo
    if (!comments) {
      throw generateError("Comment is required", 400);
    }

    //Tratamos el fichero
    let fileName;
    let uploadPath;

    if (req.files && req.files.serviceFile) {
      let sampleFile = req.files.serviceFile;

      //Creamos el path
      const uploadDir = path.join(__dirname, "../requestfiles");

      //Creamos directorio si no existe
      await createPathIfNotExists(uploadDir);

      fileName = `${nanoid(24)}.${getExtensionFile(sampleFile.name)}`; //Obtenemos la extension del fichero para guardarlo de la misma manera

      uploadPath = uploadDir + "\\" + fileName;
      // uploadPath = path.join(uploadDir, fileName);????

      //Subimos el fichero
      sampleFile.mv(uploadPath, function (e) {
        if (e) {
          throw generateError("The file could not be sent", 400);
        }
        console.log("File uploaded");
      });
    }

    console.log(chalk.yellow(comments));
    console.log(chalk.yellow(uploadPath));
    console.log(chalk.yellow(id));
    console.log(chalk.yellow(req.userId));

    const id_comment = await createComment(comments, fileName, req.userId, id);

    console.log(chalk.green("Comment created"));
    res.send({
      status: "ok",
      message: `Comment created with id ${id_comment}`, //${id_comment}
    });
  } catch (e) {
    next(e);
  }
};

/* NOS SIRVE PARA DISTINGUIR UN ARCHIVO DE UN TEXTO */
const commentsFileController_deprecated = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha subido ningún archivo");
    }

    const file = req.files.serviceFile;

    //detecta el tipo de archivo
    const buffer = file.data;
    console.log(buffer);
    const fileInfo = await fileType.fromBuffer(buffer);

    // Comprueba si subimos un archivo o un texto
    if (fileInfo && fileInfo.mime.startsWith("text/")) {
      //si el archivo es un comentario de texto guardalo en la base de datos
      const comment = req.body.comment;
      res.send("Comentario guardado correctamente");
    } else {
      //si el archivo no es un comentario guardalo en el servidor

      const fileName = `${nanoid(24)}.${fileInfo.ext}`;
      const filePath = path.join(__dirname, "uploads", fileName);
      file.mv(filePath, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send("Archivo subido correctamente");
      });
    }

    const id_files = await createFile(requiredS_id, serviceFile);
    res.send({
      status: "ok",
      message: `Comentario creado con id ${id_files}`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  newServiceController,
  getServiceByIDController,
  getAllServicesController,
  updateServiceStatusByIDController,
  getServiceByTypeController,
  commentsFileController,
};
