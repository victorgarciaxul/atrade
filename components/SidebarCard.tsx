import Image from "next/image";
import { Article } from "@/lib/types";

function getYTThumb(videoUrl?: string): string | null {
  if (!videoUrl) return null;
  const m = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}

export default function SidebarCard({ article }: { article: Article }) {
  const thumb = getYTThumb(article.videoUrl);
  const imgSrc = thumb ?? article.image;

  return (
    <div className="flex gap-3 items-start hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg p-2 transition-shadow duration-200 cursor-pointer">
      <div className="relative w-[100px] h-[70px] shrink-0 rounded-lg overflow-hidden bg-gray-900">
        <Image
          src={imgSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100px"
        />
        {thumb && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[6px] min-w-0">
        <div className="flex items-center gap-2 text-xs text-grey">
          <span className="font-[400]">{article.category}</span>
          <span>|</span>
          <span className="font-[400]">{article.date}</span>
        </div>
        <p className="text-primary font-brand text-[13px] font-[500] line-clamp-2 leading-snug">
          {article.title}
        </p>
        <span className="text-xs text-grey">{article.readTime} min de lectura</span>
      </div>
    </div>
  );
}
