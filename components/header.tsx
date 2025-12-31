import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 md:h-24 flex items-center justify-center bg-white/5 backdrop-blur-xl border-b border-white/10 rounded-b-3xl shadow-sm">
      {/* Subtle top-to-bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-b-3xl pointer-events-none" />
      
      {/* Light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-b-3xl pointer-events-none opacity-50" />
      
      {/* Logo container */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="relative h-12 md:h-16 w-auto">
          <Image
            src="/odalis.png"
            alt="Odalis"
            width={200}
            height={80}
            className="object-contain h-full w-auto"
            priority
            quality={100}
          />
        </div>
      </div>
    </header>
  );
}

