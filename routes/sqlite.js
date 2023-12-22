                                                                                                                                                                                                                                              const fs = require("fs");
const express = require('express');
const router = express.Router();
const db = require("../lib/dbconn");
const QUERY = require('../lib/dbquery.js');
const path = require('path');

// sqlite select function
router.get('/main', (req, res) => {
  tools.log('/main');
  res.redirect('/')

});

router.get('/init', (req, res) => {
  console.log('/init');
  
  initTable(res);
});

router.get('/insert', (req, res) => {
  tools.log('/insert');

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

router.get('/delete', (req, res) => {
  tools.log('/delete');

  deleteRow(res);
});

function initTable(res) {
  db.close().then((conn) => {
    console.log('yay:', conn);
    selectAllRows(res); 
  }).catch((e) => {
    console.error(e.message); // "oh, no!"
  })
}

function insertRow(res) {
  const [name, age] = ['sammy', 1];
  db.conn().then((conn) => {
    conn.run(
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
  }).catch((e) => {
    console.error(e.message); // "oh, no!"
  })
}

function selectAllRows(res) {
  db.conn().then((conn) => {
    conn.all(QUERY.select, [], (err, rows) => {
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
  
      console.log(`rows [${rows}]`, JSON.stringify(rows));
  
      res.render('sqlite',{data:rows});
    })
  }).catch((e) => {
    console.error(e.message); // "oh, no!"
  })
}

function selectFirstRow(res) {
  // first row only
  db.conn().then((conn) => {
    conn.get(QUERY.select, [], (err, row) => {
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
  }).catch((e) => {
    console.error(e.message); // "oh, no!"
  })
}

function deleteRow(res) {
  db.conn().then((conn) => {
    conn.run(
      QUERY.delete,
      (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log(`deleted a last row`);
  
        selectAllRows(res);
      }
    );    
  }).catch((e) => {
    console.error(e.message); // "oh, no!"
  })
}

module.exports = router;
