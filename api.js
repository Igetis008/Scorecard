const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = new (require('sqlite3').verbose()).Database('./quiz.db');

// Create quiz
router.post('/create', (req, res) => {
  const { title, teams } = req.body;
  db.run('INSERT INTO quizzes (title, teams, scores) VALUES (?, ?, ?)', [title, JSON.stringify(teams), JSON.stringify({})], function(err) {
    if (err) return res.status(500).json({ error: err });
    const token = jwt.sign({ quizId: this.lastID }, 'secret', { expiresIn: '1h' });
    res.json({ quizId: this.lastID, token });
  });
});

// Get quiz
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM quizzes WHERE id = ?', [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Quiz not found' });
    res.json(row);
  });
});

// More endpoints for team management, scoring, etc.

module.exports = router;
