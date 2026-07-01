import Image from "next/image";
import Link from "next/link";
import { allArticlesExtended } from "@/lib/mockData";
import Breadcrumb from "@/components/Breadcrumb";

export default function StreamingPage() {
  const all = allArticlesExtended.filter((a) => a.category === "Streaming");

  if (all.length === 0) {
    return (
      <main className="max-w-[1512px] mx-auto px-6 py-10">
        <Breadcrumb crumbs={[{ label: "Inicio", href: "/" }, { label: "Streaming" }]} />
        <h1 className="font-brand text-primary text-2xl font-[500] mb-10">Streaming</h1>
        <p className="text-secondary">Próximamente.</p>
      </main>
    );
  }

  return (
    <main className="max-w-[1512px] mx-auto px-6 py-10">
      <Breadcrumb crumbs={[{ label: "Inicio", href: "/" }, { label: "Streaming" }]} />

      {/* Cabecera */}
      <div className="mb-10">
        <h1 className="font-brand text-primary text-2xl font-[500]">Streaming</h1>
      </div>

      {/* Vídeo destacado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="rounded-2xl overflow-hidden bg-gray-900">
          {all[0].videoUrl ? (
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <StreamingEmbed url={all[0].videoUrl} title={all[0].title} />
            </div>
          ) : (
            <VideoPlaceholder title={all[0].title} />
          )}
        </div>

        <div className="flex flex-col gap-5 justify-center">
          <span className="inline-block bg-badge text-primary text-xs font-[500] px-3 py-1 rounded-full self-start">
            {all[0].category}
          </span>
          <h2 className="font-brand text-primary text-[28px] sm:text-[36px] font-[500] leading-tight">
            {all[0].title}
          </h2>
          <p className="text-secondary text-[14px] leading-relaxed line-clamp-4">
            {all[0].excerpt}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-xs text-grey">
              <span>{all[0].author}</span>
              <span>|</span>
              <span>{all[0].readTime} min de lectura</span>
            </div>
            <Link
              href={`/article/${all[0].slug}`}
              className="bg-green text-white text-sm px-5 py-2 rounded-full hover:bg-green/90 active:scale-95 transition-all duration-200"
            >
              Ver artículo
            </Link>
          </div>
        </div>
      </div>

      {/* Rejilla de vídeos */}
      <h2 className="font-brand text-primary text-2xl font-[500] mb-6">Todos los vídeos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {all.slice(1, 7).map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden bg-gray-900">
              {article.videoUrl ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <StreamingEmbed url={article.videoUrl} title={article.title} />
                </div>
              ) : (
                <VideoPlaceholder title={article.title} />
              )}
            </div>
            <div>
              <span className="text-xs text-grey">{article.category} · {article.date}</span>
              <h3 className="font-brand text-primary text-[15px] font-[500] line-clamp-2 leading-snug mt-1 group-hover:text-green transition-colors duration-200">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}

/* ── Reproductor de vídeo ─────────────────────────────────────────────────── */
function StreamingEmbed({ url, title }: { url: string; title: string }) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  const vi = url.match(/vimeo\.com\/(\d+)/);
  const embedUrl = yt
    ? `https://www.youtube.com/embed/${yt[1]}`
    : vi
    ? `https://player.vimeo.com/video/${vi[1]}`
    : url;

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}

/* ── Placeholder cuando no hay vídeo ─────────────────────────────────────── */
function VideoPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative h-[220px] bg-gray-800 flex flex-col items-center justify-center gap-3 rounded-2xl overflow-hidden group">
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
        {/* Play icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      <p className="text-white/60 text-xs px-4 text-center line-clamp-2">{title}</p>
      <p className="text-white/40 text-[10px]">Vídeo disponible próximamente</p>
    </div>
  );
}
