export const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com",
  },
] as const;

export type SocialLinkId = (typeof socialLinks)[number]["id"];
