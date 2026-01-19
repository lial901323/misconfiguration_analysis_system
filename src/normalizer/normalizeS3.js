function toBool(v, fallback = false) {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true", "1", "yes"].includes(s)) return true;
    if (["false", "0", "no"].includes(s)) return false;
  }
  return fallback;
}

function normalizeS3(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("normalizeS3 expects an object");
  }

  const bucketName = raw.bucketName || raw.Bucket || raw.name || raw.bucket || raw.__source?.replace(/\.json$/i, "") || "unknown-bucket";

  const pab = raw.publicAccessBlock || raw.PublicAccessBlockConfiguration || {};
  const publicAccessBlock = {
    BlockPublicAcls: toBool(pab.BlockPublicAcls, false),
    IgnorePublicAcls: toBool(pab.IgnorePublicAcls, false),
    BlockPublicPolicy: toBool(pab.BlockPublicPolicy, false),
    RestrictPublicBuckets: toBool(pab.RestrictPublicBuckets, false),
  };

  const enc = raw.encryption || {};
  const encryption = {
    enabled: toBool(enc.enabled, false),
    type: enc.type ?? null,
  };

  const aclRaw = raw.acl || {};
  const acl = {
    isPublicRead: toBool(aclRaw.isPublicRead, false),
    isPublicWrite: toBool(aclRaw.isPublicWrite, false),
    grants: Array.isArray(aclRaw.grants) ? aclRaw.grants : [],
  };

  let policy = raw.policy ?? raw.Policy ?? null;
  if (typeof policy === "string") {
    try {
      policy = JSON.parse(policy);
    } catch {
      policy = null;
    }
  }
  if (policy && typeof policy !== "object") policy = null;

  return { bucketName, publicAccessBlock, encryption, acl, policy };
}

module.exports = { normalizeS3 };
