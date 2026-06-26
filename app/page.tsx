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

      {/* Presentación de la revista */}
      <div className="max-w-[1512px] mx-auto px-6 py-10 border-b border-gray-100">
        <p className="text-secondary text-[17px] leading-relaxed max-w-3xl">
          <span className="font-brand text-primary font-[600]">Andalucía TRADE IMPULSA</span> es la revista digital de la Agencia Empresarial para la Transformación y el Desarrollo Económico de Andalucía. Nace con la vocación de acercar a empresas y ciudadanía el impacto real de los proyectos cofinanciados con Fondos FEDER: historias de empresas que crecen, se internacionalizan e innovan gracias al apoyo de la Agencia. Un enfoque dinámico y audiovisual que da voz a quienes transforman la economía andaluza.
        </p>
      </div>

      <HeroSection featured={featuredArticle} sidebar={sidebarArticles} />
      <LatestNews articles={latestArticles} />
      <AllNews featured={featuredArticle} articles={allArticles} />
    </>
  );
}
