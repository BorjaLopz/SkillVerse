const { nanoid } = require("nanoid");
const {
  createService,
  getServiceByID,
  getAllServices,
  updateServiceStatus,
  getServiceByType,
} = require("../db/services");
const {
  generateError,
  createPathIfNotExists,
  SERVICE_STATUS,
  SERVICES_VALUES,
  getKeyByValue,
} = require("../helpers");
// const {  } = require("../helpers")
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

      console.log(sampleFile);

      fileName = `${nanoid(24)}.${sampleFile.name.split(".").slice(-1)}`; //Obtenemos la extension del fichero para guardarlo de la misma manera

      uploadPath = uploadDir + "\\" + fileName;

      console.log(uploadPath);

      //Subimos el fichero
      sampleFile.mv(uploadPath, function (e) {
        if (e) {
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
      throw generateError("Estado no valido", 401);
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
    console.log(req.params)
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

module.exports = {
  newServiceController,
  getServiceByIDController,
  getAllServicesController,
  updateServiceStatusByIDController,
  getServiceByTypeController,
};
