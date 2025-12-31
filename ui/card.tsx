import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl glass-premium p-6 sm:p-8 md:p-10 shadow-refined",
        "hover:shadow-soft transition-all duration-250 ease-out",
        "hover:border-white/[0.08] hover:bg-navy-800/20",
        "overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

