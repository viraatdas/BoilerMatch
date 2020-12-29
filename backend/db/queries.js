/**
 * queries.js
 *
 * Connects to the PostgreSQL db and defines query functions
 * to be used with the routers
 */

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

require("dotenv").config({path: "../env"});
const fs = require('fs');

const Pool = require("pg").Pool;

// Create pool with database information
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Check if connection was established correctly
pool
  .connect()
  .then(() =>{
    console.log("Connection established successfully");
  })
  .catch(err => {
    console.error("Unable to connect to database: ", err);
    throw err;
  });

// Initial database setup 
// Run database.sql to create tables if they don't exist
var sql_string = fs.readFileSync('./db/database.sql', 'utf8');

pool.query(sql_string, (error, _) => {
  if (error) {
    throw error
  }
});



/* Example query functions */

// They don't need to be functions of type (req, res), we can
// make them return just the data from the db, and process that
// in the router functions in routes/

/*
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};
*/

//module.exports = {/* all query functions */ };
