export interface ProductListingItem {
  id: string;
  slug: string;
  category: string;
  detailPage: true;
  sitemapIndexable: boolean;
  availableForPurchase?: boolean;
  freeShippingEligible?: boolean;
  purpose: string;
  name: string;
  images?: [string, ...string[]];
  imageAlt?: string;
  cartUpsell?: string;
  shortDescription: string;
  metaTitle?: string;
  metaDescription?: string;
  buyCardQuestion?: string;
  buyCardDescription?: string;
  longDescription?: Array<{
    heading: string;
    paragraphs: Array<{ text: string; emphasis?: string }>;
    bullets?: string[];
  }>;
  inci?: string;
  inciVerificationNote?: string;
  includedProducts?: Array<{
    categorySlug: string;
    productSlug: string;
    quantity: number;
    packageOptionId?: string;
  }>;
  brand: string;
  quantity: string;
  price: number;
  packageOptions?: ProductPackageOption[];
}

export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  products: ProductListingItem[];
  educationTitle: string;
  educationIntro: string;
}

export interface ProductPackageOption {
  id: string;
  count: number;
  price: number;
  label: string;
  unitLabel?: string;
  note?: string;
}

const demoBrand = "Odalis";

export const faceCreamCategory: ProductCategory = {
  slug: "kreme-za-lice",
  title: "Kreme za lice",
  description: "Pažljivo odabrana nega za svakodnevnu rutinu tvoje kože.",
  products: [
    {
      id: "bioaqua-retinol-krema-za-lice",
      slug: "bioaqua-retinol-krema-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA SA RETINOLOM",
      name: "BIOAQUA Retinol krema za lice",
      images: ["/bioaqua1.webp"],
      imageAlt: "BIOAQUA Retinol krema za lice – ljubičasta teglica i pakovanje",
      cartUpsell: "hidratantna-maska-za-lice",
      shortDescription:
        "Krema sa retinolom, hijaluronskom kiselinom i hidratantnim sastojcima za negu kože sa vidljivim znacima starenja.",
      buyCardQuestion:
        "Primećujete prve fine linije ili kožu kojoj nedostaje svežine?",
      buyCardDescription:
        "BIOAQUA Retinol krema kombinuje retinol, hijaluronsku kiselinu i hidratantne sastojke u formuli namenjenoj nezi kože sa vidljivim znacima starenja. Pomaže očuvanju vlažnosti kože i doprinosi mekšem, negovanijem izgledu tena.",
      longDescription: [
        {
          heading: "Nega koja vašoj koži pruža dodatnu pažnju",
          paragraphs: [
            {
              text: "Vremenom koža može izgubiti deo svoje prirodne svežine, postati suvlja, a fine linije izraženije. Pravilno odabrana nega pomaže da se očuva osećaj mekoće, hidratacije i negovan izgled tena.",
            },
            {
              text: "BIOAQUA Retinol krema za lice kombinuje retinol, hijaluronsku kiselinu i pažljivo odabrane hidratantne sastojke u formuli namenjenoj nezi kože sa vidljivim znacima starenja.",
              emphasis: "BIOAQUA Retinol krema za lice",
            },
          ],
        },
        {
          heading: "Hidratacija, mekoća i negovan izgled",
          paragraphs: [
            {
              text: "Formula sadrži glicerin i hijaluronsku kiselinu, sastojke poznate po svojoj ulozi u hidratantnoj nezi. Mineralno ulje, petrolatum i dimetikon dodatno pomažu smanjenju gubitka vlage iz kože.",
            },
            {
              text: "Zahvaljujući ovoj kombinaciji, krema je dobar izbor za rutinu usmerenu na osećaj mekoće i očuvanje vlažnosti kože.",
            },
          ],
        },
        {
          heading: "Retinol kao deo anti-age rutine",
          paragraphs: [
            {
              text: "Retinol je jedan od poznatih sastojaka u kozmetici namenjenoj nezi kože sa vidljivim znacima starenja.",
            },
            {
              text: "BIOAQUA formula omogućava da negu sa retinolom uključite u svoju rutinu, uz dodatnu podršku hidratantnih sastojaka. Efekti zavise od formulacije i individualnih karakteristika kože.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "Ova krema može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Primećujete prve fine linije i promene u izgledu kože.",
            "Vaša koža deluje suvo ili joj nedostaje svežine.",
            "Želite da uključite retinol u svoju rutinu nege.",
            "Tražite kremu koja kombinuje anti-age pristup i hidratantne sastojke.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Retinol – sastojak koji se koristi u anti-age kozmetici.",
              emphasis: "Retinol",
            },
            {
              text: "Hijaluronska kiselina – podržava hidratantnu negu kože.",
              emphasis: "Hijaluronska kiselina",
            },
            {
              text: "Glicerin – pomaže vezivanju vlage.",
              emphasis: "Glicerin",
            },
            {
              text: "Alantoin – sastojak koji se često koristi u preparatima za negu kože.",
              emphasis: "Alantoin",
            },
          ],
        },
        {
          heading: "Važno za upotrebu",
          paragraphs: [
            {
              text: "Ako tek uvodite retinol u rutinu, počnite postepeno i pratite reakciju kože. Tokom dana koristite SPF zaštitu. U slučaju izražene iritacije prekinite upotrebu. Tokom trudnoće se upotreba retinoida ne preporučuje.",
            },
            {
              text: "Za konkretan način nanošenja i učestalost korišćenja pratite deklaraciju proizvoda.",
            },
          ],
        },
      ],
      inci: "WATER, GLYCERIN, MINERAL OIL, CETEARYL ALCOHOL, PETROLATUM, CETEARETH-25, DIMETHICONE, LAURIC/MYRISTIC/PALMITIC/STEARIC GLYCERIDES, GLYCERYL STEARATE, PHENOXYETHANOL, HYDROXYACETOPHENONE, POLYACRYLAMIDE, ALLANTOIN, FRAGRANCE, C13-14 ISOPARAFFIN, SODIUM POLYACRYLATE, LAURETH-7, RETINOL, HYALURONIC ACID",
      brand: "BIOAQUA",
      quantity: "60 g",
      price: 1490,
    },
    {
      id: "kormesic-botoks-collagen-krema-za-lice",
      slug: "kormesic-botoks-collagen-krema-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA SA KOLAGENOM I PEPTIDIMA",
      name: "KORMESIC Botoks Collagen krema za lice",
      images: ["/kormesic1.webp"],
      imageAlt:
        "KORMESIC Botoks Collagen krema za lice – ljubičasta teglica i pakovanje",
      cartUpsell: "sadoer-collagen-niacinamide-maska-za-oci",
      shortDescription:
        "Krema sa kolagenom, peptidima i hijaluronatom, namenjena hidrataciji i nezi kože sa vidljivim znacima starenja. Za mekši, negovaniji izgled tena i osećaj prijatnosti tokom dana.",
      buyCardQuestion:
        "Primećujete da vaša koža gubi svežinu i da fine linije postaju izraženije?",
      buyCardDescription:
        "KORMESIC Botoks Collagen krema kombinuje kolagen, peptide i hidratantne sastojke u formuli namenjenoj nezi kože sa vidljivim znacima starenja. Pruža hidratantnu negu i doprinosi osećaju mekoće i zaglađenosti kože.",
      longDescription: [
        {
          heading: "Nega koja ističe prirodnu lepotu vaše kože",
          paragraphs: [
            {
              text: "Kada koža počne da deluje suvlje, manje sveže i izgubi deo svoje prirodne mekoće, kvalitetna hidratantna nega postaje važan deo svakodnevne rutine.",
            },
            {
              text: "KORMESIC Botoks Collagen krema za lice kombinuje kolagen, keratin, peptide i hidratantne sastojke u formuli osmišljenoj za negu kože sa vidljivim znacima starenja.",
              emphasis: "KORMESIC Botoks Collagen krema za lice",
            },
          ],
        },
        {
          heading: "Hidratacija za mekšu i negovaniju kožu",
          paragraphs: [
            {
              text: "Glicerin, natrijum-hijaluronat i drugi sastojci formule doprinose očuvanju vlažnosti kože.",
            },
            {
              text: "Redovna hidratantna nega posebno je značajna kada je koža sklona suvoći, a fine linije postaju uočljivije zbog nedostatka vlage.",
            },
          ],
        },
        {
          heading: "Kolagen i peptidi u anti-age rutini",
          paragraphs: [
            {
              text: "Formula sadrži hidrolizovani kolagen, hidrolizovani keratin i peptid Acetyl Hexapeptide-8.",
            },
            {
              text: "Ovi sastojci koriste se u kozmetičkim formulama namenjenim nezi kože sa vidljivim znacima starenja.",
            },
            {
              text: "Krema je dobar izbor za rutinu koja kombinuje hidrataciju i negu usmerenu na zaglađeniji izgled tena, bez potrebe za komplikovanim dodatnim koracima.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC Botoks Collagen krema može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Primećujete prve fine linije ili promene u izgledu kože.",
            "Vaša koža deluje suvo i umorno.",
            "Želite da u rutinu uključite negu sa kolagenom i peptidima.",
            "Tražite hidratantnu kremu za lice, vrat i dekolte.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Hidrolizovani kolagen: Sastojak koji se koristi u formulama za negu i kondicioniranje kože.",
              emphasis: "Hidrolizovani kolagen:",
            },
            {
              text: "Acetyl Hexapeptide-8: Peptid poznat po upotrebi u anti-age kozmetici.",
              emphasis: "Acetyl Hexapeptide-8:",
            },
            {
              text: "Natrijum-hijaluronat: Oblik hijaluronske kiseline koji doprinosi hidratantnoj nezi.",
              emphasis: "Natrijum-hijaluronat:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
            {
              text: "Shea puter: Emolijentni sastojak koji doprinosi osećaju mekoće kože.",
              emphasis: "Shea puter:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nanesite malu količinu kreme na prethodno očišćenu i osušenu kožu lica i vrata. Nežno umasirajte kružnim pokretima do upijanja.",
            },
            {
              text: "Prema uputstvu prodavca, krema je namenjena jutarnjoj i večernjoj upotrebi.",
            },
            {
              text: "Izbegavajte kontakt sa očima i prekinite upotrebu ukoliko se pojavi iritacija.",
            },
          ],
        },
      ],
      inci: "Aqua, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Hydrolyzed Collagen, Hydrolyzed Keratin, Acetyl Hexapeptide-8, Sodium Hyaluronate, Butyrospermum Parkii Butter, Dimethicone, Phenoxyethanol, Ethylhexylglycerin, Parfum, Xanthan Gum.",
      brand: "KORMESIC Professional",
      quantity: "50 g",
      price: 1299,
    },
    {
      id: "sadoer-collagen-niacinamide-losion-za-lice",
      slug: "sadoer-collagen-niacinamide-losion-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIDRATACIJA I NEGA SA KOLAGENOM",
      name: "SADOER Collagen & Niacinamide losion za lice",
      images: ["/sadoer1.webp"],
      imageAlt: "SADOER Collagen & Niacinamide losion za lice – pakovanje proizvoda",
      cartUpsell: "osvezavajuca-maska-za-lice",
      shortDescription:
        "Hidratantni losion za lice sa kolagenom, niacinamidom i glicerinom, namenjen nezi kože kojoj nedostaju mekoća i svežina. Za prijatniji osećaj na koži i negovaniji izgled tena.",
      buyCardQuestion:
        "Da li vašoj koži nedostaju hidratacija, mekoća i prirodna svežina?",
      buyCardDescription:
        "SADOER Collagen & Niacinamide losion kombinuje kolagen, niacinamid i hidratantne sastojke u formuli namenjenoj svakodnevnoj nezi lica. Pomaže očuvanju vlažnosti kože i pruža negu usmerenu na mekši, prijatniji i negovaniji izgled tena.",
      longDescription: [
        {
          heading: "Svakodnevna nega za mekšu i negovaniju kožu",
          paragraphs: [
            {
              text: "Kada koža izgubi osećaj mekoće, postane suvlja ili počne da deluje umorno, redovna hidratacija može biti važan korak ka njenom negovanijem izgledu.",
            },
            {
              text: "SADOER Collagen & Niacinamide losion za lice kombinuje kolagen, niacinamid i hidratantne sastojke u formuli namenjenoj nezi kože kojoj je potrebna dodatna pažnja.",
              emphasis: "SADOER Collagen & Niacinamide losion za lice",
            },
          ],
        },
        {
          heading: "Hidratacija i očuvanje vlažnosti kože",
          paragraphs: [
            {
              text: "Glicerin i drugi hidratantni sastojci formule pomažu vezivanju vlage, dok mineralno ulje, petrolatum i dimetikon doprinose smanjenju njenog gubitka.",
            },
            {
              text: "Ova kombinacija čini losion pogodnim za rutinu usmerenu na osećaj mekoće, prijatnosti i negovan izgled kože.",
            },
          ],
        },
        {
          heading: "Kolagen i niacinamid u nezi lica",
          paragraphs: [
            {
              text: "Kolagen je sastojak koji se koristi u kozmetičkim formulama za negu i kondicioniranje kože.",
            },
            {
              text: "Niacinamid, poznat i kao vitamin B3, popularan je sastojak preparata za negu kože zbog svoje uloge u podršci kožnoj barijeri i ujednačenijem izgledu tena.",
            },
            {
              text: "Njihovo prisustvo u formuli čini ovaj losion zanimljivim dodatkom svakodnevnoj rutini. Konkretni efekti zavise od formulacije i individualnih karakteristika kože.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "SADOER Collagen & Niacinamide losion može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Vaša koža često deluje suvo ili umorno.",
            "Želite da očuvate osećaj mekoće i hidratacije.",
            "Primećujete promene u teksturi i izgledu tena.",
            "Tražite proizvod sa kolagenom i niacinamidom za svakodnevnu negu.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Kolagen: Sastojak koji se koristi za negu i kondicioniranje kože.",
              emphasis: "Kolagen:",
            },
            {
              text: "Niacinamid (vitamin B3): Koristi se u kozmetici za podršku kožnoj barijeri i negovanijem izgledu kože.",
              emphasis: "Niacinamid (vitamin B3):",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
            {
              text: "Alantoin: Sastojak koji se često koristi u preparatima za negu kože.",
              emphasis: "Alantoin:",
            },
            {
              text: "Mineralno ulje i petrolatum: Doprinose smanjenju gubitka vlage iz kože.",
              emphasis: "Mineralno ulje i petrolatum:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja i toniranja kože nanesite odgovarajuću količinu losiona ravnomerno na lice. Nežno umasirajte dok se proizvod ne upije.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože, prema preporuci proizvođača.",
            },
            {
              text: "Izbegavajte kontakt sa očima. U slučaju iritacije ili neuobičajene reakcije kože prekinite korišćenje.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti.",
            },
          ],
        },
      ],
      inci: "Water, Glycerin, Mineral Oil, Ethylhexyl Palmitate, Cetearyl Alcohol, Dimethicone, Petrolatum, Sucrose Tristearate, Phenoxyethanol, Methylparaben, Polyacrylamide, Xanthan Gum, Fragrance, Carbomer, Allantoin, Propylparaben, Triethanolamine, Disodium EDTA, C13-14 Isoparaffin, Laureth-7, Niacinamide, Butylene Glycol, Pentylene Glycol, Collagen, 1,2-Hexanediol.",
      brand: "SADOER",
      quantity: "100 ml",
      price: 1299,
    },
    {
      id: "kormesic-botox-collagen-serum-za-lice",
      slug: "kormesic-botox-collagen-serum-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "SERUM SA KOLAGENOM I PEPTIDIMA",
      name: "KORMESIC Botox Collagen serum za lice",
      images: ["/kormesic-botox-collagen-serum-hero-1600.webp"],
      imageAlt: "KORMESIC Botox Collagen serum za lice – pakovanje proizvoda",
      cartUpsell: "hidratantna-maska-za-lice",
      shortDescription:
        "Serum za lice sa kolagenom, peptidima, niacinamidom i hijaluronatom, namenjen hidratantnoj nezi kože sa vidljivim znacima starenja. Dopunjuje svakodnevnu rutinu za mekši, svežiji i negovaniji izgled tena.",
      buyCardQuestion:
        "Primećujete fine linije i kožu kojoj nedostaju svežina i hidratacija?",
      buyCardDescription:
        "KORMESIC Botox Collagen serum kombinuje kolagen, peptide i hidratantne sastojke u formuli namenjenoj nezi kože sa vidljivim znacima starenja. Lako se uklapa u rutinu i pruža negu usmerenu na mekši, zaglađeniji i negovaniji izgled kože.",
      longDescription: [
        {
          heading: "Dodatna nega za kožu kojoj želite da vratite svežinu",
          paragraphs: [
            {
              text: "Fine linije, suvoća i manje svež izgled tena mogu biti znak da je vreme da svojoj svakodnevnoj rutini posvetite dodatnu pažnju.",
            },
            {
              text: "KORMESIC Botox Collagen serum za lice kombinuje kolagen, peptide, niacinamid i hidratantne sastojke u formuli namenjenoj nezi kože sa vidljivim znacima starenja.",
              emphasis: "KORMESIC Botox Collagen serum za lice",
            },
          ],
        },
        {
          heading: "Hidratacija za mekši i negovaniji izgled",
          paragraphs: [
            {
              text: "Glicerin, butilen glikol i natrijum-hijaluronat koriste se u kozmetičkim formulama za hidratantnu negu kože.",
            },
            {
              text: "Ova kombinacija sastojaka čini serum zanimljivim dodatkom rutini usmerenoj na očuvanje vlažnosti, osećaj mekoće i svežiji izgled tena.",
            },
          ],
        },
        {
          heading: "Kolagen i peptidi u anti-age nezi",
          paragraphs: [
            {
              text: "Formula sadrži hidrolizovani kolagen, hidrolizovani keratin i više peptida, uključujući Acetyl Hexapeptide-8.",
            },
            {
              text: "Peptidi se često koriste u kozmetici namenjenoj nezi kože sa vidljivim znacima starenja. Konkretni efekti zavise od formulacije i individualnih karakteristika kože.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "KORMESIC Botox Collagen serum može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Primećujete prve fine linije i promene u izgledu kože.",
            "Želite dodatnu hidrataciju u svakodnevnoj rutini.",
            "Vaša koža deluje suvo ili manje sveže.",
            "Tražite serum sa kolagenom, peptidima i niacinamidom.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Hidrolizovani kolagen: Koristi se u kozmetičkim formulama za negu i kondicioniranje kože.",
              emphasis: "Hidrolizovani kolagen:",
            },
            {
              text: "Acetyl Hexapeptide-8: Peptid koji se koristi u anti-age kozmetičkim preparatima.",
              emphasis: "Acetyl Hexapeptide-8:",
            },
            {
              text: "Niacinamid: Sastojak poznat po upotrebi u nezi kožne barijere i izgleda tena.",
              emphasis: "Niacinamid:",
            },
            {
              text: "Natrijum-hijaluronat: Doprinosi hidratantnoj nezi.",
              emphasis: "Natrijum-hijaluronat:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja kože nanesite odgovarajuću količinu seruma ravnomerno na lice. Nežno umasirajte dok se proizvod ne upije.",
            },
            {
              text: "Ukoliko se pojavi neprijatnost ili iritacija, prekinite korišćenje. Čuvajte van domašaja dece. Proizvod nije namenjen gutanju.",
            },
            {
              text: "Čuvajte na hladnom mestu, zaštićeno od visokih temperatura i direktnog sunčevog zračenja.",
            },
          ],
        },
      ],
      inci: "Aqua, Glycerin, Butylene Glycol, Methylparaben, Diazolidinyl Urea, Carbomer, Acetyl Hexapeptide-8, Glycereth-26, Allantoin, Hydrolyzed Collagen, Hydrolyzed Keratin, Niacinamide, Hydroxyethylcellulose, Sodium Hydroxide, PEG-40 Hydrogenated Castor Oil, Fragrance, Sodium Hyaluronate, Phenoxyethanol, Glyceryl Glucoside, PEG-10, Polysorbate 60, Disodium Phosphate, Sodium Phosphate, Myristoyl Pentapeptide-4, Acetyl Tetrapeptide-9, Hexapeptide-3, Acetyl Tetrapeptide-3, Palmitoyl Tripeptide-1, Ethylhexylglycerin.",
      brand: "KORMESIC Professional",
      quantity: "30 ml",
      price: 999,
    },
    {
      id: "bioaqua-retinol-serum-30-ampula",
      slug: "bioaqua-retinol-serum-30-ampula",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "SERUM SA RETINOLOM",
      name: "BIOAQUA Retinol serum za lice – 30 ampula",
      images: ["/bioaquaretinol.webp"],
      shortDescription:
        "Serum za lice sa retinolom i hijaluronskom kiselinom, namenjen hidratantnoj nezi kože sa vidljivim znacima starenja. Praktično pakovanje od 30 ampula za jednostavno uključivanje u rutinu nege.",
      buyCardQuestion:
        "Primećujete fine linije, suvoću ili kožu kojoj nedostaje svežine?",
      buyCardDescription:
        "BIOAQUA Retinol serum kombinuje retinol, hijaluronsku kiselinu i hidratantne sastojke u formuli namenjenoj nezi kože sa vidljivim znacima starenja. Pakovanje od 30 pojedinačnih ampula omogućava praktičnu primenu i jednostavno doziranje.",
      longDescription: [
        {
          heading: "Dodatna pažnja za negovaniji izgled kože",
          paragraphs: [
            {
              text: "Vremenom koža može postati suvlja, izgubiti deo svoje svežine, a fine linije mogu postati uočljivije. Pravilno odabrana nega doprinosi očuvanju hidratacije i prijatnijem osećaju na koži.",
            },
            {
              text: "BIOAQUA Retinol serum za lice kombinuje retinol, hijaluronsku kiselinu i hidratantne sastojke u praktičnom pakovanju sa 30 pojedinačnih ampula.",
              emphasis: "BIOAQUA Retinol serum za lice",
            },
          ],
        },
        {
          heading: "Hidratacija za mekšu i svežiju kožu",
          paragraphs: [
            {
              text: "Formula sadrži glicerin, propilen glikol i hijaluronsku kiselinu, sastojke koji se koriste u hidratantnoj nezi kože.",
            },
            {
              text: "Njihova kombinacija čini serum zanimljivim dodatkom rutini usmerenoj na očuvanje vlažnosti, mekoće i negovanog izgleda tena.",
            },
          ],
        },
        {
          heading: "Retinol kao deo anti-age nege",
          paragraphs: [
            {
              text: "Retinol je poznat sastojak kozmetičkih proizvoda namenjenih koži sa vidljivim znacima starenja.",
            },
            {
              text: "Pravilna upotreba odgovarajuće formule sa retinolom može biti deo rutine usmerene na izgled finih linija i teksturu kože. Konkretni efekti zavise od formulacije, koncentracije i individualne reakcije kože.",
            },
          ],
        },
        {
          heading: "Praktična nega u pojedinačnim ampulama",
          paragraphs: [
            {
              text: "Pakovanje sadrži 30 ampula od po 1,5 ml, što omogućava praktično doziranje i jednostavno korišćenje bez velike bočice.",
            },
            {
              text: "Ovakav format pogodan je za organizovanu rutinu nege i lakše prenošenje proizvoda.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "BIOAQUA Retinol serum može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Primećujete prve fine linije i promene u teksturi kože.",
            "Želite da svojoj rutini dodate serum sa retinolom.",
            "Vašoj koži nedostaju hidratacija i svežina.",
            "Odgovara vam proizvod u pojedinačnim ampulama.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Retinol: Sastojak koji se koristi u kozmetičkoj nezi kože sa vidljivim znacima starenja.",
              emphasis: "Retinol:",
            },
            {
              text: "Hijaluronska kiselina: Koristi se u formulama za hidratantnu negu.",
              emphasis: "Hijaluronska kiselina:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
            {
              text: "Propilen glikol: Sastojak koji doprinosi hidratantnim svojstvima kozmetičkih formula.",
              emphasis: "Propilen glikol:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja kože otvorite ampulu prema uputstvu na pakovanju. Nanesite odgovarajuću količinu seruma na lice i nežno umasirajte do upijanja.",
            },
            {
              text: "Ako tek uvodite retinol u rutinu, koristite ga postepeno i pratite reakciju kože. Tokom dana koristite zaštitu od sunca.",
            },
            {
              text: "Pre prve upotrebe testirajte proizvod na manjoj površini kože. U slučaju iritacije prekinite korišćenje. Retinoidi se ne preporučuju tokom trudnoće.",
            },
            {
              text: "Čuvajte na hladnom mestu, zaštićeno od direktne sunčeve svetlosti i van domašaja dece.",
            },
          ],
        },
      ],
      inci: "WATER, GLYCERIN, PROPYLENE GLYCOL, GLYCERETH-26, PHENOXYETHANOL, METHYLPARABEN, CARBOMER, TRIETHANOLAMINE, HYDROXYETHYLCELLULOSE, DISODIUM EDTA, SODIUM HYALURONATE, PEG-40 HYDROGENATED CASTOR OIL, FRAGRANCE, GLYCERYL CAPRYLATE, PEG-10, POLYSORBATE 60, DISODIUM PHOSPHATE, SODIUM PHOSPHATE, RETINOL, HYALURONIC ACID",
      brand: "BIOAQUA",
      quantity: "30 × 1,5 ml (ukupno 45 ml)",
      price: 1499,
    },
    {
      id: "sadoer-pdrn-pink-peptide-toner-za-lice",
      slug: "sadoer-pdrn-pink-peptide-toner-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIDRATACIJA I NEGA SA PDRN-OM",
      name: "SADOER PDRN Pink Peptide toner za lice",
      images: ["/sadoerpdrn.webp"],
      shortDescription:
        "Hidratantni toner za lice sa PDRN-om, peptidima, kolagenom i niacinamidom. Namenjen svakodnevnoj nezi kože kojoj nedostaju svežina, mekoća i ujednačeniji izgled tena.",
      buyCardQuestion:
        "Da li vaša koža deluje umorno, suvo ili joj nedostaje prirodne svežine?",
      buyCardDescription:
        "SADOER PDRN Pink Peptide toner kombinuje hidratantne sastojke, kolagen, peptide i niacinamid u formuli namenjenoj nezi kože. Jednostavan dodatak svakodnevnoj rutini za osećaj mekoće, očuvanje vlažnosti i negovaniji izgled tena.",
      longDescription: [
        {
          heading: "Otkrijte novi nivo svakodnevne nege",
          paragraphs: [
            {
              text: "Kada koža deluje umorno, dehidrirano ili izgubi deo svoje prirodne svežine, pažljivo odabrana nega može doprineti njenom negovanijem izgledu.",
            },
            {
              text: "SADOER PDRN Pink Peptide toner za lice kombinuje hidratantne sastojke, kolagen, peptide i niacinamid u formuli namenjenoj svakodnevnoj nezi kože.",
              emphasis: "SADOER PDRN Pink Peptide toner za lice",
            },
          ],
        },
        {
          heading: "Hidratacija za svežiji izgled tena",
          paragraphs: [
            {
              text: "Glicerin, natrijum-hijaluronat i drugi hidratantni sastojci formule pomažu očuvanju vlažnosti kože.",
            },
            {
              text: "Toner se lako uklapa u rutinu nakon čišćenja lica, pružajući dodatni korak nege pre seruma ili kreme.",
            },
          ],
        },
        {
          heading: "PDRN, peptidi i kolagen u jednoj formuli",
          paragraphs: [
            {
              text: "Formula sadrži Sodium DNA, sastojak koji se označava kao PDRN, zajedno sa kolagenom, niacinamidom i peptidom Acetyl Hexapeptide-8.",
            },
            {
              text: "Ova kombinacija namenjena je kozmetičkoj nezi kože i predstavlja zanimljiv izbor za rutinu usmerenu na hidrataciju, mekoću i negovaniji izgled tena.",
            },
            {
              text: "Konkretni efekti zavise od formulacije i individualnih karakteristika kože.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "SADOER PDRN Pink Peptide toner može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Vaša koža deluje suvo ili umorno.",
            "Želite dodatnu hidrataciju nakon čišćenja lica.",
            "Primećujete neujednačen izgled tena.",
            "Želite da uključite PDRN, peptide i niacinamid u svoju rutinu.",
            "Tražite proizvod koji dopunjuje negu serumom i kremom.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Sodium DNA (PDRN): Sastojak koji se koristi u kozmetičkim formulama za negu kože.",
              emphasis: "Sodium DNA (PDRN):",
            },
            {
              text: "Niacinamid: Poznat po upotrebi u proizvodima namenjenim nezi kožne barijere i izgledu tena.",
              emphasis: "Niacinamid:",
            },
            {
              text: "Kolagen: Koristi se u kozmetičkim preparatima za negu i kondicioniranje kože.",
              emphasis: "Kolagen:",
            },
            {
              text: "Acetyl Hexapeptide-8: Peptid koji se koristi u anti-age kozmetici.",
              emphasis: "Acetyl Hexapeptide-8:",
            },
            {
              text: "Natrijum-hijaluronat: Doprinosi hidratantnoj nezi kože.",
              emphasis: "Natrijum-hijaluronat:",
            },
            {
              text: "Skvalan: Emolijentni sastojak koji doprinosi osećaju mekoće.",
              emphasis: "Skvalan:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja lica nanesite odgovarajuću količinu tonera na kožu. Nežno umasirajte ili utapkajte dok se proizvod ne upije.",
            },
            {
              text: "Nastavite negu odgovarajućim serumom ili kremom.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. Izbegavajte kontakt sa očima. Ukoliko dođe do neprijatnosti ili iritacije, prekinite korišćenje.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od direktne sunčeve svetlosti.",
            },
          ],
        },
      ],
      brand: "SADOER",
      quantity: "130 ml",
      price: 1299,
    },
    {
      id: "bioaqua-retinol-toner-za-lice",
      slug: "bioaqua-retinol-toner-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIDRATACIJA I NEGA SA RETINOLOM",
      name: "BIOAQUA Retinol toner za lice",
      images: ["/bioaqua-retinol-toner-hero-1600.webp"],
      imageAlt: "BIOAQUA Retinol toner za lice – pakovanje proizvoda",
      shortDescription:
        "Hidratantni toner za lice sa retinolom, hijaluronskom kiselinom i beta-glukanom. Namenjen dopuni rutine nege kože kojoj nedostaju hidratacija, mekoća i svežiji izgled.",
      buyCardQuestion:
        "Da li vašoj koži nedostaju hidratacija, mekoća i svežina?",
      buyCardDescription:
        "BIOAQUA Retinol toner kombinuje retinol, hijaluronsku kiselinu i beta-glukan u formuli namenjenoj nezi kože. Pruža dodatni hidratantni korak nakon čišćenja lica i dopunjuje rutinu usmerenu na negovaniji izgled tena.",
      longDescription: [
        {
          heading: "Dodatni korak za hidriranu i negovanu kožu",
          paragraphs: [
            {
              text: "Svakodnevno čišćenje lica važan je deo rutine, ali nega se tu ne završava. Kada koži nedostaju hidratacija i osećaj mekoće, toner može biti jednostavan dodatni korak pre seruma ili kreme.",
            },
            {
              text: "BIOAQUA Retinol toner za lice kombinuje retinol, hijaluronsku kiselinu, glicerin i beta-glukan u formuli namenjenoj kozmetičkoj nezi kože.",
              emphasis: "BIOAQUA Retinol toner za lice",
            },
          ],
        },
        {
          heading: "Hidratacija i osećaj svežine",
          paragraphs: [
            {
              text: "Glicerin i hijaluronska kiselina poznati su sastojci hidratantnih formula. Njihova uloga je da doprinose vezivanju i očuvanju vlage u koži.",
            },
            {
              text: "Toner se uklapa u rutinu nakon čišćenja lica i pre nanošenja drugih proizvoda za negu.",
            },
          ],
        },
        {
          heading: "Retinol i beta-glukan u nezi kože",
          paragraphs: [
            {
              text: "Retinol se koristi u kozmetičkim formulama namenjenim koži sa vidljivim znacima starenja, dok je beta-glukan sastojak koji se koristi u preparatima za negu kože.",
            },
            {
              text: "Prisustvo ovih sastojaka ne znači automatski da je proizvod jači ili efikasniji od drugih preparata. Konkretni rezultati zavise od celokupne formulacije.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "BIOAQUA Retinol toner može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Želite dodatni hidratantni korak u rutini.",
            "Vaša koža deluje suvo ili joj nedostaje svežine.",
            "Tražite toner sa retinolom i hijaluronskom kiselinom.",
            "Želite negu koja se koristi pre odgovarajućeg seruma ili kreme.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Retinol: Sastojak koji se koristi u anti-age kozmetici.",
              emphasis: "Retinol:",
            },
            {
              text: "Hijaluronska kiselina: Doprinosi hidratantnoj nezi kože.",
              emphasis: "Hijaluronska kiselina:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
            {
              text: "Beta-glukan: Sastojak koji se koristi u preparatima za negu kože.",
              emphasis: "Beta-glukan:",
            },
            {
              text: "Alantoin: Čest sastojak kozmetičkih formula namenjenih nezi kože.",
              emphasis: "Alantoin:",
            },
          ],
        },
        {
          heading: "Način upotrebe i mere opreza",
          paragraphs: [
            {
              text: "Prema uputstvu na ambalaži, toner se nanosi nakon čišćenja lica i nežno utapkava ili umasira do upijanja.",
            },
            {
              text: "Pošto proizvod sadrži retinol, učestalost korišćenja treba uskladiti sa stvarnom koncentracijom i uputstvom proizvođača. Tokom dana koristite SPF zaštitu. Retinoidi se ne preporučuju tokom trudnoće.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. U slučaju iritacije prekinite korišćenje.",
            },
            {
              text: "Čuvajte na hladnom mestu, zaštićeno od visokih temperatura, direktnog sunčevog svetla i van domašaja dece.",
            },
          ],
        },
      ],
      inci: "WATER, GLYCERIN, PHENOXYETHANOL, METHYLPARABEN, ALLANTOIN, GLYCERYL GLUCOSIDE, SODIUM POLYACRYLATE, PEG-40 HYDROGENATED CASTOR OIL, FRAGRANCE, PEG-10, BETA-GLUCAN, RETINOL, HYALURONIC ACID",
      brand: "BIOAQUA",
      quantity: "120 ml",
      price: 1499,
    },
    {
      id: "bioaqua-hyaluronic-acid-losion-za-lice",
      slug: "bioaqua-hyaluronic-acid-losion-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIDRATACIJA I NEGA SA CERAMIDOM",
      name: "BIOAQUA Hyaluronic Acid losion za lice",
      images: ["/bioaqua-hyaluronic-acid-losion-hero-1600.webp"],
      imageAlt: "BIOAQUA Hyaluronic Acid losion za lice – pakovanje proizvoda",
      shortDescription:
        "Hidratantni losion za lice sa hijaluronskom kiselinom, ceramidom i glicerinom. Namenjen nezi kože kojoj nedostaju vlažnost, mekoća i prijatan osećaj tokom dana.",
      buyCardQuestion:
        "Da li vaša koža često deluje suvo, zategnuto ili joj nedostaje mekoće?",
      buyCardDescription:
        "BIOAQUA Hyaluronic Acid losion kombinuje hijaluronsku kiselinu, ceramid i hidratantne sastojke u formuli namenjenoj svakodnevnoj nezi kože. Pomaže očuvanju vlažnosti i pruža negu usmerenu na mekši, zaglađeniji i svežiji izgled tena.",
      longDescription: [
        {
          heading: "Hidratacija koja postaje deo vaše svakodnevne rutine",
          paragraphs: [
            {
              text: "Suvoća, osećaj zategnutosti i hrapavija tekstura kože mogu učiniti da ten izgleda umorno i manje sveže. Odgovarajuća hidratantna nega pomaže očuvanju vlažnosti i prijatnijem osećaju na koži.",
            },
            {
              text: "BIOAQUA Hyaluronic Acid losion za lice kombinuje hijaluronsku kiselinu, ceramid i emolijentne sastojke u formuli namenjenoj nezi kože kojoj je potrebna dodatna hidratacija.",
              emphasis: "BIOAQUA Hyaluronic Acid losion za lice",
            },
          ],
        },
        {
          heading: "Više vlažnosti, više osećaja mekoće",
          paragraphs: [
            {
              text: "Hijaluronska kiselina i glicerin poznati su po sposobnosti vezivanja vode, dok mineralno ulje, petrolatum i dimetikon pomažu smanjenju gubitka vlage.",
            },
            {
              text: "Ova kombinacija čini losion zanimljivim izborom za svakodnevnu negu kože sklone suvoći i osećaju zategnutosti.",
            },
          ],
        },
        {
          heading: "Ceramid kao podrška kožnoj barijeri",
          paragraphs: [
            {
              text: "Formula sadrži Ceramide NP, sastojak koji se koristi u proizvodima za negu zaštitne barijere kože.",
            },
            {
              text: "U kombinaciji sa hidratantnim i emolijentnim sastojcima, losion pruža negu usmerenu na očuvanje vlažnosti i negovan izgled kože.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "BIOAQUA Hyaluronic Acid losion može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Vaša koža često deluje suvo ili zategnuto.",
            "Želite dodatnu hidrataciju u svakodnevnoj rutini.",
            "Primećujete hrapavost i nedostatak mekoće.",
            "Tražite proizvod sa hijaluronskom kiselinom i ceramidom.",
            "Želite da dopunite negu nakon čišćenja lica.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Hijaluronska kiselina: Doprinosi hidratantnoj nezi kože.",
              emphasis: "Hijaluronska kiselina:",
            },
            {
              text: "Ceramide NP: Sastojak koji se koristi za podršku zaštitnoj barijeri kože.",
              emphasis: "Ceramide NP:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
            {
              text: "Alantoin: Čest sastojak preparata namenjenih nezi kože.",
              emphasis: "Alantoin:",
            },
            {
              text: "Mineralno ulje, petrolatum i dimetikon: Pomažu smanjenju gubitka vlage i doprinose osećaju mekoće.",
              emphasis: "Mineralno ulje, petrolatum i dimetikon:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja i toniranja lica nanesite odgovarajuću količinu losiona ravnomerno na kožu. Nežno umasirajte do upijanja.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. Ukoliko se pojavi iritacija, prekinite korišćenje.",
            },
            {
              text: "Čuvajte na hladnom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti. Držite van domašaja dece.",
            },
          ],
        },
      ],
      inci: "WATER, GLYCERIN, MINERAL OIL, CETEARYL ALCOHOL, PETROLATUM, ETHYLHEXYL PALMITATE, PHENOXYETHANOL, DIMETHICONE, SUCROSE TRISTEARATE, METHYLPARABEN, XANTHAN GUM, POLYACRYLAMIDE, CARBOMER, ALLANTOIN, TRIETHANOLAMINE, DISODIUM EDTA, FRAGRANCE, C13-14 ISOPARAFFIN, SODIUM POLYACRYLATE, LAURETH-7, HYALURONIC ACID, CERAMIDE NP",
      brand: "BIOAQUA",
      quantity: "80 ml",
      price: 1499,
    },
    {
      id: "kormesic-snail-collagen-serum-za-lice",
      slug: "kormesic-snail-collagen-serum-za-lice",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIDRATACIJA I NEGA SA PUŽEVOM SLUZI",
      name: "KORMESIC Snail Collagen serum za lice",
      images: ["/kormesicgoldsnail.webp"],
      shortDescription:
        "Hidratantni serum za lice sa filtratom puževe sluzi, kolagenom, niacinamidom i ceramidom. Namenjen svakodnevnoj nezi kože kojoj nedostaju mekoća, hidratacija i svežiji izgled.",
      buyCardQuestion:
        "Da li vaša koža deluje suvo, umorno ili su fine linije sve primetnije?",
      buyCardDescription:
        "KORMESIC Snail Collagen serum kombinuje filtrat puževe sluzi, kolagen i hidratantne sastojke u formuli namenjenoj nezi kože. Pruža dodatni korak hidratacije i dopunjuje rutinu usmerenu na mekši, zaglađeniji i negovaniji izgled tena.",
      longDescription: [
        {
          heading: "Dodatna nega za mekšu i svežiju kožu",
          paragraphs: [
            {
              text: "Kada koža počne da deluje suvo, umorno ili izgubi deo svoje prirodne mekoće, odgovarajuća hidratantna nega može pomoći da ponovo izgleda negovanije.",
            },
            {
              text: "KORMESIC Snail Collagen serum za lice kombinuje filtrat puževe sluzi, kolagen, niacinamid i druge sastojke za negu kože u formuli namenjenoj svakodnevnoj rutini.",
              emphasis: "KORMESIC Snail Collagen serum za lice",
            },
          ],
        },
        {
          heading: "Hidratacija i osećaj mekoće",
          paragraphs: [
            {
              text: "Glicerin, glikoli i drugi sastojci formule koriste se u kozmetici za hidratantnu negu.",
            },
            {
              text: "Serum predstavlja dodatni korak u rutini usmerenoj na očuvanje vlažnosti kože i prijatniji osećaj nakon nanošenja.",
            },
          ],
        },
        {
          heading: "Puževa sluz, kolagen i ceramid u jednoj formuli",
          paragraphs: [
            {
              text: "Filtrat puževe sluzi (Snail Secretion Filtrate) koristi se u kozmetičkim preparatima za negu kože.",
            },
            {
              text: "Formula sadrži i hidrolizovani kolagen, niacinamid i Ceramide NP, sastojke koji se koriste u proizvodima namenjenim hidrataciji, kondicioniranju kože i podršci njenoj zaštitnoj barijeri.",
            },
          ],
        },
        {
          heading: "Kome je namenjen?",
          paragraphs: [
            {
              text: "KORMESIC Snail Collagen serum može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Vaša koža često deluje suvo ili umorno.",
            "Želite dodatnu hidrataciju u svakodnevnoj rutini.",
            "Primećujete promene u teksturi i izgledu tena.",
            "Tražite serum sa filtratom puževe sluzi i kolagenom.",
            "Želite dopunu nege pre nanošenja kreme.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Snail Secretion Filtrate: Filtrat puževe sluzi koji se koristi u kozmetici za negu kože.",
              emphasis: "Snail Secretion Filtrate:",
            },
            {
              text: "Hidrolizovani kolagen: Sastojak za negu i kondicioniranje kože.",
              emphasis: "Hidrolizovani kolagen:",
            },
            {
              text: "Niacinamid: Koristi se u proizvodima namenjenim nezi kožne barijere i izgledu tena.",
              emphasis: "Niacinamid:",
            },
            {
              text: "Ceramide NP: Sastojak koji se koristi za podršku zaštitnoj barijeri kože.",
              emphasis: "Ceramide NP:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja lica nanesite odgovarajuću količinu seruma ravnomerno na kožu i nežno umasirajte do upijanja.",
            },
            {
              text: "Izbegavajte kontakt sa očima i prekinite korišćenje ukoliko se pojavi iritacija ili neprijatna reakcija.",
            },
            {
              text: "Čuvajte na hladnom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti. Držite van domašaja dece.",
            },
          ],
        },
      ],
      // Packaging transcription pending final INCI verification.
      inci: "Aqua, Glycerin, Propylene Glycol, Phenoxyethanol, Carbomer, Triethanolamine, Methylparaben, Hydrolyzed Collagen, Disodium EDTA, Xanthan Gum, PEG-40 Hydrogenated Castor Oil, Fragrance, PEG-10, Ferulic Acid, Niacinamide, PEG-100, Butylene Glycol, PEG-60, Ricinoleth-40, Glycyrrhiza Glabra (Licorice) Root Extract, Snail Secretion Filtrate, Trehalose, Hydrogenated Castor Oil, Dendrobium Nobile Stem Extract, Pentylene Glycol, Aloe Barbadensis Leaf Extract, Sophora Flavescens Root Extract, 1,2-Hexanediol, Lycium Barbarum Fruit Extract, Ceramide NP, Echinacea Purpurea Extract, Ethylhexylglycerin, Acetyl Hexapeptide-8.",
      brand: "KORMESIC",
      quantity: "30 ml",
      price: 999,
    },
    {
      id: "kormesic-botox-keratin-krema-za-oci",
      slug: "kormesic-botox-keratin-krema-za-oci",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA PODRUČJA OKO OČIJU",
      name: "KORMESIC Botox Keratin krema za područje oko očiju",
      images: ["/kormesic-botox-keratin-eye-cream-hero-1600.webp"],
      imageAlt:
        "KORMESIC Botox Keratin krema za područje oko očiju – pakovanje proizvoda",
      shortDescription:
        "Krema za područje oko očiju sa kolagenom, keratinom, peptidima i hijaluronatom. Namenjena hidratantnoj nezi nežne kože oko očiju, posebno kada su prisutni osećaj suvoće i vidljive fine linije.",
      buyCardQuestion:
        "Primećujete fine linije i suvoću na nežnoj koži oko očiju?",
      buyCardDescription:
        "KORMESIC Botox Keratin krema kombinuje kolagen, keratin, peptide i hidratantne sastojke u formuli namenjenoj nezi područja oko očiju. Pomaže očuvanju vlažnosti kože i pruža negu usmerenu na mekši, zaglađeniji i odmorniji izgled ovog osetljivog područja.",
      longDescription: [
        {
          heading: "Posebna pažnja za nežnu kožu oko očiju",
          paragraphs: [
            {
              text: "Koža oko očiju često je među prvim područjima na kojima primećujemo fine linije, suvoću i promene u izgledu kože. Zato zaslužuje pažljivo odabranu negu koja se lako uklapa u svakodnevnu rutinu.",
            },
            {
              text: "KORMESIC Botox Keratin krema za područje oko očiju kombinuje hidratantne sastojke, hidrolizovani kolagen, keratin i peptide u formuli namenjenoj nezi ovog nežnog područja.",
              emphasis: "KORMESIC Botox Keratin krema za područje oko očiju",
            },
          ],
        },
        {
          heading: "Hidratacija za mekši i negovaniji izgled",
          paragraphs: [
            {
              text: "Glicerin, natrijum-hijaluronat i emolijentni sastojci formule doprinose hidratantnoj nezi i prijatnijem osećaju na koži.",
            },
            {
              text: "Kada je koža dovoljno hidrirana, fine linije povezane sa suvoćom mogu delovati manje izraženo, a područje oko očiju negovanije.",
            },
          ],
        },
        {
          heading: "Kolagen, keratin i peptidi u jednoj formuli",
          paragraphs: [
            {
              text: "Formula sadrži hidrolizovani kolagen i keratin, sastojke koji se koriste u kozmetici za negu i kondicioniranje kože.",
            },
            {
              text: "Prisutan je i kompleks peptida, uključujući Acetyl Hexapeptide-8, Palmitoyl Pentapeptide-4 i druge peptide koji se koriste u anti-age kozmetičkim formulama.",
            },
            {
              text: "Njihovo prisustvo ne garantuje uklanjanje bora. Efekti zavise od gotove formulacije i individualnih karakteristika kože.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC Botox Keratin krema može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Primećujete fine linije oko očiju.",
            "Koža oko očiju deluje suvo ili zategnuto.",
            "Želite dodatnu hidratantnu negu ovog područja.",
            "Tražite kremu sa kolagenom, keratinom i peptidima.",
            "Želite jednostavan dodatak svakodnevnoj rutini nege lica.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Hidrolizovani kolagen: Sastojak koji se koristi u kozmetičkim formulama za negu i kondicioniranje kože.",
              emphasis: "Hidrolizovani kolagen:",
            },
            {
              text: "Hidrolizovani keratin: Koristi se u kozmetičkim preparatima za kondicioniranje.",
              emphasis: "Hidrolizovani keratin:",
            },
            {
              text: "Acetyl Hexapeptide-8: Peptid poznat po upotrebi u anti-age kozmetici.",
              emphasis: "Acetyl Hexapeptide-8:",
            },
            {
              text: "Natrijum-hijaluronat: Sastojak koji doprinosi hidratantnoj nezi kože.",
              emphasis: "Natrijum-hijaluronat:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage.",
              emphasis: "Glicerin:",
            },
            {
              text: "Carnosine: Sastojak koji se koristi u formulama za negu kože.",
              emphasis: "Carnosine:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja kože nanesite malu količinu kreme na područje oko očiju, izbegavajući direktan kontakt sa očima.",
            },
            {
              text: "Nežno rasporedite i umasirajte kružnim pokretima dok se proizvod ne upije, u skladu sa uputstvom na ambalaži.",
            },
            {
              text: "Ukoliko se pojavi iritacija ili neprijatnost, prekinite korišćenje.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti. Držite van domašaja dece.",
            },
          ],
        },
      ],
      inci: "Aqua, Mineral Oil, Glycerin, Cetearyl Alcohol, Palmitic Acid, Stearic Acid, Ceteareth-25, Phenoxyethanol, Glyceryl Stearate, PEG-100 Stearate, Carbomer, Dimethicone, Methylparaben, Xanthan Gum, Sodium Hydroxide, Disodium EDTA, Fragrance, Acetyl Hexapeptide-8, Hydrolyzed Collagen, Sodium Hyaluronate, Butylene Glycol, Hydrolyzed Keratin, Pentylene Glycol, 1,2-Hexanediol, PPG-13-Decyltetradeceth-24, Caprylyl Glycol, Carnosine, Acetyl Hexapeptide-1, Oligopeptide-1, Acetyl Tetrapeptide-9, Palmitoyl Pentapeptide-4, Nonapeptide-1, Hexapeptide-9, Acetyl Tetrapeptide-11, Acetyl Tetrapeptide-3, Palmitoyl Tripeptide-8.",
      brand: "KORMESIC Professional",
      quantity: "20 g",
      price: 599,
    },
    {
      id: "kormesic-snail-repair-krema-za-oci",
      slug: "kormesic-snail-repair-krema-za-oci",
      category: "kreme-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIDRATANTNA NEGA PODRUČJA OKO OČIJU",
      name: "KORMESIC Snail Repair krema za područje oko očiju",
      images: ["/kormesic-snail-repair-eye-cream-hero-1600.webp"],
      imageAlt:
        "KORMESIC Snail Repair krema za područje oko očiju – pakovanje proizvoda",
      shortDescription:
        "Krema za područje oko očiju sa filtratom puževe sluzi, glicerinom i alantoinom. Namenjena hidratantnoj nezi osetljive kože oko očiju, posebno kada su prisutni suvoća i vidljive fine linije.",
      buyCardQuestion:
        "Da li koža oko vaših očiju deluje suvo, umorno ili su fine linije sve primetnije?",
      buyCardDescription:
        "KORMESIC Snail Repair krema kombinuje filtrat puževe sluzi, glicerin i negujuće sastojke u formuli namenjenoj osetljivom području oko očiju. Pomaže očuvanju vlažnosti i pruža negu usmerenu na mekši, zaglađeniji i svežiji izgled kože.",
      longDescription: [
        {
          heading: "Nežna nega za svežiji izgled područja oko očiju",
          paragraphs: [
            {
              text: "Koža oko očiju posebno je osetljiva na suvoću i često je među prvim područjima na kojima se primećuju fine linije i promene u izgledu kože.",
            },
            {
              text: "KORMESIC Snail Repair krema za područje oko očiju kombinuje filtrat puževe sluzi, glicerin, alantoin i negujuće sastojke u formuli namenjenoj hidrataciji i svakodnevnoj nezi ovog područja.",
              emphasis: "KORMESIC Snail Repair krema za područje oko očiju",
            },
          ],
        },
        {
          heading: "Hidratacija i osećaj mekoće",
          paragraphs: [
            {
              text: "Glicerin pomaže vezivanju vlage, dok petrolatum i mineralno ulje doprinose smanjenju njenog gubitka iz kože.",
            },
            {
              text: "Ova kombinacija čini kremu zanimljivim izborom za negu područja oko očiju kada koža deluje suvo, zategnuto ili joj nedostaje mekoće.",
            },
          ],
        },
        {
          heading: "Filtrat puževe sluzi i biljni ekstrakti",
          paragraphs: [
            {
              text: "Formula sadrži Snail Secretion Filtrate, sastojak koji se koristi u kozmetičkim proizvodima za negu i kondicioniranje kože.",
            },
            {
              text: "Prisutni su i alantoin, ekstrakt aloe vere i ekstrakt biljke Portulaca Oleracea, koji dopunjuju formulu namenjenu svakodnevnoj nezi.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC Snail Repair krema može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Koža oko vaših očiju često deluje suvo ili zategnuto.",
            "Primećujete fine linije povezane sa suvoćom kože.",
            "Želite dodatnu hidratantnu negu područja oko očiju.",
            "Tražite kremu sa filtratom puževe sluzi.",
            "Želite jednostavan dodatak svakodnevnoj rutini nege lica.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Snail Secretion Filtrate: Filtrat puževe sluzi koji se koristi u kozmetičkim formulama za negu kože.",
              emphasis: "Snail Secretion Filtrate:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage i doprinosi hidratantnoj nezi.",
              emphasis: "Glicerin:",
            },
            {
              text: "Alantoin: Sastojak koji se često koristi u preparatima za negu kože.",
              emphasis: "Alantoin:",
            },
            {
              text: "Aloe Barbadensis Leaf Extract: Ekstrakt aloe vere koji se koristi u kozmetičkim proizvodima za negu.",
              emphasis: "Aloe Barbadensis Leaf Extract:",
            },
            {
              text: "Petrolatum i mineralno ulje: Doprinose smanjenju gubitka vlage i očuvanju osećaja mekoće.",
              emphasis: "Petrolatum i mineralno ulje:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja kože nanesite malu količinu kreme na područje oko očiju. Nežno rasporedite i umasirajte kružnim pokretima do upijanja, izbegavajući direktan kontakt sa očima.",
            },
            {
              text: "Ukoliko se pojavi iritacija ili neprijatna reakcija, prekinite korišćenje.",
            },
            {
              text: "Čuvajte na hladnom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti. Držite van domašaja dece.",
            },
          ],
        },
      ],
      inci: "Aqua, Glycerin, Petrolatum, Mineral Oil, Snail Secretion Filtrate, Ascorbic Acid, Aloe Barbadensis Leaf Extract, Portulaca Oleracea Extract, Cetearyl Alcohol, Ceteareth-25, Lauric/Myristic/Palmitic/Stearic Glycerides, Glyceryl Stearate, Palmitic Acid, Stearic Acid, Phenoxyethanol, Methylparaben, Allantoin, Polyacrylamide, Propylparaben, C13-14 Isoparaffin, Fragrance, Laureth-7.",
      brand: "KORMESIC",
      quantity: "30 g",
      price: 599,
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
      sitemapIndexable: true,
      purpose: "HIDRATACIJA OKO OČIJU",
      name: "SADOER Hydrating Smooth Eye Mask",
      images: ["/sadoer-hydrating-smooth-eye-mask-hero-1600.webp"],
      imageAlt: "SADOER Hydrating Smooth Eye Mask – pakovanje proizvoda",
      cartUpsell: "bioaqua-retinol-krema-za-lice",
      shortDescription:
        "Nježna hidrogel maska za područje oko očiju koja pruža intenzivnu hidrataciju, osvežava pogled i pomaže da područje oko očiju izgleda mekše, glađe i odmornije.",
      metaDescription:
        "Hidrogel maska za područje oko očiju sa hidratantnim i osvežavajućim efektom. SADOER Hydrating Smooth Eye Mask pomaže da okoloočna regija izgleda mekše, glađe i negovanije.",
      buyCardQuestion:
        "Umorno područje oko očiju, osećaj suvoće ili potreba za svežijim izgledom?",
      buyCardDescription:
        "SADOER Hydrating Smooth Eye Mask je hidrogel maska za područje oko očiju namenjena svakodnevnoj nezi i brzom osveženju. Formula je osmišljena da hidrira, omekša i pruži prijatan osećaj nege okoloočne regije, dok koža izgleda svežije, zaglađenije i negovanije. Po teksturi prijanja uz kožu, prijatna je za korišćenje i praktična za rutinu kada želite dodatnu negu, posebno kod suvlje i umorne okoloočne regije.",
      longDescription: [
        {
          heading: "Zašto će vam prijati",
          paragraphs: [
            {
              text: "SADOER Hydrating Smooth Eye Mask pruža ciljanu negu području oko očiju kroz prijatnu hidrogel teksturu koja se lako koristi i lepo prijanja uz kožu. Idealan je izbor kada želite brz osećaj osveženja i dodatnu hidrataciju u rutini nege.",
            },
          ],
        },
        {
          heading: "Šta pruža području oko očiju",
          paragraphs: [
            {
              text: "Formula je namenjena da pomogne da koža oko očiju izgleda mekše, glađe i svežije. Posebno prija kada je regija oko očiju suvlja, umorna ili kada želite negovaniji i osvetljeniji izgled.",
            },
          ],
        },
        {
          heading: "Kada i kome odgovara",
          paragraphs: [
            {
              text: "Odličan je za sve koji žele jednostavan korak dodatne nege u kućnoj rutini. Može biti praktičan izbor pred izlazak, nakon napornog dana ili kao deo redovne rutine kada želite uredniji i odmorniji izgled.",
            },
          ],
        },
        {
          heading: "Kako se koristi",
          paragraphs: [
            {
              text: "Nakon čišćenja kože oko očiju, izvadite masku i pažljivo je postavite na područje ispod očiju tako da lepo nalegne uz okoloočnu regiju. Ostavite da deluje 15–20 minuta, zatim je uklonite i nežno umasirajte ili utapkajte ostatak esencije dok se ne upije.",
            },
            {
              text: "Samo za spoljašnju upotrebu. Pre prve upotrebe preporučuje se testiranje na manjoj površini kože. Prekinite upotrebu ako se javi nelagodnost. Čuvajte na suvom i hladnom mestu, dalje od direktne sunčeve svetlosti i van domašaja dece.",
            },
          ],
        },
        {
          heading: "Šta izdvaja ovaj proizvod",
          paragraphs: [],
          bullets: [
            "Hidrogel tekstura prijatna za korišćenje.",
            "Intenzivna hidratacija i osećaj osveženja.",
            "Pomaže da područje oko očiju izgleda mekše i glađe.",
            "Praktično pakovanje sa 60 komada / 30 pari.",
            "Jednostavan dodatak rutini nege.",
          ],
        },
      ],
      inci: "Water, Propylene Glycol, Glycerin, Chondrus Crispus, Hydroxyethylcellulose, Methylparaben, Kousou Ekisu, Mica, Glucomannan, Allantoin, CI 77891, Hydrolyzed Collagen, Disodium EDTA, Caprylhydroxamic Acid, Diazolidinyl Urea, Potassium Chloride, CI 77491, PEG-40 Hydrogenated Castor Oil, Fragrance, Glyceryl Caprylate, PEG-10, Polysorbate 60, Disodium Phosphate, Iodopropynyl Butylcarbamate, Sodium Phosphate.",
      brand: "SADOER",
      quantity: "80 g · 60 kom / 30 pari",
      price: 1499,
    },
    {
      id: "osvezavajuca-maska-za-lice",
      slug: "osvezavajuca-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA PODRUČJA OKO OČIJU",
      name: "BIOAQUA Snail Collagen Firming Hydrating Eye Mask",
      images: ["/bioaqua-snail-collagen-eye-mask-hero-1600.webp"],
      imageAlt:
        "BIOAQUA Snail Collagen Firming Hydrating Eye Mask – pakovanje proizvoda",
      cartUpsell: "sadoer-collagen-niacinamide-losion-za-lice",
      shortDescription:
        "Hidrogel maska za područje oko očiju sa puževim filtratom i kolagenom, namenjena hidrataciji, osvežavanju i nezi kože oko očiju, uz fokus na mekši, glađi i odmorniji izgled.",
      metaDescription:
        "Hidrogel maska za područje oko očiju sa puževim filtratom i kolagenom. BIOAQUA Snail Collagen Firming Hydrating Eye Mask pruža hidrataciju, negu i osveženiji izgled okoloočne regije.",
      buyCardQuestion:
        "Tamniji podočnjaci, umoran pogled ili osećaj suvoće oko očiju?",
      buyCardDescription:
        "BIOAQUA Snail Collagen Firming Hydrating Eye Mask je hidrogel maska za područje oko očiju koja pruža dodatnu hidrataciju i negu osetljivoj okoloočnoj regiji. Formula sa puževim filtratom i kolagenom osmišljena je da pomogne da koža izgleda mekše, glađe i svežije. Maska prijatno naleže uz kožu, jednostavna je za upotrebu i praktična kao deo rutine kada želite osveženiji i negovaniji izgled područja oko očiju.",
      longDescription: [
        {
          heading: "Zašto će vam prijati",
          paragraphs: [
            {
              text: "BIOAQUA Snail Collagen Firming Hydrating Eye Mask je praktičan dodatak rutini nege kada želite da području oko očiju pružite više hidratacije i pažnje. Hidrogel tekstura prijatno naleže uz kožu i čini korišćenje jednostavnim i udobnim.",
            },
          ],
        },
        {
          heading: "Šta pruža području oko očiju",
          paragraphs: [
            {
              text: "Formula je namenjena da pomogne da okoloočna regija izgleda svežije, negovanije i mekše. Posebno prija kada želite dodatnu negu kod suvlje kože oko očiju ili kada težite odmornijem i urednijem izgledu.",
            },
          ],
        },
        {
          heading: "Kada i kome odgovara",
          paragraphs: [
            {
              text: "Odličan je izbor za sve koji žele brz i jednostavan korak nege u kućnoj rutini. Praktičan je pred izlazak, posle napornog dana ili kao redovan tretman kada želite osveženiji izgled područja oko očiju.",
            },
          ],
        },
        {
          heading: "Kako se koristi",
          paragraphs: [
            {
              text: "Očistite kožu oko očiju, izvadite masku iz pakovanja i nanesite je na područje oko očiju, nežno prilagođavajući da lepo prione uz kožu. Ostavite da deluje 15 do 20 minuta, zatim uklonite masku i nežno umasirajte preostalu esenciju dok se ne upije.",
            },
          ],
        },
        {
          heading: "Sigurnosna napomena",
          paragraphs: [
            {
              text: "Samo za spoljašnju upotrebu. Pre prve upotrebe preporučuje se testiranje na manjoj površini kože. U slučaju nelagodnosti prekinite upotrebu. Izbegavajte kontakt sa očima. Ako proizvod dospe u oči, odmah isperite vodom. Ne koristiti kod dece mlađe od tri godine. Čuvati na hladnom i suvom mestu, dalje od direktne sunčeve svetlosti i van domašaja dece.",
            },
          ],
        },
        {
          heading: "Šta izdvaja ovaj proizvod",
          paragraphs: [],
          bullets: [
            "Hidrogel maska za područje oko očiju.",
            "Prijatna i jednostavna upotreba.",
            "Fokus na hidrataciji i osećaju nege.",
            "Pužev filtrat i kolagen u sastavu.",
            "Praktično pakovanje od 80 komada / 100 g.",
            "Za osveženiji i negovaniji izgled okoloočne regije.",
          ],
        },
      ],
      inci: "Water, Propylene Glycol, Glycerin, Chondrus Crispus, Hydroxyethylcellulose, Methylparaben, Kousou Ekisu, Glucomannan, Allantoin, Synthetic Fluorphlogopite, Disodium EDTA, PEG-40 Hydrogenated Castor Oil, Caprylhydroxamic Acid, Diazolidinyl Urea, CI 77491, Potassium Chloride, CI 12490, Fragrance, CI 11680, Sodium Laureth Sulfate, Titanium Dioxide, PEG-10, CI 77891, Glyceryl Caprylate, Phenoxyethanol, Polysorbate 60, Disodium Phosphate, CI 77266, Hydrolyzed Collagen, Caprylyl Glycol, Iodopropynyl Butylcarbamate, Butylene Glycol, Sodium Phosphate, Tin Oxide, Snail Secretion Filtrate, Pentylene Glycol, Benzoic Acid, Collagen, 1,2-Hexanediol.",
      brand: "BIOAQUA",
      quantity: "80 pcs / 100 g",
      price: 1499,
    },
    {
      id: "sadoer-collagen-niacinamide-maska-za-oci",
      slug: "sadoer-collagen-niacinamide-maska-za-oci",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA SA KOLAGENOM I NIACINAMIDOM",
      name: "SADOER Collagen & Niacinamide maska za područje oko očiju",
      images: ["/sadoer-collagen-nicotinamide-krema-hero-1600.webp"],
      imageAlt:
        "SADOER Collagen & Niacinamide maska za područje oko očiju – pakovanje proizvoda",
      cartUpsell: "kormesic-botoks-collagen-krema-za-lice",
      shortDescription:
        "Hidrogel maska za područje oko očiju sa kolagenom, niacinamidom i hidratantnim sastojcima. Namenjena nezi kože kojoj nedostaju mekoća, hidratacija i svežiji izgled. Pakovanje sadrži 40 pari maski.",
      buyCardQuestion:
        "Da li područje oko vaših očiju deluje umorno, suvo ili su fine linije sve primetnije?",
      buyCardDescription:
        "SADOER Collagen & Niacinamide maska kombinuje kolagen, niacinamid i hidratantne sastojke u prijatnoj hidrogel teksturi. Namenjena je dodatnoj nezi područja oko očiju, uz fokus na očuvanje vlažnosti, osećaj mekoće i svežiji, negovaniji izgled kože.",
      longDescription: [
        {
          heading: "Mala rutina za svežiji i odmorniji izgled",
          paragraphs: [
            {
              text: "Područje oko očiju često je među prvim delovima lica na kojima primećujemo suvoću, fine linije i umorniji izgled kože. Zato dodatna hidratantna nega može biti prijatan korak u svakodnevnoj rutini.",
            },
            {
              text: "SADOER Collagen & Niacinamide hidrogel maska za područje oko očiju kombinuje hidratantne sastojke, kolagen i niacinamid u formuli namenjenoj nezi nežne kože oko očiju.",
            },
          ],
        },
        {
          heading: "Hidratacija koja pruža osećaj mekoće",
          paragraphs: [
            {
              text: "Glicerin i propilen glikol koriste se u kozmetičkim formulama za hidratantnu negu i očuvanje vlažnosti kože.",
            },
            {
              text: "Hidrogel tekstura omogućava da maska prijatno nalegne uz područje ispod očiju, pružajući jednostavan način za dodatnu negu i osveženje.",
            },
          ],
        },
        {
          heading: "Kolagen i niacinamid u nezi područja oko očiju",
          paragraphs: [
            {
              text: "Formula sadrži kolagen i niacinamid, sastojke koji se koriste u kozmetičkim proizvodima namenjenim nezi i negovanijem izgledu kože.",
            },
            {
              text: "Niacinamid se koristi u preparatima za negu kožne barijere i izgleda tena, dok kolagen ima ulogu u kozmetičkom kondicioniranju kože.",
            },
            {
              text: "Njihovo prisustvo čini ovu masku zanimljivim dodatkom rutini usmerenoj na hidrataciju, mekoću i svežiji izgled područja oko očiju.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "SADOER Collagen & Niacinamide maska može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Koža oko vaših očiju deluje suvo ili umorno.",
            "Želite dodatnu hidrataciju ovog područja.",
            "Primećujete fine linije povezane sa suvoćom kože.",
            "Tražite jednostavnu hidrogel masku za kućnu negu.",
            "Želite proizvod sa kolagenom i niacinamidom.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Kolagen: Koristi se u kozmetičkim formulama za negu i kondicioniranje kože.",
              emphasis: "Kolagen:",
            },
            {
              text: "Niacinamid: Sastojak poznat po upotrebi u preparatima namenjenim nezi kožne barijere i izgleda tena.",
              emphasis: "Niacinamid:",
            },
            {
              text: "Glicerin: Pomaže vezivanju vlage i doprinosi hidratantnoj nezi.",
              emphasis: "Glicerin:",
            },
            {
              text: "Alantoin: Sastojak koji se često koristi u kozmetičkim proizvodima za negu kože.",
              emphasis: "Alantoin:",
            },
            {
              text: "Chondrus Crispus: Sastojak dobijen iz crvenih algi koji se koristi za formiranje teksture kozmetičkih proizvoda.",
              emphasis: "Chondrus Crispus:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Nakon čišćenja kože izvadite par hidrogel maski iz pakovanja i pažljivo ih postavite na područje ispod očiju.",
            },
            {
              text: "Ostavite da deluju 15–20 minuta, zatim ih uklonite i nežno utapkajte ili umasirajte preostalu esenciju dok se ne upije.",
            },
            {
              text: "Izbegavajte direktan kontakt sa očima. Ako proizvod dospe u oči, odmah ih isperite vodom. U slučaju iritacije prekinite korišćenje.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. Nije namenjen deci mlađoj od tri godine.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti.",
            },
          ],
        },
      ],
      inci: "Water, Propylene Glycol, Glycerin, Chondrus Crispus, Glucomannan, Hydroxyethylcellulose, Methylparaben, Kousou Ekisu, PEG-40 Hydrogenated Castor Oil, Allantoin, Disodium EDTA, Caprylhydroxamic Acid, Diazolidinyl Urea, Potassium Chloride, Titanium Dioxide, Fragrance, PEG-10, Glyceryl Caprylate, Polysorbate 60, Disodium Phosphate, Niacinamide, Iodopropynyl Butylcarbamate, Sodium Phosphate, Butylene Glycol, Pentylene Glycol, Collagen, 1,2-Hexanediol.",
      brand: "SADOER",
      quantity: "80 komada (40 pari)",
      price: 1499,
    },
    {
      id: "kormesic-24k-gold-korejska-zlatna-maska-za-lice",
      slug: "kormesic-24k-gold-korejska-zlatna-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "KOREJSKA NEGA SA 24K ZLATOM",
      name: "KORMESIC 24K Gold korejska zlatna maska za lice",
      images: ["/kormesic-24k-gold-maska-hero-1600.webp"],
      imageAlt:
        "KORMESIC 24K Gold korejska zlatna maska za lice – pakovanje proizvoda",
      shortDescription:
        "Otkrijte ritual korejske nege uz KORMESIC 24K Gold masku za lice. Formula sa zlatom, kolagenom i hidratantnim sastojcima namenjena je dodatnoj nezi za mekši, svežiji i negovaniji izgled kože.",
      metaTitle: "Korejska zlatna maska za lice 24K Gold | KORMESIC",
      metaDescription:
        "KORMESIC 24K Gold korejska zlatna maska za lice sa kolagenom i hidratantnim sastojcima. Otkrijte ritual korejske nege kože. 1 maska, 35 ml.",
      buyCardQuestion:
        "Želite da svojoj koži priuštite poseban ritual nege inspirisan korejskom beauty tradicijom?",
      buyCardDescription:
        "KORMESIC 24K Gold maska donosi spoj korejske kozmetike, zlata, kolagena i hidratantnih sastojaka. Namenjena je ženama koje žele trenutak opuštanja i dodatnu pažnju za svoju kožu, uz osećaj mekoće, hidratacije i svežiji izgled tena.",
      longDescription: [
        {
          heading: "Korejski ritual lepote u vašem domu",
          paragraphs: [
            {
              text: "Korejska kozmetika poznata je po posebnoj pažnji koju posvećuje hidrataciji, nezi i svakodnevnim ritualima za očuvanje negovanog izgleda kože.",
            },
            {
              text: "KORMESIC 24K Gold maska za lice osmišljena je kao jednostavan korak dodatne nege. Prema deklaraciji proizvedena je u Južnoj Koreji, zemlji čija je prestonica Seul jedan od najpoznatijih centara savremene industrije lepote. Na ambalaži je kao proizvođač naveden Korea Hemal Medical Beauty Limited, Seoul, South Korea.",
            },
            {
              text: "Uživajte u trenutku posvećenom sebi i pružite svojoj koži dodatnu hidratantnu negu.",
            },
          ],
        },
        {
          heading: "Zlatna maska za mekšu i svežiju kožu",
          paragraphs: [
            {
              text: "Formula sadrži glicerin, kolagen i druge sastojke koji se koriste u kozmetičkim preparatima za hidrataciju i negu kože.",
            },
            {
              text: "Maska prijanja uz lice i omogućava prijatan ritual nege, posebno kada koži želite da pružite više pažnje i očuvate osećaj mekoće.",
            },
            {
              text: "Zlato je deo sastava i vizuelnog identiteta proizvoda, ali njegovo prisustvo samo po sebi ne garantuje anti-age rezultate.",
            },
          ],
        },
        {
          heading: "Trenutak nege inspirisan korejskom kozmetikom",
          paragraphs: [
            {
              text: "Sheet maske predstavljaju praktičan način da u svoju rutinu uključite dodatni korak nege, bez komplikovane pripreme ili posebne opreme.",
            },
            {
              text: "KORMESIC 24K Gold maska namenjena je opuštajućem ritualu u kom je fokus na hidrataciji, osećaju prijatnosti i negovanijem izgledu tena.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC 24K Gold maska može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Vaša koža deluje suvo ili umorno.",
            "Želite dodatnu hidrataciju i osećaj mekoće.",
            "Volite korejsku kozmetiku i rituale nege kože.",
            "Tražite jednostavnu sheet masku za kućnu upotrebu.",
            "Želite da svojoj rutini dodate poseban trenutak opuštanja.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Gold: Zlato je kozmetički sastojak koji je deo karakteristične formule i identiteta 24K Gold maske.",
              emphasis: "Gold:",
            },
            {
              text: "Hydrolyzed Collagen: Hidrolizovani kolagen koristi se u kozmetičkim proizvodima za negu i kondicioniranje kože.",
              emphasis: "Hydrolyzed Collagen:",
            },
            {
              text: "Glycerin: Glicerin pomaže vezivanju vlage i doprinosi hidratantnoj nezi.",
              emphasis: "Glycerin:",
            },
            {
              text: "Allantoin: Sastojak koji se često koristi u proizvodima za negu kože.",
              emphasis: "Allantoin:",
            },
            {
              text: "Oligopeptide-1: Peptid naveden u sastavu kozmetičke formule.",
              emphasis: "Oligopeptide-1:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite lice i pripremite kožu za nanošenje maske.",
            },
            {
              text: "Izvadite masku iz kesice, pažljivo je rasklopite i ravnomerno postavite preko lica, prilagođavajući otvore za oči, nos i usta.",
            },
            {
              text: "Ostavite da deluje 15–20 minuta, a zatim je uklonite.",
            },
            {
              text: "Nežno rasporedite preostalu esenciju po koži, a zatim isperite lice vodom, u skladu sa uputstvom na ambalaži.",
            },
            {
              text: "Ukoliko se pojavi iritacija ili neprijatna reakcija, prekinite korišćenje. Izbegavajte direktan kontakt sa očima.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od visokih temperatura i direktne sunčeve svetlosti. Držite van domašaja dece.",
            },
          ],
        },
      ],
      inci: "Aqua, Propylene Glycol, Glycerin, Chondrus Crispus, Glucomannan, Hydroxyethylcellulose, Methylparaben, Allantoin, Gold, Oligopeptide-1, Hydrolyzed Collagen, Potassium Chloride, PEG-40 Hydrogenated Castor Oil, Disodium EDTA, Caprylhydroxamic Acid, Diazolidinyl Urea, CI 11680, Titanium Dioxide, Fragrance, Sodium Laureth Sulfate, PEG-10, Glyceryl Caprylate, Polysorbate 60, Disodium Phosphate, Phenoxyethanol, CI 12490, Iodopropynyl Butylcarbamate, Caprylyl Glycol, Sodium Phosphate, Benzoic Acid.",
      brand: "KORMESIC",
      quantity: "1 maska / 35 ml",
      price: 349,
      packageOptions: [
        { id: "1", count: 1, price: 349, label: "1 maska" },
        { id: "5", count: 5, price: 1499, label: "5 maski" },
        { id: "10", count: 10, price: 2699, label: "10 maski" },
        { id: "30", count: 30, price: 5999, label: "30 maski" },
      ],
    },
    {
      id: "pouqur-supreme-24k-gold-zlatna-maska-za-lice",
      slug: "pouqur-supreme-24k-gold-zlatna-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "ZLATNA MASKA ZA HIDRATANTNU NEGU",
      name: "POUQUR Supreme 24K Gold zlatna maska za lice",
      images: ["/pouqur-24k-gold-foil-maska-hero-1600.webp"],
      imageAlt: "POUQUR Supreme 24K Gold zlatna maska za lice – pakovanje proizvoda",
      shortDescription:
        "Zlatna sheet maska za dodatnu hidrataciju i negu kože. Formula sa glicerinom, alantoinom i zlatom namenjena je prijatnom ritualu nege za mekši, svežiji i negovaniji izgled lica.",
      metaTitle: "POUQUR 24K Gold zlatna maska za lice | Odalis",
      metaDescription:
        "POUQUR Supreme 24K Gold zlatna maska za lice za hidratantnu negu i mekši izgled kože. Izaberite 1, 5, 10 ili 30 maski po povoljnijoj ceni.",
      buyCardQuestion:
        "Želite da svojoj koži priuštite mali luksuz i dodatnu hidrataciju kod kuće?",
      buyCardDescription:
        "POUQUR Supreme 24K Gold zlatna maska za lice donosi prijatan ritual nege uz hidratantne sastojke i zlato navedeno u formuli. Namenjena je koži kojoj želite da pružite dodatnu pažnju, mekoću i svežiji izgled — za trenutke kada svakodnevnu rutinu želite da pretvorite u mali beauty ritual.",
      longDescription: [
        {
          heading: "Zlatni ritual nege u vašem domu",
          paragraphs: [
            {
              text: "Nekada je dovoljno izdvojiti nekoliko minuta samo za sebe kako bi svakodnevna nega postala poseban trenutak. POUQUR Supreme 24K Gold maska osmišljena je kao jednostavan dodatak rutini kada koži želite da pružite više hidratacije i pažnje.",
            },
            {
              text: "Njena sheet forma omogućava lako nanošenje bez posebne pripreme, dok esencija sa hidratantnim sastojcima doprinosi prijatnom osećaju nege.",
            },
            {
              text: "Zlatni motiv i sastojak Gold daju proizvodu karakterističan izgled, ali njegova osnovna kozmetička namena ostaje nega i hidratacija kože. Prema podacima na pakovanju, zemlja porekla je Kina.",
            },
          ],
        },
        {
          heading: "Dodatna hidratacija za mekši izgled kože",
          paragraphs: [
            {
              text: "Svakodnevni spoljašnji uticaji, čišćenje lica i nedovoljna nega mogu doprineti osećaju suvoće i zatezanja kože.",
            },
            {
              text: "POUQUR Supreme 24K Gold maska sadrži glicerin i propilen glikol, sastojke koji se često koriste u hidratantnim kozmetičkim formulama.",
            },
            {
              text: "Maska je namenjena dodatnom koraku nege koji pruža osećaj vlažnosti, mekoće i prijatnosti.",
            },
          ],
        },
        {
          heading: "Mali luksuz bez komplikovane rutine",
          paragraphs: [
            {
              text: "Za prijatan kućni beauty ritual nisu potrebni brojni preparati niti složeni koraci. Jedna sheet maska može biti jednostavan način da odvojite vreme za negu lica.",
            },
            {
              text: "Njena primena traje približno 15–20 minuta, što je čini praktičnim dodatkom rutini kada želite trenutak opuštanja i dodatne hidratacije.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "POUQUR Supreme 24K Gold maska može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Želite dodatni korak hidratantne nege.",
            "Koža vam povremeno deluje suvo ili umorno.",
            "Volite jednostavne sheet maske za lice.",
            "Želite prijatan kućni beauty ritual.",
            "Tražite masku koju možete kupiti pojedinačno ili u većem pakovanju.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Glicerin: Humektans koji pomaže vezivanju vlage i doprinosi hidratantnoj nezi kože.",
              emphasis: "Glicerin:",
            },
            {
              text: "Propilen glikol: Koristi se u kozmetičkim formulama kao rastvarač i humektans.",
              emphasis: "Propilen glikol:",
            },
            {
              text: "Alantoin: Sastojak koji se često koristi u kozmetičkim proizvodima za negu kože.",
              emphasis: "Alantoin:",
            },
            {
              text: "Gold: Zlato navedeno u sastavu proizvoda. Njegovo prisustvo ne znači da maska ima klinički dokazan anti-age efekat.",
              emphasis: "Gold:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite kožu lica i osušite je nežnim tapkanjem.",
            },
            {
              text: "Otvorite kesicu, pažljivo izvadite masku i rasklopite je.",
            },
            {
              text: "Postavite masku preko lica, prilagođavajući otvore za oči, nos i usta.",
            },
            {
              text: "Ostavite da deluje 15–20 minuta, zatim je uklonite.",
            },
            {
              text: "Preostalu esenciju nežno rasporedite po koži, osim ako deklaracija proizvoda ne nalaže drugačije.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. U slučaju neprijatnosti ili iritacije prekinite upotrebu. Izbegavajte kontakt sa očima. Čuvajte van domašaja dece, zaštićeno od toplote i direktne sunčeve svetlosti.",
            },
          ],
        },
      ],
      inci: "WATER, PROPYLENE GLYCOL, GLYCERIN, HYDROXYETHYLCELLULOSE, ALLANTOIN, DISODIUM EDTA, PEG-40 HYDROGENATED CASTOR OIL, DIAZOLIDINYL UREA, IODOPROPYNYL BUTYLCARBAMATE, PARFUM, METHYLISOTHIAZOLINONE, GOLD.",
      brand: "POUQUR",
      quantity: "1 maska / 25 g",
      price: 299,
      packageOptions: [
        { id: "1", count: 1, price: 299, label: "1 maska" },
        { id: "5", count: 5, price: 1299, label: "5 maski" },
        { id: "10", count: 10, price: 2399, label: "10 maski" },
        {
          id: "30",
          count: 30,
          price: 4999,
          label: "30 maski",
          note: "Najniža cena po maski",
        },
      ],
    },
    {
      id: "zozu-24k-golden-hyaluronic-acid-maska-za-lice",
      slug: "zozu-24k-golden-hyaluronic-acid-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "HIJALURONSKA HIDRATACIJA I ZLATNA NEGA",
      name: "ZOZU 24K Golden Hyaluronic Acid maska za lice",
      images: ["/zozu24kgold.webp"],
      imageAlt: "ZOZU 24K Golden Hyaluronic Acid maska za lice – pakovanje proizvoda",
      shortDescription:
        "Hidratantna maska za lice sa hijaluronskom kiselinom, glicerinom i zlatnim sastojkom navedenim u formuli. Namenjena dodatnoj nezi kože kojoj su potrebni svežina, hidratacija i osećaj mekoće.",
      metaTitle: "ZOZU 24K Golden Hyaluronic Acid maska za lice | Odalis",
      metaDescription:
        "ZOZU 24K Golden Hyaluronic Acid hidratantna maska za lice sa hijaluronskom kiselinom. Izaberite pakovanje od 1, 5, 10 ili 30 maski.",
      buyCardQuestion:
        "Da li vašoj koži nedostaju hidratacija, svežina i onaj prijatan osećaj mekoće?",
      buyCardDescription:
        "ZOZU 24K Golden Hyaluronic Acid maska donosi dodatni korak hidratantne nege uz hijaluronsku kiselinu, glicerin i pažljivo osmišljenu sheet teksturu. Namenjena je koži kojoj želite da pružite više vlažnosti, svežiji izgled i trenutak opuštanja u sopstvenom domu.",
      longDescription: [
        {
          heading: "Zlatni ritual hidratacije za vaše lice",
          paragraphs: [
            {
              text: "Kada koži nedostaje vlage, može delovati umorno, manje sveže i izgubiti prijatan osećaj mekoće. Zato dodatna hidratantna nega može biti jednostavan, ali koristan korak u svakodnevnoj rutini.",
            },
            {
              text: "ZOZU 24K Golden Hyaluronic Acid maska osmišljena je kao praktičan kućni ritual nege. Njena formula sadrži hijaluronsku kiselinu i druge sastojke koji se koriste u hidratantnim kozmetičkim preparatima.",
            },
            {
              text: "Uz jednostavnu primenu, omogućava vam da izdvojite nekoliko minuta samo za sebe i posvetite dodatnu pažnju nezi lica.",
            },
            {
              text: "Prema podacima na pakovanju, proizvođač je Xingfu Biotechnology (Guangdong) Co., Ltd., a zemlja porekla je Kina.",
            },
          ],
        },
        {
          heading: "Hijaluronska kiselina za hidratantnu negu",
          paragraphs: [
            {
              text: "Hijaluronska kiselina poznata je po svojoj sposobnosti da vezuje vodu i zato se često koristi u preparatima namenjenim hidrataciji kože.",
            },
            {
              text: "U kombinaciji sa glicerinom i drugim sastojcima formule, predstavlja deo nege usmerene na očuvanje vlažnosti i osećaja mekoće.",
            },
            {
              text: "ZOZU maska je praktičan izbor kada želite dodatnu hidrataciju bez komplikovane rutine.",
            },
          ],
        },
        {
          heading: "Prijatan osećaj nege za svežiji izgled",
          paragraphs: [
            {
              text: "Sheet maska nežno naleže uz konture lica i omogućava jednostavnu primenu esencije na kožu.",
            },
            {
              text: "Nakon uklanjanja maske, ostatak esencije može se nežno utapkati u kožu, kako biste završili ritual nege bez dodatnih koraka.",
            },
            {
              text: "Fokus proizvoda je na hidrataciji, mekoći i negovanijem izgledu kože, bez nerealnih obećanja o trajnom uklanjanju bora.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "ZOZU 24K Golden Hyaluronic Acid maska može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Vaša koža deluje suvo ili umorno.",
            "Želite dodatnu hidrataciju u kućnoj rutini.",
            "Volite sheet maske koje se jednostavno koriste.",
            "Tražite proizvod sa hijaluronskom kiselinom.",
            "Želite masku dostupnu pojedinačno ili u povoljnijem pakovanju.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Hyaluronic Acid: Hijaluronska kiselina je humektans koji se koristi u preparatima za hidratantnu negu kože.",
              emphasis: "Hyaluronic Acid:",
            },
            {
              text: "Glycerin: Glicerin pomaže vezivanju vlage i doprinosi osećaju hidratacije.",
              emphasis: "Glycerin:",
            },
            {
              text: "Allantoin: Sastojak koji se često koristi u proizvodima namenjenim nezi kože.",
              emphasis: "Allantoin:",
            },
            {
              text: "Golden: Sastojak naveden pod nazivom \"Golden\" na originalnoj deklaraciji. Ne pretpostavljati njegov tačan hemijski identitet, koncentraciju ili posebnu efikasnost dok se ne potvrde.",
              emphasis: "Golden:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite lice i pripremite kožu za nanošenje maske.",
            },
            {
              text: "Otvorite kesicu, izvadite masku i pažljivo je rasklopite.",
            },
            {
              text: "Postavite je preko lica i nežno prilagodite konturama kože.",
            },
            {
              text: "Ostavite da deluje 15–20 minuta, a zatim je uklonite.",
            },
            {
              text: "Preostalu esenciju nežno utapkajte u kožu dok se ne upije.",
            },
            {
              text: "Pre prve upotrebe preporučuje se testiranje na manjoj površini kože. Izbegavajte direktan kontakt sa očima. U slučaju iritacije prekinite korišćenje. Čuvajte na hladnom i suvom mestu, van domašaja dece i zaštićeno od direktne sunčeve svetlosti.",
            },
          ],
        },
      ],
      inci: "Water, Propylene Glycol, Glycerin, Hydroxyacetophenone, 1,2-Hexanediol, Hydroxyethylcellulose, Allantoin, Disodium EDTA, PEG-40 Hydrogenated Castor Oil, Fragrance, Polysorbate 60, PEG-10, Disodium Phosphate, Golden, Hyaluronic Acid, Sodium Phosphate.",
      brand: "ZOZU",
      quantity: "1 maska / 25 g",
      price: 299,
      packageOptions: [
        { id: "1", count: 1, price: 299, label: "1 maska" },
        { id: "5", count: 5, price: 1299, label: "5 maski" },
        { id: "10", count: 10, price: 2399, label: "10 maski" },
        {
          id: "30",
          count: 30,
          price: 4999,
          label: "30 maski",
          note: "Najniža cena po maski",
        },
      ],
    },
    {
      id: "kormesic-gold-pearl-anti-aging-maska-za-lice",
      slug: "kormesic-gold-pearl-anti-aging-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA SA EKSTRAKTOM BISERA I RETINOLOM",
      name: "KORMESIC Gold Pearl Anti-Aging maska za lice",
      images: ["/kormesic-gold-pearl-maska-hero-1600.webp"],
      imageAlt:
        "KORMESIC Gold Pearl Anti-Aging maska za lice – pakovanje proizvoda",
      shortDescription:
        "Maska za lice sa ekstraktom bisera, hijaluronskom kiselinom, retinolom i peptidima. Namenjena dodatnoj hidratantnoj nezi kože kojoj želite da pružite više mekoće, svežine i pažnje kod prvih znakova starenja.",
      metaTitle: "KORMESIC Gold Pearl Anti-Aging maska za lice | Odalis",
      metaDescription:
        "KORMESIC Gold Pearl maska za lice sa ekstraktom bisera, hijaluronskom kiselinom, retinolom i peptidima. Pakovanja od 1, 5, 10 ili 30 maski.",
      buyCardQuestion:
        "Primećujete prve fine linije, osećaj suvoće ili želite da vašoj koži pružite bogatiji ritual nege?",
      buyCardDescription:
        "KORMESIC Gold Pearl Anti-Aging maska kombinuje ekstrakt bisera, hijaluronsku kiselinu, retinol i peptide u formuli namenjenoj dodatnoj nezi lica. Prijatan sheet format omogućava jednostavnu primenu, dok hidratantni sastojci doprinose osećaju mekoće i svežijem, negovanijem izgledu kože.",
      longDescription: [
        {
          heading: "Nega inspirisana dragocenošću bisera",
          paragraphs: [
            {
              text: "Kada želite da svojoj koži pružite više od uobičajene svakodnevne nege, sheet maska može biti jednostavan način da rutinu pretvorite u poseban ritual.",
            },
            {
              text: "KORMESIC Gold Pearl Anti-Aging maska donosi kombinaciju ekstrakta bisera, hijaluronske kiseline i pažljivo odabranih kozmetičkih sastojaka namenjenih nezi i negovanijem izgledu kože.",
            },
            {
              text: "Njena praktična forma omogućava da za svega 15–20 minuta posvetite pažnju hidrataciji, osećaju mekoće i svežijem izgledu lica.",
            },
            {
              text: "Prema podacima na pakovanju, brend/kompanija je Korea Hemal Medical Beauty Limited, Seoul, a proizvođač je Xingfu Biotechnology (Guangdong) Co., Ltd. Zemlja proizvodnje navedena je kao Kina (Made in PRC).",
            },
          ],
        },
        {
          heading: "Hidratacija koja doprinosi zaglađenijem izgledu",
          paragraphs: [
            {
              text: "Nedostatak vlage može učiniti da koža izgleda umornije i da fine linije nastale usled suvoće budu izraženije.",
            },
            {
              text: "Formula sadrži glicerin, hijaluronsku kiselinu i druge hidratantne sastojke koji se koriste u kozmetičkim preparatima za očuvanje vlažnosti kože.",
            },
            {
              text: "Dodatna hidratantna nega može doprineti osećaju mekoće i privremeno zaglađenijem izgledu površine kože.",
            },
          ],
        },
        {
          heading: "Retinol i peptidi u vašoj beauty rutini",
          paragraphs: [
            {
              text: "KORMESIC Gold Pearl maska sadrži retinol i peptide koji se koriste u kozmetičkim formulama za negu kože sa vidljivim znacima starenja.",
            },
            {
              text: "Retinol je poznat sastojak anti-age kozmetike, dok se peptidi koriste u različitim preparatima namenjenim nezi i očuvanju negovanog izgleda kože.",
            },
            {
              text: "Pošto koncentracije aktivnih sastojaka nisu navedene, ne treba očekivati niti obećavati specifične rezultate koje ova konkretna formula nije klinički potvrdila.",
            },
            {
              text: "Maska predstavlja dodatni korak nege, a ne zamenu za svakodnevnu hidrataciju i zaštitu kože od sunca.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC Gold Pearl maska može biti zanimljiv izbor ako:",
            },
            {
              text: "Zbog prisustva retinola, osobama sa osetljivom ili reaktivnom kožom preporučuje se poseban oprez. Ne koristiti tokom trudnoće ili dojenja bez prethodnog saveta zdravstvenog stručnjaka.",
            },
          ],
          bullets: [
            "Primećujete prve fine linije i želite bogatiju negu.",
            "Vaša koža povremeno deluje suvo ili umorno.",
            "Želite dodatnu hidrataciju i osećaj mekoće.",
            "Tražite sheet masku sa retinolom i peptidima.",
            "Volite jednostavne rituale nege u sopstvenom domu.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Pearl Extract: Ekstrakt bisera naveden u sastavu proizvoda, koji je deo kozmetičke formule namenjene nezi kože.",
              emphasis: "Pearl Extract:",
            },
            {
              text: "Sodium Hyaluronate: Oblik hijaluronske kiseline koji se koristi za hidratantnu negu i vezivanje vlage.",
              emphasis: "Sodium Hyaluronate:",
            },
            {
              text: "Retinol: Sastojak koji se koristi u anti-age kozmetičkim formulama. Njegova koncentracija u ovom proizvodu nije poznata.",
              emphasis: "Retinol:",
            },
            {
              text: "Glycerin: Humektans koji doprinosi vezivanju vlage i hidratantnoj nezi.",
              emphasis: "Glycerin:",
            },
            {
              text: "Allantoin: Sastojak koji se često koristi u preparatima za negu kože.",
              emphasis: "Allantoin:",
            },
            {
              text: "Acetyl Tetrapeptide-9: Kozmetički peptid naveden u formuli.",
              emphasis: "Acetyl Tetrapeptide-9:",
            },
            {
              text: "Palmitoyl Pentapeptide-4: Peptid koji se koristi u preparatima namenjenim nezi kože.",
              emphasis: "Palmitoyl Pentapeptide-4:",
            },
            {
              text: "Alpha-Arbutin: Sastojak koji se koristi u kozmetičkim formulama namenjenim ujednačenijem izgledu tena.",
              emphasis: "Alpha-Arbutin:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Temeljno očistite lice i nežno ga osušite.",
            },
            {
              text: "Otvorite kesicu, pažljivo izvadite masku i rasklopite je.",
            },
            {
              text: "Postavite masku preko lica i prilagodite je konturama kože, izbegavajući područje očiju i usana.",
            },
            {
              text: "Ostavite da deluje 15–20 minuta, zatim je uklonite.",
            },
            {
              text: "Preostalu esenciju nežno utapkajte u kožu dok se ne upije.",
            },
            {
              text: "Pre prve primene testirajte proizvod na manjoj površini kože. U slučaju iritacije, crvenila ili nelagodnosti prekinite korišćenje.",
            },
            {
              text: "Zbog prisustva retinola, izbegavajte kombinovanje sa drugim jakim eksfolijantima i retinoidima u istoj rutini. Tokom dana koristite odgovarajuću zaštitu od sunca.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od direktne sunčeve svetlosti i van domašaja dece.",
            },
          ],
        },
      ],
      inci: "Aqua, Glycerin, Butylene Glycol, Propylene Glycol, Carbomer, Methylparaben, Triethanolamine, Diazolidinyl Urea, Hydroxyethylcellulose, Arginine, Pearl Extract, Hydroxyacetophenone, Allantoin, Disodium EDTA, Carnosine, Phenoxyethanol, PEG-40 Hydrogenated Castor Oil, Sodium Hyaluronate, Iodopropynyl Butylcarbamate, Glycine, Serine, Fragrance, Alpha-Arbutin, Glutamic Acid, Polysorbate 60, PEG-10, Disodium Phosphate, Proline, Aspartic Acid, Valine, Lactic Acid, Sodium Lactate, Isoleucine, Hydroxypropyl Cyclodextrin, Sodium Phosphate, Alanine, Leucine, Centella Asiatica Extract, 1,2-Hexanediol, Acetyl Tetrapeptide-9, Pentylene Glycol, Punica Granatum Fruit Extract, Retinol, Adenosine, Polysorbate 20, Ethylhexylglycerin, Palmitoyl Pentapeptide-4.",
      brand: "KORMESIC",
      quantity: "1 maska / 25 ml",
      price: 349,
      packageOptions: [
        { id: "1", count: 1, price: 349, label: "1 maska" },
        { id: "5", count: 5, price: 1499, label: "5 maski" },
        { id: "10", count: 10, price: 2699, label: "10 maski" },
        {
          id: "30",
          count: 30,
          price: 6000,
          label: "30 maski",
          note: "Najniža cena po maski",
        },
      ],
    },
    {
      id: "sadoer-nicotinamide-maska-za-ujednaceniji-ten",
      slug: "sadoer-nicotinamide-maska-za-ujednaceniji-ten",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NIACINAMID I BLISTAVIJI TEN",
      name: "SADOER Nicotinamide maska za ujednačeniji ten",
      images: ["/sadoernicotinamide.wepb.webp"],
      imageAlt: "SADOER Nicotinamide maska za ujednačeniji ten – pakovanje proizvoda",
      shortDescription:
        "Sheet maska za lice sa niacinamidom, derivatom vitamina C i hidratantnim sastojcima. Namenjena dodatnoj nezi kože kojoj želite da pružite više svežine, hidratacije i ujednačeniji, blistaviji izgled tena.",
      metaTitle: "SADOER Nicotinamide maska za ujednačeniji ten | Odalis",
      metaDescription:
        "SADOER Nicotinamide sheet maska sa niacinamidom i derivatom vitamina C za hidratantnu negu i blistaviji izgled tena. Pakovanja od 1 do 30 maski.",
      buyCardQuestion:
        "Želite blistaviji, svežiji i ujednačeniji izgled tena uz jednostavan ritual nege?",
      buyCardDescription:
        "SADOER Nicotinamide maska kombinuje niacinamid, derivat vitamina C i hidratantne sastojke u praktičnoj sheet formi. Namenjena je dodatnoj nezi kože koja deluje umorno ili neujednačeno, uz fokus na hidrataciju, osećaj mekoće i negovaniji izgled lica.",
      longDescription: [
        {
          heading: "Ritual nege za blistaviji izgled tena",
          paragraphs: [
            {
              text: "Kada ten izgleda umorno, neujednačeno ili mu nedostaje svežine, dodatna hidratantna nega može biti prijatan korak u svakodnevnoj beauty rutini.",
            },
            {
              text: "SADOER Nicotinamide maska za lice kombinuje niacinamid i derivat vitamina C sa sastojcima koji se koriste za hidrataciju i negu kože.",
            },
            {
              text: "Njena praktična sheet forma omogućava jednostavnu primenu, dok 15–20 minuta posvećenih sebi pretvara svakodnevnu negu u mali ritual opuštanja.",
            },
            {
              text: "Prema podacima na pakovanju, proizvođač je Xingfu Biotechnology (Guangdong) Co., Ltd., a zemlja proizvodnje je Kina.",
            },
          ],
        },
        {
          heading: "Niacinamid za negovaniji i ujednačeniji ten",
          paragraphs: [
            {
              text: "Niacinamid, poznat i kao vitamin B3, jedan je od prepoznatljivih sastojaka savremene kozmetike za negu tena i kožne barijere.",
            },
            {
              text: "Koristi se u proizvodima namenjenim nezi kože koja deluje neujednačeno i kojoj je potreban dodatni korak za očuvanje negovanog izgleda.",
            },
            {
              text: "U ovoj maski niacinamid je deo formule koja objedinjuje hidrataciju, osećaj prijatnosti i negu tena.",
            },
          ],
        },
        {
          heading: "Derivat vitamina C i hidratantna nega",
          paragraphs: [
            {
              text: "Formula sadrži 3-O-Ethyl Ascorbic Acid, derivat vitamina C koji se koristi u kozmetičkim preparatima namenjenim blistavijem i ujednačenijem izgledu kože.",
            },
            {
              text: "Glicerin, betain i drugi sastojci formule doprinose hidratantnoj nezi i prijatnom osećaju mekoće.",
            },
            {
              text: "Zajedno čine osnovu jednostavnog rituala kada želite da koži pružite više pažnje i svežiji izgled.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "SADOER Nicotinamide maska može biti zanimljiv izbor ako:",
            },
            {
              text: "Maska predstavlja dopunski korak nege, a ne tretman za trajno uklanjanje pega ili pigmentnih promena.",
            },
          ],
          bullets: [
            "Vaš ten deluje umorno ili neujednačeno.",
            "Želite dodatnu hidrataciju kože.",
            "Volite proizvode sa niacinamidom.",
            "Tražite jednostavnu masku sa derivatom vitamina C.",
            "Želite svežiji i negovaniji izgled lica.",
            "Volite sheet maske dostupne u pojedinačnim i većim pakovanjima.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Niacinamide: Niacinamid, poznat kao vitamin B3, koristi se u kozmetičkim formulama namenjenim nezi kožne barijere i ujednačenijem izgledu tena.",
              emphasis: "Niacinamide:",
            },
            {
              text: "3-O-Ethyl Ascorbic Acid: Derivat vitamina C koji se koristi u preparatima za negu kože i blistaviji izgled tena.",
              emphasis: "3-O-Ethyl Ascorbic Acid:",
            },
            {
              text: "Glycerin: Humektans koji doprinosi vezivanju vlage i hidratantnoj nezi.",
              emphasis: "Glycerin:",
            },
            {
              text: "Betaine: Sastojak koji se koristi za hidrataciju i kondicioniranje kože.",
              emphasis: "Betaine:",
            },
            {
              text: "Allantoin: Sastojak koji se često koristi u proizvodima za negu kože.",
              emphasis: "Allantoin:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite lice i nežno ga osušite pre nanošenja maske.",
            },
            {
              text: "Otvorite kesicu, pažljivo izvadite masku i rasklopite je.",
            },
            {
              text: "Postavite masku preko lica, prilagođavajući je konturama kože i izbegavajući direktan kontakt sa očima.",
            },
            {
              text: "Ostavite da deluje 15–20 minuta.",
            },
            {
              text: "Uklonite masku i preostalu esenciju nežno utapkajte u kožu dok se ne upije.",
            },
            {
              text: "Pre prve upotrebe preporučuje se testiranje na manjoj površini kože. U slučaju iritacije ili neprijatne reakcije prekinite korišćenje. Ako proizvod dospe u oči, isperite vodom.",
            },
            {
              text: "Čuvajte na suvom mestu, dalje od direktne sunčeve svetlosti i van domašaja dece.",
            },
            {
              text: "Tokom dana koristite odgovarajuću zaštitu od sunca, naročito ako je cilj vaše rutine negovaniji i ujednačeniji izgled tena.",
            },
          ],
        },
      ],
      inci: "Water, Propylene Glycol, Glycerin, Betaine, Niacinamide, Hydroxyethylcellulose, Allantoin, Methylparaben, Diazolidinyl Urea, 3-O-Ethyl Ascorbic Acid, PEG-40 Hydrogenated Castor Oil, Fragrance, Iodopropynyl Butylcarbamate.",
      brand: "SADOER",
      quantity: "1 maska / 25 ml",
      price: 299,
      packageOptions: [
        { id: "1", count: 1, price: 299, label: "1 maska" },
        { id: "5", count: 5, price: 1299, label: "5 maski" },
        { id: "10", count: 10, price: 2399, label: "10 maski" },
        {
          id: "30",
          count: 30,
          price: 4999,
          label: "30 maski",
          note: "Najniža cena po maski",
        },
      ],
    },
    {
      id: "kormesic-collagen-salicylic-acid-b5-maska-za-lice",
      slug: "kormesic-collagen-salicylic-acid-b5-maska-za-lice",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA KOŽE SKLONE NEPRAVILNOSTIMA",
      name: "KORMESIC Collagen Salicylic Acid & B5 maska za lice",
      images: ["/kormesic-salicylic-acid-b5-collagen-maska-hero-1600.webp"],
      imageAlt:
        "KORMESIC Collagen Salicylic Acid & B5 maska za lice – pakovanje proizvoda",
      shortDescription:
        "Sheet maska za lice sa salicilnom kiselinom, pantenolom (vitamin B5) i kolagenom. Namenjena dodatnoj nezi masnije kože i kože sklone nepravilnostima, uz fokus na hidrataciju, prijatan osećaj i negovaniji izgled tena.",
      metaTitle: "KORMESIC maska sa salicilnom kiselinom i B5 | Odalis",
      metaDescription:
        "KORMESIC Collagen maska za lice sa salicilnom kiselinom, pantenolom i kolagenom. Za negu masnije kože i kože sklone nepravilnostima.",
      buyCardQuestion:
        "Masniji ten, višak sebuma ili nepravilnosti koje narušavaju ujednačen izgled kože?",
      buyCardDescription:
        "KORMESIC Collagen Salicylic Acid & B5 maska kombinuje salicilnu kiselinu, pantenol i hidrolizovani kolagen u praktičnoj sheet formi. Namenjena je dodatnoj nezi kože sklone masnom sjaju i nepravilnostima, uz hidratantne sastojke koji doprinose osećaju mekoće i prijatnosti.",
      longDescription: [
        {
          heading: "Ciljana nega za kožu sklonu nepravilnostima",
          paragraphs: [
            {
              text: "Masniji sjaj, vidljive nepravilnosti i neujednačen izgled tena mogu učiniti da koža deluje manje sveže, čak i kada je redovno negujete.",
            },
            {
              text: "KORMESIC Collagen Salicylic Acid & B5 maska donosi kombinaciju sastojaka karakterističnih za negu masnije kože i hidratantnih komponenti u jednostavnom sheet formatu.",
            },
            {
              text: "Ova maska je praktičan dodatak rutini kada želite da koži pružite ciljanu pažnju, uz fokus na negovaniji izgled i očuvanje osećaja mekoće.",
            },
            {
              text: "Prema podacima na pakovanju, zemlja proizvodnje je Kina (Made in PRC), a Korea Hemal Medical Beauty Limited, Seoul, navedena je kao podatak o brendu/kompaniji.",
            },
          ],
        },
        {
          heading: "Salicilna kiselina u rutini nege lica",
          paragraphs: [
            {
              text: "Salicilna kiselina je poznat kozmetički sastojak koji se koristi u proizvodima namenjenim nezi masnije kože i kože sklone zapušenim porama.",
            },
            {
              text: "U zavisnosti od koncentracije i formulacije, salicilna kiselina može imati eksfolijativnu ulogu i doprineti nezi kože sa viškom sebuma.",
            },
            {
              text: "Koncentracija salicilne kiseline u ovoj konkretnoj maski nije navedena, pa ne tvrdimo da proizvod ima dokazano dejstvo na akne niti garantovan efekat čišćenja pora.",
            },
          ],
        },
        {
          heading: "Pantenol i kolagen za prijatniju negu",
          paragraphs: [
            {
              text: "Kada je koža sklona nepravilnostima, važno je da nega ne bude usmerena isključivo na masni sjaj, već i na očuvanje hidratacije i prijatnog osećaja kože.",
            },
            {
              text: "Pantenol, poznat i kao provitamin B5, često se koristi u kozmetičkim formulama namenjenim kondicioniranju i nezi kože.",
            },
            {
              text: "Hidrolizovani kolagen i glicerin deo su formule namenjene dodatnoj nezi i osećaju mekoće.",
            },
            {
              text: "Zajedno sa ostalim sastojcima, čine ovu sheet masku jednostavnim dodatkom rutini nege lica.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC Collagen Salicylic Acid & B5 maska može biti zanimljiv izbor ako:",
            },
            {
              text: "Maska je kozmetički proizvod za negu kože, a ne lek za akne. Kod izraženih ili upornih akni preporučuje se savet dermatologa.",
            },
          ],
          bullets: [
            "Vaša koža ima izraženiji masni sjaj.",
            "Želite dodatnu negu kože sklone nepravilnostima.",
            "Tražite kozmetički proizvod sa salicilnom kiselinom.",
            "Želite da uključite pantenol i kolagen u svoju rutinu.",
            "Volite praktične sheet maske koje se jednostavno koriste.",
            "Želite hidratantnu negu bez složene pripreme.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Salicylic Acid: Salicilna kiselina je sastojak koji se često koristi u kozmetičkim proizvodima za negu masnije kože i kože sklone nepravilnostima. Njena koncentracija u ovoj maski nije poznata.",
              emphasis: "Salicylic Acid:",
            },
            {
              text: "Panthenol: Pantenol, odnosno provitamin B5, koristi se u kozmetičkim proizvodima za negu i kondicioniranje kože.",
              emphasis: "Panthenol:",
            },
            {
              text: "Hydrolyzed Collagen: Hidrolizovani kolagen je sastojak koji se koristi u kozmetičkim formulama namenjenim nezi i osećaju mekoće kože.",
              emphasis: "Hydrolyzed Collagen:",
            },
            {
              text: "Glycerin: Glicerin je humektans koji doprinosi vezivanju vlage i hidratantnoj nezi.",
              emphasis: "Glycerin:",
            },
            {
              text: "Allantoin: Alantoin se često koristi u preparatima za negu kože.",
              emphasis: "Allantoin:",
            },
            {
              text: "Rosmarinus Officinalis (Rosemary) Leaf Extract: Ekstrakt ruzmarina naveden u kozmetičkoj formuli.",
              emphasis: "Rosmarinus Officinalis (Rosemary) Leaf Extract:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite kožu lica odgovarajućim preparatom. Po želji nanesite tonik koji odgovara vašoj rutini nege.",
            },
            {
              text: "Otvorite kesicu, pažljivo izvadite masku i rasklopite je.",
            },
            {
              text: "Postavite je preko lica i nežno prilagodite konturama kože, izbegavajući direktan kontakt sa očima i usnama.",
            },
            {
              text: "Ostavite da deluje 15–20 minuta, zatim uklonite masku.",
            },
            {
              text: "Preostalu esenciju nežno utapkajte u kožu, a zatim isperite lice vodom, u skladu sa uputstvom na ambalaži.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. U slučaju iritacije, crvenila ili nelagodnosti prekinite korišćenje.",
            },
            {
              text: "Zbog prisustva salicilne kiseline, budite oprezni pri kombinovanju sa drugim eksfolijativnim proizvodima u istoj rutini. Izbegavajte nanošenje na oštećenu ili izrazito iritiranu kožu.",
            },
            {
              text: "Tokom dana koristite odgovarajuću zaštitu od sunca. Čuvajte proizvod na hladnom i suvom mestu, dalje od direktne sunčeve svetlosti i van domašaja dece.",
            },
          ],
        },
      ],
      inci: "Aqua, Propylene Glycol, Glycerin, Chondrus Crispus, Glucomannan, Hydroxyethylcellulose, Methylparaben, Acacia Senegal Gum, Rosmarinus Officinalis (Rosemary) Leaf Extract, Hydrolyzed Collagen, Salicylic Acid, Panthenol, Allantoin, Potassium Chloride, PEG-40 Hydrogenated Castor Oil, Titanium Dioxide, Caprylhydroxamic Acid, Disodium EDTA, Diazolidinyl Urea, Fragrance, PEG-10, Glyceryl Caprylate, Polysorbate 60, Disodium Phosphate, Iodopropynyl Butylcarbamate, Sodium Phosphate.",
      brand: "KORMESIC",
      quantity: "1 maska / 35 ml",
      price: 299,
      packageOptions: [
        { id: "1", count: 1, price: 299, label: "1 maska" },
        { id: "5", count: 5, price: 1299, label: "5 maski" },
        { id: "10", count: 10, price: 2399, label: "10 maski" },
        {
          id: "30",
          count: 30,
          price: 4999,
          label: "30 maski",
          note: "Najniža cena po maski",
        },
      ],
    },
    {
      id: "kormesic-24k-gold-collagen-maska-za-vrat",
      slug: "kormesic-24k-gold-collagen-maska-za-vrat",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "NEGA VRATA SA ZLATOM I KOLAGENOM",
      name: "KORMESIC 24K Gold & Collagen maska za vrat",
      images: ["/kormesic-24k-gold-collagen-neck-mask-hero-1600.webp"],
      imageAlt:
        "KORMESIC 24K Gold & Collagen maska za vrat – pakovanje proizvoda",
      shortDescription:
        "Specijalizovana maska za negu vrata sa zlatom, kolagenom, hijaluronskom kiselinom i retinolom. Namenjena dodatnoj hidrataciji i nezi kože vrata, uz fokus na mekoću i zaglađeniji, negovaniji izgled.",
      metaTitle: "KORMESIC 24K Gold & Collagen maska za vrat | Odalis",
      metaDescription:
        "KORMESIC 24K Gold & Collagen maska za vrat sa zlatom, hijaluronskom kiselinom i retinolom. Hidratantna nega vrata u pakovanjima od 1 do 30 maski.",
      buyCardQuestion:
        "Negujete lice svakodnevno, ali koliko pažnje posvećujete koži vrata?",
      buyCardDescription:
        "KORMESIC 24K Gold & Collagen maska pruža ciljanu negu području vrata uz kombinaciju zlata, hidrolizovanog kolagena, retinola i hijaluronske kiseline. Namenjena je dodatnoj hidrataciji, osećaju mekoće i negovanijem, zaglađenijem izgledu kože vrata.",
      longDescription: [
        {
          heading: "Ne zaboravite kožu vrata",
          paragraphs: [
            {
              text: "Dok svakodnevno biramo kreme, serume i maske za lice, koža vrata često ostaje u drugom planu. Ipak, i ovom području potrebna je redovna hidratacija i pažljivo odabrana nega.",
            },
            {
              text: "KORMESIC 24K Gold & Collagen maska osmišljena je kao dodatni korak u rutini nege vrata, kada želite da ovoj regiji pružite više hidratacije i osećaj mekoće.",
            },
            {
              text: "Praktična forma maske omogućava jednostavnu kućnu primenu i pretvara negu vrata u mali ritual posvećen sebi.",
            },
            {
              text: "Prema podacima na pakovanju, proizvođač je Guangzhou Ailian Cosmetics Co., Ltd., a zemlja proizvodnje je Kina (Made in PRC).",
            },
          ],
        },
        {
          heading: "Hidratacija za mekši i zaglađeniji izgled vrata",
          paragraphs: [
            {
              text: "Koža vrata može delovati suvlje, manje sveže i imati izraženije fine linije, naročito kada joj nedostaje odgovarajuća hidratantna nega.",
            },
            {
              text: "Formula sadrži glicerin, hijaluronsku kiselinu i druge sastojke koji se koriste u kozmetičkim preparatima za očuvanje vlažnosti kože.",
            },
            {
              text: "Dodatna hidratacija može doprineti osećaju mekoće i privremeno zaglađenijem izgledu površine kože.",
            },
            {
              text: "Maska nije zamena za redovnu negu vrata, već praktičan dodatak postojećoj rutini.",
            },
          ],
        },
        {
          heading: "Zlato, kolagen i retinol u jednoj maski",
          paragraphs: [
            {
              text: "KORMESIC 24K Gold & Collagen maska kombinuje više poznatih kozmetičkih sastojaka u formuli namenjenoj nezi vrata.",
            },
            {
              text: "Zlato je sastojak naveden u INCI listi i deo je karakterističnog identiteta proizvoda.",
            },
            {
              text: "Hidrolizovani kolagen koristi se u kozmetičkim formulama za kondicioniranje kože, dok hijaluronska kiselina doprinosi hidratantnoj nezi.",
            },
            {
              text: "Retinol je poznat sastojak kozmetičkih proizvoda namenjenih nezi kože sa vidljivim znacima starenja.",
            },
            {
              text: "Pošto koncentracije aktivnih sastojaka nisu poznate, ne obećavamo lifting, trajno zatezanje vrata ili uklanjanje bora.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "KORMESIC 24K Gold & Collagen maska može biti zanimljiv izbor ako:",
            },
            {
              text: "Zbog prisustva retinola, osobe sa osetljivom ili reaktivnom kožom treba da budu posebno oprezne. Tokom trudnoće i dojenja preporučuje se izbegavanje kozmetičkih retinoida.",
            },
          ],
          bullets: [
            "Želite da proširite svoju rutinu nege i na područje vrata.",
            "Koža vrata vam deluje suvo ili manje negovano.",
            "Želite dodatnu hidrataciju i osećaj mekoće.",
            "Tražite specijalizovanu masku sa kolagenom i hijaluronskom kiselinom.",
            "Volite praktične kućne rituale nege.",
            "Želite mogućnost kupovine pojedinačne maske ili većeg pakovanja.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Zlato je navedeno u INCI sastavu proizvoda. Njegovo prisustvo samo po sebi ne dokazuje lifting ili anti-age efekat.",
              emphasis: "Gold:",
            },
            {
              text: "Hidrolizovani kolagen koristi se u kozmetičkim preparatima za negu i kondicioniranje kože.",
              emphasis: "Hydrolyzed Collagen:",
            },
            {
              text: "Retinol je sastojak koji se koristi u anti-age kozmetici. Njegova koncentracija u ovom proizvodu nije navedena.",
              emphasis: "Retinol:",
            },
            {
              text: "Hijaluronska kiselina se koristi u hidratantnim proizvodima zahvaljujući sposobnosti vezivanja vode.",
              emphasis: "Hyaluronic Acid:",
            },
            {
              text: "Vitamin E, sastojak koji se koristi u kozmetičkim formulama zbog antioksidativnih svojstava.",
              emphasis: "Tocopherol:",
            },
            {
              text: "Glicerin je humektans koji pomaže vezivanju vlage i hidratantnoj nezi.",
              emphasis: "Glycerin:",
            },
            {
              text: "Alantoin je sastojak koji se često koristi u kozmetičkim proizvodima namenjenim nezi kože.",
              emphasis: "Allantoin:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Temeljno očistite i nežno osušite kožu vrata pre nanošenja maske.",
            },
            {
              text: "Otvorite kesicu, pažljivo izvadite masku i postavite je preko predviđenog područja vrata.",
            },
            {
              text: "Nežno je prilagodite konturama vrata i pritisnite spoljašnji sloj kako bi maska dobro prijanjala uz kožu.",
            },
            {
              text: "Ostavite da deluje 20–40 minuta, u skladu sa uputstvom na ambalaži.",
            },
            {
              text: "Nakon uklanjanja maske, nežno umasirajte preostalu esenciju, a zatim isperite vrat čistom vodom.",
            },
            {
              text: "Nastavite sa uobičajenom rutinom nege kože.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. U slučaju crvenila, iritacije ili nelagodnosti prekinite korišćenje.",
            },
            {
              text: "Zbog prisustva retinola, izbegavajte istovremenu primenu drugih retinoida i jakih eksfolijanata na istom području. Tokom dana zaštitite izloženu kožu vrata od sunca.",
            },
            {
              text: "Čuvajte na hladnom i suvom mestu, zaštićeno od direktne sunčeve svetlosti i van domašaja dece.",
            },
          ],
        },
      ],
      inci: "Aqua, Glycerin, Mineral Oil, Dimethicone, Phenoxyethanol, PEG-40 Hydrogenated Castor Oil, Petrolatum, Gold, Oligopeptide-1, Hydrolyzed Collagen, Retinol, Hyaluronic Acid, Tocopherol, Xanthan Gum, Allantoin, Methylparaben, Polyacrylamide, Lauric/Myristic/Palmitic/Stearic Glycerides, PEG-10, Carbomer, Triethanolamine, Glyceryl Stearate, Disodium EDTA, C13-14 Isoparaffin, Laureth-7, Fragrance.",
      brand: "KORMESIC",
      quantity: "1 maska / 25 g",
      price: 299,
      packageOptions: [
        { id: "1", count: 1, price: 299, label: "1 maska" },
        { id: "5", count: 5, price: 1299, label: "5 maski" },
        { id: "10", count: 10, price: 2399, label: "10 maski" },
        {
          id: "30",
          count: 30,
          price: 4999,
          label: "30 maski",
          note: "Najniža cena po maski",
        },
      ],
    },
    {
      id: "kormesic-smile-lines-hidrogel-maska-za-bore-oko-usana",
      slug: "kormesic-smile-lines-hidrogel-maska-za-bore-oko-usana",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "CILJANA NEGA BORA OKO USANA",
      name: "KORMESIC Smile Lines hidrogel maska za bore oko usana",
      images: ["/kormesic-smile-lines-patch-hero-1600.webp"],
      imageAlt:
        "KORMESIC Smile Lines hidrogel maska za bore oko usana – pakovanje proizvoda",
      shortDescription:
        "Hidrogel flasteri za ciljanu negu kože oko usana i nazolabijalnih linija. Formula sa kolagenom, hijaluronskom kiselinom i vitaminom E namenjena je hidrataciji, osećaju mekoće i zaglađenijem izgledu kože.",
      metaTitle:
        "KORMESIC Smile Lines hidrogel flasteri za bore oko usana | Odalis",
      metaDescription:
        "KORMESIC Smile Lines hidrogel flasteri sa kolagenom, hijaluronskom kiselinom i vitaminom E za ciljanu negu kože oko usana. Pakovanja od 1 do 30 pari.",
      buyCardQuestion:
        "Primećujete izraženije linije oko usana i želite da ovom području pružite dodatnu negu?",
      buyCardDescription:
        "KORMESIC Smile Lines hidrogel flasteri pružaju ciljanu negu području nazolabijalnih linija uz kolagen, hijaluronsku kiselinu i vitamin E. Prijatna hidrogel tekstura namenjena je dodatnoj hidrataciji i osećaju mekoće, dok koža oko usana može izgledati svežije, negovanije i privremeno zaglađenije.",
      longDescription: [
        {
          heading: "Posebna pažnja za linije oko usana",
          paragraphs: [
            {
              text: "Dok biramo preparate za celo lice, često zaboravljamo na određena područja kojima želimo da pružimo dodatnu pažnju. Jedno od njih je regija između nosa i uglova usana, gde prirodni izrazi lica mogu doprineti vidljivosti nazolabijalnih linija.",
            },
            {
              text: "KORMESIC Smile Lines hidrogel maska osmišljena je upravo za ciljanu negu ove regije.",
            },
            {
              text: "Dva hidrogel flastera prijatno naležu uz kožu i omogućavaju jednostavan kućni ritual usmeren na hidrataciju i negovaniji izgled područja oko usana.",
            },
            {
              text: "Prema podacima na pakovanju, proizvođač je Foshan City Sanshui Qiaoxifu Household Co., Ltd., a zemlja proizvodnje je Kina (Made in PRC).",
            },
          ],
        },
        {
          heading: "Hidratacija za mekši i zaglađeniji izgled",
          paragraphs: [
            {
              text: "Kada koži nedostaje vlage, fine linije na njenoj površini mogu izgledati izraženije, a koža može delovati suvlje i manje sveže.",
            },
            {
              text: "Formula sadrži glicerin, natrijum-hijaluronat i druge sastojke koji se koriste u hidratantnim kozmetičkim preparatima.",
            },
            {
              text: "Dodatna hidratacija može doprineti osećaju mekoće i privremeno zaglađenijem izgledu površine kože.",
            },
            {
              text: "Ovi flasteri predstavljaju dopunski korak nege, a ne tretman koji trajno uklanja nazolabijalne bore.",
            },
          ],
        },
        {
          heading: "Hidrogel tekstura koja prijatno naleže uz kožu",
          paragraphs: [
            {
              text: "Za razliku od klasične sheet maske za celo lice, KORMESIC Smile Lines flasteri namenjeni su preciznijoj primeni na području oko usana.",
            },
            {
              text: "Njihova mekana hidrogel tekstura omogućava prijanjanje uz odgovarajuću regiju, dok esencija ostaje u kontaktu sa površinom kože tokom korišćenja.",
            },
            {
              text: "Primena traje približno 15–20 minuta, pa ih možete lako uključiti u svoj kućni ritual nege.",
            },
          ],
        },
        {
          heading: "Kome su namenjeni?",
          paragraphs: [
            {
              text: "KORMESIC Smile Lines flasteri mogu biti zanimljiv izbor ako:",
            },
            {
              text: "Flasteri su kozmetički proizvod namenjen nezi kože. Ne predstavljaju zamenu za profesionalne estetske tretmane i ne garantuju trajno uklanjanje bora.",
            },
          ],
          bullets: [
            "Želite dodatnu negu područja oko usana.",
            "Primećujete fine linije ili izraženije nazolabijalne linije.",
            "Koža oko usana vam povremeno deluje suvo.",
            "Tražite praktične hidrogel flastere za ciljanu hidrataciju.",
            "Volite proizvode sa kolagenom i hijaluronskom kiselinom.",
            "Želite da kupite jedan par ili povoljnije veće pakovanje.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Hidrolizovani kolagen koristi se u kozmetičkim formulama za negu i kondicioniranje kože.",
              emphasis: "Hydrolyzed Collagen:",
            },
            {
              text: "Natrijum-hijaluronat je oblik hijaluronske kiseline koji se koristi za hidratantnu negu i vezivanje vlage.",
              emphasis: "Sodium Hyaluronate:",
            },
            {
              text: "Glicerin je humektans koji doprinosi hidrataciji i osećaju mekoće.",
              emphasis: "Glycerin:",
            },
            {
              text: "Vitamin E koji se koristi u kozmetičkim formulama zbog antioksidativnih svojstava.",
              emphasis: "Tocopherol:",
            },
            {
              text: "Derivat vitamina E koji se koristi u preparatima za negu kože.",
              emphasis: "Tocopheryl Acetate:",
            },
            {
              text: "Ekstrakt semenki grožđa koji se koristi u kozmetičkim preparatima za negu kože.",
              emphasis: "Vitis Vinifera (Grape) Seed Extract:",
            },
            {
              text: "Peptid naveden u sastavu kozmetičke formule. Njegova koncentracija nije poznata.",
              emphasis: "Oligopeptide-1:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite lice i nežno osušite kožu.",
            },
            {
              text: "Otvorite kesicu i pažljivo izvadite oba hidrogel flastera.",
            },
            {
              text: "Postavite flastere na predviđeno područje nazolabijalnih linija, sa obe strane lica, između nosa i uglova usana.",
            },
            {
              text: "Nežno ih prilagodite konturama kože kako bi dobro prijanjali.",
            },
            {
              text: "Ostavite da deluju 15–20 minuta.",
            },
            {
              text: "Uklonite flastere i nežno umasirajte ili utapkajte preostalu esenciju dok se ne upije.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. Izbegavajte direktan kontakt sa očima i unutrašnjom stranom usana.",
            },
            {
              text: "U slučaju iritacije, crvenila ili nelagodnosti odmah prekinite korišćenje. Zbog prisustva mentola budite posebno pažljivi ako vam je koža reaktivna ili osetljiva.",
            },
            {
              text: "Čuvajte proizvod na hladnom i suvom mestu, zaštićeno od direktne sunčeve svetlosti i van domašaja dece. Nije namenjen deci mlađoj od tri godine.",
            },
          ],
        },
      ],
      inci: "Aqua, Glycerin, Hydrolyzed Collagen, Tocopherol, Oligopeptide-1, Vitis Vinifera (Grape) Seed Extract, Sodium Hyaluronate, Aloe Yohju Matsu Ekisu, Tocopheryl Acetate, Sodium Polyacrylate, Phenoxyethanol, Tartaric Acid, Methylparaben, Dihydroxyaluminum Aminoacetate, Disodium EDTA, Fragrance, Menthol.",
      inciVerificationNote:
        "Aloe Yohju Matsu Ekisu is transcribed as printed on the packaging and requires verification against the manufacturer's original ingredient declaration before commercial sale.",
      brand: "KORMESIC",
      quantity: "1 par / 2 flastera / 8,5 g",
      price: 349,
      packageOptions: [
        {
          id: "1",
          count: 1,
          price: 349,
          label: "1 par",
          unitLabel: "par",
        },
        {
          id: "5",
          count: 5,
          price: 1499,
          label: "5 pari",
          unitLabel: "par",
        },
        {
          id: "10",
          count: 10,
          price: 2699,
          label: "10 pari",
          unitLabel: "par",
        },
        {
          id: "30",
          count: 30,
          price: 6000,
          label: "30 pari",
          unitLabel: "par",
          note: "Najniža cena po paru",
        },
      ],
    },
    {
      id: "zozu-gold-nourish-hidrogel-maska-za-oci",
      slug: "zozu-gold-nourish-hidrogel-maska-za-oci",
      category: "maske-za-lice",
      detailPage: true,
      sitemapIndexable: true,
      purpose: "ZLATNA HIDRATANTNA NEGA OKO OČIJU",
      name: "ZOZU Gold Nourish hidrogel maska za područje oko očiju",
      images: ["/zozu-gold-nourish-eye-mask-hero-1600.webp"],
      imageAlt:
        "ZOZU Gold Nourish hidrogel maska za područje oko očiju – pakovanje proizvoda",
      shortDescription:
        "Zlatna hidrogel maska za područje ispod očiju sa hidrolizovanim kolagenom i hidratantnim sastojcima. Namenjena dodatnoj nezi kože kojoj su potrebni svežina, osećaj mekoće i negovaniji izgled.",
      metaTitle: "ZOZU Gold Nourish hidrogel maska za oči | Odalis",
      metaDescription:
        "ZOZU Gold Nourish hidrogel maska za područje oko očiju sa kolagenom i hidratantnim sastojcima. Pakovanja od 1, 5, 10 i 30 pari.",
      buyCardQuestion:
        "Umoran pogled, suvoća ili fine linije oko očiju koje želite da negujete?",
      buyCardDescription:
        "ZOZU Gold Nourish hidrogel maska pruža ciljanu negu području ispod očiju uz hidrolizovani kolagen, zlato i hidratantne sastojke. Njena prijatna hidrogel tekstura namenjena je dodatnoj hidrataciji, osećaju mekoće i svežijem, negovanijem izgledu okoloočne regije.",
      longDescription: [
        {
          heading: "Zlatni ritual za svežiji pogled",
          paragraphs: [
            {
              text: "Područje oko očiju često je među prvim delovima lica na kojima primećujemo umoran izgled, suvoću i fine linije. Zato ova nežna regija zaslužuje dodatnu pažnju u svakodnevnoj rutini nege.",
            },
            {
              text: "ZOZU Gold Nourish hidrogel maska osmišljena je kao praktičan ritual namenjen hidrataciji i negovanijem izgledu kože ispod očiju.",
            },
            {
              text: "Svaka kesica sadrži dva hidrogel flastera koji se postavljaju ispod očiju i omogućavaju jednostavnu, ciljanu primenu.",
            },
            {
              text: "Prema podacima na pakovanju, proizvođač je Foshan Sadoer Cosmetic Co., Ltd., a zemlja proizvodnje je Kina.",
            },
          ],
        },
        {
          heading: "Hidratacija za mekšu kožu oko očiju",
          paragraphs: [
            {
              text: "Kada koži oko očiju nedostaje vlage, može delovati manje sveže, a fine linije povezane sa suvoćom mogu biti primetnije.",
            },
            {
              text: "Formula sadrži glicerin i propilen glikol, sastojke koji se često koriste u hidratantnim kozmetičkim proizvodima.",
            },
            {
              text: "Dodatna hidratantna nega može doprineti osećaju mekoće i privremeno zaglađenijem izgledu površine kože.",
            },
            {
              text: "Maska predstavlja dopunski korak nege, a ne tretman za trajno uklanjanje bora ili tamnih podočnjaka.",
            },
          ],
        },
        {
          heading: "Kolagen i zlato u hidrogel formuli",
          paragraphs: [
            {
              text: "ZOZU Gold Nourish sadrži hidrolizovani kolagen i zlato navedene u sastavu proizvoda.",
            },
            {
              text: "Hidrolizovani kolagen koristi se u kozmetičkim formulama za negu i kondicioniranje kože.",
            },
            {
              text: "Zlato je sastojak naveden u originalnoj INCI deklaraciji i deo karakterističnog identiteta ove maske.",
            },
            {
              text: "Pošto koncentracije nisu navedene i nisu dostavljene kliničke studije za ovu konkretnu formulu, ne tvrdimo da proizvod trajno zateže kožu ili uklanja bore.",
            },
          ],
        },
        {
          heading: "Kome je namenjena?",
          paragraphs: [
            {
              text: "ZOZU Gold Nourish hidrogel maska može biti zanimljiv izbor ako:",
            },
            {
              text: "Ova maska je kozmetički proizvod za negu kože. Ne garantuje uklanjanje tamnih podočnjaka niti trajno smanjenje bora.",
            },
          ],
          bullets: [
            "Želite dodatnu hidrataciju područja ispod očiju.",
            "Koža oko očiju vam povremeno deluje suvo ili umorno.",
            "Tražite jednostavne hidrogel flastere za kućnu negu.",
            "Volite negu sa kolagenom.",
            "Želite prijatan ritual osveženja područja oko očiju.",
            "Želite da kupite jedan par ili povoljnije pakovanje od više pari.",
          ],
        },
        {
          heading: "Ključni sastojci",
          paragraphs: [
            {
              text: "Glicerin je humektans koji pomaže vezivanju vlage i doprinosi hidratantnoj nezi kože.",
              emphasis: "Glycerin:",
            },
            {
              text: "Propilen glikol koristi se u kozmetičkim formulama kao humektans i rastvarač.",
              emphasis: "Propylene Glycol:",
            },
            {
              text: "Hidrolizovani kolagen koristi se u kozmetičkim preparatima za kondicioniranje i negu kože.",
              emphasis: "Hydrolyzed Collagen:",
            },
            {
              text: "Zlato je navedeno u sastavu proizvoda. Njegovo prisustvo samo po sebi ne potvrđuje anti-age ili lifting efekat.",
              emphasis: "Gold:",
            },
            {
              text: "Sastojak koji se koristi u kozmetičkim formulama za formiranje teksture i konzistencije proizvoda.",
              emphasis: "Algin:",
            },
          ],
        },
        {
          heading: "Način upotrebe",
          paragraphs: [
            {
              text: "Očistite lice i nežno osušite područje ispod očiju.",
            },
            {
              text: "Otvorite kesicu i pažljivo izvadite oba hidrogel flastera.",
            },
            {
              text: "Postavite po jedan flaster na područje ispod svakog oka, vodeći računa da ne dolazi do direktnog kontakta sa očima.",
            },
            {
              text: "Nežno prilagodite flastere konturama kože.",
            },
            {
              text: "Ostavite da deluju 20–30 minuta, u skladu sa uputstvom na ambalaži.",
            },
            {
              text: "Uklonite flastere i nežno utapkajte preostalu esenciju dok se ne upije.",
            },
            {
              text: "Pre prve upotrebe isprobajte proizvod na manjoj površini kože. U slučaju crvenila, neprijatnosti ili iritacije prekinite korišćenje.",
            },
            {
              text: "Izbegavajte direktan kontakt sa očima. Čuvajte na hladnom mestu, zaštićeno od direktne sunčeve svetlosti i van domašaja dece.",
            },
            {
              text: "Nije namenjeno deci mlađoj od tri godine.",
            },
          ],
        },
      ],
      inci: "Water, Glycerin, Propylene Glycol, Algin, Mica, CI 77891, Diazolidinyl Urea, Methylparaben, CI 77491, Fragrance, PEG-40 Hydrogenated Castor Oil, PEG-10, Iodopropynyl Butylcarbamate, Hydrolyzed Collagen, Gold.",
      inciVerificationNote:
        "Ingredient list transcribed from the packaging and requires verification against original supplier documentation before commercial launch.",
      brand: "ZOZU",
      quantity: "1 par / 2 flastera / 7,5 g",
      price: 199,
      packageOptions: [
        {
          id: "1",
          count: 1,
          price: 199,
          label: "1 par",
          unitLabel: "par",
        },
        {
          id: "5",
          count: 5,
          price: 849,
          label: "5 pari",
          unitLabel: "par",
        },
        {
          id: "10",
          count: 10,
          price: 1599,
          label: "10 pari",
          unitLabel: "par",
        },
        {
          id: "30",
          count: 30,
          price: 3299,
          label: "30 pari",
          unitLabel: "par",
          note: "Najniža cena po paru",
        },
      ],
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
      id: "odalis-sculpt-anti-age-set",
      slug: "odalis-sculpt-anti-age-set",
      category: "setovi-za-negu-lica",
      detailPage: true,
      sitemapIndexable: true,
      freeShippingEligible: true,
      purpose: "KOMPLETNA ANTI-AGE NEGA",
      name: "ODALIS SCULPT — Anti-age ritual za negu lica",
      images: ["/sculptset.webp"],
      shortDescription:
        "Tri proizvoda iz KORMESIC Collagen linije u jednoj rutini: serum, krema za lice i krema za područje oko očiju. Za dodatnu hidrataciju, mekoću i negovaniji izgled kože sa prvim finim linijama.",
      metaTitle: "ODALIS SCULPT | Anti-age set za negu lica",
      metaDescription:
        "ODALIS SCULPT set sa KORMESIC Collagen serumom, kremom za lice i kremom za oči. Kompletan ritual nege uz besplatnu dostavu.",
      buyCardQuestion:
        "Želite kompletnu rutinu nege lica koja pruža posebnu pažnju finim linijama i području oko očiju?",
      buyCardDescription:
        "ODALIS SCULPT kombinuje tri proizvoda iz KORMESIC Collagen linije u zaokružen ritual nege. Hidratantni serum, krema za lice i krema za područje oko očiju dopunjuju se u rutini namenjenoj mekoći, hidrataciji i zaglađenijem, negovanijem izgledu kože.",
      longDescription: [
        {
          heading: "Tri koraka do pažljivije nege kože",
          paragraphs: [
            {
              text: "Nega kože sa prvim znacima starenja ne mora da podrazumeva veliki broj različitih proizvoda. Važno je da svaki korak ima jasnu namenu i da se proizvodi smisleno dopunjuju.",
            },
            {
              text: "ODALIS SCULPT povezuje serum, kremu za lice i kremu za područje oko očiju u zaokruženu rutinu sa fokusom na hidrataciju, mekoću i negovaniji izgled kože.",
            },
            {
              text: "Sva tri proizvoda pripadaju KORMESIC Collagen liniji, što ovom setu daje usklađen identitet i jednostavnu svakodnevnu primenu.",
            },
          ],
        },
        {
          heading: "Nega lica koja počinje hidratacijom",
          paragraphs: [
            {
              text: "KORMESIC Botox Collagen serum predstavlja prvi korak rutine nakon čišćenja lica. Njegova formula sa hidrolizovanim kolagenom, peptidima i hidratantnim sastojcima namenjena je dodatnoj kozmetičkoj nezi kože.",
            },
            {
              text: "KORMESIC Botoks Collagen krema dopunjuje serum kao završni hidratantni korak nege lica i doprinosi osećaju mekoće i prijatnosti.",
            },
          ],
        },
        {
          heading: "Posebna pažnja za područje oko očiju",
          paragraphs: [
            {
              text: "Područje oko očiju zahteva pažljivu primenu proizvoda zbog osetljivosti kože ove regije.",
            },
            {
              text: "KORMESIC Botox Keratin krema za područje oko očiju dopunjuje rutinu kao ciljano namenjen proizvod za ovu regiju.",
            },
            {
              text: "Set omogućava da svakodnevnu negu lica i okoloočnog područja organizujete kroz tri međusobno usklađena koraka.",
            },
            {
              text: "„Botox“ je deo komercijalnog naziva proizvoda i ne znači da oni sadrže injekcioni botulinum toksin niti da zamenjuju ili pružaju rezultate profesionalnih Botox tretmana.",
            },
          ],
        },
        {
          heading: "Kome je namenjen ODALIS SCULPT?",
          paragraphs: [
            {
              text: "Ovaj set može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Primećujete prve fine linije.",
            "Želite više hidratacije i osećaja mekoće.",
            "Tražite kompletan serum + krema ritual.",
            "Želite poseban proizvod za okoloočnu regiju.",
            "Volite proizvode iste kozmetičke linije.",
            "Želite praktičan premium skincare set.",
          ],
        },
        {
          heading: "Šta se nalazi u setu?",
          paragraphs: [
            {
              text: "Svaki proizvod ima posebnu ulogu u rutini, a njihovo kombinovanje olakšava svakodnevnu organizaciju nege.",
            },
          ],
          bullets: [
            "KORMESIC Botox Collagen serum — 30 ml",
            "KORMESIC Botoks Collagen krema — 50 g",
            "KORMESIC Botox Keratin krema za oči — 20 g",
          ],
        },
        {
          heading: "Kako koristiti SCULPT ritual",
          paragraphs: [
            {
              text: "Ujutru i uveče očistite lice odgovarajućim preparatom.",
            },
            {
              text: "Na čistu kožu nanesite KORMESIC Botox Collagen serum i sačekajte da se upije.",
            },
            {
              text: "Zatim nanesite odgovarajuću količinu KORMESIC Botoks Collagen kreme na lice.",
            },
            {
              text: "KORMESIC Botox Keratin kremu pažljivo nanesite na područje oko očiju prema uputstvu proizvoda, izbegavajući direktan kontakt sa očima.",
            },
            {
              text: "Tokom dana završite rutinu odgovarajućom zaštitom od sunca.",
            },
            {
              text: "Ukoliko se pojavi iritacija, prekinite korišćenje proizvoda.",
            },
          ],
        },
      ],
      includedProducts: [
        {
          categorySlug: "kreme-za-lice",
          productSlug: "kormesic-botox-collagen-serum-za-lice",
          quantity: 1,
        },
        {
          categorySlug: "kreme-za-lice",
          productSlug: "kormesic-botoks-collagen-krema-za-lice",
          quantity: 1,
        },
        {
          categorySlug: "kreme-za-lice",
          productSlug: "kormesic-botox-keratin-krema-za-oci",
          quantity: 1,
        },
      ],
      brand: "ODALIS",
      quantity: "1 set",
      price: 2499,
    },
    {
      id: "odalis-lumiere-set-za-blistaviji-ten",
      slug: "odalis-lumiere-set-za-blistaviji-ten",
      category: "setovi-za-negu-lica",
      detailPage: true,
      sitemapIndexable: true,
      freeShippingEligible: true,
      purpose: "BLISTAVIJI I NEGOVANIJI TEN",
      name: "ODALIS LUMIÈRE — Ritual za blistaviji ten",
      images: ["/lumiereset.webp"],
      shortDescription:
        "Premium ritual sa tonikom, losionom sa niacinamidom i pet Gold Pearl maski sa ekstraktom bisera, hijaluronskom kiselinom i retinolom. Za dodatnu hidrataciju i blistaviji, negovaniji izgled tena.",
      metaTitle: "ODALIS LUMIÈRE | Set za blistaviji ten",
      metaDescription:
        "ODALIS LUMIÈRE set sa SADOER tonikom, losionom sa niacinamidom i pet Gold Pearl maski. Premium nega lica uz besplatnu dostavu.",
      buyCardQuestion:
        "Želite da vaš ten izgleda svežije, blistavije i negovanije?",
      buyCardDescription:
        "ODALIS LUMIÈRE kombinuje tonik, losion sa niacinamidom i pet Gold Pearl maski u elegantan ritual nege. Namenjen je ženama koje žele više hidratacije, mekoće i svežiji izgled tena, uz poseban povremeni korak nege sa ekstraktom bisera i retinolom.",
      longDescription: [
        {
          heading: "Otkrijte sjaj koji pripada vašoj koži",
          paragraphs: [
            {
              text: "Kada koža deluje umorno, bez svežine ili joj nedostaje hidratacije, pažljivo osmišljena rutina može doprineti negovanijem izgledu.",
            },
            {
              text: "ODALIS LUMIÈRE povezuje svakodnevnu hidratantnu negu sa povremenim ritualom sheet maske i donosi tri komplementarna proizvoda u jednom setu.",
            },
            {
              text: "Set je osmišljen za žene koje žele elegantnu kućnu rutinu sa fokusom na hidrataciju i blistaviji izgled tena.",
            },
          ],
        },
        {
          heading: "Hidratantna nega kao osnova rutine",
          paragraphs: [
            {
              text: "SADOER PDRN Pink Peptide toner predstavlja prvi korak nakon čišćenja kože.",
            },
            {
              text: "SADOER Collagen & Niacinamide losion dopunjuje rutinu kao hidratantni proizvod koji sadrži niacinamid, sastojak često zastupljen u preparatima namenjenim negovanijem i ujednačenijem izgledu tena.",
            },
            {
              text: "Zajedno čine osnovu jednostavne svakodnevne nege.",
            },
          ],
        },
        {
          heading: "Pet posebnih Gold Pearl rituala",
          paragraphs: [
            {
              text: "KORMESIC Gold Pearl Anti-Aging maska sadrži ekstrakt bisera, hijaluronsku kiselinu, retinol i peptide navedene u njenom sastavu.",
            },
            {
              text: "U setu se nalazi pet pojedinačnih sheet maski koje omogućavaju dodatnu, povremenu negu.",
            },
            {
              text: "Pošto maska sadrži retinol, treba je koristiti pažljivo i ne kombinovati je u istoj rutini sa drugim retinoidima ili jakim eksfolijantima.",
            },
            {
              text: "Ovaj proizvod ne garantuje trajno uklanjanje bora ili pigmentnih promena.",
            },
          ],
        },
        {
          heading: "Kome je namenjen ODALIS LUMIÈRE?",
          paragraphs: [
            {
              text: "Ovaj set može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Želite svežiji i blistaviji izgled tena.",
            "Vašoj koži je potrebna dodatna hidratacija.",
            "Volite preparate sa niacinamidom.",
            "Želite zaokruženu rutinu sa tonikom i losionom.",
            "Volite povremene rituale sa sheet maskama.",
            "Tražite atraktivan skincare set za sebe ili poklon.",
          ],
        },
        {
          heading: "Šta se nalazi u setu?",
          paragraphs: [
            {
              text: "Set kombinuje dva proizvoda za svakodnevnu hidratantnu negu i pet maski za povremeno korišćenje.",
            },
          ],
          bullets: [
            "SADOER PDRN Pink Peptide toner — 130 ml",
            "SADOER Collagen & Niacinamide losion — 100 ml",
            "KORMESIC Gold Pearl Anti-Aging maska — 5 komada",
          ],
        },
        {
          heading: "Kako koristiti LUMIÈRE ritual",
          paragraphs: [
            {
              text: "Na očišćeno lice nanesite SADOER PDRN Pink Peptide toner.",
            },
            {
              text: "Zatim nanesite SADOER Collagen & Niacinamide losion kao hidratantni korak rutine.",
            },
            {
              text: "Gold Pearl masku koristite povremeno, na očišćenoj koži, prema uputstvu sa pojedinačnog pakovanja.",
            },
            {
              text: "Ne koristite Gold Pearl masku u istoj rutini sa drugim retinoidima ili jakim eksfolijantima.",
            },
            {
              text: "Kod osetljive kože ili prve upotrebe proizvoda sa retinolom preporučuje se postepeno uvođenje i poseban oprez.",
            },
            {
              text: "Tokom dana koristite odgovarajuću zaštitu od sunca.",
            },
            {
              text: "Kozmetičke retinoide treba izbegavati tokom trudnoće. U slučaju iritacije prekinite korišćenje.",
            },
          ],
        },
      ],
      includedProducts: [
        {
          categorySlug: "kreme-za-lice",
          productSlug: "sadoer-pdrn-pink-peptide-toner-za-lice",
          quantity: 1,
        },
        {
          categorySlug: "kreme-za-lice",
          productSlug: "sadoer-collagen-niacinamide-losion-za-lice",
          quantity: 1,
        },
        {
          categorySlug: "maske-za-lice",
          productSlug: "kormesic-gold-pearl-anti-aging-maska-za-lice",
          quantity: 1,
          packageOptionId: "5",
        },
      ],
      brand: "ODALIS",
      quantity: "1 set",
      price: 3499,
    },
    {
      id: "odalis-revive-set-za-podrucje-oko-ociju",
      slug: "odalis-revive-set-za-podrucje-oko-ociju",
      category: "setovi-za-negu-lica",
      detailPage: true,
      sitemapIndexable: true,
      freeShippingEligible: true,
      purpose: "KOMPLETNA NEGA PODRUČJA OKO OČIJU",
      name: "ODALIS REVIVE — Ritual za odmorniji pogled",
      images: ["/reviveset.webp"],
      shortDescription:
        "Kompletan ritual za područje oko očiju: KORMESIC Snail Repair krema i čak 35 pari hidrogel maski SADOER i ZOZU. Za dodatnu hidrataciju, osećaj mekoće i svežiji, odmorniji izgled pogleda.",
      metaTitle: "ODALIS REVIVE | Set za negu područja oko očiju",
      metaDescription:
        "ODALIS REVIVE set sa Snail Repair kremom i 35 pari SADOER i ZOZU hidrogel maski. Hidratantna nega područja oko očiju uz besplatnu dostavu.",
      buyCardQuestion:
        "Umoran pogled, fine linije ili osećaj suvoće u području oko očiju?",
      buyCardDescription:
        "ODALIS REVIVE donosi Snail Repair kremu za područje oko očiju i čak 35 pari hidrogel maski u jednom premium setu. Dve vrste maski i krema dopunjuju se u ritualu namenjenom dodatnoj hidrataciji, mekoći i svežijem, negovanijem izgledu okoloočne regije.",
      longDescription: [
        {
          heading: "Probudite lepotu svog pogleda",
          paragraphs: [
            {
              text: "Područje oko očiju zaslužuje poseban pristup nezi. Suvoća i umoran izgled ove regije mogu učiniti da pogled deluje manje sveže.",
            },
            {
              text: "ODALIS REVIVE osmišljen je kao kompletna rutina koja povezuje kremu za redovnu negu i dve vrste hidrogel maski za dodatne trenutke hidratacije.",
            },
            {
              text: "Set sadrži ukupno 35 pari maski, što omogućava više pojedinačnih rituala nege.",
            },
          ],
        },
        {
          heading: "Snail Repair krema za svakodnevnu negu",
          paragraphs: [
            {
              text: "KORMESIC Snail Repair krema namenjena je području oko očiju i sadrži pužev filtrat i druge kozmetičke sastojke za negu kože.",
            },
            {
              text: "Njena uloga u ovom setu je da obezbedi poseban svakodnevni korak nege okoloočne regije.",
            },
            {
              text: "Kremu koristite prema uputstvu proizvoda, vodeći računa da ne dospe direktno u oči.",
            },
          ],
        },
        {
          heading: "Dve vrste hidrogel maski za dodatnu hidrataciju",
          paragraphs: [
            {
              text: "SADOER Hydrating Smooth Eye Mask dolazi u pakovanju od 30 pari i namenjena je hidratantnoj nezi područja ispod očiju.",
            },
            {
              text: "ZOZU Gold Nourish donosi dodatnih pet pari hidrogel maski sa kolagenom i zlatom navedenim u sastavu.",
            },
            {
              text: "Ova kombinacija omogućava da prema želji menjate dve različite hidrogel maske, uz isti cilj — dodatnu hidrataciju i negovaniji izgled kože oko očiju.",
            },
          ],
        },
        {
          heading: "Kome je namenjen ODALIS REVIVE?",
          paragraphs: [
            {
              text: "Ovaj set može biti zanimljiv izbor ako:",
            },
          ],
          bullets: [
            "Želite kompletnu rutinu nege područja oko očiju.",
            "Koža ispod očiju vam povremeno deluje suvo.",
            "Primećujete fine linije povezane sa suvoćom.",
            "Volite hidrogel maske za dodatno osveženje.",
            "Želite kremu i maske u jednom setu.",
            "Tražite premium skincare poklon.",
          ],
        },
        {
          heading: "Šta se nalazi u setu?",
          paragraphs: [
            {
              text: "Ukupno dobijate jednu kremu i 35 pari hidrogel maski, odnosno 70 pojedinačnih flastera.",
            },
          ],
          bullets: [
            "KORMESIC Snail Repair krema za područje oko očiju — 30 g",
            "SADOER Hydrating Smooth Eye Mask — 30 pari / 60 flastera",
            "ZOZU Gold Nourish Eye Mask — 5 pari / 10 flastera",
          ],
        },
        {
          heading: "Kako koristiti REVIVE ritual",
          paragraphs: [
            {
              text: "Temeljno očistite lice i područje oko očiju.",
            },
            {
              text: "Kada želite dodatnu hidratantnu negu, odaberite jedan par SADOER ili ZOZU hidrogel maski.",
            },
            {
              text: "SADOER masku koristite prema njenom uputstvu, približno 15–20 minuta.",
            },
            {
              text: "ZOZU masku koristite prema njenom uputstvu, približno 20–30 minuta.",
            },
            {
              text: "Nakon uklanjanja maske nežno utapkajte preostalu esenciju ako to odgovara uputstvu proizvoda.",
            },
            {
              text: "Zatim nanesite malu količinu KORMESIC Snail Repair kreme na predviđeno područje oko očiju.",
            },
            {
              text: "Izbegavajte direktan kontakt sa očima i prekinite upotrebu ukoliko se pojavi iritacija ili neprijatna reakcija.",
            },
            {
              text: "Set ne garantuje uklanjanje tamnih podočnjaka, trajno smanjenje bora ili rezultate profesionalnih estetskih tretmana.",
            },
          ],
        },
      ],
      includedProducts: [
        {
          categorySlug: "kreme-za-lice",
          productSlug: "kormesic-snail-repair-krema-za-oci",
          quantity: 1,
        },
        {
          categorySlug: "maske-za-lice",
          productSlug: "hidratantna-maska-za-lice",
          quantity: 1,
        },
        {
          categorySlug: "maske-za-lice",
          productSlug: "zozu-gold-nourish-hidrogel-maska-za-oci",
          quantity: 1,
          packageOptionId: "5",
        },
      ],
      brand: "ODALIS",
      quantity: "1 set",
      price: 2699,
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

export function getPackageOption(
  product: ProductListingItem,
  optionId?: string,
) {
  if (!product.packageOptions?.length) return undefined;
  return (
    product.packageOptions.find((option) => option.id === optionId) ??
    (optionId === undefined ? product.packageOptions[0] : undefined)
  );
}

export function getCartUpsell(
  cartItems: Array<{ categorySlug: string; productSlug: string }>,
) {
  const productsInCart = new Set(
    cartItems.map((item) => `${item.categorySlug}/${item.productSlug}`),
  );

  for (const cartItem of cartItems) {
    const source = getProductBySlug(
      cartItem.categorySlug,
      cartItem.productSlug,
    )?.product;
    if (!source?.cartUpsell || source.cartUpsell === source.slug) continue;

    const recommendation = productCategories
      .flatMap((category) =>
        category.products.map((product) => ({ category, product })),
      )
      .find(
        ({ product }) =>
          product.slug === source.cartUpsell &&
          product.availableForPurchase !== false,
      );

    if (!recommendation) continue;
    const key = `${recommendation.category.slug}/${recommendation.product.slug}`;
    if (!productsInCart.has(key)) return recommendation.product;
  }

  return undefined;
}
