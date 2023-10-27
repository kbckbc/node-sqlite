                                                                                                                                                                                                                                              const fs = require("fs");
const dbFilePath = "./sqlite.db";

const express = require('express');
const router = express.Router();
const db = require("../lib/dbconn");
const QUERY = require('../lib/dbquery.js');
const path = require('path');

// sqlite select function
router.get('/main', (req, res) => {
  console.log('/main');
  res.redirect('/')

});

router.get('/init', (req, res) => {
  console.log('/init');

  initTable(res);
});

router.get('/insert', (req, res) => {
  console.log('/insert');

  insertRow(res);
});

router.get('/selectall', (req, res) => {
  console.log('/selectall');

  selectAllRows(res);
});

router.get('/selectfirst', (req, res) => {
  console.log('/selectfirst');

  selectFirstRow(res);
});

router.get('/selecteach', (req, res) => {
  console.log('/selecteach');

  selectEachRows(res);
});

router.get('/delete', (req, res) => {
  console.log('/delete');

  deleteRow(res);
});

function initTable(res) {
  db.conn().exec(QUERY.dropTable);
  db.conn().exec(QUERY.createTable);
  selectAllRows(res);
}

function insertRow(res) {
  const [name, age] = ['sammy', 1];
  db.conn().run(
    QUERY.insert,
    [name, age],
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);

      selectAllRows(res);
    }
  );
}

function selectAllRows(res) {
  db.conn().all(QUERY.select, [], (err, rows) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(`rows ${rows}`)
    if( rows.length == 0 ) {
      console.log(`empty`);
    }
    else {
      rows.forEach((row) => {
        console.log(`${row.name}: ${row.age}`);
      });
    }

    console.log(`rows ${rows}`, JSON.stringify(rows));

    res.render('sqlite',{data:rows});
  });
}

function selectFirstRow(res) {
  // first row only
  db.conn().get(QUERY.select, [], (err, row) => {
    if (err) {
      throw new Error(err.message);
    }

    if(row != undefined) {
      res.render('sqlite',{data:[row]});
    }
    else {
      res.render('sqlite',{data:[]});
    }
  });
}

function deleteRow(res) {
  db.conn().run(
    QUERY.delete,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`deleted a last row`);

      selectAllRows(res);
    }
  );
}

module.exports = router;
