const { google } = require('googleapis');

async function updateScoresInSlide(teamScores, presentationId, config) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/presentations'],
  });
  const slides = google.slides({ version: 'v1', auth });
  const requests = [];
  Object.keys(teamScores).forEach((team) => {
    requests.push({
      replaceAllText: {
        containsText: { text: `{${team}}` }, // Placeholders like {teamA}
        replaceText: teamScores[team].toString(),
      },
    });
  });
  await slides.presentations.batchUpdate({
    presentationId,
    resource: { requests },
  });
  // Apply font/color via additional requests if needed
  return { updated: true };
}

module.exports = { updateScoresInSlide };
