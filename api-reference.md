
# API Reference

## POST /api/create
Create a new quiz session.

**Body**:
- title: String
- teams: Array of team names

**Returns**:
- quizId: String
- token: String (auth token)

## GET /api/:id
Fetch quiz information by ID.

**Returns** quiz data including scores and teams.

## POST /api/update-slide
Trigger slide update.

**Body**:
- platform: "powerpoint" | "googleSlides" | "canva"
- teamScores: Object with scores
- slideId: Presentation or file ID
- config: Font/color config

## Socket Events
- joinRoom
- updateScore
- scoreUpdate
