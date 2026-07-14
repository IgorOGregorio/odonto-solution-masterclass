import { describe, expect, it } from 'vitest'
import { parseAttributionFromSearch } from './attribution'

describe('parseAttributionFromSearch', () => {
  it('extrai todos os parâmetros quando presentes', () => {
    const search =
      '?utm_source=meta&utm_medium=cpc&utm_campaign=masterclass&utm_content=video1&utm_term=botox&fbclid=fb123&gclid=gc456'

    expect(parseAttributionFromSearch(search)).toEqual({
      utmSource: 'meta',
      utmMedium: 'cpc',
      utmCampaign: 'masterclass',
      utmContent: 'video1',
      utmTerm: 'botox',
      fbclid: 'fb123',
      gclid: 'gc456',
    })
  })

  it('retorna objeto vazio para querystring vazia', () => {
    expect(parseAttributionFromSearch('')).toEqual({})
  })

  it('extrai apenas os parâmetros presentes em querystring parcial', () => {
    const search = '?utm_source=google&fbclid=fb789'

    expect(parseAttributionFromSearch(search)).toEqual({
      utmSource: 'google',
      fbclid: 'fb789',
    })
  })

  it('ignora parâmetros vazios', () => {
    const search = '?utm_source=&utm_campaign=summer'

    expect(parseAttributionFromSearch(search)).toEqual({
      utmCampaign: 'summer',
    })
  })
})
