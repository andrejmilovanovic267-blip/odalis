import { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx("py-20 md:py-32 relative z-10", className)}
    >
      {children}
    </section>
  );
}

