                                                                                                                                                                                                                                              const fs = require("fs");
const dbFilePath = "./sqlite.db";

const express = require('express');
const router = express.Router();
const db = require("../lib/dbconn");
const QUERY = require('../query.js');
const path = require('path');



// sqlite select function
// all, get, each
// all(): Querying all rows
// get(): Query the first row in the result set
// each(): Query rows with each

router.get('/main', (req, res) => {
  console.log('/main');
  res.redirect('/')

});


router.get('/init', (req, res) => {
  console.log('/init');

  if (fs.existsSync(dbFilePath)) {
    db.trunTable();
  }

  res.json({
    success: 'init',
  });  
});


router.get('/insert', (req, res) => {
  console.log('/insert');

  insertRow(res);
});


router.get('/select', (req, res) => {
  console.log('/select');

  selectAllRows(res);
});

router.get('/delete', (req, res) => {
  console.log('/delete');

  deleteRow(res);
});

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

    res.render('sqlite',{data:rows});
  });
}

function selectFirstRow() {
  // first row only
  db.conn().get(QUERY.select, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
    ? console.log(row)
    : console.log(`No result`);
  });
}

function selectEachRows() {
  db.conn().each(QUERY.select, (err, row) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(row);
  });
}


module.exports = router;
