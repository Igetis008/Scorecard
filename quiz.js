module.exports = (db) => {
  db.run(`CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    hostId TEXT,
    teams JSON,
    scores JSON,
    history JSON
  )`);
  // MongoDB option: Use mongoose if switched
};
