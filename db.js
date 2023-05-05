"use strict";

const mysql = require("mysql2/promise");

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      /*       
//Para Coding Rooms:
      user: "admin",
      password: "Classroom", */

      //Local:
      user: "demo",
      password: "password",
      //

      timezone: "Z",
    });
  }
  return await pool.getConnection();
}

module.exports = getDB;
