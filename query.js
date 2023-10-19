const QUERY = {
  createTable: `
    CREATE TABLE sharks
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name   VARCHAR(50) NOT NULL,
      color   VARCHAR(50) NOT NULL,
      weight INTEGER NOT NULL
    );
  `,
  insert: `
    INSERT INTO sharks (name, color, weight) VALUES (?, ?, ?);
  `,
  select:`
    SELECT * FROM sharks;
  `,
  delete:`
    DELETE FROM sharks WHERE id = (SELECT max(id) from sharks);
  `
};

module.exports = QUERY;