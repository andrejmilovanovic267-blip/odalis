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
        "rounded-2xl bg-white/3 backdrop-blur-md border border-white/6 p-8 shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}

