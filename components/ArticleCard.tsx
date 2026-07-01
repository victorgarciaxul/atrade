import Image from "next/image";
import { Article } from "@/lib/types";

function getYTThumb(videoUrl?: string): string | null {
  if (!videoUrl) return null;
  const m = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}

export default function ArticleCard({ article }: { article: Article }) {
  const thumb = getYTThumb(article.videoUrl);
  const imgSrc = thumb ?? article.image;

  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative h-[200px] rounded-2xl overflow-hidden bg-gray-900">
        <Image
          src={imgSrc}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {thumb && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-badge text-primary text-[10px] font-[500] px-2 py-[2px] rounded-full">
          {article.category}
        </span>
      </div>
      <h3 className="text-primary font-brand text-[15px] font-[500] line-clamp-2 leading-snug group-hover:text-green transition-colors duration-200">
        {article.title}
      </h3>
      <p className="text-secondary text-sm line-clamp-2 leading-relaxed">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs text-grey">
        <span>{article.date}</span>
        <span>|</span>
        <span>{article.readTime} min de lectura</span>
      </div>
    </div>
  );
}
