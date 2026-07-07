const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'src');
const cssFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.css')) cssFiles.push(full);
  }
}

walk(root);

const propPatterns = [
  /^\s*transition(?:-property|-duration|-timing-function|-delay)?\s*:/i,
  /^\s*animation(?:-name|-duration|-timing-function|-delay|-iteration-count|-direction|-fill-mode|-play-state)?\s*:/i,
  /^\s*scroll-behavior\s*:/i,
  /^\s*animation-delay\s*:/i,
  /^\s*animation-play-state\s*:/i,
  /^\s*@(?:-webkit-)?keyframes\b/i,
];

const changedFiles = [];

for (const file of cssFiles) {
  const original = fs.readFileSync(file, 'utf8');
  const lines = original.split(/\r?\n/);
  const result = [];
  let skip = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (skip) {
      braceDepth += (line.match(/{/g) || []).length;
      braceDepth -= (line.match(/}/g) || []).length;
      if (braceDepth <= 0) {
        skip = false;
      }
      continue;
    }

    const keyframesMatch = /^\s*@(?:-webkit-)?keyframes\b/i.test(trimmed);
    if (keyframesMatch) {
      skip = true;
      braceDepth = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (braceDepth <= 0) skip = false;
      continue;
    }

    const propMatch = propPatterns.some((pattern) => pattern.test(trimmed));
    if (propMatch) {
      // skip multi-line property definitions if needed
      if (!trimmed.includes(';')) {
        let j = i + 1;
        while (j < lines.length && !lines[j].includes(';')) j++;
        i = j;
      }
      continue;
    }

    result.push(line);
  }

  const cleaned = result.join('\n');
  if (cleaned !== original) {
    fs.writeFileSync(file, cleaned, 'utf8');
    changedFiles.push(path.relative(root, file));
  }
}

console.log('Cleaned files:', changedFiles.join(', '));
