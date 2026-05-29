import CategoryPage from "@/components/CategoryPage";
import { allArticlesExtended } from "@/lib/mockData";

export default function AndaluciaTRADEInformaPage() {
  // Categoría pendiente de contenido propio — mostramos artículos generales
  const pool = allArticlesExtended.filter((a) => a.category === "Andalucía TRADE informa");
  const fallback = allArticlesExtended;
  const all = pool.length >= 5 ? pool : [...pool, ...fallback.filter((a) => !pool.includes(a))];

  const featured = all[0];
  const bigCard = all[1] ?? all[0];
  const smallCards = [all[2] ?? all[0], all[3] ?? all[1], all[4] ?? all[0], all[5] ?? all[1]];
  const gridCards = all.slice(6, 9);

  return (
    <CategoryPage
      pageTitle="Andalucía TRADE informa"
      featured={featured}
      bigCard={bigCard}
      smallCards={smallCards}
      gridCards={gridCards}
    />
  );
}
