"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Quienes somos", href: "/categories" },
  { label: "Entrevista", href: "/entrevista" },
  { label: "A fondo", href: "/a-fondo" },
  { label: "Andalucía TRADE informa", href: "/andalucia-trade-informa" },
  { label: "Tu proyecto cuenta", href: "/tu-proyecto-cuenta" },
  { label: "En femenino", href: "/en-femenino" },
  { label: "Streaming", href: "/streaming" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1512px] mx-auto px-6 h-[68px] flex items-center justify-between gap-8">
        {/* Logo — uses the real logo.svg (Andalucía TRADE + Junta de Andalucía) */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Andalucía TRADE — Junta de Andalucía"
            width={280}
            height={46}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-primary font-nimbus text-[13px] font-[400] whitespace-nowrap hover:text-green transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden lg:flex items-center border border-gray-200 rounded-full px-3 h-[36px] gap-2 min-w-[160px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#001E78" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent text-[13px] text-primary placeholder:text-primary focus:outline-none w-full"
          />
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center border border-gray-200 rounded-full px-3 h-[36px] gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#001E78" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Buscar" className="bg-transparent text-[13px] text-primary placeholder:text-primary focus:outline-none w-full" />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-primary font-nimbus text-[14px] font-[400] py-1 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
