import { ArrowRight, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ServiceLine } from "@/components/service-line";
import { signatureServices } from "@/data/services";
import { studio } from "@/data/studio";
import { team } from "@/data/team";

export default function HomePage() {
  return (
    <>
      <section className="grid-surface border-b border-bone/10">
        <div className="site-container grid min-h-[calc(100svh-72px)] gap-8 py-8 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-12 lg:py-10">
          <div className="min-w-0 flex flex-col justify-center py-8 lg:py-14">
            <p className="eyebrow">{studio.activity}</p>
            <h1 className="display-title mt-7 max-w-[8ch] text-[clamp(4.2rem,12vw,9rem)] leading-[0.78]">
              Atelier <span className="text-copper">Nox</span>
            </h1>
            <p className="mt-8 max-w-[18ch] text-2xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
              {studio.tagline}
            </p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-smoke/65 sm:text-base">
              {studio.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/reservation" className="button-primary">
                Réserver un créneau <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/prestations" className="button-secondary">
                Voir les prestations
              </Link>
            </div>
          </div>

          <div className="relative min-h-[56svh] min-w-0 overflow-hidden bg-concrete lg:min-h-0">
            <Image
              src="/images/hero-cut.jpg"
              alt="Barbiers au travail dans un studio contemporain"
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover grayscale-[0.35] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-void/10" />
            <div className="absolute top-0 right-0 flex h-24 w-24 items-center justify-center bg-copper font-mono text-xs font-semibold text-bone sm:h-32 sm:w-32">
              EST. / 26
            </div>
            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 border-t border-bone/45 pt-4 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="max-w-56 font-mono text-[0.65rem] uppercase leading-5 tracking-[0.1em] text-bone/75">
                Coupe · Barbe · Grooming<br />Démonstration fictive
              </span>
              <span className="display-title text-4xl text-bone/20 sm:text-6xl">NX</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Les essentiels</p>
              <h2 className="display-title mt-5 max-w-[11ch] text-5xl leading-[0.88] sm:text-7xl">
                Trois gestes. Zéro détour.
              </h2>
            </div>
            <Link href="/prestations" className="button-secondary self-start sm:self-auto">
              Toutes les prestations
            </Link>
          </div>
          <div className="mt-12 border-b border-bone/15 lg:mt-16">
            {signatureServices.map((service) => (
              <ServiceLine key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-bone/10 bg-carbon py-20 sm:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
          <div className="min-w-0">
            <p className="eyebrow">L’atelier</p>
            <h2 className="display-title mt-5 text-[2.3rem] leading-[0.88] sm:text-7xl">
              La matière. Le mouvement. La mesure.
            </h2>
          </div>
          <div className="min-w-0">
            <p className="max-w-xl text-base leading-8 text-smoke/70 sm:text-lg">
              Atelier Nox imagine le grooming comme un travail de précision : écouter,
              construire une forme juste, puis transmettre les bons gestes pour la suite.
            </p>
            <Link href="/equipe" className="button-quiet mt-7">
              Découvrir l’équipe <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">L’équipe</p>
              <h2 className="display-title mt-5 text-5xl leading-none sm:text-7xl">Trois regards.</h2>
            </div>
            <div className="hidden sm:block">
              <Link href="/equipe" className="button-secondary">Voir les profils</Link>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((member, index) => (
              <article key={member.id} className={index === 1 ? "md:mt-12" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
                  <Image
                    src={member.image}
                    alt={`Portrait éditorial illustratif pour ${member.firstName}, professionnel fictif`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale transition duration-500 hover:grayscale-0"
                  />
                  <span className="absolute top-4 left-4 bg-void px-3 py-2 font-mono text-[0.65rem] text-copper">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-bold uppercase tracking-[-0.04em]">{member.firstName}</h3>
                <p className="mt-2 font-mono text-xs uppercase leading-5 tracking-[0.07em] text-steel">
                  {member.specialty}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/equipe" className="button-secondary">Voir les profils</Link>
          </div>
        </div>
      </section>

      <section className="site-container pb-8 sm:pb-12">
        <div className="relative min-h-[68svh] overflow-hidden bg-concrete lg:min-h-[82svh]">
          <Image
            src="/images/detail-cut.jpg"
            alt="Geste de coupe dans un atelier contemporain"
            fill
            sizes="100vw"
            className="object-cover grayscale-[0.2] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/15 to-void/20" />
          <div className="absolute right-6 bottom-7 left-6 sm:right-10 sm:bottom-10 sm:left-10 lg:right-16 lg:bottom-14 lg:left-16">
            <p className="eyebrow">Après la ville</p>
            <p className="display-title mt-5 max-w-[13ch] text-4xl leading-[0.9] sm:text-6xl lg:text-8xl">
              Un fauteuil. Du temps. Un geste net.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <MapPin className="text-copper" aria-hidden="true" />
            <p className="eyebrow mt-6">Localisation</p>
            <address className="mt-5 not-italic text-sm leading-7 text-smoke/70">
              {studio.address.street}<br />
              {studio.address.city}<br />
              <strong className="font-mono text-xs font-medium text-copper">Lieu fictif</strong>
            </address>
            <Link href="/contact" className="button-secondary mt-7">Contact & accès</Link>
          </div>
          <div className="border-t border-bone/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <Clock3 className="text-copper" aria-hidden="true" />
            <p className="eyebrow mt-6">Horaires</p>
            <dl className="mt-4 divide-y divide-bone/12">
              {studio.hours.map((entry) => (
                <div key={entry.days} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-sm font-medium">{entry.days}</dt>
                  <dd className="font-mono text-xs text-steel sm:text-right">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="grid-surface border-t border-bone/10 bg-carbon py-20 sm:py-28">
        <div className="site-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Prochain passage</p>
            <h2 className="display-title mt-5 max-w-[13ch] text-5xl leading-[0.88] sm:text-7xl">
              Prêt pour votre prochain passage ?
            </h2>
          </div>
          <Link href="/reservation" className="button-primary shrink-0">
            Réserver un créneau <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
