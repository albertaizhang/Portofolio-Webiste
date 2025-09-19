// app/PortfolioSite.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ====== YOUR DATA ======
const PROFILE = {
  name: "Albert Zhang",
  title: "Software Engineer II",
  location: "Salt Lake City, UT",
  summary:
    "Software Engineer II with a track record of shipping high-scale backend systems powering millions of users. Comfortable across microservices, APIs, and event-streaming platforms (GraphQL, Kafka, AWS)"
    + "I thrive in fast-moving teams, balancing technical depth with collaboration such as mentoring peers, writing clear documentation, and delivering features that directly drive business impact.",
  email: "albert.zhang8@gmail.com",
  // Root-relative for Vercel (served from /public)
  // Tip: hyphens are nicer, but spaces work if the file in /public matches exactly.
  resumeUrl: "/Albert Zhang Res.pdf",
};

const LINKS = {
  github: "https://github.com/albertaizhang",
  linkedin: "https://www.linkedin.com/in/albertzhang1",
  email: `mailto:${PROFILE.email}`,
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  highlights?: string[];
  video?: string; // optional video path under /public
};

const PROJECTS: Project[] = [
  {
    title: "League of Legends TFT Comparator",
    description:
      "Stats comparison web app for Teamfight Tactics players using Riot API and a component library for fast UX.",
    tech: ["React", "TypeScript", "Riot API", "Mantine UI"],
    highlights: ["Player stat aggregation", "Build/comp comparisons", "Clean, responsive UI"],
  },
  {
    title: "Live Data Source Tracker",
    description: "Automated pipeline that scrapes live data and compiles a time-windowed MP4 output.",
    tech: ["Python", "C++", "Docker", "Selenium", "AWS EC2", "EFS"],
    highlights: ["Containerized workers", "Headless scraping", "Video compilation"],
  },
  {
    title: "AutoStock",
    description: "Web platform for creating, learning, and testing automated stock trading strategies.",
    tech: ["React", "GraphQL", "Flask", "Google Cloud"],
    highlights: ["Strategy sandbox", "Backtesting flows", "Abstractions for multiple algos"],
    // Root-relative path for Vercel. Put your file at /public/videos/autostock-final-video.mp4
    video: "/videos/autostockvideo.mp4",
  },
  {
    title: "Fitness Tracker App ",
    description: "Our fitness tracking app is designed to help you take control of your health and reach your goals with ease. With fitness tracking, personalized workout recommendations, and seamless integration with lifestyle ",
    tech: ["Kotlin", "Android Studio", "SQL Lite", "Java"],
    highlights: ["App Development", "Comprehensive Activity Tracking", "BMI Calculator"],
  },
];

const SKILLS: Record<string, string[]> = {
  Languages: ["Java", "C#", "C++", "C", "Python", "R", "JavaScript", "TypeScript", "Matlab"],
  Frameworks: ["React", "Next.js", "Flask", "GraphQL", "Mantine UI"],
  Data: ["MySQL", "PostgreSQL", "SQLite", "Firebase", "Elasticsearch", "OpenSearch"],
  Infra: ["AWS", "Docker", "Kafka", "Apache HTTP Server", "Tomcat"],
  Web: ["HTML", "CSS", "JavaScript"],
};

const EXPERIENCE = [
  {
    company: "O.C. Tanner",
    role: "Software Engineer II",
    period: "Jun 2022 — Present",
    points: [
      "Backend microservice developer on Culture Cloud (10M+ users)",
      "Built and maintained APIs handling up to ~4k requests/sec",
      "Implemented GraphQL queries/mutations and multiple Kafka consumers, producers, connectors, and KStream apps",
      "Owned security vulnerability updates, new dev environments, and CI/CD pipelines",
      "Led data migrations and authored new documentation; mentored engineers and interns",
      "Delivered revenue-driving features at scale, shipping hundreds of backend enhancements and new APIs — several directly tied to multi-million-dollar client contracts.",
    ],
  },
  {
    company: "Herbalife Nutrition",
    role: "Software Engineer Intern",
    period: "May 2021 — Aug 2021",
    points: [
      "Built automation scripts that streamlined server provisioning and user account management, reducing manual setup time and minimizing errors across development environments.",
      "Documented processes and shared improvements with full-time engineers to accelerate onboarding of future interns.",
    ],
  },
  {
    company: "Cox Automotive",
    role: "Software Engineer Intern (Dunder-Mifflin Team)",
    period: "May 2019 — Aug 2019",
    points: [
      "Developed RESTful backend endpoints for dealership management software, improving feature coverage and enabling smoother integration with client applications.",
      "Authored regression tests that strengthened the team’s CI/CD pipeline, preventing recurring bugs and increasing release confidence.",
      "Collaborated with senior engineers in Agile sprints, gaining exposure to production-scale development workflows.",
    ],
  },
];

// ====== PAGE COMPONENT ======
export default function PortfolioSite() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTechTags = useMemo(() => Array.from(new Set(PROJECTS.flatMap((p) => p.tech))).sort(), []);
  const filtered = useMemo(
    () => (!activeTag ? PROJECTS : PROJECTS.filter((p) => p.tech.includes(activeTag))),
    [activeTag]
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <Section id="projects" title="Projects" subtitle="Selected work & experiments">
          <div className="mb-6 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <div className="flex flex-wrap gap-2">
              <Badge onClick={() => setActiveTag(null)} className={badgeClass(!activeTag)}>
                All
              </Badge>
              {allTechTags.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={badgeClass(activeTag === tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience" subtitle="What I've been up to">
          <div className="space-y-4">
            {EXPERIENCE.map((job) => (
              <Card key={job.company} className="rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>
                      {job.role} · {job.company}
                    </span>
                    <span className="text-sm font-normal text-neutral-500">{job.period}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-neutral-700">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" subtitle="Tools I use often">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <Card key={cat} className="rounded-2xl shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{cat}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Badge key={s} variant="secondary" className="px-2 py-1 text-sm">
                      {s}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" subtitle="Let's build something together">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <p className="text-neutral-700">
                Prefer email? Reach me at{" "}
                <a className="underline" href={LINKS.email}>
                  {PROFILE.email}
                </a>
                .
              </p>
              <div className="flex items-center gap-3">
                <Button asChild className="rounded-xl">
                  <a href={LINKS.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="secondary" className="rounded-xl">
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild className="rounded-xl">
                  <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

// ====== COMPONENTS ======
function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className="group rounded-2xl shadow-sm transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          {p.title}
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-normal text-neutral-500 hover:text-neutral-700"
            >
              Live <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-neutral-700">{p.description}</p>

        {p.highlights && (
          <ul className="mb-4 list-inside list-disc space-y-1 text-neutral-700">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {/* Optional project video */}
        {p.video && (
          <video controls className="mb-4 w-full rounded-xl border shadow-sm" preload="metadata" playsInline>
            <source src={p.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <Badge key={t} variant="secondary" className="px-2 py-1 text-sm">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="font-semibold tracking-tight">
          {PROFILE.name}
        </a>
        <nav className="hidden gap-6 md:flex">
          <a className="navlink" href="#projects">
            Projects
          </a>
          <a className="navlink" href="#experience">
            Experience
          </a>
          <a className="navlink" href="#skills">
            Skills
          </a>
          <a className="navlink" href="#contact">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <IconLink href={LINKS.github} ariaLabel="GitHub">
            <Github className="h-5 w-5" />
          </IconLink>
          <IconLink href={LINKS.linkedin} ariaLabel="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </IconLink>
          <Button asChild size="sm" className="rounded-xl">
            <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" /> Resume
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm text-neutral-600 shadow-sm">
          <MapPin className="h-4 w-4" /> {PROFILE.location}
        </div>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-5xl">{PROFILE.name}</h1>
        <p className="mb-4 text-lg text-neutral-700">{PROFILE.title}</p>
        <p className="mx-auto max-w-2xl text-neutral-600">{PROFILE.summary}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild className="rounded-xl">
            <a href="#projects">
              View Projects <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="secondary" asChild className="rounded-xl">
            <a href={LINKS.email}>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-neutral-600">{subtitle}</p> : null}
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-12 max-w-6xl px-4 pb-12 pt-6 text-sm text-neutral-500 sm:px-6 lg:px-8">
      © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js & Tailwind.
    </footer>
  );
}

function IconLink({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="rounded-xl p-2 transition hover:bg-neutral-100"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function badgeClass(active?: boolean) {
  return [
    "cursor-pointer select-none px-2 py-1 text-sm",
    active ? "bg-neutral-900 text-white hover:bg-neutral-800" : "bg-neutral-100 hover:bg-neutral-200",
  ].join(" ");
}
