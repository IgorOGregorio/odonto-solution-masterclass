# Spec: Unificar Landing + Masterclass (design system único)

## Objective

Unificar a landing da clínica Odonto Solution (`odonto-solution`) e o funil de Masterclass (`odonto-solution-forms`) em **um único app Next.js**, com **um único design system** — o da landing como fonte da verdade.

**Usuários:**
- Visitante da clínica (Itajubá-MG) que chega em `/` buscando serviços / agendamento.
- Lead de anúncio pago que chega em `/masterclass` para entrar na lista de prioridade.

**Por quê:** hoje existem dois projetos, dois temas visuais (cream/terracotta vs gold/shadcn) e dois deploys. O visitante não deve perceber produtos diferentes da mesma marca.

**Sucesso (testável):**
1. `/` renderiza a landing completa (hero, serviços, sobre, galeria, agendamento, localização, CTA) com o visual atual da landing.
2. `/masterclass` e `/obrigado` usam os **mesmos tokens, tipografia e componentes** da landing (sem classes `brand-terracotta` / `bg-page-atmosphere`).
3. Submissão válida do formulário continua persistindo lead + atribuição e redirecionando para `/obrigado` com pixels.
4. Suite de testes de frontend (comportamento) passa em CI local: rotas críticas + formulário.
5. `npm run build` e `npm test` passam.

## Tech Stack

| Área | Escolha |
|------|---------|
| App base | `odonto-solution-forms` (Next.js 16 App Router, React 19, Prisma, Zod) |
| Fonte da landing | `/Users/igorgregorio/Projects/odonto-solution` (copiar código/assets) |
| UI | shadcn/ui (radix-nova) + Lucide, já usados na landing |
| CSS | Tailwind v4 + tokens shadcn/gold da landing |
| Fontes | **Playfair Display** (display) + **DM Sans** (body) — já na landing |
| Testes unitários/lib | Vitest (já existe) |
| Testes de UI/comportamento | Vitest + Testing Library (`jsdom`) |
| Testes E2E de rotas | Playwright |
| Deploy | Vercel (este repo); projeto `odonto-solution` arquivado após cutover (fora do escopo de código desta branch) |

### Design system (fonte da verdade + validação ui-ux-pro-max)

**Fonte da verdade:** tokens e componentes já implementados em `odonto-solution` (`globals.css`, `Button`, `text-label`, `font-display`, `--primary` gold, `--hero`).

**Validação ui-ux-pro-max** (healthcare / premium / accessible):

| Dimensão | Decisão |
|----------|----------|
| Estilo | Premium clínico acessível — light mode; sem dark mode neste escopo |
| Accent | Gold da landing (`--primary` / `--gold`) — CTA e labels |
| Tipografia | Playfair Display + DM Sans (landing). Pro Max sugere Inter como body; **mantemos DM Sans** para não redesenhar a landing |
| Landing pattern | Hero → trust → serviços → sobre → galeria → agendamento → localização → CTA |
| Anti-patterns | Sem purple/AI gradients; sem cream/terracotta do forms; sem emojis como ícone; motion leve + `prefers-reduced-motion` |
| Form UX | Labels visíveis; erro por campo; CTA loading; touch ≥44px; gap ≥8px entre targets |
| Ícones | Lucide apenas |

### Token mapping (forms → landing)

| Remover (forms) | Usar (landing) |
|-----------------|----------------|
| `text-brand-terracotta` / `bg-brand-terracotta` | `text-primary` / `bg-primary` |
| `hover:bg-brand-clay` | `hover:bg-primary/80` |
| `text-brand-ink` | `text-foreground` |
| `text-brand-muted` | `text-muted-foreground` |
| `bg-surface` / `bg-brand-sand` | `bg-card` / `bg-muted` |
| `border-brand-ink/*` | `border-border` |
| `font-serif` | `font-display` |
| eyebrow custom + terracotta | `text-label text-primary` |
| `bg-page-atmosphere` | `bg-background` |
| botão CTA handmade | `Button` shadcn (`rounded-full`, full width no form) |

## Commands

```bash
# install
npm install

# dev
npm run dev

# unit + UI behavior (Vitest)
npm test

# E2E (Playwright) — a adicionar na implementação
npx playwright test

# lint
npm run lint

# build (Prisma generate + migrate deploy + next build)
npm run build

# start
npm run start
```

## Project Structure (alvo pós-merge)

```
app/
  layout.tsx                 # DM Sans + Playfair, metadata SEO landing, Meta/GA scripts
  globals.css                # tokens shadcn/gold da landing (sem --brand-*)
  fonts.ts                   # Playfair + DM Sans
  page.tsx                   # landing (substitui redirect)
  masterclass/
    page.tsx                 # form page (tokens unificados)
    actions.ts               # createLead (inalterado em comportamento)
  obrigado/
    page.tsx                 # thank-you + conversion events

components/
  layout/                    # Header, Footer (da landing)
  sections/                  # Hero, TrustBar, Services, About, Gallery, Scheduling, Location, Cta
  ui/                        # shadcn Button, Card, Sheet, Badge, Separator, WhatsApp/Scheduling
  icons/                     # social icons
  brand/logo.tsx             # unificado (path único de logo)
  form/                      # InterestForm + fields (restyled)
  tracking/                  # Meta, GA, conversion (mantidos)

content/
  site.ts                    # siteConfig da landing

lib/
  utils.ts                   # cn() da landing
  whatsapp.ts
  prisma.ts / attribution / lead-schema  # existentes

public/
  logo.png
  images/                    # hero, gallery, highlights (+ vídeos)
  brand/                     # consolidar ou apontar Logo para /logo.png

e2e/                         # Playwright — rotas críticas
*.test.ts(x)                 # Vitest — lib + componentes de form

.cursor/docs/specs/          # esta spec
.cursor/docs/plans/          # plan (após aprovação)
.cursor/docs/tasks/          # tasks (após aprovação do plan)
```

## Code Style

- TypeScript strict; Server Components por padrão; `'use client'` só onde necessário (form, tracking client, sheet/mobile nav).
- Imports com alias `@/`.
- Classes Tailwind com tokens semânticos (`primary`, `muted-foreground`) — **nunca** hex solto em JSX.
- Componentes UI via shadcn; não reinventar botão/input se existir primitivo.

Exemplo desejado (masterclass header):

```tsx
<p className="text-label text-primary">Lista de prioridade</p>
<h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
  Masterclass em Toxina Botulínica e Preenchimento Facial Avançado
</h1>
<p className="max-w-md text-base leading-relaxed text-muted-foreground">
  {introText}
</p>
```

Exemplo de CTA do form:

```tsx
<Button type="submit" size="lg" className="min-h-11 w-full rounded-full" disabled={isPending}>
  {isPending ? "Enviando…" : "Entrar na lista de prioridade"}
</Button>
```

## Testing Strategy

Seguir **TDD vertical** (um comportamento → um teste → implementação mínima → próximo). Não escrever todos os testes de uma vez.

### Níveis

| Nível | Ferramenta | O que cobre |
|-------|------------|-------------|
| Unit (já existe) | Vitest / node | `lead-schema`, `attribution` |
| UI behavior | Vitest + Testing Library + `jsdom` | Form: labels, validação client-facing, loading no submit, campos condicionais |
| E2E | Playwright | `/` contém marca/hero; `/masterclass` exibe formulário; `/obrigado` mensagem de sucesso; sem regressão de redirect `/` → masterclass |

### Comportamentos prioritários a travar com teste (aprovação humana implícita nesta lista)

1. **Home é landing** — `/` não redireciona para `/masterclass`; contém nome da clínica / CTA de agendamento ou WhatsApp.
2. **Masterclass acessível** — `/masterclass` renderiza título da Masterclass + formulário com campos obrigatórios rotulados.
3. **Form feedback** — submit pendente desabilita CTA / mostra estado de loading (UI).
4. **Obrigado** — `/obrigado` mostra confirmação (“Obrigado” / lista de prioridade).
5. **Design contract** — páginas do funil **não** usam classes legado (`brand-terracotta`, `bg-page-atmosphere`) — assert via teste de arquivo/snapshot de classes críticas ou lint de grep no CI (preferir teste E2E visual/semântico + grep em testes de contrato).

### Regra TDD

- RED → GREEN → refactor por fatia vertical.
- Testar comportamento público, não detalhes internos (não mockar Prisma nos testes de UI do form; mockar só a Server Action na borda do client component).
- Novos testes de frontend falham antes da restylização/merge quando o contrato ainda não existe.

## Boundaries

**Always:**
- Manter comportamento de `createLead` (validação Zod, honeypot, attribution, redirect).
- Preservar pixels condicionais a env vars.
- Rodar `npm test` (e E2E quando existir) antes de considerar a fatia pronta.
- Usar tokens da landing; Lucide para ícones.
- Respeitar `prefers-reduced-motion` e touch targets ≥44px no form.

**Ask first:**
- Alterar schema Prisma / migrations.
- Mudar copy da landing ou campos do formulário.
- Adicionar dependências além das listadas (shadcn stack + Playwright + Testing Library).
- Cutover de domínio / desligar projeto Vercel `odonto-solution`.
- Introduzir dark mode.

**Never:**
- Commitar `.env` / secrets.
- Manter dois temas (`--brand-*` + shadcn) após a unificação.
- Redesenhar seções da landing “do zero”.
- Remover tracking ou campos do lead sem aprovação.
- Usar emojis como ícones estruturais.

## Success Criteria

- [ ] Spec aprovada → Plan → Tasks (gated).
- [ ] `app/page.tsx` é a landing; não há `redirect("/masterclass")` na home.
- [ ] `/masterclass` e `/obrigado` usam tipografia Playfair/DM Sans e tokens `primary` / `foreground` / `muted-foreground`.
- [ ] Zero ocorrências de `brand-terracotta`, `brand-cream`, `bg-page-atmosphere` no código de UI.
- [ ] Assets da landing (`public/images/**`, `logo.png`) presentes e referenciados.
- [ ] Dependências shadcn da landing instaladas; `components/ui/button` etc. disponíveis.
- [ ] Testes Vitest (lib + UI) e Playwright (rotas) passando.
- [ ] `npm run build` passa.
- [ ] Tracking em `/obrigado` intacto.

## Out of Scope

- Redesign de conteúdo/seções da landing.
- Alteração de campos ou regras de negócio do lead.
- Merge/arquivamento automático do repo `odonto-solution` no GitHub.
- Dark mode.
- CMS / i18n.

## Open Questions

1. **Logo:** consolidar em `/logo.png` (landing) e remover `public/brand/logo*.png`, ou manter variantes light/dark do forms no header da landing?
2. **Link Masterclass na nav da landing:** incluir item “Masterclass” / CTA no header, ou funil só via URL direta de ads?
3. **Playwright no CI:** rodar só local nesta branch, ou já adicionar job (se houver CI)?
4. **Domínio de produção:** após merge, o domínio principal aponta para este projeto Vercel — confirmar se cutover entra no mesmo PR ou é passo operacional separado.

## Assumptions (locked unless corrected)

1. Repo alvo = `odonto-solution-forms`.
2. Design = landing existente (não a paleta alternativa gerada pelo Pro Max com Inter/preto).
3. Nesta entrega: apenas docs gated; implementação após Tasks aprovadas.
4. Branch de trabalho: `feat/unify-landing-and-masterclass`.
