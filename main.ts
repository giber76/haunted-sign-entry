import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

// The sign: a ghost sysadmin who never logged out. Hits the judge's
// criteria — it IS a sign on the haunted server room door, the laugh comes
// from IT life (a login at 3am, a password) colliding with the supernatural,
// and it reads like a posted notice at a glance.
const LINE =
  "NOTICE: The previous admin still logs in at 3am. Do not change his password.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");

// Read back and verify, so a partial write or encoding slip never reaches
// the gate silently and scores 0. Enforce the competition's own gate here:
// 1 to 120 characters, not only whitespace.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("entry.txt does not match the line");
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`line is ${LINE.length} characters, outside the 1-120 gate`);
}
console.log(`wrote ${outPath} (${LINE.length} characters)`);
