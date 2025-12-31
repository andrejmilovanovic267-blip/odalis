export function Footer() {
  return (
    <footer className="bg-navy-950 py-16 mt-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center text-text-muted text-sm">
          <p>© {new Date().getFullYear()} Odalis. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}

