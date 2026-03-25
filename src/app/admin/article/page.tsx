import { listArticlesActions } from "@/actions/article/listArticles.actions";
import AdminArticleTable from "@/components/admin/admin-article-table";

export const metadata = {
  title: "Admin - Gestion des Articles",
  description: "Page d'administration pour la gestion des articles.",
};

export default async function AdminArticlePage() {
  // Récupération de tous les articles côté serveur
  // Note: Dans une vraie app, on pourrait ajouter un offset/limit
  // et filtrer l'accès de cette page via un middleware.
  const articles = await listArticlesActions();

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-heading-xl text-primary font-bold tracking-tight">
          Espace Admin
        </h1>
        <p className="text-muted mt-2 text-body">
          Gérez le catalogue des articles disponibles sur StripeShop. 
          Les modifications sont sauvegardées en temps réel dans la base de données.
        </p>
      </div>

      <AdminArticleTable initialArticles={articles} />
    </main>
  );
}
