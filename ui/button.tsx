"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { scrollToSection } from "@/lib/scroll-utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-white/10 text-white hover:bg-white/15 focus:ring-white/30 shadow-refined hover:shadow-soft backdrop-blur-sm px-10 py-5 text-lg font-medium transition-all duration-250 ease-out hover:scale-[1.02]",
        ghost:
          "bg-transparent text-text-primary border-2 border-white/20 hover:border-white/30 hover:bg-white/5 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-250 ease-out",
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

