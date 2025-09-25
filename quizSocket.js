module.exports.handle = (socket, io, db) => {
  socket.on('joinRoom', ({ roomId, isHost }) => {
    socket.join(roomId);
    socket.isHost = isHost;
    io.to(roomId).emit('connectionStatus', { connected: true });
  });

  socket.on('updateScore', ({ roomId, team, scoreChange }) => {
    if (!socket.isHost) return;
    // Update DB and emit
    db.get('SELECT scores, history FROM quizzes WHERE id = ?', [roomId], (err, row) => {
      if (err) return;
      let scores = JSON.parse(row.scores);
      let history = JSON.parse(row.history) || [];
      scores[team] = (scores[team] || 0) + scoreChange;
      history.push({ team, change: scoreChange, timestamp: Date.now() });
      db.run('UPDATE quizzes SET scores = ?, history = ? WHERE id = ?', [JSON.stringify(scores), JSON.stringify(history), roomId]);
      io.to(roomId).emit('scoreUpdate', scores);
    });
  });

  socket.on('disconnect', () => {
    // Auto-reconnect logic
  });

  // Handle up to 100+ connections with room management
};
