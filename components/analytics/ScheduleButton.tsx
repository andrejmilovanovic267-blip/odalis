"use client";

import { Button } from "@/ui/button";
import { track } from "@/lib/fbpixel";
import type { ComponentProps } from "react";

/**
 * Button component that tracks Schedule event on click
 * Wraps the base Button component with tracking
 */
export function ScheduleButton({ onClick, ...props }: ComponentProps<typeof Button>) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>) => {
    track("Schedule");
    if (onClick) {
      onClick(e as any);
    }
  };

  return <Button {...props} onClick={handleClick} />;
}
