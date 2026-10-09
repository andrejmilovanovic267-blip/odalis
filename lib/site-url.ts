const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://odalis.rs";
const parsedSiteUrl = new URL(configuredSiteUrl);

if (parsedSiteUrl.origin !== "https://odalis.rs") {
  throw new Error("NEXT_PUBLIC_SITE_URL must use https://odalis.rs");
}

export const siteUrl = parsedSiteUrl.origin;

export function getCanonicalUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
