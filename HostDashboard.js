import React from 'react';

const HostDashboard = ({ quizId, socket, scores }) => {
  const updateScore = (team, change) => {
    socket.emit('updateScore', { roomId: quizId, team, scoreChange: change });
  };

  return (
    <div>
      <h1>Host Dashboard</h1>
      {Object.keys(scores).map(team => (
        <div key={team}>
          {team}: {scores[team]}
          <button onClick={() => updateScore(team, 10)}>+10</button>
          <button onClick={() => updateScore(team, -10)}>-10</button>
        </div>
      ))}
      <SlideControl quizId={quizId} /> {/* Integration controls */}
    </div>
  );
};

export default HostDashboard;
