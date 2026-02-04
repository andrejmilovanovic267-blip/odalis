import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/ui/button";

export const metadata = {
  title: "Blog",
  description: "Blog Odalis centra. Saveti, objašnjenja tretmana i vodiči – sadržaj u pripremi.",
  robots: {
    index: false,
    follow: true,
  },
};

// Dummy data for blog posts
const featuredPosts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    excerpt: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    tag: "Edukacija",
    href: "#",
  },
  {
    id: 2,
    title: "Ut enim ad minim veniam quis nostrud exercitation",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tag: "FAQ",
    href: "#",
  },
];

const allPosts = [
  { id: 1, title: "HydraFacial tretman u Odalisu", excerpt: "Eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris.", tag: "Edukacija", href: "/blog/hydrafacial" },
  { id: 2, title: "Ut enim ad minim veniam quis nostrud exercitation ullamco", excerpt: "Laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum.", tag: "FAQ" },
  { id: 3, title: "Duis aute irure dolor in reprehenderit in voluptate velit", excerpt: "Esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.", tag: "Mitovi" },
  { id: 4, title: "Excepteur sint occaecat cupidatat non proident sunt in culpa", excerpt: "Qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem.", tag: "Edukacija" },
  { id: 5, title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem", excerpt: "Accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto.", tag: "FAQ" },
  { id: 6, title: "Accusantium doloremque laudantium totam rem aperiam eaque", excerpt: "Ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.", tag: "Mitovi" },
  { id: 7, title: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut", excerpt: "Odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam.", tag: "Edukacija" },
  { id: 8, title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit", excerpt: "Amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.", tag: "FAQ" },
  { id: 9, title: "Ut labore et dolore magnam aliquam quaerat voluptatem ut enim", excerpt: "Minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.", tag: "Mitovi" },
  { id: 10, title: "Dolor in reprehenderit in voluptate velit esse cillum dolore", excerpt: "Eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt.", tag: "Edukacija" },
  { id: 11, title: "Mollit anim id est laborum sed ut perspiciatis unde omnis", excerpt: "Iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo.", tag: "FAQ" },
  { id: 12, title: "Inventore veritatis et quasi architecto beatae vitae dicta", excerpt: "Sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.", tag: "Mitovi" },
];

export default function BlogIndexPage() {

  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {/* Hero Section */}
      <Section className="relative">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Large Featured Card */}
            <Link 
              href={featuredPosts[0].href}
              className="lg:col-span-2 group"
            >
              <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-[#C9A24D] border border-[#C9A24D]/30 bg-[#C9A24D]/10 rounded-full">
                      {featuredPosts[0].tag}
                    </span>
                  </div>
                  
                  <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:opacity-90 transition-opacity duration-250 motion-reduce:transition-none">
                    {featuredPosts[0].title}
                  </h3>
                  
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light flex-1">
                    {featuredPosts[0].excerpt}
                  </p>
                </div>
              </article>
            </Link>

            {/* Small Featured Card */}
            <Link 
              href={featuredPosts[1].href}
              className="group"
            >
              <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-[#C9A24D] border border-[#C9A24D]/30 bg-[#C9A24D]/10 rounded-full">
                      {featuredPosts[1].tag}
                    </span>
                  </div>
                  
                  <h3 className="text-text-primary text-lg md:text-xl font-bold mb-3 leading-tight group-hover:opacity-90 transition-opacity duration-250 motion-reduce:transition-none">
                    {featuredPosts[1].title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light flex-1">
                    {featuredPosts[1].excerpt}
                  </p>
                </div>
              </article>
            </Link>
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
            {allPosts.map((post) => (
              <Link 
                key={post.id}
                href={post.href || "#"}
                className="group"
              >
                <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
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
