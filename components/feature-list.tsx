import { clsx } from "clsx";

interface FeatureItem {
  text: string;
}

interface FeatureListProps {
  items: FeatureItem[];
  className?: string;
}

export function FeatureList({ items, className }: FeatureListProps) {
  return (
    <ul className={clsx("space-y-6", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-4 sm:gap-5 text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words"
        >
          <span className="text-text-primary/70 text-xl flex-shrink-0 mt-1.5 font-medium">✓</span>
          <span className="min-w-0">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

