import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import SidebarCard from "./SidebarCard";

interface HeroSectionProps {
  featured: Article;
  sidebar: Article[];
}

export default function HeroSection({ featured, sidebar }: HeroSectionProps) {
  return (
    <section className="max-w-[1512px] mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr_2fr] gap-8">

        {/* Col 1: Text */}
        <Link href={`/article/${featured.slug}`} className="flex flex-col justify-between gap-6 group cursor-pointer">
          <h1 className="font-brand text-primary text-[28px] 2xl:text-[34px] font-[500] leading-tight group-hover:text-green transition-colors duration-200">
            {featured.title}
          </h1>
          <p className="text-secondary text-sm leading-relaxed">
            {featured.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-grey">
            <span>{featured.category}</span>
            <span>|</span>
            <span>{featured.author}</span>
            <span>|</span>
            <span>{featured.date}</span>
          </div>
        </Link>

        {/* Col 2: Featured image + badge */}
        <Link href={`/article/${featured.slug}`} className="relative h-[420px] rounded-2xl overflow-hidden group block">
          <Image
            src={featured.image}
            alt=""
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          {/* Badge overlaid top-right */}
          <span className="absolute top-4 right-4 bg-badge text-primary text-xs font-[500] px-3 py-1 rounded-full z-10">
            {featured.category}
          </span>
        </Link>

        {/* Col 3: Sidebar cards */}
        <div className="flex flex-col gap-1 border-l border-gray-200 pl-6">
          {sidebar.map((article, i) => (
            <div key={article.id}>
              <Link href={`/article/${article.slug}`}>
                <SidebarCard article={article} />
              </Link>
              {i < sidebar.length - 1 && (
                <div className="h-px bg-gray-200 mx-2 my-1" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
