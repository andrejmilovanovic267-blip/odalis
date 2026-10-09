"use client";

import { useEffect, useRef, useState } from "react";

export function AdaptiveProductDescription({
  question,
  description,
  disableTruncation = false,
}: {
  question?: string;
  description: string;
  disableTruncation?: boolean;
}) {
  const availableSpaceRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState<number>();

  useEffect(() => {
    const availableSpace = availableSpaceRef.current;
    if (!availableSpace) return;
    const desktopQuery = window.matchMedia("(min-width: 1536px)");
    const card = availableSpace.closest<HTMLElement>("[data-pdp-card]");
    const info = card?.querySelector<HTMLElement>("[data-pdp-info]");
    const purchase = card?.querySelector<HTMLElement>("[data-pdp-purchase]");
    const header = info?.querySelector<HTMLElement>("[data-pdp-info-header]");
    const divider = info?.querySelector<HTMLElement>(
      "[data-pdp-info-divider]",
    );
    const metadata = info?.querySelector<HTMLElement>(
      "[data-pdp-info-metadata]",
    );
    const questionElement = availableSpace.querySelector<HTMLElement>(
      "[data-pdp-question]",
    );

    if (!card || !info || !purchase || !header || !divider || !metadata) return;

    const updateLineCount = () => {
      if (card.hasAttribute("data-pdp-card-flexible")) {
        setLineCount(undefined);
        return;
      }

      if (!desktopQuery.matches) {
        setLineCount(undefined);
        return;
      }

      const cardStyle = getComputedStyle(card);
      const lineHeight = Number.parseFloat(
        getComputedStyle(availableSpace).lineHeight,
      );
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) return;

      const fixedInfoHeight =
        header.offsetHeight +
        divider.offsetHeight +
        metadata.offsetHeight +
        (questionElement?.offsetHeight ?? 0);
      const internalMargins =
        Number.parseFloat(getComputedStyle(availableSpace).marginTop) +
        Number.parseFloat(getComputedStyle(questionElement ?? availableSpace).marginBottom) +
        Number.parseFloat(getComputedStyle(divider).marginTop) +
        Number.parseFloat(getComputedStyle(metadata).marginTop);
      const groupGap = Number.parseFloat(cardStyle.rowGap) || 0;
      const availableHeight =
        card.clientHeight -
        Number.parseFloat(cardStyle.paddingTop) -
        Number.parseFloat(cardStyle.paddingBottom) -
        purchase.offsetHeight -
        fixedInfoHeight -
        internalMargins -
        groupGap;
      const nextLineCount = Math.max(1, Math.floor(availableHeight / lineHeight));

      setLineCount((current) =>
        current === nextLineCount ? current : nextLineCount,
      );
    };

    const observer = new ResizeObserver(updateLineCount);
    observer.observe(card);
    observer.observe(purchase);
    observer.observe(info);
    desktopQuery.addEventListener("change", updateLineCount);
    updateLineCount();

    return () => {
      observer.disconnect();
      desktopQuery.removeEventListener("change", updateLineCount);
    };
  }, [description, question]);

  return (
    <div
      ref={availableSpaceRef}
      className="mt-4 text-base leading-relaxed text-text-secondary"
    >
      {question && (
        <div data-pdp-question className="mb-4">
          {question}
        </div>
      )}
      <div
        className={
          disableTruncation
            ? ""
            : "2xl:[display:-webkit-box] 2xl:[-webkit-box-orient:vertical] 2xl:overflow-hidden"
        }
        style={
          lineCount
            ? { WebkitLineClamp: lineCount }
            : undefined
        }
      >
        {description}
      </div>
    </div>
  );
}
