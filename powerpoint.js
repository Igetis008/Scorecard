const { Presentation, Slide, Text } = require('node-pptx');

async function updateScoresInSlide(teamScores, filePath, config) {
  const pptx = new Presentation();
  await pptx.load(filePath);
  const slide = pptx.getSlide(1); // Assume score slide is #1
  Object.keys(teamScores).forEach((team, index) => {
    const placeholder = slide.getShape(`score${index + 1}`); // Designated placeholders
    if (placeholder) {
      placeholder.text(teamScores[team].toString(), { fontFace: config.font, color: config.color });
    }
  });
  await pptx.save(filePath); // Overwrite or save new
  return { updated: true };
}

module.exports = { updateScoresInSlide };
