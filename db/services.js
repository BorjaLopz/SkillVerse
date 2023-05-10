const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");
const chalk = require("chalk");

//Crear servicio en la BBDD
const { SERVICES_VALUES } = require("../helpers");
const createService = async (
  title,
  request_body,
  user_id,
  required_type,
  file_name = "",
  hide = false,
  done = false
) => {
  let connection;

  try {
    connection = await getConnection();

    console.log(title);
    console.log(request_body);
    console.log(user_id);
    console.log(required_type);

    const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type, done, hide) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, request_body, user_id, file_name, required_type, done, hide]
    );

    /*const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type) VALUES (?, ?, ?, ?, ?)`, [title, request_body, user_id, file_name, required_type]
    );*/

    console.log(chalk.green("Service created"));

    return newService.insertId;
  } catch (e) {
    throw generateError(chalk.red(`error: ${e.message}`, 400));
  }
};

const getServiceByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun servicio con ese id", 400);
    }
    return result[0];
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

const getAllServices = async (user_id = -1) => {
  let connection;
  console.log(chalk.green(user_id))

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE user_id != ? AND done = ? ORDER BY creation_date ASC`,
      [user_id, 0]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun servicio", 404);
    }

    return result;
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

const updateServiceStatus = async (id, serviceValue) => {
  let connection;

  try {
    console.log(chalk.blue(id));
    console.log(chalk.blue(serviceValue));

    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun servicio", 404);
    }

    const [update] = await connection.query(
      `UPDATE requireds SET done = ? WHERE id = ?`,
      [serviceValue, id]
    );

    return update;

  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

module.exports = {
  createService,
  getServiceByID,
  getAllServices,
  updateServiceStatus,
};
