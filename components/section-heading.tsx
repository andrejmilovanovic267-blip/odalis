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
        "font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight",
        className
      )}
    >
      {children}
    </Component>
  );
}

