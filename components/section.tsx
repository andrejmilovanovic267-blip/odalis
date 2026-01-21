import { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  noOverlay?: boolean;
}

export function Section({ children, className, id, noOverlay }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "py-24 md:py-40 relative z-10",
        !noOverlay && "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-navy-950/10 before:to-transparent before:pointer-events-none",
        className
      )}
    >
      {children}
    </section>
  );
}

