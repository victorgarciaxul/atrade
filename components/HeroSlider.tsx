"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";

interface HeroSliderProps {
  slides: Article[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = slides[current];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 55vw, 680px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
        >
          {/* Imagen de fondo */}
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent" />

          {/* Contenido */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1512px] mx-auto px-6 w-full">
              <div className="max-w-[580px] flex flex-col gap-5">
                {/* Badge */}
                <span className="inline-block bg-badge text-primary text-xs font-[600] px-3 py-1 rounded-full self-start tracking-wide uppercase">
                  {s.category}
                </span>

                {/* Título */}
                <h2 className="font-brand text-white text-[28px] sm:text-[38px] lg:text-[48px] font-[600] leading-tight drop-shadow-sm">
                  {s.title}
                </h2>

                {/* Excerpt */}
                <p className="text-white/80 text-[14px] sm:text-[16px] leading-relaxed line-clamp-3">
                  {s.excerpt}
                </p>

                {/* Meta + CTA */}
                <div className="flex items-center gap-4 flex-wrap mt-1">
                  <span className="text-white/60 text-xs">
                    {s.author} · {s.date} · {s.readTime} min
                  </span>
                  <Link
                    href={`/article/${s.slug}`}
                    className="bg-white text-primary text-sm font-[600] px-6 py-2.5 rounded-full hover:bg-badge transition-colors duration-200 active:scale-95"
                  >
                    Leer artículo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200 z-10"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Slide siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200 z-10"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-white/20 w-full z-10">
        <div
          key={current}
          className="h-full bg-badge"
          style={{
            animation: paused ? "none" : "slider-progress 5s linear forwards",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes slider-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
