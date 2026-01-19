const path = require("path");
const fs = require("fs/promises");

async function scanBuckets() {
  const samplesDir = path.join(process.cwd(), "samples");
  const files = await fs.readdir(samplesDir);

  const jsonFiles = files.filter((f) => f.toLowerCase().endsWith(".json"));
  if (jsonFiles.length === 0) {
    throw new Error("No JSON files found in /samples");
  }

  const rawConfigs = [];
  for (const file of jsonFiles) {
    const filePath = path.join(samplesDir, file);
    const text = await fs.readFile(filePath, "utf8");

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error(`Invalid JSON in ${file}: ${e.message}`);
    }

    // allow file to contain one object or an array
    if (Array.isArray(parsed)) {
      parsed.forEach((x) => rawConfigs.push({ ...x, __source: file }));
    } else {
      rawConfigs.push({ ...parsed, __source: file });
    }
  }

  return rawConfigs;
}

module.exports = { scanBuckets };
