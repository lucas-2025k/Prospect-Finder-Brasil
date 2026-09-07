import { CITIES, type City, type UF } from "@/lib/brazil";
import {
  SEGMENTS,
  classifyWebsite,
  computeLeadScore,
  potentialFromScore,
  toWhatsApp,
  type Business,
} from "@/lib/prospect";

/** Gerador determinístico simples para manter os dados DEMO estáveis. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const PREFIXES = [
  "Clínica",
  "Espaço",
  "Studio",
  "Centro",
  "Instituto",
  "Casa",
  "Atelier",
  "Consultório",
];
const NAMES = [
  "Bella Vita",
  "Renove",
  "Aurora",
  "Vitalité",
  "Essência",
  "Prime",
  "Harmonia",
  "Nova Face",
  "Vida Plena",
  "Lumiar",
  "Sorriso Real",
  "Reviva",
];
const STREETS = ["Av. Central", "Rua das Palmeiras", "Av. Brasil", "Rua XV", "Av. Paulista"];

const WEBSITES = [
  null,
  null,
  null,
  "https://www.instagram.com/clinica.demo",
  "https://linktr.ee/clinicademo",
  "https://clinicademo.com.br",
  "https://demo.wixsite.com/clinica",
];

export type SearchFilters = {
  segment: string;
  customQuery: string;
  uf: UF | "";
  city: string;
  minPopulation: number;
  onlyWithoutWebsite: boolean;
};

export function citiesFor(uf: UF | "", minPopulation: number): City[] {
  return CITIES.filter((c) => (uf ? c.uf === uf : true) && c.population >= minPopulation).sort(
    (a, b) => b.population - a.population,
  );
}

export function runDemoSearch(filters: SearchFilters): Business[] {
  const segment = SEGMENTS.find((s) => s.value === filters.segment);
  const label =
    filters.segment === "personalizado"
      ? filters.customQuery.trim() || "Segmento personalizado"
      : (segment?.label ?? "Segmento");

  const pool = citiesFor(filters.uf, filters.minPopulation);
  const targets = (filters.city ? pool.filter((c) => c.name === filters.city) : pool).slice(0, 6);

  const results: Business[] = [];
  for (const city of targets) {
    const rnd = seeded(`${filters.segment}|${filters.customQuery}|${city.name}|${city.uf}`);
    const count = 4 + Math.floor(rnd() * 3);
    for (let i = 0; i < count; i++) {
      const name = `${PREFIXES[Math.floor(rnd() * PREFIXES.length)]} ${
        NAMES[Math.floor(rnd() * NAMES.length)]
      } ${city.name.split(" ")[0]}`;
      const ddd = 11 + Math.floor(rnd() * 78);
      const mobile = rnd() > 0.25;
      const phone = mobile
        ? `(${ddd}) 9${Math.floor(1000 + rnd() * 8999)}-${Math.floor(1000 + rnd() * 8999)}`
        : `(${ddd}) ${Math.floor(2000 + rnd() * 4999)}-${Math.floor(1000 + rnd() * 8999)}`;
      const rawSite = WEBSITES[Math.floor(rnd() * WEBSITES.length)] ?? null;
      const { status, website } = classifyWebsite(rawSite);
      const reviewCount = Math.floor(rnd() * 260);
      const rating = reviewCount === 0 ? null : Math.round((3.4 + rnd() * 1.6) * 10) / 10;
      const whatsapp = toWhatsApp(phone);
      const leadScore = computeLeadScore({
        websiteStatus: status,
        phone,
        whatsapp,
        reviewCount,
        rating,
        population: city.population,
      });

      results.push({
        placeId: `demo-${city.uf}-${city.name}-${i}`,
        name,
        category: `${label} (DEMO)`,
        city: city.name,
        state: city.uf,
        address: `${STREETS[Math.floor(rnd() * STREETS.length)]}, ${Math.floor(50 + rnd() * 1900)}`,
        phone,
        whatsapp,
        rating,
        reviewCount,
        website,
        websiteStatus: status,
        mapsUrl: null,
        leadScore,
        potential: potentialFromScore(leadScore),
        foundAt: new Date().toISOString(),
        population: city.population,
      });
    }
  }

  const filtered = filters.onlyWithoutWebsite
    ? results.filter((b) => b.websiteStatus !== "has")
    : results;

  return filtered.sort((a, b) => b.leadScore - a.leadScore);
}
