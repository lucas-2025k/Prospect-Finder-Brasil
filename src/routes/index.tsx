import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Globe2, MapPin, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { BusinessCard } from "@/components/prospect/BusinessCard";
import { EmptyState, LoadingState } from "@/components/prospect/StateViews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { STATES, type UF } from "@/lib/brazil";
import { citiesFor, runDemoSearch } from "@/lib/demo-search";
import { SEGMENTS, type Business } from "@/lib/prospect";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prospect Finder Brasil — Encontre empresas sem site próprio" },
      {
        name: "description",
        content:
          "Painel de prospecção B2B: escolha nicho, estado e cidade, filtre municípios com mais de 300 mil habitantes e encontre empresas com telefone, WhatsApp e lead score.",
      },
      { property: "og:title", content: "Prospect Finder Brasil — Painel de prospecção" },
      {
        property: "og:description",
        content:
          "Pesquise empresas por nicho e cidade, veja quem não tem site próprio e salve seus melhores leads.",
      },
    ],
  }),
  component: Dashboard,
});

const POPULATION_OPTIONS = [
  { value: "0", label: "Todas as cidades da lista" },
  { value: "300000", label: "Acima de 300 mil habitantes" },
  { value: "400000", label: "Acima de 400 mil habitantes" },
  { value: "500000", label: "Acima de 500 mil habitantes" },
];

function Dashboard() {
  const [segment, setSegment] = useState("odontologia");
  const [customQuery, setCustomQuery] = useState("");
  const [uf, setUf] = useState<UF | "">("");
  const [city, setCity] = useState("");
  const [minPopulation, setMinPopulation] = useState(300000);
  const [onlyWithoutWebsite, setOnlyWithoutWebsite] = useState(true);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Business[]>([]);
  const [saved, setSaved] = useState<Business[]>([]);

  const cityOptions = useMemo(() => citiesFor(uf, minPopulation), [uf, minPopulation]);

  const stats = useMemo(() => {
    const withoutSite = results.filter((b) => b.websiteStatus === "none").length;
    const withWhats = results.filter((b) => b.whatsapp).length;
    const avg = results.length
      ? Math.round(results.reduce((s, b) => s + b.leadScore, 0) / results.length)
      : 0;
    return { total: results.length, withoutSite, withWhats, avg };
  }, [results]);

  function handleSearch() {
    setLoading(true);
    setSearched(true);
    window.setTimeout(() => {
      setResults(runDemoSearch({ segment, customQuery, uf, city, minPopulation, onlyWithoutWebsite }));
      setLoading(false);
    }, 500);
  }

  function saveLead(b: Business) {
    setSaved((prev) => (prev.some((l) => l.placeId === b.placeId) ? prev : [b, ...prev]));
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-sidebar">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5">
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Prospect Finder Brasil</h1>
            <p className="text-sm text-sidebar-foreground/70">
              Encontre empresas sem site próprio e organize seus leads
            </p>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Modo DEMO
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <p className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Dados de demonstração:</strong> a pesquisa real ainda
          não está conectada. As empresas abaixo são fictícias e vêm marcadas como DEMO — a tela já
          está pronta para receber a pesquisa real.
        </p>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Search} label="Empresas encontradas" value={stats.total} />
          <StatCard icon={Globe2} label="Sem site próprio" value={stats.withoutSite} />
          <StatCard icon={MapPin} label="Com WhatsApp" value={stats.withWhats} />
          <StatCard icon={BarChart3} label="Lead score médio" value={stats.avg} />
        </section>

        <section className="panel space-y-5 p-5">
          <h2 className="text-base font-semibold text-foreground">Nova pesquisa</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Nicho</Label>
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o nicho" />
                </SelectTrigger>
                <SelectContent>
                  {SEGMENTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={uf === "" ? "todos" : uf}
                onValueChange={(v) => {
                  setUf(v === "todos" ? "" : (v as UF));
                  setCity("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os estados</SelectItem>
                  {STATES.map((s) => (
                    <SelectItem key={s.uf} value={s.uf}>
                      {s.name} ({s.uf})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cidade / região</Label>
              <Select
                value={city === "" ? "todas" : city}
                onValueChange={(v) => setCity(v === "todas" ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Escolha a cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as cidades elegíveis</SelectItem>
                  {cityOptions.map((c) => (
                    <SelectItem key={`${c.uf}-${c.name}`} value={c.name}>
                      {c.name} — {c.uf} ({(c.population / 1000).toFixed(0)} mil hab.)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Porte da cidade</Label>
              <Select
                value={String(minPopulation)}
                onValueChange={(v) => {
                  setMinPopulation(Number(v));
                  setCity("");
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULATION_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {segment === "personalizado" && (
            <div className="space-y-2">
              <Label htmlFor="custom">Termo personalizado</Label>
              <Input
                id="custom"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                maxLength={80}
                placeholder="Ex.: clínica de podologia"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <Switch checked={onlyWithoutWebsite} onCheckedChange={setOnlyWithoutWebsite} />
              Mostrar apenas empresas sem site próprio confirmado
            </label>
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="size-4" />
              {loading ? "Pesquisando..." : "Encontrar empresas"}
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">
            Resultados {results.length > 0 && `(${results.length})`}
          </h2>

          {loading ? (
            <LoadingState label="Buscando empresas (DEMO)..." />
          ) : results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((b) => (
                <BusinessCard
                  key={b.placeId}
                  business={b}
                  actions={
                    <Button
                      size="sm"
                      variant={saved.some((l) => l.placeId === b.placeId) ? "secondary" : "default"}
                      onClick={() => saveLead(b)}
                    >
                      <Star className="size-4" />
                      {saved.some((l) => l.placeId === b.placeId) ? "Lead salvo" : "Salvar lead"}
                    </Button>
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={searched ? "Nenhuma empresa encontrada" : "Faça sua primeira pesquisa"}
              message={
                searched
                  ? "Ajuste o nicho, o estado ou o porte da cidade e pesquise novamente."
                  : "Escolha o nicho, o estado e a cidade e clique em Encontrar empresas."
              }
            />
          )}
        </section>

        {saved.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">
              Leads salvos ({saved.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {saved.map((b) => (
                <BusinessCard
                  key={b.placeId}
                  business={b}
                  actions={
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setSaved((prev) => prev.filter((l) => l.placeId !== b.placeId))
                      }
                    >
                      <Trash2 className="size-4" />
                      Remover
                    </Button>
                  }
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Search;
  label: string;
  value: number;
}) {
  return (
    <div className="panel flex items-center gap-3 p-4">
      <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
