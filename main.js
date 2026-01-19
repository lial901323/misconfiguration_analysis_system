// src/main.js

// Import all required modules
const { scanBuckets } = require('./scanner/s3Scanner');
const { normalizeS3 } = require('./normalizer/normalizeS3');
const analyzer = require('./analysis/analyzer');
const { scoreFindings } = require('./scoring/score');
const { buildAlert, saveAlerts } = require('./alerts/alertService');

async function main() {
  console.log("[*] Starting scan pipeline...");

  // 1. Scan
  const rawConfigs = await scanBuckets();
  console.log(`[+] Scanned ${rawConfigs.length} buckets`);

  const alerts = [];

  for (const raw of rawConfigs) {
    // 2. Normalize
    const normalized = normalizeS3(raw);

    // 3. Analyze
    const findings = analyzer(normalized);
    if (!findings || findings.length === 0) continue;

    // 4. Score
    const scoreObj = scoreFindings(findings);

    // 5. Build alert
    const alert = buildAlert(
      normalized.bucketName,
      findings,
      scoreObj
    );

    alerts.push(alert);
  }

  // 6. Save
  saveAlerts(alerts);

  // 7. Print
  console.log(`\n[✓] Pipeline completed`);
  console.log(`[✓] ${alerts.length} alerts generated`);
}

main().catch(err => {
  console.error("[X] Pipeline failed:", err.message);
});