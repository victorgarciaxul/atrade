import CategoryPage from "@/components/CategoryPage";
import { allArticlesExtended } from "@/lib/mockData";

export default function EntrevistaPage() {
  const pool = allArticlesExtended.filter((a) => a.category === "Entrevista");

  // Si hay pocos artículos de esta categoría, rellena con otros
  const fallback = allArticlesExtended.filter((a) => a.category !== "Entrevista");

  const all = [...pool, ...fallback];

  const featured = all[0];
  const bigCard = all[1] ?? all[0];
  const smallCards = [all[2] ?? all[0], all[3] ?? all[1], all[4] ?? all[0], all[5] ?? all[1]];
  const gridCards = all.slice(6, 9);

  return (
    <CategoryPage
      pageTitle="Entrevista"
      featured={featured}
      bigCard={bigCard}
      smallCards={smallCards}
      gridCards={gridCards}
    />
  );
}
