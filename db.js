"use strict";

const mysql = require("mysql2/promise");

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      user: "demo",
      password: "password",
      timezone: "Z",
    });
  }
  return await pool.getConnection();
}

module.exports = getDB;
