import tlds from "tlds";

/**
 * Structure check (Colin’s reasonable email regex), plus IANA TLD allow-list
 * @see https://colinhacks.com/essays/reasonable-email-regex
 */
const EMAIL_PATTERN =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const IANA_TLDS = new Set(tlds.map((tld) => tld.toLowerCase()));

export function isValidEmail(value: string) {
  const email = value.trim();
  if (!email || !EMAIL_PATTERN.test(email)) return false;

  const domain = email.slice(email.lastIndexOf("@") + 1);
  const tld = domain.slice(domain.lastIndexOf(".") + 1).toLowerCase();
  return IANA_TLDS.has(tld);
}
