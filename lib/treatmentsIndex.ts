import { blogPosts } from "@/app/blog/posts";

export type TreatmentCategory = "lice" | "telo";

export type Treatment = {
  slug: string;
  title: string;
  category: TreatmentCategory;
  badge: "Tretman lica" | "Tretman tela";
  excerpt: string;
  href: string;
};

// Map blog posts to treatments based on category
function mapBlogPostsToTreatments(): Treatment[] {
  return Object.entries(blogPosts)
    .map(([slug, post]) => {
      // Determine category and badge based on post category
      let category: TreatmentCategory | null = null;
      let badge: "Tretman lica" | "Tretman tela" | null = null;

      if (post.category === "Tretman lica") {
        category = "lice";
        badge = "Tretman lica";
      } else if (post.category === "Tretman tela") {
        category = "telo";
        badge = "Tretman tela";
      } else if (post.category === "Tretmani") {
        // For generic "Tretmani" category, try to infer from title/slug
        const titleLower = post.title.toLowerCase();
        const slugLower = slug.toLowerCase();
        
        // Check if it's a face treatment
        if (
          titleLower.includes("lica") ||
          titleLower.includes("lice") ||
          titleLower.includes("oko") ||
          titleLower.includes("podočnjaci") ||
          slugLower.includes("lica") ||
          slugLower.includes("lice") ||
          slugLower.includes("ultrazvucni-tretman-lica") ||
          slugLower.includes("led-maska") ||
          slugLower.includes("dermapen") ||
          slugLower.includes("hydrafacial")
        ) {
          category = "lice";
          badge = "Tretman lica";
        }
        // Check if it's a body treatment
        else if (
          titleLower.includes("tela") ||
          titleLower.includes("telo") ||
          titleLower.includes("celulit") ||
          titleLower.includes("stomak") ||
          titleLower.includes("noge") ||
          titleLower.includes("masaža") ||
          slugLower.includes("tela") ||
          slugLower.includes("telo") ||
          slugLower.includes("endosfera") ||
          slugLower.includes("kavitacija") ||
          slugLower.includes("ems") ||
          slugLower.includes("radiotalasni-lifting-tela") ||
          slugLower.includes("indiba-telo")
        ) {
          category = "telo";
          badge = "Tretman tela";
        }
      }

      // Skip if category couldn't be determined
      if (!category || !badge) {
        return null;
      }

      return {
        slug: post.slug,
        title: post.title,
        category,
        badge,
        excerpt: post.intro?.[0] || post.description || "",
        href: `/blog/${post.slug}`,
      };
    })
    .filter((treatment): treatment is Treatment => treatment !== null)
    .sort((a, b) => a.title.localeCompare(b.title)); // Sort A-Z by title
}

export const allTreatments: Treatment[] = mapBlogPostsToTreatments();

export function getTreatmentsByCategory(category: TreatmentCategory): Treatment[] {
  return allTreatments.filter((treatment) => {
    // Safety check: skip treatments without category
    if (!treatment.category) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[treatmentsIndex] Treatment "${treatment.slug}" has no category and will be skipped.`);
      }
      return false;
    }
    return treatment.category === category;
  });
}

export const faceTreatments: Treatment[] = getTreatmentsByCategory("lice");
export const bodyTreatments: Treatment[] = getTreatmentsByCategory("telo");
