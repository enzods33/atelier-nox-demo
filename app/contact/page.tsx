import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Contact & accès",
  description: `Coordonnées et informations d’accès fictives de la démonstration ${studio.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="site-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:py-28">
        <div className="pb-3 lg:pb-10">
          <p className="eyebrow">Contact & accès</p>
          <h1 className="display-title mt-6 max-w-[8ch] text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.8]">
            Passez la porte.
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-7 text-smoke/65 sm:text-base">
            Cette page illustre les informations pratiques d’un futur studio réel. Toutes les coordonnées ci-dessous sont volontairement non utilisables.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-concrete sm:aspect-[16/10] lg:aspect-[4/3]">
          <Image
            src="/images/studio-interior.jpg"
            alt="Intérieur sombre d’un barbershop utilisé comme image d’ambiance"
            fill
            priority
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover grayscale-[0.3]"
          />
        </div>
      </section>

      <section className="border-y border-bone/10 bg-carbon py-16 sm:py-20">
        <div className="site-container grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <MapPin className="text-copper" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold uppercase">Localisation</h2>
            <address className="mt-3 text-sm not-italic leading-7 text-smoke/65">
              {studio.address.street}<br />{studio.address.city}
            </address>
          </div>
          <div>
            <Phone className="text-copper" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold uppercase">Téléphone</h2>
            <p className="mt-3 text-sm leading-7 text-smoke/65">{studio.contact.phone}</p>
          </div>
          <div>
            <Mail className="text-copper" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold uppercase">E-mail</h2>
            <p className="mt-3 break-words text-sm leading-7 text-smoke/65">{studio.contact.email}</p>
          </div>
          <div>
            <Clock3 className="text-copper" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold uppercase">Accès</h2>
            <p className="mt-3 text-sm leading-7 text-smoke/65">{studio.address.access}</p>
          </div>
        </div>
      </section>

      <section className="site-container grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="eyebrow">Horaires</p>
          <h2 className="display-title mt-5 text-5xl leading-[0.9] sm:text-6xl">Quand passer.</h2>
          <p className="mt-6 text-sm leading-7 text-copper">{studio.contact.note}</p>
        </div>
        <dl className="border-t border-bone/15">
          {studio.hours.map((entry) => (
            <div key={entry.days} className="flex flex-col gap-2 border-b border-bone/15 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <dt className="text-lg font-semibold uppercase">{entry.days}</dt>
              <dd className="font-mono text-sm text-steel sm:text-right">{entry.hours}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
