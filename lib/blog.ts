export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
};

/**
 * Minimal helpers for a universal /blog/[slug] template.
 * Content will be added in a later step (e.g. HydraFacial article).
 */
export function slugToTitle(slug: string): string {
  if (slug === "hydrafacial") {
    return "HydraFacial tretman – dubinsko čišćenje i hidratacija lica bez iritacija";
  }
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function buildBlogMetadataFromSlug(slug: string): BlogPostMeta {
  const title = slugToTitle(slug);

  if (slug === "hydrafacial") {
    return {
      slug,
      title,
      description:
        "HydraFacial tretman na Novom Beogradu: dubinsko čišćenje i intenzivna hidratacija lica bez iritacija i bez oporavka. Vodič iz Odalis centra + jasan CTA za besplatne konsultacije.",
    };
  }

  return {
    slug,
    title,
    description:
      "Premium vodič iz Odalis centra. Sadržaj je u pripremi i biće uskoro objavljen.",
  };
}

