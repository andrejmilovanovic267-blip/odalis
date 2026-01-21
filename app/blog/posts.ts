export type BlogPostSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    title?: string;
    text: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  location: "Novi Beograd";
  readTime: string;
  intro: string[];
  sections: BlogPostSection[];
  finalCta: string;
};

export const blogPosts: Record<string, BlogPost> = {
  hydrafacial: {
    slug: "hydrafacial",
    title: "HydraFacial tretman – dubinsko čišćenje i hidratacija lica bez iritacija",
    description:
      "HydraFacial tretman na Novom Beogradu: dubinsko čišćenje i intenzivna hidratacija lica bez iritacija i bez oporavka. Premium vodič iz Odalis centra.",
    category: "Tretman lica",
    location: "Novi Beograd",
    readTime: "6–8 min čitanja",
    intro: [
      "HydraFacial je savremeni, neinvazivni tretman lica koji kombinuje dubinsko čišćenje, hidrataciju i regeneraciju kože u jednom prijatnom postupku.",
      "Idealan je za žene koje žele zdraviju, svežiju i blistaviju kožu, bez agresivnih metoda, crvenila i oporavka.",
      "U Odalis centru, HydraFacial posmatramo kao prvi i najvažniji korak u nezi i podmlađivanju kože.",
    ],
    sections: [
      {
        id: "sta-je-hydrafacial-tretman",
        title: "Šta je HydraFacial tretman",
        paragraphs: [
          "HydraFacial je profesionalni tretman koji pomoću specijalnih nastavaka i kontrolisanog vakuuma uklanja nečistoće, mrtve ćelije i višak sebuma, dok se koža istovremeno hrani aktivnim serumima.",
          "Za razliku od klasičnih tretmana čišćenja lica, HydraFacial:",
        ],
        bullets: [
          "ne iritira kožu",
          "ne izaziva bol",
          "ne ostavlja tragove",
          "pogodan je i za osetljivu i zrelu kožu",
        ],
      },
      {
        id: "kako-izgleda-tretman-u-praksi",
        title: "Kako izgleda tretman u praksi",
        paragraphs: [
          "Tretman se sastoji iz nekoliko faza koje se prilagođavaju stanju kože svake klijentice:",
        ],
        bullets: [
          "nežno čišćenje i eksfolijacija",
          "uklanjanje nečistoća i sebuma",
          "intenzivna hidratacija i umirivanje kože",
        ],
        callout: {
          text: "Sve faze se izvode prijatno i bez neprijatnih senzacija. Većina klijentica opisuje tretman kao opuštajući i umirujući.",
        },
      },
      {
        id: "kome-je-hydrafacial-namenjen",
        title: "Kome je HydraFacial namenjen",
        paragraphs: ["HydraFacial je pogodan za:"],
        bullets: [
          "umornu i dehidriranu kožu",
          "kožu bez sjaja",
          "fine linije i prve znake starenja",
          "proširene pore",
          "kožu kojoj je potrebna regeneracija, ali bez agresivnih procedura",
        ],
        callout: {
          text: "Posebno je omiljen kod žena koje žele da počnu sa profesionalnim tretmanima, ali žele nešto sigurno, prirodno i nenametljivo.",
        },
      },
      {
        id: "koji-su-benefiti-hydrafacial-tretmana",
        title: "Koji su benefiti HydraFacial tretmana",
        paragraphs: [],
        bullets: [
          "čista, osvežena i hidrirana koža",
          "ujednačeniji ten",
          "zdrav i prirodan sjaj",
          "mekša i elastičnija koža",
          "osećaj „resetovane“ kože",
        ],
        callout: {
          text: "Rezultati su vidljivi odmah nakon tretmana, dok se kvalitet kože dodatno poboljšava redovnim dolascima.",
        },
      },
      {
        id: "hydrafacial-kao-prvi-korak-ka-podmladjivanju",
        title: "HydraFacial kao prvi korak ka podmlađivanju",
        paragraphs: ["U Odalis centru, HydraFacial često koristimo kao uvodni tretman. On omogućava da:"],
        bullets: [
          "upoznamo vašu kožu",
          "procenimo njene potrebe",
          "preporučimo dalju negu ili podmlađivanje (Indiba, radiotalasni lifting i druge tretmane)",
        ],
      },
      {
        id: "koliko-cesto-se-radi-hydrafacial",
        title: "Koliko često se radi HydraFacial",
        paragraphs: [
          "Učestalost tretmana zavisi od stanja kože i ciljeva, ali najčešće se preporučuje:",
        ],
        bullets: ["kao povremeni „reset“ kože", "ili kao deo redovne rutine nege"],
        callout: { text: "Sve preporuke se daju individualno, tokom konsultacija." },
      },
      {
        id: "da-li-je-tretman-bezbedan",
        title: "Da li je tretman bezbedan",
        paragraphs: [
          "HydraFacial je u potpunosti bezbedan, neinvazivan i bezbolan tretman.",
          "Nakon tretmana možete se odmah vratiti svakodnevnim aktivnostima.",
        ],
      },
    ],
    finalCta:
      "Ako osećate da je vašoj koži potrebna pažnja, osveženje i profesionalna nega, zakažite besplatne konsultacije u Odalis centru (Novi Beograd) i saznajte da li je HydraFacial pravi prvi korak za vas.",
  },
};

