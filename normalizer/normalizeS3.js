// src/normalizer/normalizeS3.js
function normalizeS3(raw) {
  const grants = raw.ACL?.Grants || [];
  // Add the rest of your normalizeS3 function here
  return {
    bucketName: raw.Name || 'unknown',
    grants: grants,
    // ... other normalized properties
  };
}

module.exports = { normalizeS3 };
