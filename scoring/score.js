// src/scoring/score.js
const SEVERITY_SCORES = {
  HIGH: 80,
  MEDIUM: 50,
  LOW: 20
};

function scoreFindings(findings) {
  // Calculate score based on findings
  let totalScore = 0;
  for (const finding of findings) {
    totalScore += SEVERITY_SCORES[finding.severity] || 0;
  }
  
  return {
    total: totalScore,
    normalized: Math.min(100, totalScore),
    findingsCount: findings.length
  };
}

module.exports = { scoreFindings };
