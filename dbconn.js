const dbFilePath = "./sqlite.db";
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const SQL = require('./query.js');

const db = {
  // If db file is created already, then loading the file and return the db 
  // Else creating a db file and a table and return the db
  conn: function () {
    let db;
    if (fs.existsSync(dbFilePath)) {
      db = new sqlite3.Database(dbFilePath);
      console.log("Connection with SQLite has been established - Get a exist DB");
    } else {
      db = new sqlite3.Database(dbFilePath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        db.exec(SQL.createTable);
      });
      console.log("Connection with SQLite has been established - New DB creation");
    }
    return db;
  },

  dropTable: function () {
    this.conn().exec(SQL.dropTable);
  },

  trunTable: function () {
    this.conn().exec(SQL.trunTable);
  },

  // TODO
  // I'm not sure when to close the db.
  close: function () {
    this.conn().close();
  }
}

module.exports = db;
