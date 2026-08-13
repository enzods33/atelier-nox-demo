import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ServiceLine } from "@/components/service-line";
import { serviceCategories, services } from "@/data/services";
import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Prestations",
  description: `Découvrez les prestations fictives de ${studio.name} : coupes, tailles de barbe, rasages et rituels de grooming.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="grid-surface border-b border-bone/10 py-14 sm:py-20 lg:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="eyebrow">Prestations</p>
            <h1 className="display-title mt-6 max-w-[10ch] text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.8]">
              Le bon geste. Au bon endroit.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-smoke/65 sm:text-base lg:justify-self-end">
            Une carte lisible, des durées réalistes et le temps nécessaire pour faire les choses proprement.
            Toutes les prestations et disponibilités présentées sont fictives.
          </p>
        </div>
      </section>

      <div className="site-container py-16 sm:py-24">
        {serviceCategories.map((category, categoryIndex) => {
          const categoryServices = services.filter((service) => service.category === category);
          return (
            <section
              key={category}
              className={categoryIndex === 0 ? "" : "mt-20 border-t border-bone/10 pt-16 sm:mt-28 sm:pt-20"}
            >
              <div className="grid gap-8 lg:grid-cols-[0.36fr_1.64fr] lg:gap-14">
                <div>
                  <span className="font-mono text-xs text-copper">0{categoryIndex + 1}</span>
                  <h2 className="display-title mt-3 text-4xl sm:text-5xl">{category}</h2>
                </div>
                <div className="border-b border-bone/15">
                  {categoryServices.map((service) => (
                    <ServiceLine key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-bone/10 bg-copper py-16 text-bone sm:py-20">
        <div className="site-container flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone/70">Un doute ?</p>
            <h2 className="display-title mt-4 max-w-[15ch] text-4xl leading-[0.9] sm:text-6xl">
              Choisissez le geste. On s’occupe du reste.
            </h2>
          </div>
          <Link href="/reservation" className="inline-flex min-h-12 items-center gap-2 border border-bone bg-bone px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-void">
            Réserver <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
