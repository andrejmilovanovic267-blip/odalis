import { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export function SectionHeading({
  children,
  className,
  as: Component = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <Component
      id={id}
      className={clsx(
        "font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.15] tracking-tight mb-6",
        "relative break-words overflow-wrap-anywhere",
        className
      )}
    >
      {/* Subtle radial gradient behind heading text */}
      <span className="absolute -inset-4 rounded-full blur-2xl opacity-40 -z-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(26, 47, 71, 0.2) 0%, transparent 70%)' }} />
      {children}
    </Component>
  );
}

