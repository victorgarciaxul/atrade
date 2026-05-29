import CategoryPage from "@/components/CategoryPage";
import { allArticlesExtended } from "@/lib/mockData";

export default function TuProyectoCuentaPage() {
  const pool = allArticlesExtended.filter((a) => a.category === "Tu proyecto cuenta");
  const fallback = allArticlesExtended.filter((a) => a.category !== "Tu proyecto cuenta");
  const all = [...pool, ...fallback];

  const featured = all[0];
  const bigCard = all[1] ?? all[0];
  const smallCards = [all[2] ?? all[0], all[3] ?? all[1], all[4] ?? all[0], all[5] ?? all[1]];
  const gridCards = all.slice(6, 9);

  return (
    <CategoryPage
      pageTitle="Tu proyecto cuenta"
      featured={featured}
      bigCard={bigCard}
      smallCards={smallCards}
      gridCards={gridCards}
    />
  );
}
