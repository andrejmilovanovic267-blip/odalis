export function Footer() {
  return (
    <footer className="bg-navy-950/80 py-20 mt-32 relative z-10 border-t border-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center text-text-muted text-base font-light">
          <p>© {new Date().getFullYear()} Odalis. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}

