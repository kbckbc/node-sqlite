const express = require('express');
const router = express.Router();
const db = require("../dbconn");
const QUERY = require('../query.js');


// sqlite select function
// all, get, each
// all(): Querying all rows
// get(): Query the first row in the result set
// each(): Query rows with each

router.get('/insert', (req, res) => {
  console.log('/insert');

  insertRow();
  selectAllRows();

  res.json({
    success: 'inserted',
  });  
});


router.get('/select', (req, res) => {
  console.log('/select');

  selectAllRows();
  selectFirstRow();
  selectEachRows();

  res.json({
    success: 'selected',
  });

});

router.get('/delete', (req, res) => {
  console.log('/delete');

  deleteRow();
  selectAllRows();  

  res.json({
    success: 'deleted',
  });

});

function deleteRow() {
  db.run(
    QUERY.delete,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`deleted a last row`);
    }
  );
}

function insertRow() {
  const [name, color, weight] = ['sammy','blue',1];
  db.run(
    QUERY.insert,
    [name, color, weight],
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

function selectAllRows() {
  db.all(QUERY.select, [], (err, rows) => {
    if (err) {
      throw new Error(err.message);
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function selectFirstRow() {
  // first row only
  db.get(QUERY.select, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
    ? console.log(row)
    : console.log(`No result`);
  });
}

function selectEachRows() {
  db.each(QUERY.select, (err, row) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(row);
  });
}


module.exports = router;
