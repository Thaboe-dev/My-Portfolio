import { PortfolioSections } from "@/components/PortfolioSections";
import { SidebarIntro } from "@/components/SidebarIntro";
import { Spotlight } from "@/components/Spotlight";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-400 selection:bg-teal-300 selection:text-teal-900">
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





