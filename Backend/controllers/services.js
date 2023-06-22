const { nanoid } = require("nanoid");
const chalk = require("chalk");
const path = require("path");
const {
  createService,
  getServiceByID,
  getAllServices,
  updateServiceStatus,
  getServiceByType,
  createComment,
  deleteComment,
  getAllCommentsFromService,
  deleteService,
  deleteAllCommentsFromService,
} = require("../db/services");
const {
  generateError,
  createPathIfNotExists,
  SERVICE_STATUS,
  SERVICES_VALUES,
  getKeyByValue,
  getExtensionFile,
  checkIfExtensionIsAllowed,
  ALLOWED_EXTENSIONS,
  uploadFilesInFolder,
} = require("../helpers");

const newServiceController = async (req, res, next) => {
  try {
    const { title, request_body, service_type } = req.body;

    //Comprobar título
    if (!title || title.lenght > 50 || title.lenght < 15) {
      throw generateError(
        "El título debe tener más de 15 caracteres y menos de 50",
        400
      );
    }

    //Comprobar request_body
    if (
      !request_body ||
      request_body.lenght > 500 ||
      request_body.lenght < 15
    ) {
      throw generateError(
        "La descripción debe tener más de 15 caracteres y menos de 500 ",
        400
      );
    }

    //Comprobar service_type
    if (!service_type || service_type.lenght > 20) {
      throw generateError(
        "El tipo de servicio requerido debe tener menos de 20 caracteres",
        400
      );
    }

    // //Tratar el fichero
    // let fileName;
    // let uploadPath;

    // if (req.files?.file) {
    //   let sampleFile = req.files.file;

    //   //Crear el path
    //   const uploadDir = path.join(__dirname, "../uploads");

    //   //Crear directorio si no existe
    //   await createPathIfNotExists(uploadDir);

    //   //Comprobar si la extension es valida.
    //   console.log(chalk.red(getExtensionFile(sampleFile.name)));
    //   if (!checkIfExtensionIsAllowed(getExtensionFile(sampleFile.name))) {
    //     throw generateError(
    //       `Formato no válido. Tipos de formatos permitidos: ${ALLOWED_EXTENSIONS}`,
    //       415
    //     );
    //   }

    //   //Obtener la extensión del fichero para guardarlo de la misma manera
    //   fileName = `${nanoid(24)}.${getExtensionFile(sampleFile.name)}`;

    //   uploadPath = uploadDir + "\\" + fileName;

    //   //Subir el fichero
    //   sampleFile.mv(uploadPath, function (e) {
    //     if (e) {
    //       throw generateError("No se pudo enviar el archivo", 400);
    //     }
    //   });
    // }
    // else {
    //   console.log("req.files es ", req.files?.file)
    // }

    const fileName = await uploadFilesInFolder(req, "file", "service");
    console.log("fileName: ", fileName);

    const id_services = await createService(
      title,
      request_body,
      req.userId,
      service_type,
      fileName
    );

    console.log(chalk.green("Servicio creado"));
    res.send({
      status: "ok",
      message: `Services created with id ${id_services}`,
    });
  } catch (e) {
    next(e);
  }
};

const getServiceByIDController = async (req, res, next) => {
  try {
    //Obtener el ID que le pasamos por params
    const { id } = req.params;

    //Obtener el servicio
    const service = await getServiceByID(id);
    // console.log(service);

    //Enviarlo a postman
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
    const services = await (!req.userId
      ? getAllServices()
      : getAllServices(req.userId));

    //Enviar a postman
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
    //Obtener el ID del servicio y del estado
    const { id, status } = req.params;
    const admin = req.admin;

    //Comprobar si el estado es válido
    if (!Object.values(SERVICE_STATUS).includes(status.toUpperCase())) {
      throw generateError("Invalid status", 401);
    }

    //Comprobamos si el servicio existe en la base de datos
    const serviceRequested = await getServiceByID(id);

    //Comprobamos si somos admin o somos el propietario del servicio
    if (!admin && id !== serviceRequested.user_id) {
      throw generateError(
        "No puedes cambiar el estado del servicio de otros usuarios.",
        401
      );
    }

    //Obtener el valor de la key (done: 1 o undone: 2) según el status que se le pase al endpoint
    const service = await updateServiceStatus(
      id,
      SERVICES_VALUES[getKeyByValue(SERVICE_STATUS, status.toUpperCase())]
    );

    //Enviarlo a postman
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
    const id = req.userId;

    const service = await getServiceByType(type, id);

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

    //Comprobamos si el servicio existe en la base de datos
    await getServiceByID(id);

    //Comprobar título
    if (!comments) {
      throw generateError("Debes introducir un comentario", 400);
    }

    //Tratar el fichero
    let fileName;
    let uploadPath;

    if (req.files && req.files.serviceFile) {
      let sampleFile = req.files.serviceFile;

      //Creamos el path
      const uploadDir = path.join(__dirname, "../requestfiles");

      //Crear directorio si no existe
      await createPathIfNotExists(uploadDir);

      //Obtener la extensión del fichero para guardarlo de la misma forma
      fileName = `${nanoid(24)}.${getExtensionFile(sampleFile.name)}`;

      uploadPath = uploadDir + "\\" + fileName;

      //Subir el fichero
      sampleFile.mv(uploadPath, function (e) {
        if (e) {
          throw generateError("No se pudo enviar el archivo", 400);
        }
        console.log(chalk.green("Archivo subido"));
      });
    }

    const id_comment = await createComment(comments, fileName, req.userId, id);

    // console.log(chalk.green("Comentario creado"));
    res.send({
      status: "ok",
      message: `Comment created with id ${id_comment}`,
    });
  } catch (e) {
    next(e);
  }
};

// DISTINGUIR UN ARCHIVO DE UN TEXTO //
const commentsFileController_deprecated = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha subido ningún archivo");
    }

    const file = req.files.serviceFile;

    //Detectar el tipo de archivo
    const buffer = file.data;
    console.log(buffer);
    const fileInfo = await fileType.fromBuffer(buffer);

    //Comprobar si subimos un archivo o un texto
    if (fileInfo && fileInfo.mime.startsWith("text/")) {
      //Si el archivo es un comentario de texto se guarda en la base de datos
      const comment = req.body.comment;
      res.send("Comentario guardado");
    } else {
      //Si el archivo no es un comentario, se guarda en el servidor

      const fileName = `${nanoid(24)}.${fileInfo.ext}`;
      const filePath = path.join(__dirname, "uploads", fileName);
      file.mv(filePath, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send("Archivo subido");
      });
    }

    const id_files = await createFile(services_id, serviceFile);
    res.send({
      status: "ok",
      message: `Comment created with id ${id_files}`,
    });
  } catch (e) {
    next(e);
  }
};

const deleteCommentsController = async (req, res, next) => {
  try {
    const { id_s, id_c } = req.params;
    const id = req.userId;
    const admin = req.admin;

    //Comprobamos si el servicio existe
    const service = await getServiceByID(id_s);
    let comments;

    //Si existe el servicio, comprobamos si el servicio tiene comentarios
    if (service) {
      comments = await getAllCommentsFromService(id_s);

      const firstCommentOfUserInService = comments.findIndex(
        (comment) => id === comment.user_id
      );

      //Si el servicio tiene comentarios, comprobamos si el usuario es el autor del servicio o admin
      if (
        admin ||
        service.user_id === id ||
        firstCommentOfUserInService !== -1
      ) {
        await deleteComment(id_s, id_c);
        return res.send({
          status: "ok",
          message: "Comment deleted",
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "You don't have permission to delete this comment.",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// Función para verificar si el usuario es propietario del comment
const userCommentOwner = async (id, id_c) => {
  try {
    const comment = await comment.findById(id_c);

    if (!comment) {
      return false;
    }
    return comment.owner === id;
  } catch (error) {
    throw error;
  }
};

const getAllCommentsFromServiceController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await getAllCommentsFromService(id);

    res.send({
      status: "ok",
      message: comments,
    });
  } catch (e) {
    next(e);
  }
};

const deleteServiceController = async (req, res, next) => {
  try {
    const id_service = +req.params.id;
    const id = req.userId;
    const admin = req.admin;

    let message;
    let serviceOwnerId;
    const service = await getServiceByID(id_service);

    if (service) {
      serviceOwnerId = service.user_id;
    }

    if (admin || serviceOwnerId === id) {
      //Tenemos que comprobar si tiene comentarios para poder borrarlos primero
      await deleteAllCommentsFromService(id_service);

      message = await deleteService(id_service);
    } else {
      throw generateError(
        "No puedes borrar los servicios creados por otro usuario",
        401
      );
    }

    return res.send({
      status: "ok",
      message: message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newServiceController,
  getServiceByIDController,
  getAllServicesController,
  updateServiceStatusByIDController,
  getServiceByTypeController,
  commentsFileController,
  deleteCommentsController,
  getAllCommentsFromServiceController,
  deleteServiceController,
};
