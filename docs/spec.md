# Spec: Formulário de Lista de Interesse – Masterclass Odonto Solution

## Objetivo

Construir um monolito Next.js que hospeda uma landing page de captura de leads ("Lista de Interesse") para a Masterclass em Toxina Botulínica na Odontologia e Preenchimento Facial Avançado, da clínica Odonto Solution.

O tráfego chega via anúncios pagos (Meta Ads, Google Ads). O formulário precisa:
- Capturar as 12 perguntas do briefing do cliente.
- Persistir cada resposta como um `Lead` no Postgres (Supabase), junto com dados de atribuição de campanha (UTM, `fbclid`, `gclid`, referrer, user agent).
- Disparar pixels de conversão (Meta Pixel, Google Ads/GA4) na página de agradecimento, para otimização das campanhas.
- Ter identidade visual da marca Odonto Solution (paleta bege/terracota, wordmark serifado, ícone "S").

**Usuário:** pessoa interessada na Masterclass, chegando via anúncio, em mobile na maioria dos casos.

**Sucesso:** um lead completa o formulário → registro aparece no banco com atribuição correta → evento de conversão é registrado no Meta/Google Ads Manager.

## Tech Stack

- **Framework:** Next.js 15 (App Router), TypeScript, React Server Components.
- **BFF:** Server Actions do próprio Next (sem serviço de backend separado).
- **ORM:** Prisma (`@prisma/client`, `prisma`).
- **Banco:** PostgreSQL via Supabase (free tier), usando connection pooler (porta 6543) para runtime + `directUrl` (porta 5432) para migrations.
- **Validação:** Zod.
- **Estilo:** Tailwind CSS v4, com tokens de tema mapeados da marca (`brand.cream`, `brand.terracotta`, `brand.ink`).
- **Fontes:** `next/font` — um par serif (títulos, ex: Playfair Display/Cormorant) + sans tracked (labels/caption, ex: Inter/Manrope), aproximando o estilo do logotipo.
- **Pixels:** scripts client-side (Meta Pixel `fbevents.js`, Google `gtag.js`) carregados via `next/script`, condicionados a env vars.
- **Deploy:** Vercel (plano Hobby/free), runtime Node.js (não Edge, por causa do Prisma).
- **Lint/Format:** ESLint + Prettier (config padrão do `create-next-app`).

## Commands

```bash
# instalação
npm install

# dev
npm run dev

# build (inclui prisma generate via postinstall)
npm run build

# start produção local
npm run start

# lint
npm run lint

# migrations (dev, cria migration + aplica)
npx prisma migrate dev --name <nome>

# aplicar migrations em produção (usado no build da Vercel)
npx prisma migrate deploy

# abrir Prisma Studio (inspecionar leads localmente)
npx prisma studio
```

## Project Structure

```
app/
  layout.tsx                # fontes, metadata, scripts de pixel (condicional a env)
  globals.css                # tema Tailwind com tokens da marca
  page.tsx                   # redirect para /masterclass
  masterclass/
    page.tsx                 # RSC: cabeçalho + texto + <InterestForm />
    actions.ts               # Server Action createLead (BFF)
  obrigado/
    page.tsx                 # mensagem final + dispara eventos de conversão (client)

components/
  brand/
    logo.tsx                 # wordmark/ícone via next/image
  tracking/
    meta-pixel.tsx           # <script> Meta Pixel, PageView
    google-tag.tsx            # <script> gtag.js, page_view
    conversion-events.tsx    # client component: dispara Lead/conversion em /obrigado
  form/
    interest-form.tsx        # client component: os 12 campos + submissão
    fields/                  # subcomponentes de campo (radio-group, text, textarea)

lib/
  prisma.ts                  # singleton PrismaClient
  lead-schema.ts             # Zod schema + enums espelhando o Prisma
  attribution.ts             # parse/persist de UTM, fbclid, gclid (client helper)
  env.ts                     # leitura tipada de env vars públicas/privadas

prisma/
  schema.prisma
  migrations/

public/
  brand/                     # assets exportados da pasta assets/ (logo, ícone, pattern)

docs/
  spec.md                    # este documento
  plan.md                    # (fase 2)
  tasks.md                   # (fase 3)

.env.example
```

## Modelo de Dados (Prisma)

```prisma
model Lead {
  id              String   @id @default(cuid())

  fullName        String
  whatsapp        String
  email           String
  cityState       String

  profession      Profession
  professionOther String?

  cro             String?

  phase           Phase

  goal            String   @db.Text

  intent          Intent

  source          Source
  sourceOther     String?

  whatsappConsent Boolean

  mainDifficulty  String   @db.Text

  // atribuição de campanha (ads)
  utmSource       String?
  utmMedium       String?
  utmCampaign     String?
  utmContent      String?
  utmTerm         String?
  fbclid          String?
  gclid           String?
  referrer        String?
  landingPath     String?
  userAgent       String?
  ipHash          String?

  createdAt       DateTime @default(now())

  @@index([email])
  @@index([whatsapp])
  @@index([createdAt])
  @@index([utmCampaign])
}

enum Profession {
  DENTIST
  DENTAL_STUDENT
  OTHER
}

enum Phase {
  NEVER_APPLIED
  TOOK_COURSE_NOT_CONFIDENT
  ALREADY_APPLIES
  WANT_TO_START_HARMONIZATION
}

enum Intent {
  AS_SOON_AS_OPEN
  NEXT_3_MONTHS
  STILL_RESEARCHING
}

enum Source {
  INSTAGRAM
  FACEBOOK
  REFERRAL
  WHATSAPP
  OTHER
}
```

Mapeamento pergunta → campo:

| # | Pergunta | Campo | Tipo |
|---|----------|-------|------|
| 1 | Nome completo | `fullName` | texto obrigatório |
| 2 | WhatsApp (com DDD) | `whatsapp` | texto obrigatório, máscara BR |
| 3 | E-mail | `email` | texto obrigatório, validado |
| 4 | Cidade e Estado | `cityState` | texto obrigatório |
| 5 | Profissão | `profession` (+ `professionOther`) | radio + condicional |
| 6 | CRO (opcional) | `cro` | texto opcional |
| 7 | Em que fase você está? | `phase` | radio obrigatório |
| 8 | Maior objetivo com o curso | `goal` | textarea obrigatório |
| 9 | Pretende fazer o curso | `intent` | radio obrigatório |
| 10 | Como conheceu a Masterclass? | `source` (+ `sourceOther`) | radio + condicional |
| 11 | Autoriza contato via WhatsApp? | `whatsappConsent` | radio sim/não obrigatório |
| 12 | Maior dificuldade com Botox/Preenchimento | `mainDifficulty` | textarea obrigatório |

## Identidade Visual

Extraída de `assets/Logotipo 01.png`, `assets/logotipo 02.png`, `assets/Pattern.png`:

- `--brand-cream: #E6E2DC` — fundo padrão das páginas.
- `--brand-terracotta: #B17F55` — cor de destaque (botões, títulos secundários, ícone).
- `--brand-ink: #1E1E1E` — texto principal.
- `--brand-white: #FFFFFF` — texto sobre terracota.
- Wordmark serifado ("Odonto Solution") + caption tracked uppercase ("CLÍNICA ODONTOLÓGICA") → par de fontes serif (headings) + sans tracked (labels).
- Ícone "S" estilizado (`Logotipo 01.png` recortado) usado como selo decorativo; `Pattern.png` usado como textura de fundo em baixa opacidade em seções decorativas (ex: header, footer), nunca atrás de texto de leitura longa.

## Code Style

Exemplo de Server Action (BFF) seguindo o padrão do projeto:

```ts
// app/masterclass/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { leadSchema, type LeadInput } from '@/lib/lead-schema'
import { headers } from 'next/headers'

export type CreateLeadResult =
  | { ok: true }
  | { ok: false; fieldErrors: Record<string, string[]> }

export async function createLead(input: LeadInput): Promise<CreateLeadResult> {
  const parsed = leadSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const h = await headers()

  await prisma.lead.create({
    data: {
      ...parsed.data,
      userAgent: h.get('user-agent') ?? undefined,
      referrer: h.get('referer') ?? undefined,
    },
  })

  return { ok: true }
}
```

Convenções:
- Componentes React em `PascalCase`, arquivos em `kebab-case.tsx`.
- Server Actions retornam um discriminated union (`{ ok: true }` / `{ ok: false, ... }`), nunca lançam para o client.
- Zod schema é a única fonte de verdade de validação; enums do Prisma e do Zod ficam sincronizados manualmente (comentário no schema apontando para o outro arquivo).
- Sem comentários redundantes — só onde a intenção não é óbvia (ex: por que `directUrl` existe).
- Client components só onde há interatividade (form, tracking); o resto é RSC.

## Testing Strategy

- **Framework:** Vitest para unit tests (schema Zod, helpers de atribuição).
- **Escopo v1:**
  - Unit: `lead-schema.test.ts` — casos válidos/inválidos, condicionais (`professionOther`, `sourceOther`).
  - Unit: `attribution.test.ts` — parsing de UTM/fbclid/gclid a partir de querystring.
  - Manual/checklist: submissão end-to-end local com Prisma Studio para confirmar persistência; Meta Pixel Helper e Google Tag Assistant para confirmar disparo de eventos em `/obrigado`.
- Testes de integração de banco (Server Action → Postgres real) ficam como melhoria futura (fora do escopo da v1, dado o tempo/free tier).
- Local: `npm run test`.

## Boundaries

- **Sempre fazer:**
  - Validar todo input no server via Zod antes de tocar o Prisma.
  - Rodar `npm run lint` e `npm run build` antes de considerar uma task concluída.
  - Usar o pooler do Supabase (`DATABASE_URL`) em runtime e `DIRECT_URL` só para migrations.
  - Disparar eventos de conversão apenas em `/obrigado`, nunca antes da confirmação de persistência.
- **Perguntar antes:**
  - Adicionar novas dependências além das já definidas na stack.
  - Mudanças no schema Prisma que alterem campos já em produção.
  - Adicionar CAPTCHA, admin/login, ou multi-campanha (fora do escopo v1).
  - Implementar Meta CAPI / Google Enhanced Conversions (requer tokens/PII hashing).
- **Nunca fazer:**
  - Commitar `.env`/segredos (`DATABASE_URL`, `DIRECT_URL`, tokens de pixel privados).
  - Disparar conversão de pixel antes de confirmar que o lead foi salvo.
  - Remover validação server-side "porque o client já valida".

## Success Criteria

- [ ] `npm run build` passa sem erros de tipo/lint.
- [ ] Formulário em `/masterclass` renderiza as 12 perguntas com os textos exatos do briefing (cabeçalho, texto intro, opções de cada pergunta).
- [ ] Submissão válida cria um registro `Lead` no Postgres (Supabase) com todos os campos preenchidos corretamente, incluindo UTM/fbclid/gclid quando presentes na URL.
- [ ] Submissão inválida (ex: e-mail malformado, campo obrigatório vazio) exibe erro no campo específico, sem persistir nada.
- [ ] Após submissão bem-sucedida, usuário é redirecionado para `/obrigado` com a mensagem final exata do briefing.
- [ ] Em `/obrigado`, Meta Pixel dispara evento `Lead` e Google dispara `conversion`/`generate_lead`, visível no Pixel Helper / Tag Assistant, apenas quando as respectivas env vars estão configuradas.
- [ ] Com todas as env vars de pixel **ausentes**, o formulário, a submissão e a página de obrigado funcionam normalmente (nenhum script de pixel é renderizado, nenhum erro no console).
- [ ] Identidade visual usa a paleta/tipografia extraída da marca (bege, terracota, tinta, wordmark serifado).
- [ ] Projeto builda e deploya com sucesso na Vercel (Hobby) apontando para o Supabase free tier.
- [ ] `.env.example` documenta todas as variáveis necessárias.

## Open Questions (resolvidas)

1. ✅ Textos exatos das opções de rádio — confirmados, sem alterações.
2. ✅ Pergunta 6 (CRO) é texto livre, sem validação de formato.
3. ✅ IDs do Meta Pixel / Google Ads serão adicionados depois via env vars na Vercel. **O formulário e o fluxo de submissão devem funcionar 100% sem essas env vars configuradas** — os scripts de pixel só renderizam/disparam se a env var correspondente existir; ausência delas não pode quebrar o form nem a página de obrigado.
4. ✅ Deploy inicial no subdomínio padrão da Vercel (`*.vercel.app`); domínio próprio será configurado depois, sem impacto na arquitetura.
