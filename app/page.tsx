import HeroSlider from "@/components/HeroSlider";
import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import AllNews from "@/components/AllNews";
import { featuredArticle, sidebarArticles, latestArticles, allArticles, allArticlesExtended } from "@/lib/mockData";

const impulsaFondo = {
  id: -1,
  title: "",
  excerpt: "",
  category: "",
  author: "",
  date: "",
  readTime: 0,
  image: "/impulsa-fondo.png",
  slug: "",
  isBanner: true,
};

export default function Home() {
  const sliderSlides = [impulsaFondo];

  return (
    <>
      <HeroSlider slides={sliderSlides} />
      <HeroSection featured={featuredArticle} sidebar={sidebarArticles} />
      <LatestNews articles={latestArticles} />
      <AllNews featured={featuredArticle} articles={allArticles} />
    </>
  );
}
