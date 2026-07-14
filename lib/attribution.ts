import type { AttributionInput } from "@/lib/lead-schema";

const STORAGE_KEY = "odonto-attribution";

const UTM_PARAM_MAP = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
} as const satisfies Record<string, keyof AttributionInput>;

const CLICK_ID_PARAM_MAP = {
  fbclid: "fbclid",
  gclid: "gclid",
} as const satisfies Record<string, keyof AttributionInput>;

function hasAnyUtmField(attribution: AttributionInput): boolean {
  return Object.values(UTM_PARAM_MAP).some((field) => Boolean(attribution[field]));
}

export function parseAttributionFromSearch(search: string): AttributionInput {
  const params = new URLSearchParams(search);
  const attribution: AttributionInput = {};

  for (const [param, field] of Object.entries(UTM_PARAM_MAP)) {
    const value = params.get(param);
    if (value) attribution[field] = value;
  }

  for (const [param, field] of Object.entries(CLICK_ID_PARAM_MAP)) {
    const value = params.get(param);
    if (value) attribution[field] = value;
  }

  return attribution;
}

export function getStoredAttribution(): AttributionInput {
  if (typeof window === "undefined") return {};

  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as AttributionInput;
  } catch {
    return {};
  }
}

// First-touch: mantém a atribuição da primeira visita da sessão, exceto quando
// a URL atual traz novos parâmetros de UTM (ex: usuário chegou por outro link
// na mesma sessão) — nesse caso atualiza os campos de UTM, preservando
// referrer/landingPath originais.
export function storeAttributionIfNeeded(attribution: AttributionInput): void {
  if (typeof window === "undefined") return;

  const stored = getStoredAttribution();
  const isFirstSave = Object.keys(stored).length === 0;

  const merged: AttributionInput = hasAnyUtmField(attribution)
    ? { ...stored, ...attribution }
    : stored;

  if (isFirstSave) {
    merged.referrer = document.referrer || undefined;
    merged.landingPath = window.location.pathname;
  }

  if (isFirstSave || hasAnyUtmField(attribution)) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }
}
