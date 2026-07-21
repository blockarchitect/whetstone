/**
 * Authoring aid: generates the diagrammatic/abstract reasoning items as YAML,
 * so the SVG figures are consistent and correct rather than hand-typed.
 *
 *   pnpm tsx scripts/gen-diagrammatic.ts > /tmp/dgm.yaml
 *
 * The output is inlined into content/items.yaml (which stays the single source
 * of truth). This script is kept as provenance for how the figures were built —
 * and is a hand-rolled preview of what the real deterministic generator (D3)
 * will do at scale. Each item is a rule applied to figures; the rule is the code.
 */
import yaml from "js-yaml";

const S = 'stroke="#2A2F37" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const DOT = 'fill="#2A2F37"';

// ---- figure primitives (local 0..74 coordinate box) ----
const arrow = (deg: number) =>
  `<g transform="rotate(${deg} 37 37)"><line x1="37" y1="54" x2="37" y2="20" ${S}/><polyline points="28,29 37,20 46,29" ${S}/></g>`;

const CORNERS: Record<string, [number, number]> = {
  tl: [16, 16], tr: [58, 16], br: [58, 58], bl: [16, 58], c: [37, 37],
};
const dotCorner = (corner: string) => {
  const [cx, cy] = CORNERS[corner]!;
  return `<rect x="16" y="16" width="42" height="42" rx="3" ${S}/><circle cx="${cx}" cy="${cy}" r="6" ${DOT}/>`;
};

const polygon = (n: number) => {
  const R = 24, cx = 37, cy = 37;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (-90 + (i * 360) / n) * (Math.PI / 180);
    return `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return `<polygon points="${pts}" ${S}/>`;
};

const dotsRow = (n: number) => {
  const start = 37 - (n - 1) * 7;
  return Array.from({ length: n }, (_, i) => `<circle cx="${start + i * 14}" cy="37" r="5" ${DOT}/>`).join("");
};

const circleFill = (filled: boolean) =>
  filled ? `<circle cx="37" cy="37" r="20" fill="#2A2F37"/>` : `<circle cx="37" cy="37" r="20" ${S}/>`;

const square = (size: number) => {
  const o = 37 - size / 2;
  return `<rect x="${o}" y="${o}" width="${size}" height="${size}" rx="3" ${S}/>`;
};

const circleWithDot = (dx: number, dy: number) =>
  `<circle cx="37" cy="37" r="18" ${S}/><circle cx="${dx}" cy="${dy}" r="4" ${DOT}/>`;

// ---- containers ----
const optSvg = (inner: string) => `<svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// horizontal sequence strip: three figures + a "?" cell
const strip = (cells: string[]) => {
  const cellBorder = `<rect x="1" y="1" width="72" height="72" rx="6" fill="#fff" stroke="#E5E8EC" stroke-width="1"/>`;
  const qmark = `${cellBorder}<text x="37" y="47" text-anchor="middle" font-size="30" fill="#8A8F98" font-family="sans-serif">?</text>`;
  const all = [...cells, null];
  const body = all
    .map((c, i) => `<g transform="translate(${i * 86} 0)">${c === null ? qmark : cellBorder + c}</g>`)
    .join("");
  return `<svg viewBox="0 0 332 74" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
};

const opt = (id: string, inner: string) => ({ id, svg: optSvg(inner) });

interface Spec {
  id: string;
  stem: string;
  figure?: string[]; // sequence cells (omit for odd-one-out)
  options: { id: string; inner: string }[];
  correctOptionId: string;
  explanation: string;
  tags: string[];
}

const specs: Spec[] = [
  {
    id: "dgm-001",
    stem: "Which figure completes the sequence?",
    figure: [arrow(0), arrow(90), arrow(180)],
    options: [
      { id: "a", inner: arrow(0) }, { id: "b", inner: arrow(90) },
      { id: "c", inner: arrow(180) }, { id: "d", inner: arrow(270) },
    ],
    correctOptionId: "d",
    explanation: "The arrow rotates 90° clockwise each step: up, right, down, then left. The next figure is the arrow pointing left.",
    tags: ["rotation"],
  },
  {
    id: "dgm-002",
    stem: "Which figure completes the sequence?",
    figure: [dotCorner("tl"), dotCorner("tr"), dotCorner("br")],
    options: [
      { id: "a", inner: dotCorner("bl") }, { id: "b", inner: dotCorner("tl") },
      { id: "c", inner: dotCorner("tr") }, { id: "d", inner: dotCorner("c") },
    ],
    correctOptionId: "a",
    explanation: "The dot moves one corner clockwise each step: top-left, top-right, bottom-right, then bottom-left.",
    tags: ["translation"],
  },
  {
    id: "dgm-003",
    stem: "Which figure completes the sequence?",
    figure: [polygon(3), polygon(4), polygon(5)],
    options: [
      { id: "a", inner: polygon(6) }, { id: "b", inner: polygon(5) },
      { id: "c", inner: polygon(7) }, { id: "d", inner: polygon(4) },
    ],
    correctOptionId: "a",
    explanation: "Each shape has one more side than the last: 3, 4, 5, then 6 (a hexagon).",
    tags: ["progression", "sides"],
  },
  {
    id: "dgm-004",
    stem: "Which figure completes the sequence?",
    figure: [dotsRow(1), dotsRow(2), dotsRow(3)],
    options: [
      { id: "a", inner: dotsRow(4) }, { id: "b", inner: dotsRow(3) },
      { id: "c", inner: dotsRow(5) }, { id: "d", inner: dotsRow(2) },
    ],
    correctOptionId: "a",
    explanation: "The number of dots increases by one each step: 1, 2, 3, then 4.",
    tags: ["progression", "count"],
  },
  {
    id: "dgm-005",
    stem: "Which figure completes the sequence?",
    figure: [circleFill(true), circleFill(false), circleFill(true)],
    options: [
      { id: "a", inner: circleFill(false) }, { id: "b", inner: circleFill(true) },
      { id: "c", inner: square(40) }, { id: "d", inner: dotsRow(2) },
    ],
    correctOptionId: "a",
    explanation: "The circle alternates filled, empty, filled, so the next is empty.",
    tags: ["alternation"],
  },
  {
    id: "dgm-006",
    stem: "Which figure completes the sequence?",
    figure: [square(20), square(32), square(44)],
    options: [
      { id: "a", inner: square(56) }, { id: "b", inner: square(44) },
      { id: "c", inner: square(32) }, { id: "d", inner: square(20) },
    ],
    correctOptionId: "a",
    explanation: "The square grows by the same amount each step, so the next is the largest square.",
    tags: ["progression", "size"],
  },
  {
    id: "dgm-007",
    stem: "Which figure is the odd one out?",
    options: [
      { id: "a", inner: circleWithDot(30, 34) }, { id: "b", inner: circleWithDot(44, 40) },
      { id: "c", inner: circleWithDot(37, 66) }, { id: "d", inner: circleWithDot(37, 30) },
    ],
    correctOptionId: "c",
    explanation: "In figures A, B and D the dot is inside the circle; in C the dot is outside it, so C is the odd one out.",
    tags: ["odd-one-out"],
  },
  {
    id: "dgm-008",
    stem: "Which figure completes the sequence?",
    figure: [polygon(6), polygon(5), polygon(4)],
    options: [
      { id: "a", inner: polygon(3) }, { id: "b", inner: polygon(4) },
      { id: "c", inner: polygon(5) }, { id: "d", inner: circleFill(false) },
    ],
    correctOptionId: "a",
    explanation: "Each shape has one fewer side than the last: 6, 5, 4, then 3 (a triangle).",
    tags: ["progression", "sides"],
  },
];

const items = specs.map((s) => {
  const item: Record<string, unknown> = {
    id: s.id,
    construct: "diagrammatic",
    stem: s.stem,
  };
  if (s.figure) item.figureSvg = strip(s.figure);
  item.options = s.options.map((o) => opt(o.id, o.inner));
  item.correctOptionId = s.correctOptionId;
  item.explanation = s.explanation;
  item.tags = s.tags;
  return item;
});

// dump as a top-level list, then indent 2 spaces so it drops under `items:`
const dumped = yaml.dump(items, { lineWidth: -1, quotingType: '"' });
process.stdout.write(dumped.split("\n").map((l) => (l ? "  " + l : l)).join("\n"));
