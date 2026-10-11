"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DownloadState = "loading" | "ready" | "downloading" | "complete" | "error";

export function EbookDownloadClient() {
  const tokenRef = useRef<string | null>(null);
  const startedRef = useRef(false);
  const [state, setState] = useState<DownloadState>("loading");

  const download = useCallback(async () => {
    const token = tokenRef.current;
    if (!token) {
      setState("error");
      return;
    }

    setState("downloading");
    try {
      const response = await fetch("/api/ebook/download", {
        method: "POST",
        cache: "no-store",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        referrerPolicy: "no-referrer",
      });
      if (!response.ok) throw new Error("ebook_download_failed");

      const pdf = await response.blob();
      const objectUrl = URL.createObjectURL(pdf);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = "bore-pod-kontrolom.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      tokenRef.current = null;
      setState("complete");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get("token");
    window.history.replaceState(null, "", window.location.pathname);
    tokenRef.current = token;
    if (!token) {
      setState("error");
      return;
    }
    void download();
  }, [download]);

  const message =
    state === "loading" || state === "downloading"
      ? "Pripremamo vaš eBook za preuzimanje…"
      : state === "complete"
        ? "Preuzimanje eBook-a je pokrenuto."
        : state === "error"
          ? "Link nije važeći ili preuzimanje trenutno nije dostupno."
          : "Vaš eBook je spreman.";

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-3xl items-center px-5 py-16">
      <section className="w-full rounded-xl border border-[#e7dfce] border-l-4 border-l-[#c9a14a] bg-[#fbfaf7] p-8 text-center shadow-sm sm:p-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7426]">
          Poklon od Odalis-a
        </p>
        <h1 className="font-heading text-3xl text-[#0b1f3a]">
          Bore pod kontrolom
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#53616e]" aria-live="polite">
          {message}
        </p>
        {state === "error" && tokenRef.current && (
          <button
            type="button"
            onClick={() => void download()}
            className="mt-7 rounded-md border border-[#c9a14a] bg-[#0b1f3a] px-6 py-3 text-sm font-semibold text-[#f4d78e] transition hover:bg-[#172f4b]"
          >
            Pokušajte ponovo
          </button>
        )}
      </section>
    </main>
  );
}
