import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import HostDashboard from './components/HostDashboard';
import SpectatorView from './components/SpectatorView';
import QuizSetup from './components/QuizSetup';
import SlideControl from './components/SlideControl';

const socket = io('http://localhost:3001');

function App() {
  const [role, setRole] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [scores, setScores] = useState({});

  useEffect(() => {
    socket.on('scoreUpdate', setScores);
  }, []);

  // Conditional rendering for host/spectator/setup
  if (!role) return <QuizSetup setRole={setRole} setQuizId={setQuizId} />;
  if (role === 'host') return <HostDashboard quizId={quizId} socket={socket} scores={scores} />;
  return <SpectatorView quizId={quizId} socket={socket} scores={scores} />;
}

export default App;
