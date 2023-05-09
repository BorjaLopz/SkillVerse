const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");

const createService = async (
  title,
  request_body,
  user_id,
  required_type,
  file_name = "",
  hide,
  done,
) => {
  let connection;

  try {
    connection = await getConnection();

    console.log(chalk.green(title));
    console.log(chalk.yellow(request_body));
    console.log(chalk.yellow(user_id));
    console.log(chalk.yellow(required_type));

    const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type, hide) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, request_body, user_id, file_name, required_type, hide]
    );

    /*const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type) VALUES (?, ?, ?, ?, ?)`, [title, request_body, user_id, file_name, required_type]
    );*/

    console.log(chalk.green("Ya lo hemos creado!"));

    return newService.insertId;
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

module.exports = { createService };
