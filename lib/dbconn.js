const dbFilePath = "./sqlite.db";
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const SQL = require('./dbquery.js');
let connection;

const db = {
  // If db file is created already, then loading the file and return the db 
  // Else creating a db file and a table and return the db
  conn: () => {
    console.log('conn() called 1', connection);
    if(!connection) {
      console.log('conn() called 2', connection);
      if (fs.existsSync(dbFilePath)) {
        console.log('conn() called 3', connection);
        connection = new sqlite3.Database(dbFilePath);
        console.log("Connection with SQLite has been established - Get a exist DB");
      } else {
        console.log('conn() called 4', connection);
        connection = new sqlite3.Database(dbFilePath, (error) => {
          if (error) {
            return console.error(error.message);
          }
          connection.exec(SQL.createTable);
        });
        console.log("Connection with SQLite has been established - New DB creation");
      }
    }
    console.log('conn() called 5', connection);
    return connection;
  },

  close: () => new Promise((resolve, reject) => {
    // close connection
    if(connection) {
      connection.close((err) => {
        if (err) {
          console.error(err.message);
          return reject(err);
        }
        console.log('db.close(): Close the database connection.');
        
        fs.unlink(dbFilePath, function(err){
          if(err) {
            console.log(err) 
            return reject(err);
          }
          else {
            console.log('db.close(): file deleted successfully.');
            connection = undefined;
            return resolve('succ');
          }
        }); 
      });  
    }
  })
}

module.exports = db;
