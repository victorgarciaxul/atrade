import CategoryPage from "@/components/CategoryPage";
import { allArticlesExtended } from "@/lib/mockData";
import { getCategoryArticles } from "@/lib/wordpress";

export default async function EntrevistaPage() {
  const fallback = allArticlesExtended.filter((a) => a.category === "Entrevista");
  const pool = await getCategoryArticles("entrevista", fallback, 9);

  const featured = pool[0];
  const bigCard = pool[1] ?? null;
  const smallCards = pool.slice(2, 6);
  const gridCards = pool.slice(6, 9);

  if (!featured) {
    return (
      <main className="max-w-[1512px] mx-auto px-6 py-16 text-center text-gray-400">
        Próximamente
      </main>
    );
  }

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
