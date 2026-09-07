export type UF =
  | "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA"
  | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI" | "RJ" | "RN"
  | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO";

export const STATES: { uf: UF; name: string }[] = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
];

export const STATE_NAME: Record<string, string> = Object.fromEntries(
  STATES.map((s) => [s.uf, s.name]),
);

export type City = {
  name: string;
  uf: UF;
  population: number;
  capital?: boolean;
  metro?: boolean;
};

/**
 * Cidades brasileiras com população estimada acima de ~250 mil habitantes,
 * mais todas as capitais. Fonte: estimativas populacionais do IBGE.
 * Usado para dividir a pesquisa cidade a cidade (pesquisa em lotes).
 */
export const CITIES: City[] = [
  { name: "São Paulo", uf: "SP", population: 11451245, capital: true, metro: true },
  { name: "Rio de Janeiro", uf: "RJ", population: 6211423, capital: true, metro: true },
  { name: "Brasília", uf: "DF", population: 2817381, capital: true, metro: true },
  { name: "Fortaleza", uf: "CE", population: 2428708, capital: true, metro: true },
  { name: "Salvador", uf: "BA", population: 2417678, capital: true, metro: true },
  { name: "Belo Horizonte", uf: "MG", population: 2315560, capital: true, metro: true },
  { name: "Manaus", uf: "AM", population: 2063547, capital: true, metro: true },
  { name: "Curitiba", uf: "PR", population: 1773718, capital: true, metro: true },
  { name: "Recife", uf: "PE", population: 1488920, capital: true, metro: true },
  { name: "Goiânia", uf: "GO", population: 1437237, capital: true, metro: true },
  { name: "Belém", uf: "PA", population: 1303403, capital: true, metro: true },
  { name: "Porto Alegre", uf: "RS", population: 1332570, capital: true, metro: true },
  { name: "Guarulhos", uf: "SP", population: 1291771, metro: true },
  { name: "Campinas", uf: "SP", population: 1139047, metro: true },
  { name: "São Luís", uf: "MA", population: 1037775, capital: true, metro: true },
  { name: "São Gonçalo", uf: "RJ", population: 896744, metro: true },
  { name: "Maceió", uf: "AL", population: 957916, capital: true, metro: true },
  { name: "Campo Grande", uf: "MS", population: 897938, capital: true, metro: true },
  { name: "Duque de Caxias", uf: "RJ", population: 808144, metro: true },
  { name: "Teresina", uf: "PI", population: 866300, capital: true, metro: true },
  { name: "Natal", uf: "RN", population: 751300, capital: true, metro: true },
  { name: "São Bernardo do Campo", uf: "SP", population: 810729, metro: true },
  { name: "Nova Iguaçu", uf: "RJ", population: 761600, metro: true },
  { name: "João Pessoa", uf: "PB", population: 833932, capital: true, metro: true },
  { name: "Santo André", uf: "SP", population: 748919, metro: true },
  { name: "Osasco", uf: "SP", population: 728615, metro: true },
  { name: "Jaboatão dos Guararapes", uf: "PE", population: 675000, metro: true },
  { name: "São José dos Campos", uf: "SP", population: 729737, metro: true },
  { name: "Ribeirão Preto", uf: "SP", population: 720116, metro: true },
  { name: "Uberlândia", uf: "MG", population: 713224, metro: true },
  { name: "Sorocaba", uf: "SP", population: 723589, metro: true },
  { name: "Contagem", uf: "MG", population: 668949, metro: true },
  { name: "Aracaju", uf: "SE", population: 664908, capital: true, metro: true },
  { name: "Feira de Santana", uf: "BA", population: 616279, metro: true },
  { name: "Cuiabá", uf: "MT", population: 650912, capital: true, metro: true },
  { name: "Joinville", uf: "SC", population: 616317, metro: true },
  { name: "Juiz de Fora", uf: "MG", population: 540756, metro: true },
  { name: "Londrina", uf: "PR", population: 585000, metro: true },
  { name: "Aparecida de Goiânia", uf: "GO", population: 545000, metro: true },
  { name: "Niterói", uf: "RJ", population: 481749, metro: true },
  { name: "Ananindeua", uf: "PA", population: 476800, metro: true },
  { name: "Porto Velho", uf: "RO", population: 460434, capital: true, metro: true },
  { name: "Campos dos Goytacazes", uf: "RJ", population: 483000 },
  { name: "Belford Roxo", uf: "RJ", population: 466100, metro: true },
  { name: "Serra", uf: "ES", population: 536765, metro: true },
  { name: "Caxias do Sul", uf: "RS", population: 463501, metro: true },
  { name: "Vila Velha", uf: "ES", population: 467722, metro: true },
  { name: "Florianópolis", uf: "SC", population: 537211, capital: true, metro: true },
  { name: "Macapá", uf: "AP", population: 442933, capital: true, metro: true },
  { name: "São João de Meriti", uf: "RJ", population: 449500, metro: true },
  { name: "Mauá", uf: "SP", population: 435000, metro: true },
  { name: "São José do Rio Preto", uf: "SP", population: 480393 },
  { name: "Mogi das Cruzes", uf: "SP", population: 458000, metro: true },
  { name: "Betim", uf: "MG", population: 439340, metro: true },
  { name: "Diadema", uf: "SP", population: 393000, metro: true },
  { name: "Campina Grande", uf: "PB", population: 419379, metro: true },
  { name: "Jundiaí", uf: "SP", population: 432700, metro: true },
  { name: "Montes Claros", uf: "MG", population: 414245 },
  { name: "Maringá", uf: "PR", population: 442800, metro: true },
  { name: "Piracicaba", uf: "SP", population: 442500 },
  { name: "Carapicuíba", uf: "SP", population: 387000, metro: true },
  { name: "Olinda", uf: "PE", population: 393100, metro: true },
  { name: "Rio Branco", uf: "AC", population: 413418, capital: true },
  { name: "Anápolis", uf: "GO", population: 398000 },
  { name: "Bauru", uf: "SP", population: 379297 },
  { name: "Vitória", uf: "ES", population: 322869, capital: true, metro: true },
  { name: "Caucaia", uf: "CE", population: 361400, metro: true },
  { name: "Itaquaquecetuba", uf: "SP", population: 386000, metro: true },
  { name: "São Vicente", uf: "SP", population: 331700, metro: true },
  { name: "Franca", uf: "SP", population: 358500 },
  { name: "Cariacica", uf: "ES", population: 383900, metro: true },
  { name: "Pelotas", uf: "RS", population: 328275 },
  { name: "Canoas", uf: "RS", population: 347000, metro: true },
  { name: "Ponta Grossa", uf: "PR", population: 358400 },
  { name: "Blumenau", uf: "SC", population: 366418, metro: true },
  { name: "Petrolina", uf: "PE", population: 386000 },
  { name: "Boa Vista", uf: "RR", population: 436591, capital: true },
  { name: "Palmas", uf: "TO", population: 313349, capital: true },
  { name: "Uberaba", uf: "MG", population: 340277 },
  { name: "Paulista", uf: "PE", population: 331700, metro: true },
  { name: "Cascavel", uf: "PR", population: 348051 },
  { name: "Praia Grande", uf: "SP", population: 351000, metro: true },
  { name: "Guarujá", uf: "SP", population: 322800, metro: true },
  { name: "Taubaté", uf: "SP", population: 320900, metro: true },
  { name: "Limeira", uf: "SP", population: 311000 },
  { name: "Santos", uf: "SP", population: 418608, metro: true },
  { name: "Suzano", uf: "SP", population: 300559, metro: true },
  { name: "Petrópolis", uf: "RJ", population: 306700, metro: true },
  { name: "Volta Redonda", uf: "RJ", population: 273300, metro: true },
  { name: "Governador Valadares", uf: "MG", population: 281000 },
  { name: "Ribeirão das Neves", uf: "MG", population: 341000, metro: true },
  { name: "Santa Maria", uf: "RS", population: 273500 },
  { name: "Gravataí", uf: "RS", population: 283000, metro: true },
  { name: "Viamão", uf: "RS", population: 256000, metro: true },
  { name: "Novo Hamburgo", uf: "RS", population: 250000, metro: true },
  { name: "São José dos Pinhais", uf: "PR", population: 334620, metro: true },
  { name: "Foz do Iguaçu", uf: "PR", population: 285000 },
  { name: "Colombo", uf: "PR", population: 250000, metro: true },
  { name: "Chapecó", uf: "SC", population: 254000 },
  { name: "Criciúma", uf: "SC", population: 219000 },
  { name: "Itajaí", uf: "SC", population: 264054, metro: true },
  { name: "São José", uf: "SC", population: 250181, metro: true },
  { name: "Vitória da Conquista", uf: "BA", population: 370000 },
  { name: "Camaçari", uf: "BA", population: 304302, metro: true },
  { name: "Juazeiro do Norte", uf: "CE", population: 286120 },
  { name: "Mossoró", uf: "RN", population: 264577 },
  { name: "Imperatriz", uf: "MA", population: 259980 },
  { name: "Marabá", uf: "PA", population: 283542 },
  { name: "Santarém", uf: "PA", population: 306480 },
  { name: "Dourados", uf: "MS", population: 253000 },
  { name: "Várzea Grande", uf: "MT", population: 300000, metro: true },
  { name: "Rondonópolis", uf: "MT", population: 254000 },
  { name: "Caruaru", uf: "PE", population: 375000 },
  { name: "Parnamirim", uf: "RN", population: 279000, metro: true },
  { name: "Sete Lagoas", uf: "MG", population: 250000 },
  { name: "Americana", uf: "SP", population: 242000, metro: true },
  { name: "Marília", uf: "SP", population: 240590 },
  { name: "Presidente Prudente", uf: "SP", population: 230000 },
  { name: "Barueri", uf: "SP", population: 280000, metro: true },
  { name: "Cotia", uf: "SP", population: 260000, metro: true },
  { name: "Indaiatuba", uf: "SP", population: 265000, metro: true },
  { name: "Hortolândia", uf: "SP", population: 235000, metro: true },
  { name: "São Carlos", uf: "SP", population: 260000 },
  { name: "Sumaré", uf: "SP", population: 290000, metro: true },
  { name: "Embu das Artes", uf: "SP", population: 270000, metro: true },
  { name: "Taboão da Serra", uf: "SP", population: 280000, metro: true },
];

export type RegionType =
  | "capitais"
  | "metropolitanas"
  | "300k"
  | "400k"
  | "500k"
  | "todas";

export const REGION_TYPES: { value: RegionType; label: string }[] = [
  { value: "capitais", label: "Capitais" },
  { value: "metropolitanas", label: "Regiões metropolitanas" },
  { value: "300k", label: "Cidades com mais de 300 mil habitantes" },
  { value: "400k", label: "Cidades com mais de 400 mil habitantes" },
  { value: "500k", label: "Cidades com mais de 500 mil habitantes" },
  { value: "todas", label: "Todas as cidades elegíveis" },
];

export function selectCities(uf: string, regionType: RegionType): City[] {
  let list = uf === "TODOS" ? CITIES : CITIES.filter((c) => c.uf === uf);
  switch (regionType) {
    case "capitais":
      list = list.filter((c) => c.capital);
      break;
    case "metropolitanas":
      list = list.filter((c) => c.metro || c.capital);
      break;
    case "300k":
      list = list.filter((c) => c.population >= 300000);
      break;
    case "400k":
      list = list.filter((c) => c.population >= 400000);
      break;
    case "500k":
      list = list.filter((c) => c.population >= 500000);
      break;
    default:
      break;
  }
  return [...list].sort((a, b) => b.population - a.population);
}

export function isLargeCity(population: number) {
  return population >= 500000;
}
