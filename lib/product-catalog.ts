export interface ProductListingItem {
  id: string;
  slug: string;
  category: string;
  detailPage: true;
  purpose: string;
  name: string;
  images?: [string, ...string[]];
  shortDescription: string;
  brand: string;
  countryOfOrigin: string;
  quantity: string;
  price: number;
}

export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  products: ProductListingItem[];
  educationTitle: string;
  educationIntro: string;
}

const demoBrand = "Odalis";
const demoCountry = "Srbija";

export const faceCreamCategory: ProductCategory = {
  slug: "kreme-za-lice",
  title: "Kreme za lice",
  description: "Pažljivo odabrana nega za svakodnevnu rutinu tvoje kože.",
  products: [
    {
      id: "hydra-krema-za-lice",
      slug: "hydra-krema-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      purpose: "Hidratacija",
      name: "Hydra krema za lice",
      images: ["/krema.png"],
      shortDescription:
        "Bogata i prijatna tekstura namenjena svakodnevnoj nezi kože. Lako se uklapa u jutarnju i večernju rutinu i ostavlja prijatan osećaj negovane i meke kože.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "50 ml",
      price: 1590,
    },
    {
      id: "dnevna-krema-za-lice",
      slug: "dnevna-krema-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      purpose: "Svakodnevna nega",
      name: "Dnevna krema za lice",
      shortDescription:
        "Krema jednostavne teksture za svakodnevne trenutke nege. Lako se uklapa u jutarnju rutinu i ostavlja prijatan osećaj na koži.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "50 ml",
      price: 1890,
    },
    {
      id: "lagana-krema-za-lice",
      slug: "lagana-krema-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      purpose: "Lagana tekstura",
      name: "Lagana krema za lice",
      shortDescription:
        "Lagana tekstura za jednostavan korak u svakodnevnoj nezi. Prijatno se uklapa u rutinu tokom dana.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "50 ml",
      price: 1690,
    },
  ],
  educationTitle: "Kako odabrati kremu za lice?",
  educationIntro:
    "Pri izboru kreme razmisli o tome kako se tvoja koža oseća tokom dana i kakvu teksturu najradije uključuješ u svoju rutinu.",
};

export const faceMaskCategory: ProductCategory = {
  slug: "maske-za-lice",
  title: "Maske za lice",
  description: "Dodatna nega kada koži treba više.",
  products: [
    {
      id: "hidratantna-maska-za-lice",
      slug: "hidratantna-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      purpose: "Hidratacija",
      name: "Hidratantna maska za lice",
      shortDescription:
        "Prijatan dodatak rutini nege, osmišljen za trenutke kada želiš da usporiš i posvetiš vreme svojoj koži.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "50 ml",
      price: 1290,
    },
    {
      id: "osvezavajuca-maska-za-lice",
      slug: "osvezavajuca-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      purpose: "Osveženje",
      name: "Osvežavajuća maska za lice",
      shortDescription:
        "Jednostavan korak za prijatan osećaj osveženja u rutini nege. Namenjena je trenucima opuštanja kod kuće.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "50 ml",
      price: 1390,
    },
    {
      id: "maska-za-neznu-negu-lica",
      slug: "maska-za-neznu-negu-lica",
      category: "maske-za-lice",
      detailPage: true,
      purpose: "Nežna nega",
      name: "Maska za nežnu negu lica",
      shortDescription:
        "Nežan izbor za dodatni trenutak pažnje u rutini nege lica. Uživaj u mirnom delu svoje svakodnevne rutine.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "50 ml",
      price: 1490,
    },
  ],
  educationTitle: "Kako uključiti masku u negu lica?",
  educationIntro:
    "Izaberi trenutak koji ti odgovara i napravi prostor za dodatni korak u svojoj rutini nege.",
};

export const faceSetCategory: ProductCategory = {
  slug: "setovi-za-negu-lica",
  title: "Setovi za negu lica",
  description: "Pažljivo kombinovani proizvodi za jednostavniju rutinu.",
  products: [
    {
      id: "set-za-hidrataciju-lica",
      slug: "set-za-hidrataciju-lica",
      category: "setovi-za-negu-lica",
      detailPage: true,
      purpose: "Hidratacija",
      name: "Set za hidrataciju lica",
      shortDescription:
        "Pažljivo odabran set koji okuplja proizvode za jednostavniju rutinu nege lica.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "1 set",
      price: 2990,
    },
    {
      id: "set-za-svakodnevnu-negu",
      slug: "set-za-svakodnevnu-negu",
      category: "setovi-za-negu-lica",
      detailPage: true,
      purpose: "Svakodnevna nega",
      name: "Set za svakodnevnu negu",
      shortDescription:
        "Praktično odabrani proizvodi koji se lako uklapaju u svakodnevnu rutinu.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "1 set",
      price: 3490,
    },
    {
      id: "kompletna-odalis-rutina",
      slug: "kompletna-odalis-rutina",
      category: "setovi-za-negu-lica",
      detailPage: true,
      purpose: "Kompletna nega",
      name: "Kompletna Odalis rutina",
      shortDescription:
        "Odabrana kombinacija proizvoda za negu, okupljena u jednom praktičnom setu.",
      brand: demoBrand,
      countryOfOrigin: demoCountry,
      quantity: "1 set",
      price: 3990,
    },
  ],
  educationTitle: "Kako odabrati set za negu lica?",
  educationIntro:
    "Razmisli o koracima koje želiš da uključiš u svoju rutinu i izaberi set koji ti najviše odgovara.",
};

export const productCategories = [
  faceCreamCategory,
  faceMaskCategory,
  faceSetCategory,
];

export function getProductCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductBySlug(categorySlug: string, productSlug: string) {
  const category = getProductCategory(categorySlug);
  const product = category?.products.find((item) => item.slug === productSlug);

  return category && product ? { category, product } : undefined;
}
