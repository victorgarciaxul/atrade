"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   FloatingWidgets — accesibilidad + scroll to top
   Se añade en layout.tsx para que aparezca en todas las páginas.
──────────────────────────────────────────────────────────────────────────────*/
export default function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  // ── Opciones de accesibilidad ──────────────────────────────────────────────
  const [fontSize, setFontSize] = useState(100);   // porcentaje
  const [contrast, setContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);

  // Aplica los filtros al <html>
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize}%`;

    const filters: string[] = [];
    if (contrast) filters.push("contrast(1.5)");
    if (grayscale) filters.push("grayscale(1)");
    document.body.style.filter = filters.join(" ");

    if (dyslexia) {
      root.style.fontFamily = "'OpenDyslexic', 'Arial', sans-serif";
      root.style.letterSpacing = "0.05em";
      root.style.wordSpacing = "0.15em";
    } else {
      root.style.fontFamily = "";
      root.style.letterSpacing = "";
      root.style.wordSpacing = "";
    }
  }, [fontSize, contrast, grayscale, dyslexia]);

  // ── Mostrar botón scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const resetAll = () => {
    setFontSize(100);
    setContrast(false);
    setGrayscale(false);
    setDyslexia(false);
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

      {/* ── Panel de accesibilidad ─────────────────────────────────────────── */}
      {a11yOpen && (
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-4 w-[220px] flex flex-col gap-3 border border-gray-100">
          <p className="text-primary font-brand text-[13px] font-[600] mb-1">Accesibilidad</p>

          {/* Tamaño de texto */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-grey">Tamaño del texto</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize((f) => Math.max(80, f - 10))}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-primary font-bold text-lg transition-colors"
              >−</button>
              <span className="text-sm text-primary font-[500] w-10 text-center">{fontSize}%</span>
              <button
                onClick={() => setFontSize((f) => Math.min(140, f + 10))}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-primary font-bold text-lg transition-colors"
              >+</button>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2">
            <Toggle label="Alto contraste" active={contrast} onChange={setContrast} />
            <Toggle label="Escala de grises" active={grayscale} onChange={setGrayscale} />
            <Toggle label="Fuente dislexia" active={dyslexia} onChange={setDyslexia} />
          </div>

          {/* Reset */}
          <button
            onClick={resetAll}
            className="text-xs text-grey hover:text-primary transition-colors text-left mt-1 underline underline-offset-2"
          >
            Restablecer todo
          </button>
        </div>
      )}

      {/* ── Botón accesibilidad ────────────────────────────────────────────── */}
      <button
        onClick={() => setA11yOpen((o) => !o)}
        aria-label="Opciones de accesibilidad"
        title="Accesibilidad"
        className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 active:scale-95 transition-all duration-200"
      >
        {/* Icono persona con círculo (WCAG) */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <circle cx="12" cy="4" r="2" fill="white" stroke="none"/>
          <path d="M12 7v5l-3 5h6l-3-5V7" />
          <path d="M9 12H6M15 12h3" />
        </svg>
      </button>

      {/* ── Scroll to top ──────────────────────────────────────────────────── */}
      <button
        onClick={scrollTop}
        aria-label="Volver al inicio"
        title="Volver arriba"
        className={`w-11 h-11 rounded-full bg-green text-white flex items-center justify-center shadow-lg hover:bg-green/90 active:scale-95 transition-all duration-300 ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

    </div>
  );
}

/* ── Sub-componente toggle ────────────────────────────────────────────────── */
function Toggle({
  label,
  active,
  onChange,
}: {
  label: string;
  active: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!active)}
      className="flex items-center justify-between w-full group"
    >
      <span className="text-xs text-secondary group-hover:text-primary transition-colors">{label}</span>
      <div className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${active ? "bg-green" : "bg-gray-200"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${active ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
    </button>
  );
}
