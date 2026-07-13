import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GitHubIcon, HuggingFaceIcon, LinkedInIcon } from "./icons";
import { siteConfig } from "@/lib/site";
import { SidebarNav } from "./SidebarNav";



const socialItems: Array<{
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { label: "GitHub", href: siteConfig.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, Icon: LinkedInIcon },
  { label: "Hugging Face", href: siteConfig.huggingFace, Icon: HuggingFaceIcon },
  { label: "Email", href: "mailto:tmabandl@andrew.cmu.edu", Icon: Mail },
];

export function SidebarIntro() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-16">
      <div>
        <Link className="group mb-8 block w-fit" href="/" aria-label="Thabolezwe Mabandla home">
          <Image
            className="h-28 w-28 rounded-full border-2 border-slate-700 object-cover shadow-2xl shadow-slate-950/40 transition group-hover:border-teal-300/60 sm:h-32 sm:w-32"
            src="/images/profile/thabolezwe-mabandla.jpg"
            alt="Thabolezwe Mabandla"
            width={160}
            height={160}
            priority
          />
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <Link href="/">Thabolezwe Mabandla</Link>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          AI Engineer
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-slate-400">
          I build applied AI systems for language technology, robotics, and intelligent infrastructure.
        </p>
        <SidebarNav />
      </div>
      <ul className="ml-1 mt-8 flex items-center gap-5 text-slate-400" aria-label="Profile links">
        {socialItems.map(({ label, href, Icon }) => (
          <li key={label} className="shrink-0">
            <a
              className="block transition hover:text-slate-200 focus-visible:text-slate-200"
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={href.startsWith("mailto:") ? label : `${label} (opens in a new tab)`}
              title={label}
            >
              <Icon className="h-6 w-6" />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
