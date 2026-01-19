// src/analysis/analyzer.js
const rulePublicAccess = require("./rules/publicAccess");
const ruleBlockPublicAccess = require("./rules/blockPublicAccess");
const ruleEncryption = require("./rules/encryption");
const rulePolicyRisk = require("./rules/policyRisk");

function analyzer(normalized) {
  const findings = [];
  
  // Check each rule and add findings
  // Example:
  // findings.push(...rulePublicAccess.check(normalized));
  // findings.push(...ruleBlockPublicAccess.check(normalized));
  // etc.
  
  return findings;
}

module.exports = analyzer;
