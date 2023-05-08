const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");

const createService = async (
  title,
  request_body,
  user_id,
  required_type,
  file_name = ""
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
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type) VALUES (?, ?, ?, ?, ?)`,
      [title, request_body, user_id, file_name, required_type]
    );

    /*const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type) VALUES (?, ?, ?, ?, ?)`, [title, request_body, user_id, file_name, required_type]
    );*/

    console.log("Ya lo hemos creado!");

    return newService.insertId;
  } catch (e) {
    throw generateError(`error: ${e.message}`, 400);
  }
};

module.exports = { createService };
