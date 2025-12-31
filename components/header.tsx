import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[1000] h-20 md:h-24 flex items-center justify-center bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">
      {/* Subtle top-to-bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />
      
      {/* Light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-50" />
      
      {/* Logo container */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 max-w-full overflow-hidden">
        <div className="relative h-12 md:h-16 w-auto max-w-[90vw]">
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

