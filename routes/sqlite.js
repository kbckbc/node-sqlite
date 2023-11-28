const dbFilePath = "./sqlite.db";

const express = require('express');
const router = express.Router();
const db = require("../lib/dbconn");
const tools = require("../lib/tools");
const QUERY = require('../query.js');

// sqlite select function
// all, get, each
// all(): Querying all rows
// get(): Query the first row in the result set
// each(): Query rows with each

router.get('/main', (req, res) => {
  tools.log('/main');
  res.redirect('/')

});


router.get('/init', (req, res) => {
  tools.log('/init');

  if (fs.existsSync(dbFilePath)) {
    db.trunTable();
  }

  res.json({
    success: 'init',
  });  
});


router.get('/insert', (req, res) => {
  tools.log('/insert');

  insertRow(res);
});


router.get('/select', (req, res) => {
  tools.log('/select');

  selectAllRows(res);
});

router.get('/delete', (req, res) => {
  tools.log('/delete');

  deleteRow(res);
});

function deleteRow(res) {
  db.conn().run(
    QUERY.delete,
    (err) => {
      if (err) {
        tools.log(err.message);
      }
      tools.log(`deleted a last row`);

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
        tools.error(err.message);
      }
      tools.log(`Inserted a row with the ID: ${this.lastID}`);

      selectAllRows(res);
    }
  );
}

function selectAllRows(res) {
  db.conn().all(QUERY.select, [], (err, rows) => {
    if (err) {
      throw new Error(err.message);
    }
    tools.log(`rows ${rows}`)
    if( rows.length == 0 ) {
      tools.log(`empty`);
    }
    else {
      rows.forEach((row) => {
        tools.log(`${row.name}: ${row.age}`);
      });
    }

    res.render('sqlite',{data:rows});
  });
}

function selectFirstRow() {
  // first row only
  db.conn().get(QUERY.select, [], (err, row) => {
    if (err) {
      return tools.log(err.message);
    }
    return row
    ? tools.log(row)
    : tools.log(`No result`);
  });
}

function selectEachRows() {
  db.conn().each(QUERY.select, (err, row) => {
    if (err) {
      throw new Error(err.message);
    }
    tools.log(row);
  });
}


module.exports = router;
