# Tasks: Unificar Landing + Masterclass

Referência: [`plan.md`](./plan.md) · [`spec.md`](./spec.md)

Ordem = dependência. Cada task: TDD quando houver comportamento; commit ao fechar a fatia.

---

## Fase 0 — Build scripts (pré-requisito CI)

- [x] Task 0.1: Separar scripts `build` e `build:deploy`
  - Acceptance: `build` = `prisma generate && next build`; `build:deploy` = `prisma generate && prisma migrate deploy && next build`; documentar no README ou comentário no `package.json` que EasyPanel deve usar `build:deploy`
  - Verify: `npm run build` não chama `migrate deploy` (inspecionar `package.json`); perguntar/confirmar comando atual no EasyPanel antes de merge
  - Files: `package.json`, opcionalmente `README.md`

---

## Fase 1 — Tooling TDD

- [x] Task 1.1: Configurar Vitest para UI (`jsdom`) + Testing Library
  - Acceptance: deps instaladas; Vitest usa `jsdom` em `*.test.tsx` (ou projeto dual); setup com `@testing-library/jest-dom`; `npm test` ainda passa nos testes de lib existentes
  - Verify: `npm test`
  - Files: `package.json`, `package-lock.json`, `vitest.config.ts`, `vitest.setup.ts` (se criado)

- [x] Task 1.2: Scaffold Playwright + scripts
  - Acceptance: `@playwright/test` instalado; `playwright.config.ts` com `webServer` apontando para app; pasta `e2e/`; scripts `test:e2e` (e opcional `test:e2e:ui`)
  - Verify: `npx playwright test --list` (ou equivalente) lista suite sem erro de config
  - Files: `package.json`, `playwright.config.ts`, `e2e/.gitkeep` ou primeiro spec vazio placeholder

- [x] Task 1.3: E2E RED — home não redireciona para masterclass
  - Acceptance: teste em `e2e/home.spec.ts` visita `/`, espera URL final sem `/masterclass`, espera texto da marca (ex. "Odonto Solution"); **falha** no estado atual (redirect)
  - Verify: `npm run test:e2e -- e2e/home.spec.ts` → RED
  - Files: `e2e/home.spec.ts`

- [x] Task 1.4: E2E RED — masterclass com formulário rotulado
  - Acceptance: `e2e/masterclass.spec.ts` visita `/masterclass`, espera heading Masterclass + label de campo obrigatório (ex. nome); passa já no estado atual ou falha só se heading mudar depois — baseline GREEN ok se página já existe
  - Verify: `npm run test:e2e -- e2e/masterclass.spec.ts`
  - Files: `e2e/masterclass.spec.ts`

- [x] Task 1.5: E2E RED — nav contém Masterclass
  - Acceptance: teste espera link acessível "Masterclass" em `/` apontando para `/masterclass`; **RED** até nav existir
  - Verify: `npm run test:e2e -- e2e/nav-masterclass.spec.ts` → RED
  - Files: `e2e/nav-masterclass.spec.ts`

- [x] Task 1.6: UI RED — CTA do form em loading quando pending
  - Acceptance: `components/form/interest-form.test.tsx` mocka action/pending e afirma botão desabilitado ou texto "Enviando"; **RED** até restyle com `Button`/estado explícito se necessário
  - Verify: `npm test -- interest-form` → RED (ou GREEN se comportamento já existe — então só reforça contrato)
  - Files: `components/form/interest-form.test.tsx`

---

## Fase 2 — Dependências shadcn

- [x] Task 2.1: Instalar deps da landing + `lib/utils.ts` + `components.json`
  - Acceptance: deps `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `radix-ui`, `tw-animate-css` instaladas; `cn()` em `lib/utils.ts`; `components.json` com paths sem `src/` e css `app/globals.css`
  - Verify: `npx tsc --noEmit` ou import de `cn` em smoke; `npm test`
  - Files: `package.json`, `package-lock.json`, `lib/utils.ts`, `components.json`

---

## Fase 3 — Content + assets

- [x] Task 3.1: Copiar `site.ts` + `whatsapp.ts` e adicionar nav Masterclass
  - Acceptance: `content/site.ts` e `lib/whatsapp.ts` existem; `nav` inclui `{ label: "Masterclass", href: "/masterclass" }`
  - Verify: grep/assert no arquivo; unit opcional `content/site.test.ts` checando nav
  - Files: `content/site.ts`, `lib/whatsapp.ts`, opcional `content/site.test.ts`

- [x] Task 3.2: Copiar assets públicos da landing
  - Acceptance: `public/logo.png` e `public/images/**` presentes; `public/brand/logo.png` e `logo-dark.png` intactos
  - Verify: `ls public/logo.png public/images/hero.jpg public/brand/logo.png`
  - Files: `public/logo.png`, `public/images/**` (sem remover brand)

---

## Fase 4 — CSS + fontes + layout root

- [ ] Task 4.1: Substituir `globals.css` pelo tema da landing
  - Acceptance: tokens shadcn/gold, `text-label`, `font-display`; sem dependência de `--brand-terracotta` no CSS novo
  - Verify: arquivo contém `--primary` / `--gold` e imports shadcn/tw-animate
  - Files: `app/globals.css`

- [ ] Task 4.2: Fontes Playfair + DM Sans no layout
  - Acceptance: `app/fonts.ts` (ou inline no layout) usa Playfair Display + DM Sans; `layout.tsx` aplica variáveis; metadata SEO da landing (`siteConfig`); Meta Pixel + Google Tag preservados
  - Verify: `npm run build` (ou typecheck); inspeção visual rápida no `dev`
  - Files: `app/fonts.ts`, `app/layout.tsx`

---

## Fase 5 — Componentes da landing

- [ ] Task 5.1: Copiar `components/ui/*` e `components/icons/*`
  - Acceptance: Button, Card, Sheet, Badge, Separator, WhatsApp/Scheduling buttons e icons importáveis via `@/components/...`
  - Verify: typecheck / import smoke
  - Files: `components/ui/**`, `components/icons/**`

- [ ] Task 5.2: Copiar `components/layout/*` e `components/sections/*`
  - Acceptance: Header, Footer e todas as sections da landing presentes e compilando
  - Verify: typecheck; Header renderiza itens de `siteConfig.nav`
  - Files: `components/layout/**`, `components/sections/**`

---

## Fase 6 — Home = landing (GREEN dos E2Es)

- [ ] Task 6.1: Implementar `app/page.tsx` como landing
  - Acceptance: remove `redirect("/masterclass")`; página compõe Header + sections + Footer + WhatsApp FAB como na landing
  - Verify: `npm run test:e2e -- e2e/home.spec.ts` → GREEN; `e2e/nav-masterclass.spec.ts` → GREEN
  - Files: `app/page.tsx`

---

## Fase 7 — Restyle funil (TDD vertical)

- [ ] Task 7.1: Restyle `app/masterclass/page.tsx` com tokens landing
  - Acceptance: usa `text-label text-primary`, `font-display`, `text-foreground` / `text-muted-foreground`, `bg-background`; sem `brand-terracotta` / `bg-page-atmosphere`
  - Verify: `npm run test:e2e -- e2e/masterclass.spec.ts` → GREEN; grep sem classes legado neste arquivo
  - Files: `app/masterclass/page.tsx`

- [ ] Task 7.2: Restyle fields (`text`, `textarea`, `radio-group`)
  - Acceptance: tokens `primary` / `muted` / `border` / `destructive`; inputs `min-h-11`; labels associados; gap adequado
  - Verify: `npm test` (incluir asserts de classe/a11y se criados); grep sem `brand-*` nestes arquivos
  - Files: `components/form/fields/text-field.tsx`, `textarea-field.tsx`, `radio-group-field.tsx`, testes de field se houver

- [ ] Task 7.3: Restyle `InterestForm` + CTA com `Button` shadcn
  - Acceptance: card usa `bg-card border-border`; submit via `Button` `rounded-full` full width; loading desabilita CTA
  - Verify: `npm test -- interest-form` → GREEN; não altera `actions.ts`
  - Files: `components/form/interest-form.tsx`, `components/form/interest-form.test.tsx`

- [ ] Task 7.4: Restyle `/obrigado` + E2E
  - Acceptance: tokens landing; `ConversionEvents` intacto; `Logo` variantes brand mantidas
  - Verify: E2E `e2e/obrigado.spec.ts` espera texto de confirmação; tracking component ainda montado
  - Files: `app/obrigado/page.tsx`, `e2e/obrigado.spec.ts`

---

## Fase 8 — Contrato design

- [ ] Task 8.1: Eliminar classes/tokens legado no código de UI
  - Acceptance: zero matches de `brand-terracotta|brand-cream|brand-sand|brand-clay|brand-ink|bg-page-atmosphere` em `app/` e `components/` (paths `public/brand/` ok)
  - Verify: `rg` com exit 1 se achar; teste de contrato opcional `lib/design-contract.test.ts` lendo arquivos
  - Files: quaisquer remanescentes + `app/globals.css` limpeza

---

## Fase 9 — GitHub Actions

- [ ] Task 9.1: Workflow CI lint + Vitest + Playwright
  - Acceptance: `.github/workflows/ci.yml` em push/PR; job lint+unit (`prisma generate`, `lint`, `test`); job e2e (`playwright install`, `npm run build`, `test:e2e`); sem `migrate deploy` no CI
  - Verify: push da branch / `act` se disponível; PR checks documentados
  - Files: `.github/workflows/ci.yml`

---

## Fase 10 — Verificação final

- [ ] Task 10.1: Checklist da spec + suite completa
  - Acceptance: todos os Success Criteria da spec marcáveis; `npm test`, `npm run test:e2e`, `npm run lint`, `npm run build` passam
  - Verify: checklist manual na PR description; **não** fazer cutover EasyPanel
  - Files: nenhum obrigatório (só verificação)

---

## Checkpoint humano

- [ ] ⏸ Confirmar no EasyPanel o comando de build atual e atualizar para `build:deploy` após Task 0.1 (operacional; fora do merge de código se preferir).

## Notas de execução

- Não alterar Prisma schema, `createLead` behavior, nem campos do lead.
- Não redesenhar seções da landing.
- Commit por task (ou por 2 tasks se atomicamente ligadas).
- Se uma task passar de ~5 arquivos, dividir antes de implementar.
