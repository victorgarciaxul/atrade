import HeroSlider from "@/components/HeroSlider";
import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import AllNews from "@/components/AllNews";
import { featuredArticle, sidebarArticles, latestArticles, allArticles, allArticlesExtended } from "@/lib/mockData";

export default function Home() {
  // 2 slides: el artículo destacado y el segundo artículo más relevante
  const sliderSlides = [featuredArticle, allArticlesExtended[4]];

  return (
    <>
      <HeroSlider slides={sliderSlides} />
      <HeroSection featured={featuredArticle} sidebar={sidebarArticles} />
      <LatestNews articles={latestArticles} />
      <AllNews featured={featuredArticle} articles={allArticles} />
    </>
  );
}
