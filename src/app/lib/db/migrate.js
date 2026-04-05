import db from './connection.js';

// VERY IMPORTANT for SQLite
db.exec('PRAGMA foreign_keys = ON');

const migration = `
BEGIN;

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE,
  value TEXT
);

COMMIT;
`;

db.exec(migration);

console.log('✅ Migrations executed');

export default db;
