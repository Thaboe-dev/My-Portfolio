"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Publications", href: "#publications", id: "publications" },
];

export function SidebarNav() {
  const activeSection = useActiveSection();

  return (
    <nav className="nav hidden lg:mt-16 lg:block" aria-label="In-page navigation">
      <ul className="w-max">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.href}>
              <a className="group flex items-center py-3" href={item.href}>
                <span
                  className={`mr-4 h-px transition-all ${
                    isActive
                      ? "w-16 bg-slate-200"
                      : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200"
                  }`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? "text-slate-200"
                      : "text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
