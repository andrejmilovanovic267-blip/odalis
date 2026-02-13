"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BlogBackButton() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Try to go back in history
    try {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/blog");
      }
    } catch {
      router.push("/blog");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-white/90 hover:text-[#C9A24D] transition-colors duration-200 hover:-translate-x-1 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-sm"
      aria-label="Nazad na blog"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      <span className="text-sm font-medium">Nazad</span>
    </button>
  );
}
