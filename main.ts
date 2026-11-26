// Texts From Your Future Self — make.fun bounty entry.
//
// One funny text message, sent back from the year 2041. The joke is two
// warnings in one text: the houseplant you just bought will outlive you,
// and the symptom you keep googling is nothing. The program is
// deterministic: every run writes the exact same entry, no randomness,
// no network, stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a single text message from the future self, kept well
// under the competition's 200-character gate so every word earns its place.
const ENTRY =
  "Hey, it's you from 2041. That houseplant you just bought? It outlives us. Water it twice a week — and stop googling your symptoms, the rash is just Tuesday.";

// The gate: entry.txt must hold 1 to 200 characters, and more than
// whitespace. Count code points so a multi-byte character counts once.
const MAX_CHARS = 200;
const length = [...ENTRY].length;
const isValid = length >= 1 && length <= MAX_CHARS && ENTRY.trim().length > 0;
if (!isValid) {
  throw new Error(
    `entry is ${length} characters, outside the 1-${MAX_CHARS} gate`,
  );
}

// The sealed scorer reads $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). No trailing newline in the file;
// stdout may print the entry followed by a newline.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
process.stdout.write(ENTRY + "\n");
