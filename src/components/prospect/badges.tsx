import { WEBSITE_STATUS_LABEL, type WebsiteStatus } from "@/lib/prospect";
import { cn } from "@/lib/utils";

export function WebsiteBadge({ status }: { status: WebsiteStatus }) {
  const styles: Record<WebsiteStatus, string> = {
    none: "bg-success/12 text-success border-success/30",
    unknown: "bg-warning/15 text-warning-foreground border-warning/40",
    has: "bg-danger/10 text-danger border-danger/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        styles[status],
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "none" ? "bg-success" : status === "unknown" ? "bg-warning" : "bg-danger",
        )}
      />
      {WEBSITE_STATUS_LABEL[status]}
    </span>
  );
}

export function PotentialBadge({ potential }: { potential: "alto" | "medio" | "baixo" }) {
  const map = {
    alto: { label: "Alto potencial", cls: "bg-primary/12 text-primary border-primary/30" },
    medio: { label: "Potencial médio", cls: "bg-warning/15 text-warning-foreground border-warning/40" },
    baixo: { label: "Potencial baixo", cls: "bg-muted text-muted-foreground border-border" },
  } as const;
  const item = map[potential];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        item.cls,
      )}
    >
      {item.label}
    </span>
  );
}

export function ScorePill({ score }: { score: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center rounded-lg border border-border bg-surface px-3 py-1.5">
      <span className="font-display text-lg font-bold leading-none text-foreground">{score}</span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        score
      </span>
    </div>
  );
}
