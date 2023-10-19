const dbFilePath = "./dbfile/sqlite.db";
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const SQL = require('./query.js');

// TODO
// I'm not sure when to close the db.
function closeDb(db) {
  db.close();
}

// If db file is created already, then loading the file and return the db 
// Else creating a db file and a table and return the db
function getDb() {
  let db;
  if (fs.existsSync(dbFilePath)) {
    db = new sqlite3.Database(dbFilePath);
    console.log("Connection with SQLite has been established - Get a exist DB");
  } else {
    db = new sqlite3.Database(dbFilePath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established - New DB creation");
  }
  return db;
}

function createTable(db) {
  db.exec(SQL.createTable);
}

module.exports = getDb();
