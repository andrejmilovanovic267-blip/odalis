import { CheckCircle2, Circle, Minus } from "lucide-react";
import { ReactNode } from "react";

type ListType = "benefits" | "process" | "neutral";

interface BlogListProps {
  type: ListType;
  children: ReactNode;
  className?: string;
}

// Helper function to determine list type from section ID or title
export function getListType(sectionId: string, sectionTitle: string): ListType {
  const id = sectionId.toLowerCase();
  const title = sectionTitle.toLowerCase();

  // Benefits / Results
  if (
    id.includes("benefit") ||
    id.includes("rezultat") ||
    title.includes("benefit") ||
    title.includes("rezultat") ||
    title.includes("koji su")
  ) {
    return "benefits";
  }

  // Process / Steps
  if (
    id.includes("kako") ||
    id.includes("proces") ||
    id.includes("korak") ||
    id.includes("faza") ||
    title.includes("kako") ||
    title.includes("proces") ||
    title.includes("korak") ||
    title.includes("faza")
  ) {
    return "process";
  }

  // Default: Neutral
  return "neutral";
}

export function BlogList({ type, children, className }: BlogListProps) {
  return (
    <ul className={className}>
      {children}
    </ul>
  );
}

interface BlogListItemProps {
  type: ListType;
  index?: number;
  children: ReactNode;
}

export function BlogListItem({ type, index, children }: BlogListItemProps) {
  const renderMarker = () => {
    switch (type) {
      case "benefits":
        // Gold check (subtle)
        return (
          <div className="mt-1 flex-shrink-0">
            <CheckCircle2 className="w-3 h-3 text-[#C9A24D]/70" strokeWidth={2} aria-hidden="true" />
          </div>
        );

      case "process":
        // Numbered dot or small gold circle
        return (
          <div className="mt-1 flex-shrink-0">
            {index !== undefined ? (
              <div className="w-5 h-5 rounded-full border border-[#C9A24D]/50 flex items-center justify-center bg-[#C9A24D]/5">
                <span className="text-[#C9A24D]/80 text-xs font-medium">{index + 1}</span>
              </div>
            ) : (
              <Circle className="w-2.5 h-2.5 fill-[#C9A24D]/40 text-[#C9A24D]/60" strokeWidth={1.5} aria-hidden="true" />
            )}
          </div>
        );

      case "neutral":
      default:
        // Minimalist dash
        return (
          <div className="mt-1.5 flex-shrink-0">
            <Minus className="w-4 h-4 text-[#C9A24D]/50" strokeWidth={2.5} aria-hidden="true" />
          </div>
        );
    }
  };

  return (
    <li className="flex items-start gap-4">
      {renderMarker()}
      <span className="flex-1">{children}</span>
    </li>
  );
}
