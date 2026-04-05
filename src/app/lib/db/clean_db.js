import db from './connection.js';

db.exec('PRAGMA foreign_keys = OFF');

db.exec(`
  DROP TABLE IF EXISTS settings;
`);

db.exec('PRAGMA foreign_keys = ON');

console.log('🧹 Database cleaned');
process.exit(0);
