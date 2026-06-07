/**
 * Utility to extract subdomain/slug from the current hostname,
 * supporting production custom domains + local/preview simulation.
 */
export function getSubdomain(): string | null {
  if (typeof window === "undefined") return null;

  const host = window.location.hostname.toLowerCase();

  // Exclude local IP and common non-subdomain hostnames
  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
    return null;
  }

  const parts = host.split(".");
  const systemSubdomains = ["www", "api", "admin", "app", "mail", "dev", "pre", "dashboard"];

  // Check if we are in the Europe-West (Cloud Run) preview domain
  // e.g. ais-pre-e5c7xgl5vohy4nqqn2ckvp-283796243588.europe-west2.run.app
  if (host.includes(".run.app") || host.includes("web.app") || host.includes("firebaseapp.com")) {
    return null;
  }

  // Handle standard subdomains (e.g., mybusiness.referr.me)
  if (parts.length > 2) {
    const sub = parts[0];
    if (!systemSubdomains.includes(sub)) {
      return sub;
    }
  } else if (parts.length === 2 && parts[1] === "localhost") {
    // E.g. mybusiness.localhost
    const sub = parts[0];
    if (!systemSubdomains.includes(sub)) {
      return sub;
    }
  }

  return null;
}

/**
 * Checks if the current request is rendered directly under a custom subdomain
 */
export function isSubdomainRequest(): boolean {
  return getSubdomain() !== null;
}

/**
 * Returns the beautiful visual subdomain address for a given business
 */
export function getBusinessSubdomainUrl(siteName?: string): string {
  const slug = (siteName || localStorage.getItem("businessName") || "mybusiness")
    .toLowerCase()
    .replace(/\s+/g, "");
  return `${slug}.referr.me`;
}
