// After `vite build` outside Lovable, the fully prerendered static site lands in .output/public.
// Copy it to ./dist so static hosts (Cloudflare Pages, Netlify, Vercel, GitHub Pages) can serve it.
import { cpSync, existsSync, rmSync } from "node:fs";
if (existsSync(".output/public/index.html")) {
  rmSync("dist", { recursive: true, force: true });
  cpSync(".output/public", "dist", { recursive: true });
  console.log("Static site exported to ./dist");
}
