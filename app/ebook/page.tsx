import type { Metadata } from "next";
import { EbookDownloadClient } from "./download-client";

export const metadata: Metadata = {
  title: "Preuzimanje besplatnog eBook-a",
  description: "Preuzmite svoj besplatni Odalis eBook.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function EbookDownloadPage() {
  return <EbookDownloadClient />;
}
