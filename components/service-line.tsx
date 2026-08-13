import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";

import type { StudioService } from "@/data/services";
import { formatPrice } from "@/lib/format";

export function ServiceLine({ service }: { service: StudioService }) {
  return (
    <article className="group grid gap-5 border-t border-bone/15 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 lg:py-9">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="text-2xl font-bold uppercase tracking-[-0.035em] sm:text-3xl">
            {service.name}
          </h3>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-steel">
            <Clock3 size={13} aria-hidden="true" /> {service.duration} min
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-smoke/65">
          {service.description}
        </p>
      </div>
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <span className="font-mono text-lg font-semibold text-bone">
          {formatPrice(service.price)}
        </span>
        <Link
          href={`/reservation?service=${service.id}`}
          className="flex min-h-11 min-w-11 items-center justify-center border border-bone/20 text-bone transition group-hover:border-copper group-hover:text-copper"
          aria-label={`Réserver ${service.name}`}
        >
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
