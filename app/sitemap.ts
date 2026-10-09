import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/posts";
import { productCategories } from "@/lib/product-catalog";
import { getCanonicalUrl } from "@/lib/site-url";

const staticRoutes = [
  "/",
  "/proizvodi",
  "/tretmani/lice",
  "/tretmani/telo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryRoutes = productCategories
    .filter((category) =>
      category.products.some((product) => product.sitemapIndexable),
    )
    .map((category) => `/proizvodi/${category.slug}`);

  const productRoutes = productCategories.flatMap((category) =>
    category.products
      .filter((product) => product.detailPage && product.sitemapIndexable)
      .map(
        (product) =>
          `/proizvodi/${category.slug}/${product.slug}`,
      ),
  );

  const blogRoutes = Object.values(blogPosts).map(
    (post) => `/blog/${post.slug}`,
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes].map(
    (route) => ({ url: getCanonicalUrl(route) }),
  );
}
