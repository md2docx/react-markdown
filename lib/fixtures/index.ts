import fs from "fs";
import path from "path";

const fixturesDir = path.resolve(__dirname);

export const files = [
  "sample.md",
  "short.md",
  "medium.md",
  "long.md",
  "simple.md",
  "formatting.md",
  "tutorial.md",
  "gfm-complexity.md",
  "deeply-nested-lists.md",
  "site-content.md",
];

export const markdowns = files.map(file => fs.readFileSync(path.join(fixturesDir, file), "utf8"));
