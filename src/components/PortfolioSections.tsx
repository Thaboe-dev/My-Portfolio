import { ExternalLinkIcon } from "./icons";

type TimelineItem = {
  date: string;
  title: string;
  organization: string;
  href?: string;
  description: string;
  details?: string[];
  tags?: string[];
};

type Project = {
  date: string;
  title: string;
  description: string;
  tags: string[];
};

const education: TimelineItem[] = [
  {
    date: "Aug 2025 - May 2027",
    title: "Master of Science in Engineering Artificial Intelligence",
    organization: "Carnegie Mellon University Africa",
    href: "https://www.africa.engineering.cmu.edu/",
    description: "Graduate program focused on Applied AI, with growing specialization in embedded systems, robotics, and intelligent autonomous systems.",
    details: ["Concentration: Applied AI"],
    tags: ["Applied AI", "Robotics", "Embedded Systems"],
  },
  {
    date: "Aug 2020 - Jun 2024",
    title: "BSc Honours in Artificial Intelligence & Machine Learning",
    organization: "University of Zimbabwe",
    href: "https://www.uz.ac.zw/",
    description: "Completed undergraduate research on low-resource NLP for Zimbabwean languages, including a Shona spell checker for language digitization and preservation.",
    details: [
      "Concentration: Natural Language Processing",
      "Thesis: Digitization of Indigenous Zimbabwean Languages: A Shona Spell Checker",
      "Graduated with First Class Honors",
      "Awarded the University of Zimbabwe Book Prize",
      "Awarded Best Undergraduate Researcher and Innovator in the Faculty of Computer Engineering",
    ],
    tags: ["NLP", "Machine Learning", "Low-resource Languages"],
  },
];

const experiences: TimelineItem[] = [
  {
    date: "Jun - Aug 2026",
    title: "Graduate Research Assistant",
    organization: "CMU-Africa",
    href: "https://www.africa.engineering.cmu.edu/",
    description: "Conducting research on adversarial reinforcement learning and robotics with Professor Jesse Thornburg, focusing on robust learning methods for embodied intelligent systems.",
    tags: ["Adversarial RL", "Robotics", "Reinforcement Learning", "Research"],
  },
  {
    date: "Mar - Aug 2025",
    title: "Backend Developer / Machine Learning Engineer",
    organization: "CyberAlliance",
    description: "Contributed to SallyAI, a threat intelligence platform delivering real-time cybersecurity insights through LLM and code agents. Engineered distributed data pipelines and deployed retrieval and threat-intelligence infrastructure for enterprise security workflows.",
    details: [
      "Built pipelines with Apache Airflow, Kafka, Redis, and Postgres.",
      "Fine-tuned LLMs with HuggingFace Transformers, BitsandBytes, MLflow, and AWS.",
      "Implemented RAG with Weaviate, Elastic Stack, and Sentence Transformers.",
      "Integrated CTI sources including NVD NIST, Abuse.ch, AlienVault OTX, and MITRE.org.",
    ],
    tags: ["Python", "LLMs", "Airflow", "Kafka", "Redis", "Postgres", "Weaviate", "AWS"],
  },
  {
    date: "Oct 2024 - Mar 2025",
    title: "AI Software Developer",
    organization: "Rubiem Innovations",
    description: "Led development of local LLM applications and enterprise AI prototypes, including an agent for Zimpapers that helped journalists retrieve internal knowledge and search the web during article writing.",
    details: [
      "Designed LLM applications for customer support and content generation.",
      "Supported AI strategy work for banks and telecom clients.",
      "Translated technical concepts into client-facing recommendations and training.",
    ],
    tags: ["LLM Agents", "RAG", "Google Search", "Client Delivery", "AI Strategy"],
  },
  {
    date: "Jan - Jun 2024",
    title: "Research Scientist",
    organization: "Zimbabwe Centre for High Performance Computing",
    description: "Conducted NLP research for indigenous Zimbabwean language technology and developed a novel Shona spelling correction model on high-performance computing infrastructure.",
    tags: ["NLP", "HPC", "Shona", "Language Technology", "Model Training"],
  },
  {
    date: "Sep 2022 - Aug 2023",
    title: "IT Operations Intern",
    organization: "Old Mutual & CABS",
    description: "Supported infrastructure operations for financial systems by monitoring uptime, improving deployments, maintaining documentation, and executing system maintenance and compliance checks.",
    tags: ["IT Operations", "Infrastructure", "Documentation", "Security Compliance"],
  },
];

const projects: Project[] = [
  {
    date: "Aug 2023 - Jun 2024",
    title: "LLM for Shona Spelling Correction",
    description: "Developed the first LLM-based spell checker for Shona, supporting language digitization and preservation for one of Zimbabwe's major native languages. Built and fine-tuned models on HPC clusters as part of undergraduate research.",
    tags: ["LLMs", "Shona", "NLP", "HPC", "Research"],
  },
  {
    date: "Oct - Dec 2024",
    title: "LLM Agent Prototype for Zimpapers",
    description: "Designed a local LLM-powered agent for journalists that retrieved from internal archives and integrated real-time Google Search, improving contextual research workflows for Zimbabwe's largest media house.",
    tags: ["LLM Agents", "RAG", "Search", "Local AI", "Prototyping"],
  },
  {
    date: "Jul 2024",
    title: "IoT + AI for Power Infrastructure Security",
    description: "Collaborated with Team BitLords to win the 2024 TEXPO Hackathon. Designed an IoT system for ZESA to detect transformer oil and copper cable theft in real time and analyze sensor data for predictive incident detection.",
    tags: ["IoT", "AI", "Sensor Analytics", "Predictive Modeling", "Hackathon Winner"],
  },
];

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-auto lg:bg-transparent lg:p-0 lg:opacity-0">
      <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-200">{children}</h2>
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Tags({ tags = [] }: { tags?: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies and topics">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
      {children}
    </div>
  );
}

function TimelineCard({ item }: { item: TimelineItem }) {
  const heading = (
    <span>
      {item.title} <span className="text-slate-500">-</span> {item.organization}
    </span>
  );

  return (
    <li className="mb-12">
      <CardShell>
        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
          {item.date}
        </header>
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-slate-200">
            {item.href ? (
              <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link" href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.title} at ${item.organization} (opens in a new tab)`}>
                {heading}
                <ExternalLinkIcon className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
              </a>
            ) : heading}
          </h3>
          <p className="mt-2 text-sm leading-normal">{item.description}</p>
          {item.details ? (
            <ul className="mt-3 space-y-1 text-sm leading-normal text-slate-400">
              {item.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          ) : null}
          <Tags tags={item.tags} />
        </div>
      </CardShell>
    </li>
  );
}

function ProjectCard({ item }: { item: Project }) {
  return (
    <li className="mb-12">
      <CardShell>
        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
          {item.date}
        </header>
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-slate-200">{item.title}</h3>
          <p className="mt-2 text-sm leading-normal">{item.description}</p>
          <Tags tags={item.tags} />
        </div>
      </CardShell>
    </li>
  );
}

export function PortfolioSections() {
  return (
    <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
      <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
        <SectionHeading>About</SectionHeading>
        <div className="space-y-4 leading-relaxed">
          <p>
            I&apos;m Thabolezwe Mabandla, a graduate student in Engineering Artificial Intelligence at <InlineLink href="https://www.africa.engineering.cmu.edu/">Carnegie Mellon University Africa</InlineLink>. My work sits at the intersection of applied AI, software engineering, robotics, and language technology.
          </p>
          <p>
            I have built production-grade data pipelines, RAG systems, and LLM-powered applications for cybersecurity, media, and enterprise AI use cases. I&apos;m especially interested in systems that combine robust machine learning infrastructure with real-world deployment constraints.
          </p>
          <p>
            My current research direction focuses on adversarial reinforcement learning and robotics, while my broader interests include world models, computer vision, vision-language models, drone technologies, and African language technologies.
          </p>
        </div>
      </section>

      <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Education">
        <SectionHeading>Education</SectionHeading>
        <ol className="group/list">{education.map((item) => <TimelineCard key={`${item.date}-${item.organization}`} item={item} />)}</ol>
      </section>

      <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
        <SectionHeading>Experience</SectionHeading>
        <ol className="group/list">{experiences.map((item) => <TimelineCard key={`${item.date}-${item.organization}`} item={item} />)}</ol>
        <a className="inline-flex items-center font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link" href="https://drive.google.com/file/d/1RYGtRd5oEPsq4Vflff3rXyyqTqhVWUTW/view?usp=sharing" target="_blank" rel="noreferrer">
          <span>View Full R&eacute;sum&eacute;</span>
          <ExternalLinkIcon className="ml-1 h-4 w-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
        </a>
      </section>

      <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Selected projects">
        <SectionHeading>Projects</SectionHeading>
        <ul className="group/list">{projects.map((item) => <ProjectCard key={item.title} item={item} />)}</ul>
      </section>

      <section id="publications" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Publications">
        <SectionHeading>Publications</SectionHeading>
        <div className="rounded-md border border-slate-800/80 bg-slate-800/20 p-5 text-sm leading-normal text-slate-400">
          <h3 className="font-medium text-slate-200">Publications coming soon</h3>
          <p className="mt-2">
            Papers, research reports, and preprints will be added here as they become available.
          </p>
        </div>
      </section>
    </main>
  );
}







