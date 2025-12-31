export function StructuredData() {
  // Combined BeautySalon + LocalBusiness schema (BeautySalon extends LocalBusiness)
  const beautySalonSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Odalis",
    "description": "Center for non-invasive facial and body rejuvenation",
    "url": "https://odalis.rs",
    "email": "andrejmilovanovic267@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RS"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Serbia"
    },
    "sameAs": [
      "https://www.instagram.com/odalis_nbg",
      "https://www.facebook.com/odalis_nbg"
    ],
    "image": "https://odalis.rs/odalis.png"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Koliko traje jedan tretman za podmlađivanje lica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trajanje tretmana zavisi od vrste tretmana i vaših individualnih potreba. Većina neinvazivnih tretmana traje između 40 i 60 minuta. Prilikom besplatne konsultacije u Odalis centru, detaljno ćemo razgovarati o trajanju i očekivanim rezultatima svakog tretmana, tako da možete da planirate svoj poset."
        }
      },
      {
        "@type": "Question",
        "name": "Da li tretmani za podmlađivanje kože zahtevaju oporavak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ne. Naši neinvazivni tretmani za podmlađivanje lica i tela ne zahtevaju period oporavka. Možete se odmah vratiti svom normalnom životu. Ako postoji bilo kakav blagi crvenilo ili osetljivost, to je privremeno i nestaje u roku od nekoliko sati. Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost i komfor."
        }
      },
      {
        "@type": "Question",
        "name": "Da li su tretmani u Odalis centru neinvazivni i bezbedni?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da. Odalis centar koristi isključivo neinvazivne i bezbedne tretmane. Ne koristimo agresivne metode, hirurške intervencije ili bilo šta što bi moglo da ošteti vašu prirodnu strukturu kože. Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost. Svaki tretman je pažljivo osmišljen da poštuje vašu prirodnu lepotu."
        }
      },
      {
        "@type": "Question",
        "name": "Koliko tretmana je potrebno za vidljive rezultate podmlađivanja?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Broj tretmana zavisi od stanja kože, vaših želja i ciljeva. Tokom besplatne konsultacije, zajedno ćemo razgovarati o vašim očekivanjima i kreirati individualni plan koji odgovara vašim potrebama. Neki klijenti vide rezultate već posle prvog tretmana, dok drugi preferiraju seriju tretmana za optimalne rezultate."
        }
      },
      {
        "@type": "Question",
        "name": "Da li će tretmani promeniti moj prirodni izgled?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ne. Cilj naših tretmana za podmlađivanje nije da promenimo vaš izgled, već da istaknemo vašu prirodnu lepotu. Koristimo metode koje podstiču prirodno podmlađivanje kože, poboljšavaju tonus i elastičnost, ali ne menjaju vaše prirodne karakteristike. Rezultati su prirodni i diskretni."
        }
      },
      {
        "@type": "Question",
        "name": "Kolika je cena tretmana za podmlađivanje?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cena tretmana zavisi od individualnog plana koji kreiramo za vas. Pošto svaki pristup podmlađivanju je personalizovan, cene se razlikuju. Najbolji način da saznate tačnu cenu je da zakažete besplatnu konsultaciju. Tokom konsultacije, detaljno ćemo razgovarati o vašim ciljevima i definisati plan koji odgovara vašim potrebama i budžetu."
        }
      },
      {
        "@type": "Question",
        "name": "Mogu li kombinovati različite tretmane za podmlađivanje?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da. Mnogi naši klijenti kombinuju različite tretmane za optimalne rezultate. Tokom besplatne konsultacije, lično ćemo razgovarati sa vama o vašim željama i kreirati kombinovani plan koji odgovara vašim ciljevima. Možemo da planiramo tretmane za podmlađivanje lica i tela u skladu sa vašim potrebama i rasporedom."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(beautySalonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
