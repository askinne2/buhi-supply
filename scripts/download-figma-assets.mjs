#!/usr/bin/env node
/**
 * Download Figma images into public/images/ for Buhi Supply Co.
 *
 * Uses Figma MCP asset URLs (https://www.figma.com/api/mcp/asset/...).
 * These URLs are valid for ~7 days. Run this script soon after generating
 * them. No Figma desktop app required for these URLs.
 *
 * Usage: node scripts/download-figma-assets.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const assets = [
  // Hero
  {
    url: "https://www.figma.com/api/mcp/asset/9e9d31a4-7942-407c-9ca0-e4055a309e18",
    dest: "public/images/hero.jpg",
  },
  // Lifestyle (Shop by Lifestyle section)
  {
    url: "https://www.figma.com/api/mcp/asset/f6f9ca44-2440-4948-99fc-398043860747",
    dest: "public/images/lifestyle/work.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/e43d4b59-3f85-403f-83ed-971438f1f6b4",
    dest: "public/images/lifestyle/school.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/0ff681e2-75ea-4d20-80e6-44779688effc",
    dest: "public/images/lifestyle/travel.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/19ccc2c9-109a-462b-9c57-8b5e9550b567",
    dest: "public/images/lifestyle/gym.jpg",
  },
  // Products (Bestsellers grid)
  {
    url: "https://www.figma.com/api/mcp/asset/19df807b-2c68-4a83-8321-f110451177d2",
    dest: "public/images/products/commuter.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/06724827-d15b-4ab2-890d-d527e6c4cc66",
    dest: "public/images/products/daily-tote.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/c5d4d8a6-49b3-40ef-892f-c7bb08eef2f3",
    dest: "public/images/products/weekender.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/15fcc7d9-6391-47f7-a50a-ba4ea8efa12a",
    dest: "public/images/products/crossbody.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/3ab9f1b1-6a17-4104-a42f-da1557e5fe75",
    dest: "public/images/products/tech-sleeve.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/85213525-88c2-4648-ab65-8f52a85b195b",
    dest: "public/images/products/mini-backpack.jpg",
  },
  // UGC (#BuhiEverywhere)
  {
    url: "https://www.figma.com/api/mcp/asset/a6ac9572-28a5-4af6-b8a3-b93c672bf58c",
    dest: "public/images/ugc/1.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/f457a4de-e5d0-4797-82d7-51e6ccd8ee2f",
    dest: "public/images/ugc/2.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/520e6932-dce8-4061-a484-5da476a2d64d",
    dest: "public/images/ugc/3.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/cb407619-8190-4e80-8791-84af0f1d1d64",
    dest: "public/images/ugc/4.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/fbcf7bc2-12b2-4b8e-bf3f-b8477c0ddf98",
    dest: "public/images/ugc/5.jpg",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/9c6052fb-b49b-491a-a0c9-1cdb1b1b208b",
    dest: "public/images/ugc/6.jpg",
  },
  // Testimonial avatar
  {
    url: "https://www.figma.com/api/mcp/asset/53bc7333-89fc-493b-b51a-275517f96e58",
    dest: "public/images/testimonial-avatar.jpg",
  },
];

async function download(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const res = await fetch(url, {
    headers: {
      Accept: "image/*",
      "User-Agent": "Buhi-Supply-Asset-Downloader/1.0",
    },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(ROOT, dest), buf);
}

async function main() {
  console.log("Downloading Figma assets into public/images/...\n");
  let ok = 0;
  let fail = 0;
  for (const { url, dest } of assets) {
    try {
      await download(url, dest);
      console.log(`  ✓ ${dest}`);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${dest} — ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} succeeded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main();
