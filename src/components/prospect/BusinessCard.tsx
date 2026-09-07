import { Globe, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import type { ReactNode } from "react";

import { PotentialBadge, ScorePill, WebsiteBadge } from "@/components/prospect/badges";
import { Button } from "@/components/ui/button";
import type { Business } from "@/lib/prospect";

export function BusinessCard({
  business,
  actions,
  onOpenDetails,
}: {
  business: Business;
  actions?: ReactNode;
  onOpenDetails?: () => void;
}) {
  return (
    <article className="panel flex flex-col gap-4 p-4 transition-shadow hover:shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-foreground">{business.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{business.category}</p>
        </div>
        <ScorePill score={business.leadScore} />
      </div>

      <div className="flex flex-wrap gap-2">
        <WebsiteBadge status={business.websiteStatus} />
        <PotentialBadge potential={business.potential} />
      </div>

      <dl className="grid gap-2 text-sm">
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span className="min-w-0">
            {business.city}/{business.state}
            {business.address ? ` — ${business.address}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="size-4 shrink-0" />
          <span>{business.phone ?? "Telefone não informado"}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="size-4 shrink-0" />
          <span>
            {business.rating != null
              ? `${business.rating.toFixed(1)} (${business.reviewCount} avaliações)`
              : "Sem avaliações"}
          </span>
        </div>
        {business.website && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="size-4 shrink-0" />
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer noopener"
              className="truncate underline decoration-dotted hover:text-foreground"
            >
              {business.website}
            </a>
          </div>
        )}
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {business.whatsapp && (
          <Button asChild size="sm" variant="outline">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </Button>
        )}
        {onOpenDetails && (
          <Button size="sm" variant="ghost" onClick={onOpenDetails}>
            Detalhes
          </Button>
        )}
        {actions}
      </div>
    </article>
  );
}
