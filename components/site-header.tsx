"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { studio } from "@/data/studio";

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Prestations", href: "/prestations" },
  { label: "L’équipe", href: "/equipe" },
  { label: "Contact", href: "/contact" },
];

function isActiveRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-void/94 backdrop-blur-md">
      <div className="site-container flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label={`${studio.name} — accueil`}
          className="flex items-baseline gap-2 font-display text-lg font-black tracking-[-0.04em]"
        >
          <span>{studio.wordmark.primary}</span>
          <span className="text-copper">{studio.wordmark.accent}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActiveRoute(pathname, item.href) ? "page" : undefined}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Link
              href="/reservation"
              aria-current={pathname === "/reservation" ? "page" : undefined}
              className="button-primary"
            >
              Réserver
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex min-h-11 min-w-11 items-center justify-center border border-bone/20 text-bone lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] border-t border-bone/10 bg-void px-4 py-6 lg:hidden"
        >
          <nav aria-label="Navigation mobile" className="site-container flex h-full flex-col">
            <div>
              {navigation.map((item, index) => {
                const isActive = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex min-h-16 items-center justify-between border-b border-bone/12 text-2xl font-bold uppercase ${isActive ? "text-copper" : "text-bone"}`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-steel">0{index + 1}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/reservation"
              aria-current={pathname === "/reservation" ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className="button-primary mt-auto w-full"
            >
              Réserver un créneau
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
