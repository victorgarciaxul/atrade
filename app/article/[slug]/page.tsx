import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { allArticlesExtended, latestArticles } from "@/lib/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  /* ── Busca el artículo por slug ──────────────────────────────── */
  const article = allArticlesExtended.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedArticles = allArticlesExtended
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 4);

  // Si no hay suficientes del mismo tema, rellena con recientes
  const sidebarItems =
    relatedArticles.length >= 4
      ? relatedArticles
      : [
          ...relatedArticles,
          ...allArticlesExtended
            .filter((a) => a.id !== article.id && !relatedArticles.includes(a))
            .slice(0, 4 - relatedArticles.length),
        ];

  const bodyBlocks = article.body?.split("\n\n") ?? [];

  return (
    <main className="max-w-[1512px] mx-auto px-6 py-8">

      {/* Breadcrumb */}
      <p className="text-grey text-xs mb-6 tracking-wide uppercase">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href={`/${article.category === "A fondo" ? "a-fondo" : article.category === "En femenino" ? "en-femenino" : article.category === "Tu proyecto cuenta" ? "tu-proyecto-cuenta" : article.category === "Entrevista" ? "entrevista" : "categories"}`} className="hover:text-primary transition-colors capitalize">
          {article.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="line-clamp-1">{article.title}</span>
      </p>

      {/* ── Layout 2 columnas ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 mb-16">

        {/* ── LEFT: contenido del artículo ─────────────────────── */}
        <article>
          {/* Badge de categoría */}
          <span className="inline-block bg-badge text-primary text-xs font-[500] px-3 py-1 rounded-full mb-4">
            {article.category}
          </span>

          {/* Título */}
          <h1 className="font-brand text-primary text-[28px] sm:text-[34px] font-[500] leading-tight mb-6">
            {article.title}
          </h1>

          {/* ── Vídeo principal (si existe) ───────────────────── */}
          {article.videoUrl ? (
            <div className="relative w-full rounded-2xl overflow-hidden mb-8 bg-gray-900" style={{ paddingBottom: "56.25%" }}>
              {/* 16:9 aspect ratio */}
              <VideoEmbed url={article.videoUrl} title={article.title} />
            </div>
          ) : (
            /* Imagen destacada (si no hay vídeo) */
            <div className="relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden mb-8 bg-gray-900">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          )}

          {/* Si hay vídeo Y imagen, muestra la imagen pequeña debajo */}
          {article.videoUrl && (
            <div className="relative h-[200px] rounded-xl overflow-hidden mb-8 bg-gray-900">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute bottom-2 left-3 text-white/80 text-xs">Imagen del artículo</div>
            </div>
          )}

          {/* Meta: autor / fecha / lectura */}
          <div className="flex items-center gap-3 text-xs text-grey mb-8 pb-6 border-b border-gray-100">
            <span className="font-[500] text-secondary">{article.author}</span>
            <span>|</span>
            <span>{article.date}</span>
            <span>|</span>
            <span>{article.readTime} mins read</span>
          </div>

          {/* Cuerpo del artículo */}
          <div className="flex flex-col gap-5 text-secondary text-[15px] leading-relaxed">
            {bodyBlocks.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-brand text-green text-[22px] font-[500] leading-snug mt-4"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return <p key={i}>{block}</p>;
            })}

            {/* Si no hay body, muestra el excerpt */}
            {bodyBlocks.length === 0 && (
              <p>{article.excerpt}</p>
            )}
          </div>

          {/* ── Galería de imágenes (si existe) ──────────────────── */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-10">
              <h3 className="font-brand text-primary text-[18px] font-[500] mb-4">Galería</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {article.gallery.map((img, i) => (
                  <div key={i} className="relative h-[180px] rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={img}
                      alt={`${article.title} — imagen ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* ── RIGHT: artículos relacionados ───────────────────────── */}
        <aside className="flex flex-col gap-1">
          <h3 className="font-brand text-primary text-[16px] font-[500] mb-3 px-3">
            Artículos relacionados
          </h3>
          {sidebarItems.map((rel, i) => (
            <div key={rel.id}>
              <Link href={`/article/${rel.slug}`} className="flex gap-3 items-start p-3 rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] transition-shadow duration-200 cursor-pointer group">
                {/* Texto */}
                <div className="flex flex-col gap-[6px] flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-grey">
                    <span>{rel.author}</span>
                    <span>|</span>
                    <span>{rel.date}</span>
                  </div>
                  <p className="font-brand text-primary text-[13px] font-[500] line-clamp-2 leading-snug group-hover:text-green transition-colors duration-200">
                    {rel.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-grey">
                    <span>{rel.category}</span>
                    <span>|</span>
                    <span>{rel.readTime} mins read</span>
                  </div>
                </div>
                {/* Miniatura */}
                <div className="relative w-[90px] h-[70px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="object-cover"
                    sizes="90px"
                  />
                </div>
              </Link>
              {i < sidebarItems.length - 1 && (
                <div className="h-px bg-gray-100 mx-3" />
              )}
            </div>
          ))}
        </aside>

      </div>

      {/* ── Últimas noticias ──────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-brand text-primary text-2xl font-[500]">
            Últimas noticias
          </h2>
          <button className="bg-green text-white text-sm px-5 py-2 rounded-full hover:bg-green/90 active:scale-95 transition-all duration-200">
            Ver más
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((a) => (
            <Link key={a.id} href={`/article/${a.slug}`}>
              <ArticleCard article={a} />
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}

/* ── Reproductor de vídeo embebido ────────────────────────────────────────── */
function VideoEmbed({ url, title }: { url: string; title: string }) {
  const embedUrl = toEmbedUrl(url);

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
  };

  if (!embedUrl) {
    return (
      <video
        src={url}
        title={title}
        controls
        style={baseStyle}
      />
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={baseStyle}
    />
  );
}

function toEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vi = url.match(/vimeo\.com\/(\d+)/);
  if (vi) return `https://player.vimeo.com/video/${vi[1]}`;
  if (url.includes("/embed/") || url.includes("player.vimeo.com")) return url;
  return null;
}
