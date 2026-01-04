"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { scrollToSection } from "@/lib/scroll-utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-light transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A24D]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "px-6 py-2.5 text-sm text-[#C9A24D] border border-[#C9A24D] bg-transparent hover:bg-[#C9A24D] hover:text-[#0B1F33] whitespace-nowrap",
        ghost:
          "px-6 py-2.5 text-sm text-[#C9A24D] border border-[#C9A24D] bg-transparent hover:bg-[#C9A24D] hover:text-[#0B1F33] whitespace-nowrap",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: never;
  children: React.ReactNode;
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, href, ...props }, ref) => {
  const classes = clsx(buttonVariants({ variant }), className);

  if (href) {
    const isAnchor = href.startsWith('#');
    if (isAnchor) {
      return (
        <a
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(href, { behavior: 'smooth', block: 'start' });
          }}
          aria-label={props['aria-label'] || `Scroll to ${href.slice(1)}`}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };

