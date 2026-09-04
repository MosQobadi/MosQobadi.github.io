/**
 * Regenerate the work-sample thumbnails in src/assets/work/.
 *
 *   pnpm build && pnpm preview --port 4322 &   # in one terminal
 *   node scripts/thumbnails.mjs                # in another
 *
 * Shoots each page with headless Chrome at 2x and downsamples to 1200x750, so
 * the cards stay sharp on a phone. Chrome is used directly rather than
 * Playwright — it's already on the machine, and this runs about twice a year.
 *
 * Pass names to do a subset:  node scripts/thumbnails.mjs shop plumber
 */

import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);

const PREVIEW = process.env.PREVIEW_ORIGIN ?? "http://127.0.0.1:4322";
const WIDTH = 1200;
const HEIGHT = 750;
const SCALE = 2;

/**
 * `url` may be absolute (an external site) or a path on the preview server.
 * Anchors are how we choose what the shot frames — the shop's grid matters
 * more than its hero.
 */
const targets = {
  restaurant: "/demos/restaurant/",
  plumber: "/demos/plumber/",
  shop: "/demos/shop/#shop",
  topoil: "https://topoil.ir/en",
};

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((path) => existsSync(path));
if (!chrome) {
  console.error("No Chrome or Edge found. Set CHROME_PATH to the executable.");
  process.exit(1);
}

const wanted = process.argv.slice(2);
const jobs = Object.entries(targets).filter(
  ([name]) => wanted.length === 0 || wanted.includes(name),
);

if (jobs.length === 0) {
  console.error(
    `Unknown target. Choose from: ${Object.keys(targets).join(", ")}`,
  );
  process.exit(1);
}

const scratch = await mkdtemp(join(tmpdir(), "portfolio-shots-"));

try {
  for (const [name, target] of jobs) {
    const url = target.startsWith("http") ? target : PREVIEW + target;
    const raw = join(scratch, `${name}.png`);

    /* Chrome exits 0 even when it renders "This site can't be reached", so an
       unreachable page would otherwise be saved as a perfectly valid PNG of an
       error message. Check the URL answers first. */
    if (target.startsWith("http")) {
      const reachable = await fetch(url, { redirect: "follow" })
        .then((response) => response.ok)
        .catch(() => false);

      if (!reachable) {
        console.error(
          `✗ ${name.padEnd(11)} ${url}
  unreachable from this machine — left the existing image alone`,
        );
        continue;
      }
    }

    try {
      await run(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        `--force-device-scale-factor=${SCALE}`,
        `--window-size=${WIDTH},${HEIGHT}`,
        "--virtual-time-budget=5000",
        `--screenshot=${raw}`,
        url,
      ]);

      await sharp(raw)
        .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
        .png({ compressionLevel: 9 })
        .toFile(`src/assets/work/${name}.png`);

      console.log(`✓ ${name.padEnd(11)} ${url}`);
    } catch (error) {
      console.error(
        `✗ ${name.padEnd(11)} ${url}\n  ${error.message.split("\n")[0]}`,
      );
    }
  }
} finally {
  await rm(scratch, { recursive: true, force: true });
}
