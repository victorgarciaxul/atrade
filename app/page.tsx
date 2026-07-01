import Link from "next/link";
import BannerImpulsa from "@/components/BannerImpulsa";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import {
  carolinaespana,
  featuredArticle,
  ariema,
  toneleria,
  aceitunastorrent,
  adm,
  eleeeuu,
  peru,
} from "@/lib/mockData";
import { Article } from "@/lib/types";

function CategorySection({ title, articles, href }: { title: string; articles: Article[]; href?: string }) {
  return (
    <section className="max-w-[1512px] mx-auto px-6 py-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-brand text-primary text-xl font-[500]">{title}</h2>
        {href && (
          <Link href={href} className="bg-green text-white text-sm px-5 py-2 rounded-full hover:bg-green/90 active:scale-95 transition-all duration-200">
            Ver todo
          </Link>
        )}
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${articles.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6`}>
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <BannerImpulsa />

      {/* Hero: Entrevista featured, Tu proyecto cuenta en sidebar */}
      <HeroSection
        featured={carolinaespana}
        sidebar={[ariema, toneleria]}
      />

      {/* A fondo */}
      <CategorySection
        title="A fondo"
        articles={[featuredArticle]}
        href="/a-fondo"
      />

      {/* Tu proyecto cuenta */}
      <CategorySection
        title="Tu proyecto cuenta"
        articles={[ariema, toneleria]}
        href="/tu-proyecto-cuenta"
      />

      {/* Andalucía TRADE informa */}
      <CategorySection
        title="Andalucía TRADE informa"
        articles={[adm, eleeeuu, peru]}
        href="/andalucia-trade-informa"
      />

      {/* En femenino */}
      <CategorySection
        title="En femenino"
        articles={[aceitunastorrent]}
        href="/en-femenino"
      />
    </>
  );
}
