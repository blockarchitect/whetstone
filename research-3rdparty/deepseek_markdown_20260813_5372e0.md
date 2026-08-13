# Human-in-the-Loop (HITL) Quality Refinement System

## Why HITL is Essential
AI can produce infinite questions, but without human quality filters, subtle errors slip through. In high-stakes prep, one wrong answer destroys trust. HITL must be built into the platform's DNA.

## The Three-Layer Human Loop Architecture

### Tier 1 – Automated Guardrails (Pre-Human)
- **Solvability/answer consistency**: Programmatic checking of solution path and answer.
- **Style compliance**: NLP ensures phrasing matches official exam style, reading level, terminology.
- **Difficulty & discrimination prediction**: AI assigns preliminary difficulty; low confidence flags for human review.
- **Plagiarism filter**: Ensures generated item isn't too similar to copyrighted questions.

### Tier 2 – Expert Human Review (Core)
Domain specialists validate, polish, calibrate.

#### Review Workflow
1. **Queue assignment**: Batched by domain and difficulty, assigned to reviewers with matching expertise.
2. **Review interface**: Shows generated question, solution, metadata, AI confidence. Actions:
   - Approve as-is
   - Edit (word, distractors, diagram) – edits logged
   - Reject with reason
   - Adjust metadata (difficulty, tags, time estimate)
   - Add note (teaching point, common trap)
3. **Double-blind for high-stakes items**: Two independent approvals; disagreements to senior editor.

#### Who Are the Reviewers?
- **Olympiads**: Former medalists, coaches, advanced PhD students.
- **IT Certs**: Working professionals holding the certification (AWS SA Pro, CISSP) with training experience.
- **Psychometrics**: I-O psychologists or trained item writers.
- **Recruitment**: Gig model, pay per reviewed question ($2-5 aptitude, $10-30 complex). Top contributors get bonuses, free access, badges.

#### Quality Assurance on Reviewers
- **Calibration sessions**: Monthly gold-standard questions; agreement rate measured, low performers retrained/removed.
- **Blind re-review**: 5% of approved questions randomly re-injected; disagreements investigated.

### Tier 3 – Live User Feedback Loop (Community as Sensor)
- **In-app reporting**: Structured options (incorrect answer, confusing wording, diagram error, doesn't reflect exam, other). High-volume reports auto-deactivate and priority review.
- **Post-test survey integration**: After taking real exam, users can flag if practice questions felt misaligned.
- **Performance anomaly detection**: If a question shows statistical anomalies (e.g., 90% of high-ability users get it wrong), it's yanked for human review (psychometric item analysis).
- **Community voting** (for non-verified verticals like Olympiad practice): Upvote/downvote quality/enjoyment; low-rated queued for expert review.

## Cross-Vertical Scalability: The Expert Network Model
Build a global, on-demand expert marketplace integrated into the platform:
1. **Recruitment funnel**: Invite power users, certified professionals, top students. Screening via sample review of 5 questions.
2. **Training module**: Mandatory course on item-writing guidelines, style guide, platform tools.
3. **Reputation system**: Accuracy Score, badges, tier levels; higher tiers get more work, higher pay.
4. **Workload distribution**: Mobile-friendly dashboard; experts grab tasks anytime (Uber model).

## Feedback Into AI Generation
Every human edit/rejection is logged and used to fine-tune generative models:
- **Template tuning**: Avoid patterns reviewers consistently reject.
- **Difficulty calibration**: Human labels improve AI difficulty predictor.
- **Style refinement**: Edited wordings fed back to mimic real test voice.
- **Concept gap identification**: If reviewers add new tags, system enriches topic ontology.

**Closed loop:** Generate → Review → Refine → Generate better. Over time, human review needed mainly for novel/high-risk content.

## Embedding HITL into the Living Product DNA
When community intel reports new test interface/question type, **humans** design seed templates for that new format (AI cannot invent completely new interaction patterns from scratch).
- Seed templates fed to AI, generate variants.
- First batch goes through Tier 2 expert review before public release.
- Tier 3 feedback fine-tunes quality.
Humans are the bridge between real-world change and AI simulation.

## Example Workflow: Olympiad Geometry Question
1. **AI generation**: Creates problem, solution, diagram.
2. **Automated checks**: Solver computes answer, style, difficulty confidence.
3. **Expert review**: Former IMO medalist edits numbers for elegance, adjusts difficulty, approves.
4. **Live**: After 1000 attempts, item-total correlation good but 15 users report diagram mislabel. Junior reviewer fixes; AI diagram generator updated.
5. **Future update**: New geometric transformation trend detected via intel; expert creates 10 seed templates; AI generates hundreds; batch review; platform leads market.

## Practical Considerations
- **Minimum viable HITL**: 5-10 in-house/contracted SMEs review every question at launch.
- **Cost projection**: At scale (100k live questions, 20% reviewed per cycle, avg $3/question) = $60k ongoing; offset by revenue.
- **Tooling**: Build review dashboard as core part of admin panel from Day 1. Real-time, collaborative, analytics-rich.
- **Legal/ethical**: Reviewers must not replicate non-public exam info; base on same public references as AI.