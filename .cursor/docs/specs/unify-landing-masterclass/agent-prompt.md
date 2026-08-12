# Agent prompt: executar unify-landing-masterclass

Copie o bloco abaixo e cole num agente em **Agent mode**, com os skills `tdd` e `incremental-implementation` ativos se disponíveis.

---

```
You are implementing an approved, gated SDD delivery. Spec/plan/tasks are already approved. Do NOT rewrite the spec or invent new scope.

## Repos & branch

- Work ONLY in: `/Users/igorgregorio/Projects/odonto-solution-forms`
- Source landing to COPY from: `/Users/igorgregorio/Projects/odonto-solution`
- Branch: `feat/unify-landing-and-masterclass` (already exists — check out and continue; do not recreate from main unless instructed)
- Docs (source of truth):
  - `.cursor/docs/specs/unify-landing-masterclass/spec.md`
  - `.cursor/docs/specs/unify-landing-masterclass/plan.md`
  - `.cursor/docs/specs/unify-landing-masterclass/tasks.md`

Read those three files first. Execute tasks in order from `tasks.md`. Mark each task `[x]` in `tasks.md` when done and commit that update with the task commit (or a follow-up docs commit).

## Goal

Unify the clinic landing page into this forms app and restyle `/masterclass` + `/obrigado` to the landing design system (gold/shadcn, Playfair + DM Sans). Keep lead capture behavior, Prisma, and tracking intact. Add Vitest UI + Playwright E2E + GitHub Actions CI.

## Hard rules

ALWAYS:
- TDD vertical slices: one behavior → RED → GREEN → commit. Do not write all tests then all code.
- Commit after each completed task (or two tightly coupled tasks). Use HEREDOC commit messages; conventional commits (`feat:`, `test:`, `chore:`, `ci:`, `docs:`).
- Preserve `createLead` behavior, Zod/Prisma lead fields, Meta Pixel / Google Tag / ConversionEvents.
- Keep `public/brand/logo.png` and `logo-dark.png` + `components/brand/logo.tsx` variants.
- Add Masterclass to landing nav: `{ label: "Masterclass", href: "/masterclass" }`.
- Use landing tokens only: `primary`, `foreground`, `muted-foreground`, `card`, `border`, `font-display`, `text-label`. No new cream/terracotta theme.
- Next.js docs in this repo may differ from training data — check `node_modules/next/dist/docs/` if unsure.
- Run the task's Verify step before marking it done.

ASK FIRST (stop and ask the human):
- Prisma schema / migration changes
- Changing form fields or lead business rules
- Changing landing copy/sections content (beyond adding Masterclass nav)
- EasyPanel deploy / DNS cutover
- Extra dependencies beyond those listed in the plan
- Force-push, amending others' commits, or merging to main

NEVER:
- Commit `.env` or secrets
- Redesign landing sections from scratch
- Keep dual themes after phase 8 (`brand-terracotta`, `bg-page-atmosphere`, etc. in `app/` + `components/`)
- Deploy to EasyPanel or archive `odonto-solution` repo
- Skip hooks / `--no-verify`
- Push unless the human asks

## Execution loop

For each unchecked task in `tasks.md` (0.1 → 10.1):

1. State which task you are starting.
2. If the task has a RED test: write/run the failing test first.
3. Implement the minimum to satisfy Acceptance (respect Files list; if >~5 files, split and note it).
4. Run Verify commands from the task.
5. Mark task `[x]` in `tasks.md`.
6. Commit with a message focused on why.
7. Proceed to the next task.

If blocked (EasyPanel build command unknown, missing credentials, flaky E2E env): leave a clear note in the final summary and continue with non-blocked tasks when possible. Task 0.1 EasyPanel confirmation is a human checkpoint — implement the script split anyway and document that EasyPanel must use `build:deploy`.

## Key technical notes from the plan

- Path aliases: this repo uses `@/*` → project root (no `src/`). Landing uses `src/` — after copy, fix paths/components.json accordingly.
- Split package scripts:
  - `build` = `prisma generate && next build` (CI)
  - `build:deploy` = `prisma generate && prisma migrate deploy && next build` (EasyPanel)
- Copy from landing: `content/site.ts`, `lib/whatsapp.ts`, `lib/utils.ts`, `components/{layout,sections,ui,icons}`, `public/logo.png`, `public/images/**`, landing `globals.css` theme.
- Replace forms fonts (Cormorant/Manrope) with Playfair Display + DM Sans.
- Home: replace `redirect("/masterclass")` with full landing page composition (Header, sections, Footer, WhatsApp FAB).
- Restyle form fields + InterestForm to use shadcn `Button`; do not change `app/masterclass/actions.ts` logic.
- CI: `.github/workflows/ci.yml` with lint+unit and e2e jobs; no `migrate deploy` in CI.
- E2E should not require a real DB for happy-path route checks; do not E2E full lead submit against production DB.

## Token mapping (forms → landing)

| Remove | Use |
|--------|-----|
| brand-terracotta / brand-clay | primary / primary/80 |
| brand-ink | foreground |
| brand-muted | muted-foreground |
| surface / brand-sand | card / muted |
| font-serif | font-display |
| bg-page-atmosphere | bg-background |
| handmade CTA | Button rounded-full |

## Done when

All tasks in `tasks.md` are `[x]`, Success Criteria in `spec.md` are met, and:

```bash
npm test
npm run test:e2e
npm run lint
npm run build
```

all pass. Summarize what was done, remaining human ops (EasyPanel `build:deploy`), and do NOT open a PR unless asked.

Start at Task 0.1 now.
```

---

## Como usar

1. Abra um chat novo em **Agent mode** no repo `odonto-solution-forms`.
2. Cole o bloco acima.
3. (Opcional) Anexe/mencione: `@.cursor/docs/specs/unify-landing-masterclass/`
4. Deixe o agente correr as tasks; intervenha só nos checkpoints (EasyPanel / ask-first).
