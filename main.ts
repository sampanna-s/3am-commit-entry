import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MESSAGE =
  "fix(prod): I was 97% sure this deploy was safe. I have now checked, and I was hallucinating.";

// Gate mirror: the sealed scorer requires UTF-8 text of 1-200 chars,
// not only whitespace.
if (MESSAGE.length < 1 || MESSAGE.length > 200 || MESSAGE.trim().length === 0) {
  throw new Error(`entry fails the gate: ${MESSAGE.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, MESSAGE, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
