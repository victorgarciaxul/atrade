import Link from "next/link";
import { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

export default function LatestNews({ articles }: { articles: Article[] }) {
  return (
    <section className="max-w-[1512px] mx-auto px-6 py-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-brand text-primary text-2xl font-[500]">Últimas noticias</h2>
        <button className="bg-green text-white text-sm px-5 py-2 rounded-full hover:bg-green/90 active:scale-95 transition-all duration-200">
          Ver todo
        </button>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
}
