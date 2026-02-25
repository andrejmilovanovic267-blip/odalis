import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/ui/button";
import { blogPosts } from "./posts";

export const metadata = {
  title: "Blog",
  description: "Blog Odalis centra. Saveti, objašnjenja tretmana i vodiči – sadržaj u pripremi.",
  robots: {
    index: false,
    follow: true,
  },
};

// Featured blog posts (in exact order)
const featuredSlugs = [
  "celulit-zasto-se-vraca-i-plan-koji-traje",
  "koliko-cesto-raditi-estetske-tretmane",
  "koza-bez-tonusa-i-elasticnosti-sta-raditi",
];

const featuredOrder = new Map(
  featuredSlugs.map((slug, index) => [slug, index])
);

// Convert blogPosts object to array and sort by title A-Z
// Since there's no date field, we sort alphabetically by title
const allBlogPosts = Object.entries(blogPosts)
  .map(([slug, post]) => ({
    slug,
    title: post.title,
    excerpt: post.intro?.[0] || post.description || "",
    tag: post.category,
    href: `/blog/${post.slug}`,
    cardImage: post.cardImage,
  }))
  .sort((a, b) => a.title.localeCompare(b.title)); // Sort A-Z by title

// Extract featured posts in exact order
const featuredPosts = featuredSlugs
  .map((slug) => {
    const post = blogPosts[slug];
    if (!post) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[blog/page] Featured post with slug "${slug}" not found in blogPosts`);
      }
      return null;
    }
    return {
      slug,
      title: post.title,
      excerpt: post.intro?.[0] || post.description || "",
      tag: post.category,
      href: `/blog/${post.slug}`,
      cardImage: post.cardImage,
    };
  })
  .filter((post): post is NonNullable<typeof post> => post !== null);

export default function BlogIndexPage() {

  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {/* Hero Section */}
      <Section className="relative">
        {/* Back Navigation - Top left corner */}
        <Link
          href="/"
          className="absolute left-4 top-10 md:left-8 md:top-14 z-20 inline-flex items-center gap-2 text-white/90 hover:text-[#C9A24D] transition-colors duration-200 hover:-translate-x-1 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-sm"
          aria-label="Nazad na početnu"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">Nazad</span>
        </Link>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <SectionHeading as="h1" className="max-w-[900px] mx-auto">
              Blog
            </SectionHeading>
            
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto break-words">
              Na Odalis blogu delimo kratke i jasne savete o prirodnom podmlađivanju lica i tela, neinvazivnim tretmanima i pravilnoj nezi kože. Cilj nam je da vam pomognemo da razumete šta zaista daje rezultate i kako da donesete pravu odluku bez pritiska i lažnih obećanja.
            </p>

            <div className="pt-4">
              <Button href="#konsultacije" variant="primary">
                Zakaži konsultacije
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Section */}
      <Section className="relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Izdvojeno
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug}
                href={post.href}
                className="group"
              >
                <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                    {post.cardImage ? (
                      <Image
                        src={post.cardImage}
                        alt={post.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#C9A24D] border border-[#C9A24D]/30 bg-[#C9A24D]/10 rounded-full">
                        {post.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:opacity-90 transition-opacity duration-250 motion-reduce:transition-none">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-secondary text-sm leading-relaxed font-light line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <span className="text-[#C9A24D] text-sm font-medium group-hover:underline">
                        Pročitaj više →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* All Posts Grid */}
      <Section className="relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Svi članci
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allBlogPosts.map((post) => (
              <Link 
                key={post.slug}
                href={post.href}
                className="group"
              >
                <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                    {post.cardImage ? (
                      <Image
                        src={post.cardImage}
                        alt={post.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#C9A24D] border border-[#C9A24D]/30 bg-[#C9A24D]/10 rounded-full">
                        {post.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:opacity-90 transition-opacity duration-250 motion-reduce:transition-none">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-secondary text-sm leading-relaxed font-light line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <span className="text-[#C9A24D] text-sm font-medium group-hover:underline">
                        Pročitaj više →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
