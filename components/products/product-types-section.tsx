import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

interface ProductType {
  id: string;
  title: string;
  description: string;
  action: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
}

const productTypes: ProductType[] = [
  {
    id: "kreme-za-lice",
    title: "Kreme za lice",
    description: "Svakodnevna nega, hidratacija i podrška koži.",
    action: "Istraži kreme",
    href: "/proizvodi/kreme-za-lice",
    image: {
      src: "/krema.png",
      alt: "Odalis krema za lice",
    },
  },
  {
    id: "maske-za-lice",
    title: "Maske za lice",
    description: "Dodatna nega kada koži treba više.",
    action: "Istraži maske",
    href: "/proizvodi/maske-za-lice",
    image: {
      src: "/maske.png",
      alt: "Odalis maske za lice",
    },
  },
  {
    id: "setovi-za-negu-lica",
    title: "Setovi za negu lica",
    description: "Pažljivo kombinovani proizvodi za jednostavniju rutinu.",
    action: "Istraži setove",
    href: "/proizvodi/setovi-za-negu-lica",
    image: {
      src: "/set.png",
      alt: "Odalis set za negu lica",
    },
  },
];

export function ProductTypesSection() {
  return (
    <section
      id="tipovi-nege"
      className="relative scroll-mt-24 border-t border-white/10 py-20 md:scroll-mt-28 md:py-28 lg:flex lg:min-h-[calc(100svh-var(--header-height))] lg:items-center lg:justify-center lg:py-8"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl space-y-5 text-center sm:mb-14 md:mb-16 lg:mb-0 lg:max-w-5xl lg:space-y-3">
          <SectionHeading
            as="h1"
            className="mb-0 text-3xl md:text-4xl lg:text-5xl"
          >
            Pronađi negu koja ti odgovara
          </SectionHeading>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Odaberi tip nege i pronađi proizvode prilagođene tvojoj svakodnevnoj
            rutini.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3 md:gap-6 lg:mt-[clamp(1.5rem,4vh,3rem)] lg:gap-8">
          {productTypes.map((type) => (
            <a
              key={type.id}
              id={type.id}
              href={type.href}
              aria-label={`${type.title}. ${type.description} ${type.action}`}
              className="group block min-w-0 scroll-mt-28 rounded-sm focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-4"
            >
              <article>
                <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#E8E5E0]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  >
                    <Image
                      src={type.image.src}
                      alt={type.image.alt}
                      fill
                      sizes="(min-width: 1280px) 363px, (min-width: 768px) 30vw, calc(100vw - 32px)"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                <div className="pt-5 sm:pt-6">
                  <h3 className="mb-2 font-heading text-xl font-semibold leading-snug text-text-primary transition-colors duration-250 ease-out group-hover:text-[#D6B45F] motion-reduce:transition-none sm:text-2xl">
                    {type.title}
                  </h3>
                  <p className="mb-4 max-w-sm text-sm leading-relaxed text-text-secondary sm:text-base">
                    {type.description}
                  </p>
                  <span className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#C9A24D] transition-all duration-250 ease-out group-hover:gap-3 group-hover:text-[#D6B45F] motion-reduce:transition-none">
                    {type.action}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
