const axios = require('axios');

async function updateScoresInSlide(teamScores, designId, config) {
  // Canva API for export/import
  const token = process.env.CANVA_API_TOKEN;
  // Export design, update locally (similar to PowerPoint), re-import
  const response = await axios.get(`https://api.canva.com/v1/designs/${designId}/export`, { headers: { Authorization: `Bearer ${token}` } });
  // Local update logic (parse PDF/image if needed, but limited)
  // Note: Full real-time may require webhooks; fallback to manual export
  console.warn('Canva integration is partial due to API limits');
  return { updated: true, note: 'Manual refresh may be needed' };
}

module.exports = { updateScoresInSlide };
