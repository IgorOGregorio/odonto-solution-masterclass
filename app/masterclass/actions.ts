'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { createLeadSchema, type CreateLeadInput } from '@/lib/lead-schema'

export type CreateLeadResult =
  | { ok: true }
  | { ok: false; fieldErrors: Record<string, string[]> }

export async function createLead(
  input: CreateLeadInput,
): Promise<CreateLeadResult> {
  // Honeypot preenchido = bot. Não persiste, mas finge sucesso (redirect normal)
  // para não expor a lógica anti-spam a quem estiver testando o form.
  if (input.honeypot && input.honeypot.trim().length > 0) {
    redirect('/obrigado')
  }

  const parsed = createLeadSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- excluído de `data` de propósito
  const { honeypot: _honeypot, ...data } = parsed.data
  const h = await headers()

  await prisma.lead.create({
    data: {
      ...data,
      userAgent: h.get('user-agent') ?? undefined,
      referrer: h.get('referer') ?? undefined,
    },
  })

  redirect('/obrigado')
}
