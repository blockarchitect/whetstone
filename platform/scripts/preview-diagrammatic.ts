/**
 * Renders the actual diagrammatic items from content/items.yaml to an HTML
 * preview, so the real generated SVGs can be eyeballed (not a hand-drawn mockup).
 *
 *   pnpm tsx scripts/preview-diagrammatic.ts
 *
 * Writes ../test-samples/sample-03-diagrammatic.html.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const doc = yaml.load(readFileSync(join(__dirname, "..", "content", "items.yaml"), "utf8")) as {
  items: {
    id: string;
    construct: string;
    stem: string;
    figureSvg?: string;
    options: { id: string; svg?: string; text?: string }[];
    correctOptionId: string;
    explanation: string;
  }[];
};

const items = doc.items.filter((i) => i.construct === "diagrammatic");

const qHtml = (it: (typeof items)[number]) => {
  const opts = it.options
    .map(
      (o) => `
        <div class="opt${o.id === it.correctOptionId ? " correct" : ""}">
          <div class="figbox">${o.svg ?? o.text ?? ""}</div>
          <div class="olt">${o.id.toUpperCase()}</div><div class="check">✓ correct</div>
        </div>`
    )
    .join("");
  return `
      <div class="q">
        <div class="q-id">${it.id}</div>
        <p class="stem">${it.stem}</p>
        ${it.figureSvg ? `<div class="figrow">${it.figureSvg}</div>` : ""}
        <div class="opts">${opts}</div>
        <div class="expl"><b>Answer.</b> ${it.explanation}</div>
      </div>`;
};

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Whetstone — diagrammatic items (real render)</title>
<style>
  body{margin:0;background:#F7F8FA;color:#1A1D23;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.55}
  .wrap{max-width:760px;margin:0 auto;padding:0 20px 80px}
  header{padding:40px 0 20px;border-bottom:1px solid #E5E8EC;margin-bottom:6px}
  h1{font-size:1.5rem;margin:0 0 6px}
  .sub{color:#565A63;font-size:.92rem;margin:0}
  .bar{position:sticky;top:0;background:#F7F8FA;padding:14px 0;border-bottom:1px solid #E5E8EC;display:flex;gap:12px;align-items:center;margin-top:14px}
  .toggle{display:inline-flex;border:1px solid #E5E8EC;border-radius:8px;overflow:hidden;background:#fff}
  .toggle button{border:0;background:transparent;padding:8px 14px;font:inherit;font-size:.88rem;cursor:pointer;color:#565A63}
  .toggle button.on{background:#2751E0;color:#fff}
  .q{background:#fff;border:1px solid #E5E8EC;border-radius:12px;padding:22px 24px;margin-top:16px}
  .q-id{font-family:ui-monospace,Menlo,monospace;font-size:.72rem;color:#8A8F98;margin-bottom:8px}
  .stem{font-size:1.02rem;margin:0 0 14px}
  .figrow{margin:0 0 18px}
  .figrow svg{width:100%;max-width:360px;height:auto}
  .opts{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:440px}
  .opt{border:1px solid #E5E8EC;border-radius:9px;padding:8px;text-align:center}
  .opt .figbox svg{width:100%;height:auto}
  .opt .olt{font-weight:600;color:#565A63;font-size:.82rem;margin-top:4px}
  .opt .check{display:none;color:#1B8A5A;font-weight:700;font-size:.72rem;margin-top:2px}
  .reveal .opt.correct{background:#E4F4EC;border-color:#B7E0CB}
  .reveal .opt.correct .check{display:block}
  .expl{margin-top:14px;padding:12px 14px;background:#EAF0FF;border-radius:9px;font-size:.9rem;color:#565A63;display:none}
  .reveal .expl{display:block}
  .expl b{color:#1A1D23}
</style></head><body>
<div class="wrap">
  <header><h1>Diagrammatic items — real render</h1>
  <p class="sub">All ${items.length} diagrammatic items, rendered from the actual SVGs in content/items.yaml (not a mockup).</p></header>
  <div class="bar"><div class="toggle"><button id="c">Candidate view</button><button id="r" class="on">Review view</button></div></div>
  <main id="m" class="reveal">${items.map(qHtml).join("")}</main>
</div>
<script>
  var m=document.getElementById('m'),c=document.getElementById('c'),r=document.getElementById('r');
  function set(v){m.classList.toggle('reveal',v);r.classList.toggle('on',v);c.classList.toggle('on',!v);}
  c.onclick=function(){set(false)};r.onclick=function(){set(true)};
</script>
</body></html>`;

writeFileSync(join(__dirname, "..", "..", "test-samples", "sample-03-diagrammatic.html"), html);
console.log(`wrote test-samples/sample-03-diagrammatic.html (${items.length} items)`);
