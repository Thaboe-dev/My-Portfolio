import { PortfolioSections } from "@/components/PortfolioSections";
import { SidebarIntro } from "@/components/SidebarIntro";
import { Spotlight } from "@/components/Spotlight";
import { absoluteUrl, siteConfig } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  alternateName: "Thabolezwe Gavin Mabandla",
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.image),
  email: `mailto:${siteConfig.email}`,
  jobTitle: "AI Engineer",
  description: siteConfig.description,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Zimbabwe",
      url: "https://www.uz.ac.zw/",
    },
  ],
  affiliation: [
    {
      "@type": "CollegeOrUniversity",
      name: "Carnegie Mellon University Africa",
      url: "https://www.africa.engineering.cmu.edu/",
    },
  ],
  knowsAbout: [
    "Applied AI",
    "Machine Learning",
    "Natural Language Processing",
    "Robotics",
    "Reinforcement Learning",
    "Large Language Models",
    "African language technology",
    "Embedded systems",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.huggingFace],
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-400 selection:bg-teal-300 selection:text-teal-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Spotlight />
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-teal-300 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950" href="#content">
        Skip to content
      </a>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:flex lg:justify-between lg:gap-16 lg:px-24 lg:py-0">
        <SidebarIntro />
        <PortfolioSections />
      </div>
    </div>
  );
}
