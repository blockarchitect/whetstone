# Question types & styles — full catalogue, with MVP coverage

The exhaustive set of question types used in pre-employment aptitude / psychometric
testing, and which ones the MVP supports. This is a **requirements reference** — the full
list is what a complete product would cover; the MVP deliberately supports a small subset.

Legend: **✅ in MVP** · **◐ partial in MVP** · **⬚ full-release only**

*Related: construct architecture → `02-product-architecture.md`; MVP scope → `../memory/decisions.md` D26.*

---

## Numerical
| Type | Status | Notes |
|---|---|---|
| Word problems — %, ratios, rates, currency (text-based) | ✅ | the MVP's numerical style |
| Data interpretation — tables, bar/line/pie charts, multi-source | ⬚ | the *core* real-world numerical format; needs table/chart rendering |
| Numerical critical reasoning (conclusions from data) | ⬚ | |
| Basic computation / speed arithmetic | ⬚ | |
| Estimation | ⬚ | |
| Financial & business numeracy (margins, statements) | ⬚ | |

## Verbal
| Type | Status | Notes |
|---|---|---|
| Verbal reasoning — True / False / Cannot Say from a passage | ✅ | the MVP's verbal style |
| Reading comprehension (MCQ on passage) | ⬚ | |
| Critical reasoning — Watson-Glaser set: inference, assumptions, deduction, interpretation, argument evaluation | ⬚ | distinct, high-value; the real Watson-Glaser construct |
| Vocabulary — synonyms / antonyms | ⬚ | |
| Verbal analogies | ⬚ | |
| Sentence completion | ⬚ | |
| Spelling / grammar / error identification | ⬚ | |

## Logical / inductive (text)
| Type | Status | Notes |
|---|---|---|
| Number series | ✅ | |
| Letter series | ✅ | |
| Letter / symbol coding & decoding | ✅ | |
| Syllogisms / deductive logic | ✅ | |
| Ordering & arrangement (linear) | ◐ | simple ordering only |
| Odd-one-out (verbal / numeric) | ✅ | |
| Seating / grid / constraint puzzles | ⬚ | |

## Diagrammatic / abstract / spatial
| Type | Status | Notes |
|---|---|---|
| Abstract shape **sequences** (rotation, translation, count, size, fill) | ✅ | added mid-build (D26 update); 8 SVG items |
| Figural **odd-one-out** | ✅ | |
| **Matrices** — 2×2 / 3×3 grid completion (Raven's-style) | ⬚ | |
| Diagrammatic **process / flowchart** logic (input → rule → output) | ⬚ | "diagrammatic reasoning" proper |
| Figural analogies (A is to B as C is to ?) | ⬚ | |
| 2D spatial — rotation / reflection | ⬚ | |
| 3D spatial — cube nets / folding, block counting, 3D rotation | ⬚ | |

## Situational / behavioural / specialised (none in MVP)
| Family | Status | Notes |
|---|---|---|
| Situational Judgement (rank / rate responses to scenarios) | ⬚ | needs scenario libraries + best/worst keying (D3) |
| Personality / motivation questionnaires | ⬚ | not "practiceable" — coach-only, never drill (D3) |
| Mechanical / electrical / fault-diagnosis reasoning | ⬚ | |
| Error-checking / clerical speed & accuracy | ⬚ | |
| Gamified cognitive tasks (Pymetrics / HireVue-style: memory, attention, risk) | ⬚ | same constructs, different skin (D3) |
| Coding aptitude (tech roles) | ⬚ | |

---

## Summary
The MVP covers **4 construct families at a basic level** — numerical (text word problems),
verbal (True/False/Cannot Say), logical (text), diagrammatic (shape sequences). That's
**~11 of ~35 distinct question types** — the minimum that reads as a credible graduate-
screening battery. Deliberately excluded from the MVP: data-interpretation charts,
matrices, spatial/3D, situational judgement, and everything gamified.

**Where the rest comes from:** most excluded types are content the eventual **generative
engine** (D3) produces, not hand-authored volume — diagrammatic especially (rule → figures
suits deterministic generation; see `../platform/scripts/gen-diagrammatic.ts` for a preview).
This catalogue is the coverage roadmap the requirements spec (see D27) should sequence.
