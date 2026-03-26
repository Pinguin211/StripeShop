"use client";

import type { article as Article } from "@/generated/prisma/client";
import { useAdminArticles } from "@/app/admin/article/hooks/useAdminArticles";
import { useCreateArticle } from "@/app/admin/article/hooks/useCreateArticle";
import { useDeleteArticle } from "@/app/admin/article/hooks/useDeleteArticle";
import { useUpdateArticle } from "@/app/admin/article/hooks/useUpdateArticle";

export default function AdminArticleTable({ initialArticles }: { initialArticles: Article[] }) {
  const { articles, addArticle, removeArticle, mergeArticle } =
    useAdminArticles(initialArticles);

  const {
    editingId,
    editDraft,
    isSaving,
    error: updateError,
    startEdit,
    cancelEdit,
    handleChange,
    saveEdit,
  } = useUpdateArticle(mergeArticle);

  const {
    draft: createDraft,
    isCreating,
    error: createError,
    handleChange: handleCreateChange,
    submit: submitCreate,
  } = useCreateArticle(addArticle);

  const {
    deletingId,
    error: deleteError,
    requestDelete,
  } = useDeleteArticle(removeArticle);

  const bannerError = updateError || deleteError;
  const formDisabled = isSaving || editingId !== null;

  return (
    <div className="surface-card card-padding radius-card flex flex-col gap-6">
      <h2 className="text-heading-lg text-primary mb-4">Gestion des Articles</h2>
      
      {bannerError && (
        <div className="feedback-error p-4 radius-feedback text-body">
          {bannerError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-body border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-subtle">
              <th className="py-3 px-4 text-label font-semibold">Image</th>
              <th className="py-3 px-4 text-label font-semibold max-w-[200px]">Nom</th>
              <th className="py-3 px-4 text-label font-semibold">Description</th>
              <th className="py-3 px-4 text-label font-semibold w-24">Prix (€)</th>
              <th className="py-3 px-4 text-label font-semibold w-48 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-subtle bg-black/[0.03] dark:bg-white/[0.04]">
              <td className="py-3 px-4 align-top">
                <input
                  type="text"
                  value={createDraft.imageurl ?? ""}
                  onChange={(e) =>
                    handleCreateChange(
                      "imageurl",
                      e.target.value.trim() === "" ? null : e.target.value,
                    )
                  }
                  className="surface-input border-input radius-input input-padding w-full text-small text-primary"
                  placeholder="URL image (optionnel)"
                  disabled={formDisabled || isCreating}
                />
              </td>
              <td className="py-3 px-4 align-top max-w-[200px]">
                <input
                  type="text"
                  value={createDraft.name}
                  onChange={(e) => handleCreateChange("name", e.target.value)}
                  className="surface-input border-input radius-input input-padding w-full text-small text-primary"
                  placeholder="Nom *"
                  disabled={formDisabled || isCreating}
                />
              </td>
              <td className="py-3 px-4 align-top">
                <textarea
                  value={createDraft.description ?? ""}
                  onChange={(e) =>
                    handleCreateChange(
                      "description",
                      e.target.value.trim() === "" ? null : e.target.value,
                    )
                  }
                  className="surface-input border-input radius-input input-padding w-full text-small text-primary h-20 resize-y"
                  placeholder="Description"
                  disabled={formDisabled || isCreating}
                />
              </td>
              <td className="py-3 px-4 align-top">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={createDraft.prix > 0 ? createDraft.prix : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    handleCreateChange(
                      "prix",
                      v === "" ? 0 : parseFloat(v),
                    );
                  }}
                  className="surface-input border-input radius-input input-padding w-full text-small text-primary"
                  placeholder="Prix *"
                  disabled={formDisabled || isCreating}
                />
              </td>
              <td className="py-3 px-4 align-top text-right">
                <div className="flex flex-col items-end gap-2">
                  {createError && (
                    <span className="text-small text-red-600 max-w-[14rem] text-right">
                      {createError}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => void submitCreate()}
                    disabled={formDisabled || isCreating}
                    className="btn-primary btn-primary-hover px-3 py-1 radius-btn text-small flex items-center gap-2 whitespace-nowrap"
                  >
                    {isCreating && <div className="spinner !w-3 !h-3" />}
                    {isCreating ? "Creation..." : "Ajouter"}
                  </button>
                </div>
              </td>
            </tr>
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  Aucun article trouvé.
                </td>
              </tr>
            )}
            {articles.map((article) => {
              const isEditing = editingId === article.id;
              const isRowBusy = deletingId === article.id;

              return (
                <tr key={article.id} className="border-b border-subtle hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editDraft.imageurl || ""}
                        onChange={(e) => handleChange("imageurl", e.target.value)}
                        className="surface-input border-input radius-input input-padding w-full text-small text-primary"
                        placeholder="https://..."
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 radius-btn overflow-hidden border border-subtle flex items-center justify-center">
                        {article.imageurl ? (
                          <img src={article.imageurl} alt={article.name || "Article"} className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-small text-muted">N/A</span>
                        )}
                      </div>
                    )}
                  </td>
                  
                  <td className="py-3 px-4 max-w-[200px]">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editDraft.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="surface-input border-input radius-input input-padding w-full text-small text-primary"
                        disabled={isSaving}
                      />
                    ) : (
                      <span className="text-primary truncate block" title={article.name || ""}>
                        {article.name || <i className="text-muted">Sans nom</i>}
                      </span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <textarea
                        value={editDraft.description || ""}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="surface-input border-input radius-input input-padding w-full text-small text-primary h-20 resize-y"
                        disabled={isSaving}
                      />
                    ) : (
                      <span className="text-muted text-small line-clamp-2" title={article.description || ""}>
                        {article.description || "Aucune description"}
                      </span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editDraft.prix !== undefined ? editDraft.prix : ""}
                        onChange={(e) => handleChange("prix", parseFloat(e.target.value))}
                        className="surface-input border-input radius-input input-padding w-full text-small text-primary"
                        disabled={isSaving}
                      />
                    ) : (
                      <span className="text-primary font-semibold font-mono">
                        {article.prix?.toFixed(2) ?? "0.00"}
                      </span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4 text-right align-middle">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={cancelEdit}
                            disabled={isSaving}
                            className="btn-ghost btn-ghost-hover px-3 py-1 radius-btn text-small"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveEdit}
                            disabled={isSaving}
                            className="btn-primary btn-primary-hover px-3 py-1 radius-btn text-small flex items-center gap-2"
                          >
                            {isSaving && <div className="spinner !w-3 !h-3"></div>}
                            {isSaving ? "Sauvegarde..." : "Sauver"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(article)}
                            className="btn-ghost btn-ghost-hover px-3 py-1 radius-btn text-small"
                            disabled={editingId !== null || isCreating}
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            onClick={() => void requestDelete(article)}
                            disabled={
                              editingId !== null ||
                              isCreating ||
                              isRowBusy ||
                              deletingId !== null
                            }
                            className="border border-red-600/60 text-red-600 hover:bg-red-600/10 px-3 py-1 radius-btn text-small flex items-center gap-2"
                          >
                            {isRowBusy && <div className="spinner !w-3 !h-3" />}
                            {isRowBusy ? "Suppression..." : "Supprimer"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
