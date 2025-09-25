module.exports.init = (db) => {
  db.run(`CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    hostId TEXT,
    teams TEXT,
    scores TEXT,
    history TEXT
  )`);
};
