import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { studio } from "@/data/studio";

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/12 bg-carbon">
      <div className="site-container grid gap-12 py-14 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:py-20">
        <div>
          <Link href="/" className="display-title text-3xl" aria-label={`${studio.name} — accueil`}>
            {studio.wordmark.primary} <span className="text-copper">{studio.wordmark.accent}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-smoke/65">
            {studio.description}
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-copper">Studio</p>
          <address className="mt-4 text-sm not-italic leading-7 text-smoke/65">
            {studio.address.street}<br />
            {studio.address.city}<br />
            <span className="text-copper">Lieu fictif</span>
          </address>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-copper">Explorer</p>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-smoke/65">
            <Link href="/prestations" className="hover:text-bone">Prestations</Link>
            <Link href="/equipe" className="hover:text-bone">L’équipe</Link>
            <Link href="/contact" className="hover:text-bone">Contact</Link>
            <Link href="/mentions-legales" className="hover:text-bone">Mentions légales</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="site-container flex flex-col gap-4 py-5 font-mono text-[0.65rem] uppercase tracking-[0.07em] text-steel sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} {studio.name}</p>
            <p>Concept fictif · Démonstration portfolio</p>
            <p>Design & développement — Enzo Da Silveira</p>
          </div>
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-bone"
          >
            Photographies Unsplash <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
