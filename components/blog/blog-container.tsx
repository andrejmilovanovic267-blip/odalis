import { ReactNode } from "react";

interface BlogContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standard blog content container
 * - max-width: 920px (max-w-[920px])
 * - w-full
 * - padding: px-4 sm:px-6 lg:px-8
 * - centering: mx-auto
 */
export function BlogContainer({ children, className = "" }: BlogContainerProps) {
  return (
    <div className={`max-w-[920px] w-full mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
