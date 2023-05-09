const { createService } = require("../db/services");
const chalk = require("chalk");

const newServiceController = async (req, res, next) => {
  try {
    const { title, request_body, required_type } = req.body;
    
    const file_name = req.file;

    const id_services = await createService(
      title,
      request_body,
      req.userId,
      required_type
    );

    console.log("Ya hemos creado el servicio!");

    res.send({
      status: "ok",
      message: `Services created with id ${id_services}`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { newServiceController };
