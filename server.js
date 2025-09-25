const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Import modules
const dbConfig = require('./config/db');
const quizRoutes = require('./routes/api');
const quizSocket = require('./sockets/quizSocket');
const authUtils = require('./utils/auth');
const powerpointIntegration = require('./integrations/powerpoint');
const googleSlidesIntegration = require('./integrations/googleSlides');
const canvaIntegration = require('./integrations/canva');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Database setup (SQLite, with MongoDB option)
const db = new sqlite3.Database('./quiz.db');
dbConfig.init(db); // Creates tables if not exist

// Authentication middleware
app.use('/api', authUtils.verifyToken);

// Routes
app.use('/api', quizRoutes);

// Socket.io setup
io.on('connection', (socket) => quizSocket.handle(socket, io, db));

// Slide update trigger (example endpoint)
app.post('/api/update-slide', async (req, res) => {
  const { platform, teamScores, slideId, config } = req.body;
  try {
    let result;
    switch (platform) {
      case 'powerpoint':
        result = await powerpointIntegration.updateScoresInSlide(teamScores, slideId, config);
        break;
      case 'googleSlides':
        result = await googleSlidesIntegration.updateScoresInSlide(teamScores, slideId, config);
        break;
      case 'canva':
        result = await canvaIntegration.updateScoresInSlide(teamScores, slideId, config);
        break;
      default:
        throw new Error('Unsupported platform');
    }
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
