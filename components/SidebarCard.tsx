import Image from "next/image";
import { Article } from "@/lib/types";

export default function SidebarCard({ article }: { article: Article }) {
  return (
    <div className="flex gap-3 items-start hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg p-2 transition-shadow duration-200 cursor-pointer">
      <div className="relative w-[100px] h-[80px] shrink-0 rounded-lg overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
      <div className="flex flex-col gap-[6px] min-w-0">
        <div className="flex items-center gap-2 text-xs text-grey">
          <span className="font-[400]">{article.author}</span>
          <span>|</span>
          <span className="font-[400]">{article.date}</span>
        </div>
        <p className="text-primary font-brand text-[13px] font-[500] line-clamp-2 leading-snug">
          {article.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-grey">
          <span>{article.category}</span>
          <span>|</span>
          <span>{article.readTime} mins read</span>
        </div>
      </div>
    </div>
  );
}
