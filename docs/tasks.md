# Tasks: Formulário de Lista de Interesse – Masterclass Odonto Solution

Referência: [`docs/spec.md`](./spec.md) · [`docs/plan.md`](./plan.md)

Convenção: tasks ordenadas por dependência. `⏸ checkpoint humano` marca onde preciso de uma ação/decisão sua antes de continuar.

---

## Bloco 1 — Scaffold do projeto

- [ ] Task: Criar projeto Next.js (TypeScript, App Router, Tailwind, ESLint) na raiz do repo com `create-next-app`
  - Acceptance: `npm run dev` sobe a página default do Next sem erros
  - Verify: `npm run build && npm run dev`
  - Files: raiz do projeto (gerado pelo scaffold)

- [ ] Task: Instalar dependências principais (`prisma`, `@prisma/client`, `zod`) e configurar path alias `@/*` no `tsconfig.json`
  - Acceptance: import `@/lib/x` resolve sem erro no editor/build
  - Verify: `npm run build`
  - Files: `package.json`, `tsconfig.json`

---

## Bloco 2 — Tema visual (marca)

- [ ] Task: Copiar/otimizar assets essenciais (`Logotipo 01.png`, ícone "S", `Pattern.png`) de `assets/` para `public/brand/`
  - Acceptance: arquivos disponíveis em `public/brand/` com nomes normalizados (`logo.png`, `icon.png`, `pattern.png`)
  - Verify: inspeção visual dos arquivos copiados
  - Files: `public/brand/*`

- [ ] Task: Definir tokens de cor da marca no Tailwind (`brand-cream #E6E2DC`, `brand-terracotta #B17F55`, `brand-ink #1E1E1E`)
  - Acceptance: classes `bg-brand-cream`, `text-brand-terracotta`, etc. funcionam
  - Verify: `npm run build` + preview visual numa página de teste
  - Files: `app/globals.css` (ou `tailwind.config.ts`)

- [ ] Task: Configurar par de fontes via `next/font` (serif para títulos, sans tracked para labels) e aplicar no `layout.tsx`
  - Acceptance: título "Odonto Solution" style renderiza com a fonte serif; labels usam a sans
  - Verify: inspeção visual + `npm run build`
  - Files: `app/layout.tsx`, `app/fonts.ts` (novo)

- [ ] Task: Criar componente `components/brand/logo.tsx` (wordmark + ícone via `next/image`)
  - Acceptance: componente renderiza logo com `alt` adequado, responsivo
  - Verify: render manual em página de teste
  - Files: `components/brand/logo.tsx`

---

## Bloco 3 — Prisma + Supabase

- [ ] Task: Escrever `prisma/schema.prisma` com model `Lead` e enums (`Profession`, `Phase`, `Intent`, `Source`) conforme spec
  - Acceptance: `npx prisma validate` passa sem erros
  - Verify: `npx prisma validate`
  - Files: `prisma/schema.prisma`

- [ ] Task: Criar `.env.example` com `DATABASE_URL` (pooler) e `DIRECT_URL` (direto) documentados
  - Acceptance: arquivo explica formato esperado de cada variável em comentário
  - Verify: revisão manual
  - Files: `.env.example`

- [ ] Task: ⏸ **checkpoint humano** — criar projeto no Supabase e fornecer/colar `DATABASE_URL` e `DIRECT_URL` reais em `.env` local
  - Acceptance: `.env` local populado (não commitado)
  - Verify: `npx prisma db pull` ou tentativa de conexão bem-sucedida
  - Files: `.env` (local, gitignored)

- [ ] Task: Rodar primeira migration (`npx prisma migrate dev --name init`) e gerar client
  - Acceptance: tabela `Lead` criada no Supabase; `npx prisma studio` mostra a tabela vazia
  - Verify: `npx prisma migrate dev --name init` sem erros + `npx prisma studio`
  - Files: `prisma/migrations/*`

- [ ] Task: Criar singleton do Prisma Client em `lib/prisma.ts` (padrão recomendado para Next.js/serverless)
  - Acceptance: import único evita múltiplas instâncias em dev (hot reload)
  - Verify: `npm run dev` sem warnings de múltiplas conexões
  - Files: `lib/prisma.ts`

---

## Bloco 4 — Zod schema + tipos

- [x] Task: Criar `lib/lead-schema.ts` com schema Zod espelhando os enums do Prisma e validações básicas (obrigatórios, formato de e-mail)
  - Acceptance: schema exporta `leadFormSchema` e tipo `LeadFormInput` (`z.infer`); também exporta `attributionSchema`/`AttributionInput` e `createLeadSchema`/`CreateLeadInput` para uso futuro na Server Action
  - Verify: `npm run test`
  - Files: `lib/lead-schema.ts`

- [x] Task: Adicionar `.superRefine` para campos condicionais (`professionOther` obrigatório se `profession === 'OTHER'`; `sourceOther` obrigatório se `source === 'OTHER'`)
  - Acceptance: `safeParse` falha com erro no path correto quando condicional não é respeitada
  - Verify: `npm run test`
  - Files: `lib/lead-schema.ts`

---

## Bloco 5 — Server Action `createLead`

- [ ] Task: Implementar `app/masterclass/actions.ts` com `createLead(input)`: valida via Zod, grava via Prisma, captura `headers()` (user-agent, referer)
  - Acceptance: retorna `{ ok: true }` em sucesso e `{ ok: false, fieldErrors }` em falha de validação, nunca lança exception para o client
  - Verify: chamada manual da action a partir de uma página de teste/console
  - Files: `app/masterclass/actions.ts`

- [ ] Task: Adicionar `redirect('/obrigado')` na Action após persistência bem-sucedida
  - Acceptance: submissão válida navega para `/obrigado` sem reload full-page perceptível
  - Verify: teste manual do fluxo completo
  - Files: `app/masterclass/actions.ts`

---

## Bloco 6 — UI: `InterestForm` (protótipo primeiro, depois escala)

- [ ] Task: Prototipar fluxo mínimo — 1 campo de texto (`fullName`) + submit via `useActionState` chamando `createLead`, validando o padrão de redirect/erro no Next 15
  - Acceptance: submit com campo vazio mostra erro inline; submit válido redireciona para `/obrigado`
  - Verify: teste manual no browser
  - Files: `components/form/interest-form.tsx` (versão inicial)

- [ ] Task: Criar subcomponentes reutilizáveis `TextField`, `TextareaField`, `RadioGroupField` estilizados com o tema da marca
  - Acceptance: cada subcomponente aceita `name`, `label`, `error`, `required` e renderiza consistente
  - Verify: Storybook-like página de teste ou inspeção visual direta no form
  - Files: `components/form/fields/text-field.tsx`, `textarea-field.tsx`, `radio-group-field.tsx`

- [ ] Task: Expandir `InterestForm` para as 12 perguntas completas do briefing, na ordem exata
  - Acceptance: todos os campos da spec presentes com os textos/opções exatos do briefing
  - Verify: comparação campo a campo com `docs/spec.md` (tabela de mapeamento)
  - Files: `components/form/interest-form.tsx`

- [ ] Task: Implementar campos condicionais (Profissão "Outro" → input extra; Origem "Outro" → input extra) com exibição dinâmica no client
  - Acceptance: input extra aparece somente quando "Outro" é selecionado e é obrigatório nesse caso
  - Verify: teste manual + validação de erro se condicional não preenchida
  - Files: `components/form/interest-form.tsx`

- [ ] Task: Adicionar máscara de WhatsApp (DDD) ao campo `whatsapp`
  - Acceptance: input formata como `(11) 91234-5678` durante digitação, valor limpo enviado ao schema
  - Verify: teste manual de digitação
  - Files: `components/form/fields/` (novo `phone-field.tsx` ou ajuste no `text-field.tsx`)

- [ ] Task: Adicionar honeypot (campo oculto anti-spam) ao form e rejeitar silenciosamente na Action se preenchido
  - Acceptance: bots que preenchem todos os campos (incluindo o honeypot) não geram `Lead`, mas usuário recebe redirect normal (não expõe a lógica anti-spam)
  - Verify: teste manual simulando preenchimento do honeypot via devtools
  - Files: `components/form/interest-form.tsx`, `app/masterclass/actions.ts`

---

## Bloco 7 — Página `/masterclass`

- [ ] Task: Criar `app/masterclass/page.tsx` com cabeçalho, texto de introdução (textos exatos do briefing) e `<InterestForm />`
  - Acceptance: textos idênticos ao briefing fornecido pelo usuário
  - Verify: comparação manual texto a texto
  - Files: `app/masterclass/page.tsx`

- [ ] Task: Adicionar metadata (`title`, `description`, Open Graph básico) para uso em anúncios/compartilhamento
  - Acceptance: `generateMetadata`/`metadata` export presente e correto
  - Verify: inspeção de `<head>` renderizado
  - Files: `app/masterclass/page.tsx`

- [ ] Task: Criar `app/page.tsx` com redirect para `/masterclass`
  - Acceptance: acessar `/` redireciona para `/masterclass`
  - Verify: teste manual no browser
  - Files: `app/page.tsx`

---

## Bloco 8 — Página `/obrigado`

- [ ] Task: Criar `app/obrigado/page.tsx` com a mensagem final exata do briefing
  - Acceptance: texto idêntico ao briefing ("🎉 Obrigado pelo seu interesse!...")
  - Verify: comparação manual texto a texto
  - Files: `app/obrigado/page.tsx`

---

## Bloco 9 — Tracking: Meta Pixel + Google tag

- [ ] Task: Criar `components/tracking/meta-pixel.tsx` (via `next/script`), retornando `null` se `NEXT_PUBLIC_META_PIXEL_ID` não existir
  - Acceptance: sem a env var, nenhum script é injetado no HTML; com a env var, `fbq('init', ...)` + `PageView` disparam
  - Verify: inspeção do HTML renderizado com/sem env var; Meta Pixel Helper
  - Files: `components/tracking/meta-pixel.tsx`

- [ ] Task: Criar `components/tracking/google-tag.tsx` (via `next/script`), retornando `null` se `NEXT_PUBLIC_GA_MEASUREMENT_ID` não existir
  - Acceptance: mesmo comportamento condicional do Meta Pixel, mas para `gtag.js`
  - Verify: inspeção do HTML + Google Tag Assistant
  - Files: `components/tracking/google-tag.tsx`

- [ ] Task: Integrar `<MetaPixel />` e `<GoogleTag />` no `app/layout.tsx`
  - Acceptance: scripts presentes em todas as páginas quando env vars configuradas; ausentes quando não
  - Verify: teste com e sem env vars localmente
  - Files: `app/layout.tsx`

- [ ] Task: Criar `components/tracking/conversion-events.tsx` (client) que dispara `fbq('track','Lead')` e `gtag('event', 'generate_lead'/'conversion')` no mount, condicional às env vars
  - Acceptance: eventos disparam apenas em `/obrigado`, apenas se as env vars existirem
  - Verify: Pixel Helper / Tag Assistant + teste sem env vars (nenhum erro no console)
  - Files: `components/tracking/conversion-events.tsx`

- [ ] Task: Integrar `<ConversionEvents />` em `app/obrigado/page.tsx`
  - Acceptance: página de obrigado dispara conversão sem afetar renderização do texto principal (RSC)
  - Verify: teste manual completo do funil
  - Files: `app/obrigado/page.tsx`

- [ ] Task: Verificar critério de sucesso "form funciona sem nenhuma env var de pixel" — teste completo do funil com `.env` sem as 4 variáveis de pixel
  - Acceptance: nenhum erro de console, nenhum script de pixel presente, submissão e redirect funcionam normalmente
  - Verify: teste manual dedicado, checklist da spec
  - Files: n/a (verificação)

---

## Bloco 10 — Attribution (UTM / fbclid / gclid)

- [ ] Task: Criar `lib/attribution.ts` com função que lê `window.location.search` e retorna objeto tipado (`utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`, `fbclid`, `gclid`)
  - Acceptance: função pura, testável, sem side effects diretos
  - Verify: cobrir no Bloco 11 (testes unitários)
  - Files: `lib/attribution.ts`

- [ ] Task: Implementar persistência first-touch em `sessionStorage` (grava na primeira visita da sessão; não sobrescreve se já existir, exceto se novos parâmetros de UTM chegarem)
  - Acceptance: navegar entre páginas do site mantém a atribuição original da primeira visita
  - Verify: teste manual navegando com/sem querystring entre páginas
  - Files: `lib/attribution.ts`

- [ ] Task: Integrar leitura da atribuição salva no `InterestForm` e incluir no payload enviado à Server Action `createLead`
  - Acceptance: `Lead` criado no banco contém os campos de atribuição corretos quando a URL de origem tinha UTM/fbclid/gclid
  - Verify: teste manual com URL simulando anúncio + inspeção via Prisma Studio
  - Files: `components/form/interest-form.tsx`, `app/masterclass/actions.ts`

---

## Bloco 11 — Testes unitários

- [x] Task: Configurar Vitest (`vitest.config.ts`, script `"test": "vitest run"` no `package.json`)
  - Acceptance: `npm run test` executa sem erros (mesmo com 0 testes ainda)
  - Verify: `npm run test`
  - Files: `vitest.config.ts`, `package.json`

- [x] Task: Escrever `lib/lead-schema.test.ts` cobrindo: payload válido completo, campos obrigatórios ausentes, condicional "Outro" (profissão e origem) faltando/presente
  - Acceptance: todos os casos passam, cobertura dos branches condicionais
  - Verify: `npm run test`
  - Files: `lib/lead-schema.test.ts`

- [ ] Task: Escrever `lib/attribution.test.ts` cobrindo: querystring completa com UTM+fbclid+gclid, querystring vazia, querystring parcial
  - Acceptance: todos os casos passam
  - Verify: `npm run test`
  - Files: `lib/attribution.test.ts`

---

## Bloco 12 — `.env.example` final + docs de deploy

- [ ] Task: Atualizar `.env.example` com todas as variáveis (banco + pixels), cada uma comentada
  - Acceptance: arquivo cobre `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
  - Verify: revisão manual comparando com uso real no código (`grep` por `process.env`)
  - Files: `.env.example`

- [ ] Task: Ajustar `package.json` `build` script para `"prisma generate && prisma migrate deploy && next build"`
  - Acceptance: `npm run build` local roda os três passos em sequência sem erro
  - Verify: `npm run build`
  - Files: `package.json`

---

## Bloco 13 — Deploy

- [ ] Task: ⏸ **checkpoint humano** — conectar repositório ao projeto Vercel (import do repo Git)
  - Acceptance: projeto criado na Vercel apontando para este repo
  - Verify: dashboard da Vercel mostra o projeto
  - Files: n/a

- [ ] Task: ⏸ **checkpoint humano** — configurar env vars de produção no dashboard da Vercel (banco + pixels, quando disponíveis)
  - Acceptance: env vars visíveis no dashboard, sem valores expostos em código
  - Verify: dashboard da Vercel
  - Files: n/a

- [ ] Task: Disparar deploy e validar build de produção
  - Acceptance: build verde na Vercel, `Lead` de teste criado com sucesso em produção via Prisma Studio/Supabase
  - Verify: acessar URL `*.vercel.app`, submeter form de teste, checar Supabase
  - Files: n/a

---

## Resumo de Checkpoints Humanos

| Bloco | Checkpoint |
|---|---|
| 3 | Criar projeto Supabase e fornecer `DATABASE_URL`/`DIRECT_URL` |
| 13 | Conectar repo à Vercel |
| 13 | Configurar env vars de produção na Vercel |
