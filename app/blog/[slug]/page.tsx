import type { Metadata } from "next";
import { slugToTitle } from "@/lib/blog";
import { blogPosts } from "../posts";
import { BlogTemplate } from "@/components/blog/BlogTemplate";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const post = blogPosts[params.slug];
  const title = post ? `${post.title} | Odalis Novi Beograd` : `${slugToTitle(params.slug)} | Odalis Novi Beograd`;
  const description = post
    ? post.description
    : "Blog tekst je u pripremi. Uskoro objavljujemo stručno napisan vodič sa jasnim odgovorima i savetima iz Odalis centra na Novom Beogradu.";

  // Relative URL - metadataBase from app/layout.tsx will make it absolute
  const canonicalUrl = `/blog/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title,
      description,
    },
  };
}

// Calculate reading time from content
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug];
  const title = post?.title ?? slugToTitle(params.slug);
  
  // Calculate reading time from post content
  const readingTime = post
    ? (() => {
        const allText = [
          ...post.intro,
          ...post.sections.flatMap(s => [
            ...s.paragraphs,
            ...(s.bullets || []),
            s.callout?.text || "",
          ]),
        ].join(" ");
        return calculateReadingTime(allText);
      })()
    : 5;

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        author: {
          "@type": "Organization",
          name: "Odalis",
        },
        areaServed: "Novi Beograd",
        inLanguage: "sr-RS",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://odalis.rs/blog/${post.slug}`,
        },
      }
    : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <BlogTemplate post={post} title={title} readingTime={readingTime} />
    </>
  );
}

