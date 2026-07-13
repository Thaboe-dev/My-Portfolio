const defaultSiteUrl = "https://thabomabandla.me";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

export const siteConfig = {
  name: "Thabolezwe Mabandla",
  title: "Thabolezwe Mabandla | AI Engineer",
  description:
    "Thabolezwe Mabandla is an AI engineer and Engineering Artificial Intelligence graduate student at Carnegie Mellon University Africa, working across applied AI, robotics, NLP, and language technology.",
  url: configuredSiteUrl.replace(/\/$/, ""),
  image: "/images/profile/thabolezwe-mabandla.jpg",
  email: "tmabandl@andrew.cmu.edu",
  github: "https://github.com/Thaboe-dev",
  linkedin: "https://www.linkedin.com/in/thabolezwe-mabandla-81a62a22b",
  huggingFace: "https://huggingface.co/thaboe01",
  affiliations: [
    "Carnegie Mellon University Africa",
    "University of Zimbabwe",
  ],
  keywords: [
    "Thabolezwe Mabandla",
    "Thabolezwe Gavin Mabandla",
    "AI Engineer",
    "Engineering Artificial Intelligence",
    "Carnegie Mellon University Africa",
    "CMU-Africa",
    "Applied AI",
    "Robotics",
    "Natural Language Processing",
    "Machine Learning",
    "Shona spell checker",
    "African language technology",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
