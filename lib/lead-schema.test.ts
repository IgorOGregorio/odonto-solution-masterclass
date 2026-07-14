import { describe, expect, it } from 'vitest'
import { leadFormSchema } from './lead-schema'

const validPayload = {
  fullName: 'Maria da Silva',
  whatsapp: '(11) 91234-5678',
  email: 'maria@example.com',
  cityState: 'São Paulo, SP',
  profession: 'DENTIST' as const,
  cro: 'CRO-SP 12345',
  phase: 'NEVER_APPLIED' as const,
  goal: 'Quero aprender a aplicar toxina botulínica com segurança.',
  intent: 'AS_SOON_AS_OPEN' as const,
  source: 'INSTAGRAM' as const,
  whatsappConsent: true,
  mainDifficulty: 'Tenho dificuldade em definir a dosagem correta para cada paciente.',
}

describe('leadFormSchema', () => {
  it('aceita um payload válido completo', () => {
    const result = leadFormSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('rejeita profession OTHER sem professionOther', () => {
    const result = leadFormSchema.safeParse({ ...validPayload, profession: 'OTHER' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'))
      expect(paths).toContain('professionOther')
    }
  })

  it('rejeita profession OTHER com professionOther vazio', () => {
    const result = leadFormSchema.safeParse({
      ...validPayload,
      profession: 'OTHER',
      professionOther: '   ',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'))
      expect(paths).toContain('professionOther')
    }
  })

  it('aceita profession OTHER com professionOther preenchido', () => {
    const result = leadFormSchema.safeParse({
      ...validPayload,
      profession: 'OTHER',
      professionOther: 'Biomédica esteta',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita source OTHER sem sourceOther', () => {
    const result = leadFormSchema.safeParse({ ...validPayload, source: 'OTHER' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'))
      expect(paths).toContain('sourceOther')
    }
  })

  it('aceita source OTHER com sourceOther preenchido', () => {
    const result = leadFormSchema.safeParse({
      ...validPayload,
      source: 'OTHER',
      sourceOther: 'Indicação de uma amiga',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita payload sem email', () => {
    const withoutEmail: Record<string, unknown> = { ...validPayload }
    delete withoutEmail.email
    const result = leadFormSchema.safeParse(withoutEmail)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'))
      expect(paths).toContain('email')
    }
  })

  it('rejeita whatsapp com poucos dígitos', () => {
    const result = leadFormSchema.safeParse({ ...validPayload, whatsapp: '123456' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'))
      expect(paths).toContain('whatsapp')
    }
  })
})
