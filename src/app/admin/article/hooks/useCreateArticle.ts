import { useCallback, useState } from "react";
import type { article as Article } from "@/generated/prisma/client";
import {
  createArticleAction,
  type CreateArticleParams,
} from "@/actions/article/createArticle.action";

const emptyDraft = (): CreateArticleParams => ({
  name: "",
  imageurl: null,
  description: null,
  prix: 0,
});

function normalizeCreatePayload(draft: CreateArticleParams): CreateArticleParams {
  const name = draft.name.trim();
  const imageRaw = draft.imageurl?.trim();
  const imageurl =
    imageRaw && imageRaw.length > 0 ? imageRaw : null;
  const descRaw = draft.description?.trim();
  const description =
    descRaw && descRaw.length > 0 ? descRaw : null;

  return {
    name,
    imageurl,
    description,
    prix: draft.prix,
  };
}

export function useCreateArticle(onCreated: (article: Article) => void) {
  const [draft, setDraft] = useState<CreateArticleParams>(emptyDraft);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof CreateArticleParams, value: string | number | null) => {
      setDraft((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setDraft(emptyDraft());
    setError(null);
  }, []);

  const submit = useCallback(async () => {
    setIsCreating(true);
    setError(null);

    try {
      const payload = normalizeCreatePayload(draft);
      const created = await createArticleAction(payload);
      onCreated(created);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue lors de la creation.");
      }
    } finally {
      setIsCreating(false);
    }
  }, [draft, onCreated, reset]);

  return {
    draft,
    isCreating,
    error,
    handleChange,
    submit,
    reset,
  };
}
