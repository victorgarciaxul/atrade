import HeroSlider from "@/components/HeroSlider";
import BannerImpulsa from "@/components/BannerImpulsa";
import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import AllNews from "@/components/AllNews";
import { featuredArticle, sidebarArticles, latestArticles, allArticles } from "@/lib/mockData";

export default function Home() {
  return (
    <>
      <BannerImpulsa />
      <HeroSection featured={featuredArticle} sidebar={sidebarArticles} />
      <LatestNews articles={latestArticles} />
      <AllNews featured={featuredArticle} articles={allArticles} />
    </>
  );
}
