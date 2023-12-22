<<<<<<< HEAD
const dbFilePath = "./sqlite.db";

const express = require('express');
const router = express.Router();
const db = require("../lib/dbconn");
const tools = require("../lib/tools");
const QUERY = require('../query.js');
=======
                                                                                                                                                                                                                                              const fs = require("fs");
const express = require('express');
const router = express.Router();
const db = require("../lib/dbconn");
const QUERY = require('../lib/dbquery.js');
const path = require('path');
>>>>>>> e094f41f4c0e39005845499f1bcae1eacc326661

// sqlite select function
router.get('/main', (req, res) => {
  tools.log('/main');
  res.redirect('/')

});

router.get('/init', (req, res) => {
<<<<<<< HEAD
  tools.log('/init');

  if (fs.existsSync(dbFilePath)) {
    db.trunTable();
  }

  res.json({
    success: 'init',
  });  
=======
  console.log('/init');
  
  initTable(res);
>>>>>>> e094f41f4c0e39005845499f1bcae1eacc326661
});

router.get('/insert', (req, res) => {
  tools.log('/insert');

  insertRow(res);
});

<<<<<<< HEAD

router.get('/select', (req, res) => {
  tools.log('/select');
=======
router.get('/selectall', (req, res) => {
  console.log('/selectall');
>>>>>>> e094f41f4c0e39005845499f1bcae1eacc326661

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

<<<<<<< HEAD
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
=======
function initTable(res) {
  db.close().then((conn) => {
    console.log('yay:', conn);
    selectAllRows(res); 
  }).catch((e) => {
    console.error(e.message); // "oh, no!"
  })
>>>>>>> e094f41f4c0e39005845499f1bcae1eacc326661
}

function insertRow(res) {
  const [name, age] = ['sammy', 1];
<<<<<<< HEAD
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
=======
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
>>>>>>> e094f41f4c0e39005845499f1bcae1eacc326661
}

function selectFirstRow(res) {
  // first row only
<<<<<<< HEAD
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
=======
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
>>>>>>> e094f41f4c0e39005845499f1bcae1eacc326661
}

module.exports = router;
