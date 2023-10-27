const dbFilePath = "./sqlite.db";
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const SQL = require('./dbquery.js');
let connection;

const db = {
  // If db file is created already, then loading the file and return the db 
  // Else creating a db file and a table and return the db
  conn: () => {
    console.log('conn() called 1');
    if(!connection) {
      console.log('conn() called 2');
      if (fs.existsSync(dbFilePath)) {
        console.log('conn() called 3');
        connection = new sqlite3.Database(dbFilePath);
        console.log("Connection with SQLite has been established - Get a exist DB");
      } else {
        console.log('conn() called 4');
        connection = new sqlite3.Database(dbFilePath, (error) => {
          if (error) {
            return console.error(error.message);
          }
          connection.exec(SQL.createTable);
        });
        console.log("Connection with SQLite has been established - New DB creation");
      }
    }
    console.log('conn() called 5');
    return connection;
  },

  // TODO
  // I'm not sure when to close the db.
  close: () => {
    if(!connection) {
      if (fs.existsSync(dbFilePath)) {
        connection = new sqlite3.Database(dbFilePath);
        console.log("Connection with SQLite has been established - Get a exist DB");
      } else {
        connection = new sqlite3.Database(dbFilePath, (error) => {
          if (error) {
            return console.error(error.message);
          }
          connection.exec(SQL.createTable);
        });
        console.log("Connection with SQLite has been established - New DB creation");
      }
    }

    // close connection
    connection.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });  
  }
}

module.exports = db;
