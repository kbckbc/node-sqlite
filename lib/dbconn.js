const dbFilePath = "./sqlite.db";
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const SQL = require('./dbquery.js');
let connection = undefined;

let db = {}

db.conn = function () {
  // If db file is created already, then loading the file and return the db 
  // Else creating a db file and a table and return the db
  if(connection == undefined) {
    if (fs.existsSync(dbFilePath)) {
      connection = new sqlite3.Database(dbFilePath, (err) => {
        if(err) {
          return new Error()
        }
      });
      console.log(`Connection with SQLite has been established - Get a exist DB, connection [${connection}]`);
    } else {
      connection = new sqlite3.Database(dbFilePath, (err) => {
        if (err) {
          return new Error()
        }
      });

      // db creation
      connection.exec(SQL.createTable);
      
      console.log(`Connection with SQLite has been established - New DB creation, connection [${connection}]`);
    }
  }

  return connection
}

  // close db file and delete it
db.close = function () { 
  return new Promise((resolve, reject) => {
    // close connection
    connection = this.conn();
    if(connection) {
      connection.close((err) => {
        if (err) {
          return reject(err);
        }
        console.log('db.close(): Close the database connection.');
        
        fs.unlink(dbFilePath, function(err){
          if(err) {
            return reject(err);
          }
          else {
            console.log('db.close(): file deleted successfully.');
            connection = undefined;
            return resolve('succ 1');
          }
        }); 
      });  
    }
    else {
      return resolve('succ 2');
    }
  })
}

module.exports = db;
