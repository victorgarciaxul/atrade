"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

const TABS = ["Entrevistas", "Artículos", "Videos"] as const;
type Tab = (typeof TABS)[number];

interface AllNewsProps {
  featured: Article;
  articles: Article[];
}

export default function AllNews({ featured, articles }: AllNewsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Entrevistas");

  return (
    <section className="max-w-[1512px] mx-auto px-6 py-10">
      {/* Section header */}
      <h2 className="font-brand text-primary text-2xl font-[500] mb-4">Todas las noticias</h2>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-[400] transition-colors duration-200 ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary font-[500]"
                : "text-grey hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured article (large) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Left: imagen del artículo destacado */}
        <Link href={`/article/${featured.slug}`} className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-900 block group">
          <Image
            src={featured.image}
            alt=""
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>

        {/* Right: article content */}
        <div className="flex flex-col gap-4">
          <h3 className="font-brand text-primary text-[32px] sm:text-[40px] font-[500] leading-tight">
            {featured.title}
          </h3>
          <div className="flex flex-col gap-3 text-secondary text-[14px] leading-relaxed">
            {featured.body?.split("\n\n").slice(0, 3).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-xs text-grey">
              <span>{featured.category}</span>
              <span>|</span>
              <span>{featured.readTime} min de lectura</span>
            </div>
            <Link
              href={`/article/${featured.slug}`}
              className="bg-green text-white text-sm px-5 py-2 rounded-full hover:bg-green/90 active:scale-95 transition-all duration-200"
            >
              Continuar leyendo
            </Link>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>

      {/* Ver más */}
      <div className="flex justify-center">
        <button className="bg-green text-white text-sm px-5 py-2 rounded-full hover:bg-green/90 active:scale-95 transition-all duration-200">
          Ver más
        </button>
      </div>
    </section>
  );
}
