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
    <ul className={clsx("space-y-4", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-4 text-text-secondary text-lg md:text-xl leading-relaxed"
        >
          <span className="text-text-primary text-xl flex-shrink-0 mt-1">✓</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

