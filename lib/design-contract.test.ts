import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const LEGACY_TOKEN_PATTERN =
  /brand-terracotta|brand-cream|brand-sand|brand-clay|brand-ink|bg-page-atmosphere/;

function walkFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkFiles(full, files);
    } else if (/\.(tsx?|css)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("design contract", () => {
  it("has no legacy brand tokens in app/ or components/", () => {
    const roots = [
      path.resolve(__dirname, "../app"),
      path.resolve(__dirname, "../components"),
    ];
    const offenders: string[] = [];

    for (const root of roots) {
      for (const file of walkFiles(root)) {
        const content = readFileSync(file, "utf8");
        if (LEGACY_TOKEN_PATTERN.test(content)) {
          offenders.push(path.relative(process.cwd(), file));
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
