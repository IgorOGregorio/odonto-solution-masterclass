import { z } from 'zod'

// Espelha prisma/schema.prisma — mantenha os dois em sincronia manualmente.
export const professionEnum = z.enum(['DENTIST', 'DENTAL_STUDENT', 'OTHER'])
export const phaseEnum = z.enum([
  'NEVER_APPLIED',
  'TOOK_COURSE_NOT_CONFIDENT',
  'ALREADY_APPLIES',
  'WANT_TO_START_HARMONIZATION',
])
export const intentEnum = z.enum(['AS_SOON_AS_OPEN', 'NEXT_3_MONTHS', 'STILL_RESEARCHING'])
export const sourceEnum = z.enum(['INSTAGRAM', 'FACEBOOK', 'REFERRAL', 'WHATSAPP', 'OTHER'])

const whatsappDigitsSchema = z
  .string({ error: 'WhatsApp é obrigatório' })
  .min(1, 'WhatsApp é obrigatório')
  .refine((value) => {
    const digits = value.replace(/\D/g, '')
    return digits.length >= 10 && digits.length <= 11
  }, 'WhatsApp deve conter DDD + número (10 ou 11 dígitos)')

const leadFormBaseSchema = z.object({
  fullName: z.string().trim().min(3, 'Nome completo deve ter ao menos 3 caracteres'),
  whatsapp: whatsappDigitsSchema,
  email: z.email('E-mail inválido'),
  cityState: z.string().trim().min(3, 'Cidade e Estado deve ter ao menos 3 caracteres'),
  profession: professionEnum,
  professionOther: z.string().trim().optional(),
  cro: z.string().trim().optional(),
  phase: phaseEnum,
  goal: z.string().trim().min(10, 'Descreva seu objetivo com ao menos 10 caracteres'),
  intent: intentEnum,
  source: sourceEnum,
  sourceOther: z.string().trim().optional(),
  whatsappConsent: z.boolean(),
  mainDifficulty: z.string().trim().min(10, 'Descreva sua dificuldade com ao menos 10 caracteres'),
  // Validado como "deve estar vazio" na Server Action, não aqui.
  honeypot: z.string().optional(),
})

export const leadFormSchema = leadFormBaseSchema.superRefine((data, ctx) => {
  if (data.profession === 'OTHER' && !data.professionOther?.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: 'Especifique sua profissão',
      path: ['professionOther'],
    })
  }

  if (data.source === 'OTHER' && !data.sourceOther?.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: 'Especifique como conheceu a Masterclass',
      path: ['sourceOther'],
    })
  }
})

export type LeadFormInput = z.infer<typeof leadFormSchema>

export const attributionSchema = z.object({
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  fbclid: z.string().optional(),
  gclid: z.string().optional(),
  referrer: z.string().optional(),
  landingPath: z.string().optional(),
})

export type AttributionInput = z.infer<typeof attributionSchema>

// Usado pela Server Action: combina o form do client com a atribuição de campanha.
// `.and()` preserva o `.superRefine()` de `leadFormSchema`.
export const createLeadSchema = leadFormSchema.and(attributionSchema.partial())

export type CreateLeadInput = z.infer<typeof createLeadSchema>
