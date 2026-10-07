import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// One process, one SQLite database. No Redis or separate database service.
export class Store {
  constructor(filename) {
    if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(filename);
    this.db.exec(`PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS records (
        kind TEXT NOT NULL, id TEXT NOT NULL, value TEXT NOT NULL,
        PRIMARY KEY(kind, id));`);
  }
  get(kind, id) {
    const row = this.db.prepare('SELECT value FROM records WHERE kind=? AND id=?').get(kind, id);
    return row ? JSON.parse(row.value) : undefined;
  }
  put(kind, id, value) {
    this.db.prepare('INSERT OR REPLACE INTO records VALUES (?, ?, ?)').run(kind, id, JSON.stringify(value));
    return value;
  }
  remove(kind, id) {
    this.db.prepare('DELETE FROM records WHERE kind=? AND id=?').run(kind, id);
  }
  list(kind) {
    return this.db.prepare('SELECT id, value FROM records WHERE kind=? ORDER BY rowid DESC').all(kind)
      .map(row => ({ id: row.id, ...JSON.parse(row.value) }));
  }
  close() { this.db.close(); }
}
