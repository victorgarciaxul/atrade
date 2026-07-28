import Link from "next/link";
import Image from "next/image";
import BannerImpulsa from "@/components/BannerImpulsa";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import SidebarCard from "@/components/SidebarCard";
import { getPosts } from "@/lib/wordpress";
import {
  antoniocastro,
  featuredArticle,
  ariema,
  toneleria,
  aceitunastorrent,
  adm,
  eleeeuu,
  peru,
} from "@/lib/mockData";
import { Article } from "@/lib/types";

/** Pide posts de WordPress por categoría; si la API falla o no hay resultados, usa el fallback de mockData. */
async function postsOrFallback(categorySlug: string, perPage: number, fallback: Article[]): Promise<Article[]> {
  const posts = await getPosts({ categorySlug, perPage });
  return posts && posts.length > 0 ? posts : fallback;
}

function getYTThumb(videoUrl?: string): string | null {
  if (!videoUrl) return null;
  const m = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}

function CategorySection({ title, articles, href, featured }: { title: string; articles: Article[]; href?: string; featured?: boolean }) {
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

      {/* Destacado + secundarias: primer artículo grande, el resto en lista compacta */}
      {featured && articles.length > 1 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start">
          <Link href={`/article/${articles[0].slug}`} className="group flex flex-col gap-4">
            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-gray-900">
              {(() => {
                const thumb = getYTThumb(articles[0].videoUrl);
                const src = thumb ?? articles[0].image;
                return (
                  <>
                    <Image src={src} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:1024px) 100vw, 60vw" />
                    {thumb && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors duration-200">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21" /></svg>
                        </div>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-badge text-primary text-[10px] font-[500] px-2 py-[2px] rounded-full">{articles[0].category}</span>
                  </>
                );
              })()}
            </div>
            <h3 className="font-brand text-primary text-[22px] font-[500] leading-snug group-hover:text-green transition-colors duration-200">
              {articles[0].title}
            </h3>
            <p className="text-secondary text-[15px] leading-relaxed">{articles[0].excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-grey">
              <span>{articles[0].date}</span>
              <span>|</span>
              <span>{articles[0].readTime} min de lectura</span>
            </div>
          </Link>

          <div className="flex flex-col gap-1 border-l border-gray-200 pl-6">
            {articles.slice(1).map((article, i) => (
              <div key={article.id}>
                <Link href={`/article/${article.slug}`}>
                  <SidebarCard article={article} />
                </Link>
                {i < articles.length - 2 && (
                  <div className="h-px bg-gray-200 mx-2 my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : articles.length === 1 ? (
        <Link href={`/article/${articles[0].slug}`} className="group flex flex-col lg:flex-row gap-8 items-start">
          <div className="relative w-full lg:w-[480px] shrink-0 h-[280px] rounded-2xl overflow-hidden bg-gray-900">
            {(() => {
              const thumb = getYTThumb(articles[0].videoUrl);
              const src = thumb ?? articles[0].image;
              return (
                <>
                  <Image src={src} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:1024px) 100vw, 480px" />
                  {thumb && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors duration-200">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21" /></svg>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-badge text-primary text-[10px] font-[500] px-2 py-[2px] rounded-full">{articles[0].category}</span>
                </>
              );
            })()}
          </div>
          <div className="flex flex-col gap-4 justify-center py-2">
            <h3 className="font-brand text-primary text-[22px] font-[500] leading-snug group-hover:text-green transition-colors duration-200">
              {articles[0].title}
            </h3>
            <p className="text-secondary text-[15px] leading-relaxed">
              {articles[0].body?.split("\n\n")[0] ?? articles[0].excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs text-grey">
              <span>{articles[0].date}</span>
              <span>|</span>
              <span>{articles[0].readTime} min de lectura</span>
            </div>
          </div>
        </Link>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${articles.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6`}>
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <ArticleCard article={article} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function Home() {
  const [entrevista, tuProyectoCuenta, aFondo, tradeInforma, enFemenino] = await Promise.all([
    postsOrFallback("entrevista", 1, [antoniocastro]),
    postsOrFallback("tu-proyecto-cuenta", 2, [ariema, toneleria]),
    postsOrFallback("a-fondo", 1, [featuredArticle]),
    postsOrFallback("andalucia-trade-informa", 3, [adm, eleeeuu, peru]),
    postsOrFallback("en-femenino", 1, [aceitunastorrent]),
  ]);

  return (
    <>
      <BannerImpulsa />

      {/* Hero: Entrevista featured, Tu proyecto cuenta en sidebar */}
      <HeroSection
        featured={entrevista[0]}
        sidebar={tuProyectoCuenta}
      />

      {/* A fondo */}
      <CategorySection
        title="A fondo"
        articles={aFondo}
        href="/a-fondo"
      />

      {/* Tu proyecto cuenta */}
      <CategorySection
        title="Tu proyecto cuenta"
        articles={tuProyectoCuenta}
        href="/tu-proyecto-cuenta"
      />

      {/* Andalucía TRADE informa: ADM destacado, el resto secundario */}
      <CategorySection
        title="Andalucía TRADE informa"
        articles={tradeInforma}
        href="/andalucia-trade-informa"
        featured
      />

      {/* En femenino */}
      <CategorySection
        title="En femenino"
        articles={enFemenino}
        href="/en-femenino"
      />
    </>
  );
}
