const { createService } = require("../db/services");
const chalk = require("chalk");

//Controller para crear nuevo servicio en la BBDD
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

    console.log(chalk.green("Service created"));

    res.send({
      status: "ok",
      message: `Services created with id ${id_services}`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { newServiceController };
