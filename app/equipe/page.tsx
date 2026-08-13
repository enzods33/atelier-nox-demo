import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { services } from "@/data/services";
import { studio } from "@/data/studio";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "L’équipe",
  description: `Présentation éditoriale de l’équipe fictive de ${studio.name} et de ses spécialités.`,
};

export default function TeamPage() {
  return (
    <>
      <section className="site-container py-14 sm:py-20 lg:py-28">
        <p className="eyebrow">L’équipe</p>
        <h1 className="display-title mt-6 max-w-[11ch] text-[clamp(2.75rem,11vw,8.5rem)] leading-[0.8]">
          Trois approches. Une même exigence.
        </h1>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-smoke/65 sm:text-base">
          Des profils et biographies entièrement fictifs, construits pour démontrer un parcours de réservation par professionnel.
        </p>
      </section>

      <div className="border-t border-bone/10">
        {team.map((member, index) => {
          const mainServices = services.filter((service) => member.serviceIds.includes(service.id)).slice(0, 4);
          const imageFirst = index % 2 === 0;
          return (
            <article key={member.id} className="border-b border-bone/10 py-12 sm:py-16 lg:py-24">
              <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className={`relative aspect-[4/5] overflow-hidden bg-concrete sm:aspect-[16/12] lg:aspect-[4/5] ${imageFirst ? "" : "lg:order-2"}`}>
                  <Image
                    src={member.image}
                    alt={`Portrait éditorial illustratif de ${member.firstName}, professionnel fictif`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover grayscale contrast-110"
                  />
                  <span className="absolute top-0 right-0 bg-copper px-4 py-3 font-mono text-xs text-bone">0{index + 1}</span>
                </div>

                <div className={imageFirst ? "" : "lg:order-1"}>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-copper">{member.role}</p>
                  <h2 className="display-title mt-4 text-6xl leading-none sm:text-8xl">{member.firstName}</h2>
                  <p className="mt-5 text-xl font-semibold tracking-[-0.03em] text-bone">{member.specialty}</p>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-smoke/70 sm:text-base">{member.bio}</p>
                  <div className="mt-8 border-t border-bone/15 pt-6">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel">Prestations principales</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Prestations principales de ${member.firstName}`}>
                      {mainServices.map((service) => (
                        <li key={service.id} className="border border-bone/15 px-3 py-2 text-xs text-smoke/70">{service.shortName}</li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/reservation?member=${member.id}`} className="button-primary mt-8">
                    Réserver avec {member.firstName} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
