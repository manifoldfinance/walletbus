
   
export const DEFAULT_BROWSER_URL = "http://localhost:3000";
export const DEFAULT_TTL = 86400000; // one day

export function extractHostname(url: string): string {
  // find & remove protocol
  let hostname = url.indexOf("//") > -1 ? url.split("/")[2] : url.split("/")[0];
  // find & remove port number
  hostname = hostname.split(":")[0];
  // find & remove query string
  hostname = hostname.split("?")[0];
  return hostname;
}

export function getBrowserUrl() {
  return typeof window === "undefined" || typeof window.location === "undefined"
    ? DEFAULT_BROWSER_URL
    : window.location.href;
}

export function listObject(obj: any) {
  return Object.keys(obj).map((key) => {
    return `${key}: ${obj[key]}`;
  });
}

export function formatAuthMessage(
  address: string,
  chainId: number,
  ttl = DEFAULT_TTL
) {
  const url = getBrowserUrl();

  const now = Date.now();
  const exp = now + ttl;
  const domain = extractHostname(url);

  const params = {
    URI: url,
    Version: 1,
    Nonce: now,
    "Issued At": new Date(now).toISOString(),
    "Expiration Time": new Date(exp).toISOString(),
    "Chain ID": chainId,
  };

  const lines = [
    `${domain} wants you to sign in with your Ethereum account:`,
    address,
    "",
    ...listObject(params),
  ];

  const message = lines.join("\n");

  return message;
}