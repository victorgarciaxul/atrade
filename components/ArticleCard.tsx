import Image from "next/image";
import { Article } from "@/lib/types";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative h-[280px] rounded-2xl overflow-hidden">
        <Image
          src={article.image}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <h3 className="text-primary font-brand text-[17px] font-[500] line-clamp-2 leading-snug group-hover:text-green transition-colors duration-200">
        {article.title}
      </h3>
      <p className="text-secondary text-sm line-clamp-2 leading-relaxed">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs text-grey">
        <span>{article.category}</span>
        <span>|</span>
        <span>{article.readTime} min de lectura</span>
      </div>
    </div>
  );
}
