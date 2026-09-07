import { LEAD_STATUS_LABEL, WEBSITE_STATUS_LABEL, type LeadStatus, type WebsiteStatus } from "./prospect";

export type ExportRow = {
  name: string;
  category: string | null;
  phone: string | null;
  whatsapp: string | null;
  city: string | null;
  state: string | null;
  address: string | null;
  rating: number | null;
  reviewCount: number | null;
  website: string | null;
  websiteStatus: string;
  leadScore: number;
  status?: string | null;
  notes?: string | null;
};

const HEADERS = [
  "Nome da empresa",
  "Categoria",
  "Telefone",
  "WhatsApp",
  "Cidade",
  "Estado",
  "Endereço",
  "Avaliação",
  "Quantidade de avaliações",
  "Website",
  "Status do website",
  "Lead Score",
  "Status do lead",
  "Observações",
];

function toCells(r: ExportRow): (string | number)[] {
  return [
    r.name,
    r.category ?? "",
    r.phone ?? "",
    r.whatsapp ? `+${r.whatsapp}` : "",
    r.city ?? "",
    r.state ?? "",
    r.address ?? "",
    r.rating ?? "",
    r.reviewCount ?? 0,
    r.website ?? "",
    WEBSITE_STATUS_LABEL[(r.websiteStatus as WebsiteStatus) ?? "unknown"] ?? r.websiteStatus,
    r.leadScore,
    r.status ? (LEAD_STATUS_LABEL[r.status as LeadStatus] ?? r.status) : "",
    r.notes ?? "",
  ];
}

function download(content: string, filename: string, mime: string) {
  const blob = new Blob(["\uFEFF" + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCsv(rows: ExportRow[], filename = "leads.csv") {
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [HEADERS, ...rows.map(toCells)].map((line) => line.map(escape).join(";")).join("\r\n");
  download(csv, filename, "text/csv;charset=utf-8;");
}

export function exportExcel(rows: ExportRow[], filename = "leads.xls") {
  const esc = (v: string | number) =>
    String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html =
    `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8" /></head><body><table border="1">` +
    `<tr>${HEADERS.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>` +
    rows.map((r) => `<tr>${toCells(r).map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("") +
    `</table></body></html>`;
  download(html, filename, "application/vnd.ms-excel;charset=utf-8;");
}
