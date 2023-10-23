const QUERY = {
  createTable: `
    CREATE TABLE student
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name  VARCHAR(50) NOT NULL,
      age   INTEGER
    );
  `,
  dropTable: `
    DROP TABLE student;
  `,
  trunTable: `
  TRUNCATE TABLE student;
  `,  
  insert: `
    INSERT INTO student (name, age) VALUES (?, ?);
  `,
  select:`
    SELECT * FROM student;
  `,
  delete:`
    DELETE FROM student WHERE id = (SELECT max(id) from student);
  `  
};

module.exports = QUERY;