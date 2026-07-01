import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import { Article } from "@/lib/types";

interface CategoryPageProps {
  /** Título visible en la cabecera de la página */
  pageTitle: string;
  /** Artículo grande destacado (columna izquierda) */
  featured: Article;
  /** Artículo grande de la rejilla asimétrica (tarjeta grande) */
  bigCard: Article | null;
  /** Cuatro artículos pequeños (2×2) de la rejilla asimétrica */
  smallCards: Article[];
  /** Artículos de la última fila (3 columnas) */
  gridCards: Article[];
  /** Si es true, muestra un reproductor de vídeo en lugar de imagen (sección streaming) */
  isStreaming?: boolean;
}

export default function CategoryPage({
  pageTitle,
  featured,
  bigCard,
  smallCards,
  gridCards,
  isStreaming = false,
}: CategoryPageProps) {
  return (
    <main className="max-w-[1512px] mx-auto px-6 py-10">

      <Breadcrumb crumbs={[{ label: "Inicio", href: "/" }, { label: pageTitle }]} />

      {/* ── Sección 1: Cabecera + artículo destacado ─────────────── */}
      <div className="mb-10">
        <h1 className="font-brand text-primary text-2xl font-[500]">
          {pageTitle}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Imagen / vídeo destacado */}
        <div className="relative h-[480px] rounded-2xl overflow-hidden bg-gray-900">
          {isStreaming && featured.videoUrl ? (
            <VideoEmbed url={featured.videoUrl} title={featured.title} className="w-full h-full" />
          ) : featured.videoUrl ? (
            <VideoEmbed url={featured.videoUrl} title={featured.title} className="w-full h-full" />
          ) : (
            <Image
              src={featured.image}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Texto del artículo destacado */}
        <div className="flex flex-col gap-5">
          <span className="inline-block bg-badge text-primary text-xs font-[500] px-3 py-1 rounded-full self-start">
            {featured.category}
          </span>
          <h2 className="font-brand text-primary text-[30px] sm:text-[38px] font-[500] leading-tight">
            {featured.title}
          </h2>
          <div className="flex flex-col gap-3 text-secondary text-[14px] leading-relaxed">
            {featured.body?.split("\n\n").slice(0, 3).map((para, i) => (
              <p key={i}>{para}</p>
            )) ?? <p>{featured.excerpt}</p>}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-xs text-grey">
              <span>{featured.author}</span>
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

      {/* ── Sección 2: Rejilla asimétrica ────────────────────────── */}
      {(bigCard || smallCards.length > 0) && (
        <>
          <h2 className="font-brand text-primary text-2xl font-[500] mb-6">
            Más artículos
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mb-14">
            {/* Tarjeta grande */}
            {bigCard && (
              <Link href={`/article/${bigCard.slug}`} className="flex flex-col gap-3 cursor-pointer group">
                <div className="relative h-[380px] rounded-2xl overflow-hidden bg-gray-900">
                  <Image
                    src={bigCard.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
                <h3 className="font-brand text-primary text-[20px] font-[500] line-clamp-2 leading-snug group-hover:text-green transition-colors duration-200">
                  {bigCard.title}
                </h3>
                <p className="text-secondary text-sm line-clamp-3 leading-relaxed">
                  {bigCard.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-grey">
                  <span>{bigCard.category}</span>
                  <span>|</span>
                  <span>{bigCard.readTime} min de lectura</span>
                </div>
              </Link>
            )}

            {/* 2×2 tarjetas pequeñas */}
            {smallCards.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {smallCards.map((card) => (
                  <Link key={card.id} href={`/article/${card.slug}`} className="flex flex-col gap-2 cursor-pointer group">
                    <div className="relative h-[150px] rounded-xl overflow-hidden bg-gray-900">
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 1024px) 50vw, 20vw"
                      />
                    </div>
                    <h4 className="font-brand text-primary text-[13px] font-[500] line-clamp-2 leading-snug group-hover:text-green transition-colors duration-200">
                      {card.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-grey">
                      <span>{card.category}</span>
                      <span>|</span>
                      <span>{card.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Sección 3: Rejilla de 3 columnas ─────────────────────── */}
      {gridCards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {gridCards.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <ArticleCard article={article} />
            </Link>
          ))}
        </div>
      )}

    </main>
  );
}

/* ─── Sub-componente: reproductor de vídeo embebido ─────────────────────── */
function VideoEmbed({ url, title, className }: { url: string; title: string; className?: string }) {
  // Convierte URLs de YouTube/Vimeo a embed. Si ya es un embed URL, lo usa directamente.
  const embedUrl = toEmbedUrl(url);

  if (!embedUrl) {
    // Fallback: vídeo nativo HTML5
    return (
      <video
        src={url}
        title={title}
        controls
        className={className}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={className}
      style={{ border: 0 }}
    />
  );
}

function toEmbedUrl(url: string): string | null {
  // YouTube: https://www.youtube.com/watch?v=ID  →  https://www.youtube.com/embed/ID
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  // Vimeo: https://vimeo.com/ID  →  https://player.vimeo.com/video/ID
  const vi = url.match(/vimeo\.com\/(\d+)/);
  if (vi) return `https://player.vimeo.com/video/${vi[1]}`;

  // Ya es un embed URL
  if (url.includes("/embed/") || url.includes("player.vimeo.com")) return url;

  return null;
}
