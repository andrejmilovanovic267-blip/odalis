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
    title: "HydraFacial tretman u Odalisu – profesionalna nega lica na Novom Beogradu",
    description:
      "HydraFacial tretman na Novom Beogradu: neinvazivni tretman lica sa dubinskim čišćenjem i hidratacijom. Profesionalna nega kože u Odalis centru bez iritacija i oporavka.",
    category: "Tretman lica",
    location: "Novi Beograd",
    readTime: "7–9 min čitanja",
    intro: [
      "HydraFacial tretman je savremeni, neinvazivni tretman lica koji kombinuje dubinsko čišćenje i hidrataciju kože u jednom prijatnom i bezbolnom postupku.",
      "Idealno rešenje za žene koje traže profesionalnu negu lica bez agresivnih metoda, crvenila i perioda oporavka.",
      "U Odalis centru na Novom Beogradu, HydraFacial tretman posmatramo kao temelj kvalitetne nege i prirodnog podmlađivanja kože.",
    ],
    sections: [
      {
        id: "sta-je-hydrafacial-tretman",
        title: "Šta je HydraFacial tretman",
        paragraphs: [
          "HydraFacial tretman je profesionalni neinvazivni tretman lica koji pomoću napredne tehnologije i kontrolisanog vakuuma uklanja nečistoće, mrtve ćelije kože i višak sebuma, dok se koža istovremeno hrani aktivnim serumima za dubinsku hidrataciju.",
          "Za razliku od tradicionalnih tretmana čišćenja lica, HydraFacial tretman:",
        ],
        bullets: [
          "Ne iritira ni najosetljiviju kožu",
          "Ne izaziva bol niti neprijatne senzacije",
          "Ne zahteva oporavak – možete se odmah vratiti aktivnostima",
          "Pogodan je za sve tipove kože, uključujući osetljivu i zrelu kožu",
        ],
      },
      {
        id: "kako-izgleda-tretman-u-praksi",
        title: "Kako izgleda HydraFacial tretman u praksi",
        paragraphs: [
          "HydraFacial tretman u Odalis centru se sastoji iz nekoliko faza koje se prilagođavaju specifičnim potrebama kože svake klijentice:",
        ],
        bullets: [
          "Nežno čišćenje i eksfolijacija kože",
          "Uklanjanje nečistoća, sebuma i mrtvih ćelija",
          "Intenzivna hidratacija i umirivanje kože aktivnim serumima",
          "Finalna zaštita i regeneracija",
        ],
        callout: {
          text: "Sve faze HydraFacial tretmana se izvode prijatno i bez neprijatnih senzacija. Većina naših klijentica opisuje tretman kao opuštajući i umirujući, gotovo kao spa tretman za lice.",
        },
      },
      {
        id: "kome-je-hydrafacial-namenjen",
        title: "Kome je HydraFacial namenjen",
        paragraphs: [
          "HydraFacial tretman je pogodan za žene koje se suočavaju sa različitim problemima kože:",
        ],
        bullets: [
          "Umorna i dehidrirana koža kojoj nedostaje prirodan sjaj",
          "Koža bez sjaja i energije",
          "Fine linije i prvi znaci starenja kože",
          "Proširene pore i nečistoće",
          "Koža kojoj je potrebna regeneracija, ali bez agresivnih i invazivnih procedura",
        ],
        callout: {
          text: "HydraFacial tretman je posebno omiljen kod žena koje žele da počnu sa profesionalnom negom lica, ali traže nešto sigurno, prirodno i potpuno nenametljivo. To je idealan prvi korak u profesionalnoj nezi kože.",
        },
      },
      {
        id: "koji-su-benefiti-hydrafacial-tretmana",
        title: "Koji su benefiti HydraFacial tretmana",
        paragraphs: [
          "Nakon HydraFacial tretmana, vaša koža dobija nekoliko ključnih benefita koji su vidljivi odmah i dugotrajni:",
        ],
        bullets: [
          "Čista, osvežena i duboko hidrirana koža",
          "Ujednačeniji ten i struktura kože",
          "Zdrav i prirodan sjaj kože",
          "Mekša, elastičnija i glatka koža",
          "Osećaj \"resetovane\" i obnovljene kože",
        ],
        callout: {
          text: "Rezultati HydraFacial tretmana su vidljivi odmah nakon završetka tretmana, dok se kvalitet i zdravlje kože dodatno poboljšavaju redovnim dolascima. To je tretman koji gradi dugotrajne rezultate kroz konzistentnu negu.",
        },
      },
      {
        id: "hydrafacial-kao-prvi-korak-ka-podmladjivanju",
        title: "HydraFacial kao prvi korak ka podmlađivanju",
        paragraphs: [
          "U Odalis centru na Novom Beogradu, HydraFacial tretman često koristimo kao uvodni i temeljni tretman u profesionalnoj nezi lica. On omogućava da:",
        ],
        bullets: [
          "Upoznamo vašu kožu i njene specifične potrebe",
          "Procenimo trenutno stanje kože i preporučimo najbolji pristup",
          "Prirodno pređemo na tretmane za podmlađivanje lica, kao što su Indiba tretman, radiotalasni lifting i drugi neinvazivni tretmani, kada je to potrebno",
        ],
      },
      {
        id: "koliko-cesto-se-radi-hydrafacial",
        title: "Koliko često se radi HydraFacial",
        paragraphs: [
          "Učestalost HydraFacial tretmana zavisi od trenutnog stanja vaše kože i vaših ciljeva u nezi lica. Najčešće se preporučuje:",
        ],
        bullets: [
          "Kao povremeni \"reset\" kože – jednom mesečno ili svaka dva meseca",
          "Ili kao deo redovne rutine profesionalne nege – svake 3–4 nedelje",
        ],
        callout: { text: "Sve preporuke o učestalosti HydraFacial tretmana daju se individualno, tokom besplatnih konsultacija u Odalis centru na Novom Beogradu, na osnovu analize vaše kože i vaših potreba." },
      },
      {
        id: "da-li-je-tretman-bezbedan",
        title: "Da li je HydraFacial tretman bezbedan",
        paragraphs: [
          "HydraFacial tretman je u potpunosti bezbedan, neinvazivan i bezbolan tretman lica. Ne koristi agresivne hemikalije, laser ili invazivne metode.",
          "Nakon HydraFacial tretmana u Odalis centru, možete se odmah vratiti svakodnevnim aktivnostima, bez ikakvog perioda oporavka ili ograničenja. Vaša koža će izgledati osveženo i hidrirano, bez crvenila ili iritacija.",
        ],
      },
    ],
    finalCta:
      "Ako osećate da je vašoj koži potrebna pažnja, osveženje i profesionalna nega lica, zakažite besplatne konsultacije u Odalis centru na Novom Beogradu. Tokom konsultacija ćemo zajedno saznati da li je HydraFacial tretman pravi prvi korak za vašu kožu, bez ikakvog pritiska ili obaveze.",
  },
};

