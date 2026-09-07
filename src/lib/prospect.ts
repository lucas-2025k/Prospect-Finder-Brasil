export type WebsiteStatus = "none" | "unknown" | "has";

export type Business = {
  placeId: string;
  name: string;
  category: string;
  city: string;
  state: string;
  address: string;
  phone: string | null;
  whatsapp: string | null;
  rating: number | null;
  reviewCount: number;
  website: string | null;
  websiteStatus: WebsiteStatus;
  mapsUrl: string | null;
  leadScore: number;
  potential: "alto" | "medio" | "baixo";
  foundAt: string;
  population?: number | undefined;
};

export const SEGMENTS: { value: string; label: string; query: string }[] = [
  { value: "odontologia", label: "Odontologia", query: "clínica odontológica dentista" },
  { value: "estetica", label: "Estética", query: "clínica de estética" },
  { value: "clinicas", label: "Clínicas", query: "clínica médica" },
  { value: "dermatologia", label: "Dermatologia", query: "clínica de dermatologia dermatologista" },
  { value: "beleza", label: "Beleza", query: "salão de beleza e estética" },
  { value: "saude", label: "Saúde", query: "clínica de saúde" },
  { value: "harmonizacao", label: "Harmonização Facial", query: "harmonização facial" },
  { value: "saloes", label: "Salões", query: "salão de beleza" },
  { value: "fisioterapia", label: "Fisioterapia", query: "fisioterapia estética" },
  { value: "depilacao", label: "Depilação", query: "clínica de depilação" },
  { value: "personalizado", label: "Personalizado", query: "" },
];

/** Domínios que NÃO representam site próprio da empresa. */
const NON_OWN_DOMAINS = [
  "instagram.com",
  "facebook.com",
  "fb.me",
  "fb.com",
  "tiktok.com",
  "twitter.com",
  "x.com",
  "youtube.com",
  "linkedin.com",
  "doctoralia.com",
  "doctoralia.com.br",
  "boaconsulta.com",
  "linktr.ee",
  "linkbio.co",
  "beacons.ai",
  "bio.link",
  "wa.me",
  "api.whatsapp.com",
  "whatsapp.com",
  "google.com",
  "business.site",
  "negocio.site",
  "sites.google.com",
  "yelp.com",
  "tripadvisor.com",
  "booksy.com",
  "trinks.com",
  "gendo.com.br",
  "clinicorp.com",
  "agendaedu.com",
  "ifood.com.br",
  "consultaremedios.com.br",
  "guiamais.com.br",
  "telelistas.net",
  "apontador.com.br",
  "solutudo.com.br",
  "encontraniteroi.com.br",
];

export function classifyWebsite(rawUrl: string | null | undefined): {
  status: WebsiteStatus;
  website: string | null;
} {
  if (!rawUrl) return { status: "none", website: null };
  let host = "";
  try {
    host = new URL(rawUrl).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return { status: "unknown", website: rawUrl };
  }
  if (NON_OWN_DOMAINS.some((d) => host === d || host.endsWith("." + d))) {
    return { status: "none", website: rawUrl };
  }
  // Subdomínios de construtores de site gratuitos: não confirmam site próprio.
  const builders = ["wixsite.com", "webnode.page", "blogspot.com", "wordpress.com", "godaddysites.com"];
  if (builders.some((d) => host.endsWith("." + d))) {
    return { status: "unknown", website: rawUrl };
  }
  return { status: "has", website: rawUrl };
}

/** Números móveis brasileiros (9 dígitos após o DDD) podem ser usados no WhatsApp. */
export function toWhatsApp(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const national = digits.startsWith("55") ? digits.slice(2) : digits;
  if (national.length !== 11) return null;
  if (national[2] !== "9") return null;
  return "55" + national;
}

export function computeLeadScore(input: {
  websiteStatus: WebsiteStatus;
  phone: string | null;
  whatsapp: string | null;
  reviewCount: number;
  rating: number | null;
  population?: number | undefined;
}): number {
  let score = 0;
  if (input.websiteStatus === "none") score += 30;
  else if (input.websiteStatus === "unknown") score += 15;
  if (input.phone) score += 20;
  if (input.whatsapp) score += 15;
  if (input.reviewCount >= 100) score += 15;
  else if (input.reviewCount >= 30) score += 10;
  else if (input.reviewCount >= 10) score += 5;
  if ((input.rating ?? 0) >= 4.5) score += 10;
  else if ((input.rating ?? 0) >= 4) score += 6;
  if ((input.population ?? 0) >= 500000) score += 10;
  else if ((input.population ?? 0) >= 300000) score += 5;
  return Math.max(0, Math.min(100, score));
}

export function potentialFromScore(score: number): "alto" | "medio" | "baixo" {
  if (score >= 70) return "alto";
  if (score >= 45) return "medio";
  return "baixo";
}

export const WEBSITE_STATUS_LABEL: Record<WebsiteStatus, string> = {
  none: "Sem site próprio",
  unknown: "Site não confirmado",
  has: "Com site",
};

export const LEAD_STATUSES = [
  "novo",
  "contato_realizado",
  "em_negociacao",
  "site_vendido",
  "sem_interesse",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  novo: "Novo",
  contato_realizado: "Contato realizado",
  em_negociacao: "Em negociação",
  site_vendido: "Site vendido",
  sem_interesse: "Sem interesse",
};

export function formatPhone(phone: string | null) {
  return phone ?? "Sem telefone";
}
