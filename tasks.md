# Experience Navigator — ExperienceSection Redesign

## Overview

Redesign `src/components/portfolio/ExperienceSection.tsx` into a **two-panel "Experience Navigator"**:

- **Left panel**: A vertical timeline showing all 4 experiences (newest → oldest) as compact, clickable selector cards. Selecting one highlights it with a glowing left accent bar and active state.
- **Right panel**: A sticky animated detail panel (using `AnimatePresence`) that smoothly transitions in the full details of the selected experience — description, highlights, tech stack, metrics, and action buttons.

On mobile (< 768px) the left panel becomes a horizontal scrollable chip row at the top and the detail card stacks below it.

**Files to touch**: `src/components/portfolio/ExperienceSection.tsx` and `src/index.css` (only for the no-scrollbar utility in Task 6).

**The section `id` must stay `"internships"`** — the Navigation component uses it for scroll tracking. Do not change it.

---

## Design Vision

```
 ┌─────────────────────────┬──────────────────────────────────────────┐
 │  LEFT NAVIGATOR         │  RIGHT DETAIL PANEL (sticky)             │
 │  (300px fixed width)    │                                          │
 │                         │  ╔══════════════════════════════════╗   │
 │  2025  ●  ▶ [selected]  │  ║  [Logo]  AI-Driven Full-Stack    ║   │
 │    [LIVE] [EoS]         │  ║          ContinuousNet · 2025    ║   │
 │    AI-Driven...         │  ╠══════════════════════════════════╣   │
 │    Mar–Oct 2025         │  ║  Key Highlights                  ║   │
 │         │               │  ║  ✓ Shipped 3 mobile apps...     ║   │
 │  2024  ●  [CodinGoat]   │  ╠══════════════════════════════════╣   │
 │    Frontend Mob...      │  ║  [3 Agencies] [3 Apps] [9+ Mo]  ║   │
 │    Jul–Sep 2024         │  ╠══════════════════════════════════╣   │
 │         │               │  ║  Stack: NestJS  Flutter  ...     ║   │
 │  2023  ●  [ESPRIT]      │  ╠══════════════════════════════════╣   │
 │    Backend Intern       │  ║  [Live Demo] [Watch Demo]        ║   │
 │         │               │  ╚══════════════════════════════════╝   │
 │  2022  ●  [MBM LAB]     │                                          │
 │    Qt Developer         │  Transitions: old exits y:-8 opacity:0   │
 │                         │  new enters from y:+12 opacity:0         │
 └─────────────────────────┴──────────────────────────────────────────┘
```

**Selection transition**: `AnimatePresence mode="wait"`. Exit: `opacity: 0, y: -8`. Enter from: `opacity: 0, y: 12` → `opacity: 1, y: 0`. Duration: 0.28s.

---

## Design System Reference

| Token | Value |
|---|---|
| `font-display` | Space Grotesk |
| `font-mono` | JetBrains Mono |
| `violet` | `hsl(262 83% 68%)` |
| `violet-bright` | `hsl(262 83% 78%)` |
| `indigo` | `hsl(230 68% 62%)` |
| Deep card bg | `bg-[#0c0c18]` |
| Section surface | `bg-surface-card` |
| Gradient text | `text-gradient` class |
| Section label | `section-label` class |
| Section heading line | `section-heading-line` class |
| Button | shadcn `<Button>` from `@/components/ui/button` |

Logo images (`continuousnet.png`, `codingoat.png`, `esprit.png`, `mbm-lab.png`) are in the public root — use bare filenames, no `/public/` prefix.

---

## Progress

- [x] Task 1 — Unified data model
- [x] Task 2 — Section layout shell + state
- [x] Task 3 — ExperienceNavigator (left timeline panel)
- [x] Task 4 — ExperienceDetail + DetailCard (right animated panel)
- [x] Task 5 — Keyboard navigation + accessibility
- [x] Task 6 — Mobile layout (horizontal chip row)
- [x] Task 7 — Video modal + final verification

---

---

# Task 1 — Unified Data Model

## Goal
Merge the current `WorkExperience` and `Internship` interfaces into a single `Experience` interface, and combine both data arrays into one sorted array (newest first). This simplifies all downstream components — they all work with one type.

## Steps

### 1.1 — New Interface

Delete both existing interfaces and replace with this single one:

```ts
interface Experience {
  id: string;                              // unique key used for selectedId state
  type: "work" | "internship";
  company: string;
  role: string;
  period: string;
  year: string;                            // "2025", "2024", etc. — shown in timeline
  duration?: string;                       // e.g. "9+ months" — only for work entries
  location: string;
  description: string;
  logoUrl: string;
  tech: string[];
  highlights: string[];
  metrics?: { label: string; value: string }[];  // only for work entries
  github?: string;
  demo?: string;
  videoId?: string;
  isGraduation?: boolean;                  // shows amber "End of Studies" badge
  isLive?: boolean;                        // shows green "LIVE" badge
}
```

### 1.2 — Unified Data Array

Delete both `workExperience` and `internships`. Replace with:

```ts
const experiences: Experience[] = [
  {
    id: "continuousnet",
    type: "work",
    company: "ContinuousNet & ZenifyTrip",
    role: "AI-Driven Full-Stack Developer",
    period: "Mar 2025 – Oct 2025",
    year: "2025",
    duration: "9+ months",
    location: "Sousse, Tunisia",
    description:
      "Built and shipped features across the full ZenifyTrip travel platform serving 3 agencies — from Flutter mobile apps for booking flights, hotels, and activities to real-time chat between travellers, guides, and agency staff. Developed the Flutter frontend with the mobile team, contributed to the NestJS backend, and supervised the servers powering the entire ecosystem.",
    tech: ["NestJS", "Flutter", "FastAPI", "Matrix/Synapse", "Docker", "GitLab CI/CD", "Grafana", "Python", "WebRTC"],
    highlights: [
      "Shipped 3 mobile apps with chat, flight/hotel/activity booking, and guided trip flows for 3 travel agencies",
      "Built Flutter features with the mobile team — booking, communication, and guided trip UX end-to-end",
      "Contributed to the NestJS backend and supervised the servers powering the full ZenifyTrip ecosystem",
    ],
    metrics: [
      { label: "Agencies", value: "3" },
      { label: "Apps Shipped", value: "3" },
      { label: "Months", value: "9+" },
    ],
    logoUrl: "continuousnet.png",
    demo: "https://play.google.com/store/apps/details?id=com.zenify_client_app&hl=en-US&pli=1",
    videoId: "2jSBJhhQPk0",
    isGraduation: true,
    isLive: true,
  },
  {
    id: "codingoat",
    type: "internship",
    company: "CodinGoat",
    role: "Frontend Mobile Developer Intern",
    period: "Jul – Sep 2024",
    year: "2024",
    location: "Mahdia, Tunisia",
    description:
      "Led UI design in Figma and built the Flutter frontend for a role-based e-commerce app using Clean Architecture and Riverpod. Implemented secure online payment, stock management, and real-time Firebase communication and synchronization.",
    tech: ["Flutter", "Dart", "Riverpod", "Firebase", "Figma", "Clean Architecture"],
    highlights: [
      "Led Figma UI design and implemented the full Flutter frontend from scratch",
      "Integrated secure online payment and real-time Firebase sync",
      "Applied Clean Architecture with Riverpod across a role-based e-commerce app",
    ],
    logoUrl: "codingoat.png",
    github: "https://github.com/walidmz/CodinGoat",
  },
  {
    id: "esprit",
    type: "internship",
    company: "ESPRIT",
    role: "Backend Development Intern",
    period: "Jul – Sep 2023",
    year: "2023",
    location: "Tunis, Tunisia",
    description:
      "Designed and built the backend of the ESPRIT internship management platform using Spring Boot and JWT authentication. Implemented student tracking, evaluation workflows, document management, and communication features.",
    tech: ["Java", "Spring Boot", "JWT", "REST API", "MySQL", "Maven"],
    highlights: [
      "Architected the full backend for an academic internship management platform",
      "Implemented JWT-secured evaluation and document management workflows",
      "Built real-time communication features between students and supervisors",
    ],
    logoUrl: "esprit.png",
  },
  {
    id: "mbm-lab",
    type: "internship",
    company: "MBM LAB",
    role: "Qt Developer Intern",
    period: "Jul – Aug 2022",
    year: "2022",
    location: "Tunis, Tunisia",
    description:
      "Developed a full-featured desktop application using C++ and the Qt framework. Implemented AES-256 password storage, an intuitive interface for managing job offers and candidates, and facial recognition authentication.",
    tech: ["C++", "Qt", "Python", "OpenCV", "AES-256", "SQLite"],
    highlights: [
      "Built a full desktop HR app with AES-256 encrypted credential storage",
      "Integrated facial recognition login for staff using OpenCV",
      "Designed the complete Qt UI with job offer and candidate management flows",
    ],
    logoUrl: "mbm-lab.png",
    github: "https://github.com/walidmz/QtRepass",
  },
];
```

## Done When
- Zero TypeScript errors
- Both old interfaces deleted, both old arrays deleted
- All 4 entries in a single `experiences` array, newest first
- `id` field is unique for each entry

---

---

# Task 2 — Section Layout Shell + State

## Goal
Set up the two-panel grid skeleton and the `selectedId` state that drives all interactivity. At this stage the child components will be empty stubs — just making the structure compile and render.

## Steps

### 2.1 — Updated Imports

Replace the import block at the top of the file with:

```tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Briefcase, MapPin, Calendar, Github, ExternalLink, Play,
  CheckCircle2, Code2, GraduationCap, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
```

Changes vs. current: `AnimatePresence` added, `useEffect` added, `Building2` added (for the internship type badge).

### 2.2 — ExperienceSection Component

Replace the `ExperienceSection` function entirely:

```tsx
const ExperienceSection = () => {
  const [selectedId, setSelectedId] = useState<string>("continuousnet");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const isNavigatorInView = useInView(navigatorRef, { once: true, margin: "-60px" });

  const selectedExp = experiences.find((e) => e.id === selectedId)!;

  // Arrow-key navigation (added in Task 5 — leave a comment placeholder here for now)

  return (
    <motion.section
      id="internships"
      className="py-24 bg-surface-card overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <Briefcase className="h-3.5 w-3.5" />
              Experience
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">Professional Journey</h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            From academic foundations to production AI systems — a record of what I've shipped.
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="max-w-6xl mx-auto">

          {/* Mobile chip row — visible only on < md (built in Task 6) */}
          <div className="md:hidden mb-4">
            {/* MobileExperienceChips goes here in Task 6 */}
          </div>

          <div className="md:grid md:grid-cols-[300px_1fr] md:gap-8 md:items-start">

            {/* LEFT: Navigator — hidden on mobile */}
            <div className="hidden md:block">
              <ExperienceNavigator
                experiences={experiences}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isInView={isNavigatorInView}
                ref={navigatorRef}
              />
            </div>

            {/* RIGHT: Detail — sticky on desktop */}
            <div className="md:sticky md:top-24">
              <ExperienceDetail
                experience={selectedExp}
                onWatchDemo={setActiveVideoId}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Video modal (Task 7) */}
    </motion.section>
  );
};

export default ExperienceSection;
```

### 2.3 — Temporary Stubs

Below the `ExperienceSection` function (and above `export default`), add temporary stubs so the file compiles:

```tsx
// STUB — replaced in Task 3
const ExperienceNavigator = React.forwardRef<
  HTMLDivElement,
  { experiences: Experience[]; selectedId: string; onSelect: (id: string) => void; isInView: boolean }
>((_props, ref) => <div ref={ref} />);
ExperienceNavigator.displayName = "ExperienceNavigator";

// STUB — replaced in Task 4
const ExperienceDetail = (_props: { experience: Experience; onWatchDemo: (id: string) => void }) => <div />;
```

## Done When
- File compiles and dev server shows the section header + empty two-column area with no crash
- `selectedId` defaults to `"continuousnet"`
- `selectedExp` resolves correctly (no runtime error)
- Grid columns are visible in browser devtools (even if both panels are empty divs)

---

---

# Task 3 — ExperienceNavigator (Left Timeline Panel)

## Goal
Replace the `ExperienceNavigator` stub with the real animated vertical timeline. This is the navigation control — compact clickable cards connected by a glowing spine.

## Visual Structure Per Entry

```
  [year]  ●──  [compact card]
               [logo] Role name           ← font-display, truncated
                      Company · period    ← font-mono, muted
                      [LIVE] [EoS]        ← only if flags set
```

- Year label sits to the LEFT of the spine, right-aligned into 40px
- Node dot (14×14px) is centered ON the spine
- A 24px horizontal connector runs from the dot's right edge to the card's left edge
- The spine is a 2px vertical line at `left: 7px` within the `pl-14` container

## Active vs Inactive States

| Property | Active (selected) | Inactive |
|---|---|---|
| Card border | `hsl(262 83% 68% / 0.38)` | `hsl(262 83% 68% / 0.10)` |
| Card bg | `hsl(262 83% 68% / 0.07)` | `#0c0c18` |
| Left accent bar | visible (opacity 1, scaleY 1) | hidden (opacity 0, scaleY 0.4) |
| Role text color | `hsl(0 0% 90%)` | `hsl(0 0% 52%)` |
| Year color | `hsl(262 83% 78%)` (violet-bright) | `hsl(262 83% 68% / 0.45)` |
| Node border | `hsl(262 83% 78%)` | `hsl(262 83% 68% / 0.4)` |
| Node glow | `0 0 14px hsl(262 83% 68% / 0.7)` | `0 0 6px hsl(262 83% 68% / 0.25)` |
| Inner dot opacity | 1.0 | 0.5 |

All state transitions use `transition-all duration-200` or `transition={{ duration: 0.2 }}`.

## Steps

### 3.1 — ExperienceNavigator Component

Replace the stub with:

```tsx
const ExperienceNavigator = React.forwardRef<
  HTMLDivElement,
  {
    experiences: Experience[];
    selectedId: string;
    onSelect: (id: string) => void;
    isInView: boolean;
  }
>(({ experiences, selectedId, onSelect, isInView }, ref) => (
  <div ref={ref}>
    <div className="relative pl-14">

      {/* ── Spine ── */}
      <motion.div
        className="absolute left-[7px] top-[20px] w-[2px] rounded-full pointer-events-none"
        style={{
          bottom: "20px",
          background: "linear-gradient(180deg, hsl(262 83% 78%), hsl(262 83% 68% / 0.25) 80%, transparent)",
          boxShadow: "0 0 8px hsl(262 83% 68% / 0.3)",
          transformOrigin: "top",
        }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Entries ── */}
      {experiences.map((exp, index) => {
        const isSelected = exp.id === selectedId;
        return (
          <motion.div
            key={exp.id}
            className="relative mb-3 last:mb-0"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.12, duration: 0.45, ease: [0, 0, 0.2, 1] }}
          >
            {/* Year label — left of the spine */}
            <div
              className="absolute top-[14px] font-mono text-[10px] font-bold leading-none select-none"
              style={{
                left: "-46px",
                width: "40px",
                textAlign: "right",
                color: isSelected ? "hsl(262 83% 78%)" : "hsl(262 83% 68% / 0.45)",
                transition: "color 0.2s ease",
              }}
            >
              {exp.year}
            </div>

            {/* Node dot — centered on the spine */}
            <div
              className="absolute left-[-8px] top-[18px] w-3.5 h-3.5 rounded-full border-2 bg-[#0c0c18] z-10 flex items-center justify-center pointer-events-none"
              style={{
                borderColor: isSelected ? "hsl(262 83% 78%)" : "hsl(262 83% 68% / 0.4)",
                boxShadow: isSelected
                  ? "0 0 14px hsl(262 83% 68% / 0.7), 0 0 5px hsl(262 83% 68% / 0.5)"
                  : "0 0 6px hsl(262 83% 68% / 0.25)",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "hsl(262 83% 78%)",
                  opacity: isSelected ? 1 : 0.45,
                  transition: "opacity 0.2s ease",
                }}
              />
            </div>

            {/* Short horizontal connector from dot to card */}
            <div
              className="absolute left-[8px] top-[24px] h-[1px] w-6 pointer-events-none"
              style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.4), transparent)" }}
            />

            {/* Selector card */}
            <NavigatorCard
              exp={exp}
              isSelected={isSelected}
              onClick={() => onSelect(exp.id)}
            />
          </motion.div>
        );
      })}

    </div>
  </div>
));

ExperienceNavigator.displayName = "ExperienceNavigator";
```

### 3.2 — NavigatorCard Sub-Component

The compact clickable card. Uses a `<button>` for proper semantics.

```tsx
const NavigatorCard = ({
  exp,
  isSelected,
  onClick,
}: {
  exp: Experience;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    role="tab"
    aria-selected={isSelected}
    aria-label={`${exp.role} at ${exp.company}`}
    className="relative w-full overflow-hidden rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0c0c18]"
    style={{
      borderColor: isSelected
        ? "hsl(262 83% 68% / 0.38)"
        : "hsl(262 83% 68% / 0.10)",
      background: isSelected ? "hsl(262 83% 68% / 0.07)" : "#0c0c18",
      boxShadow: isSelected
        ? "0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px hsl(262 83% 68% / 0.05)"
        : "none",
    }}
  >
    {/* Left accent bar — animates in when selected */}
    <motion.div
      className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl pointer-events-none"
      initial={false}
      animate={{
        opacity: isSelected ? 1 : 0,
        scaleY: isSelected ? 1 : 0.4,
      }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      style={{
        background: "linear-gradient(180deg, hsl(262 83% 78%), hsl(230 68% 62%))",
        transformOrigin: "center",
      }}
    />

    <div className="pl-4 pr-3 py-3">

      {/* Logo + role + meta */}
      <div className="flex items-start gap-2.5">

        {/* Company logo */}
        <div
          className="shrink-0 w-8 h-8 rounded-lg border bg-black/40 flex items-center justify-center p-1.5 mt-0.5 transition-colors duration-200"
          style={{
            borderColor: isSelected
              ? "hsl(262 83% 68% / 0.28)"
              : "hsl(262 83% 68% / 0.10)",
          }}
        >
          <img
            src={exp.logoUrl}
            alt={exp.company}
            className="w-full h-full object-contain"
            style={{ filter: "grayscale(0.15) brightness(1.05)" }}
          />
        </div>

        {/* Text stack */}
        <div className="flex-1 min-w-0">
          <p
            className="font-display font-semibold text-sm leading-snug truncate transition-colors duration-200"
            style={{ color: isSelected ? "hsl(0 0% 90%)" : "hsl(0 0% 52%)" }}
          >
            {exp.role}
          </p>
          <p className="font-mono text-[10px] text-white/35 mt-0.5 truncate">
            {exp.company}
          </p>
          <p className="font-mono text-[10px] text-white/25 mt-0.5">
            {exp.period}
          </p>
        </div>
      </div>

      {/* Badges row — always shown when flags are set */}
      {(exp.isLive || exp.isGraduation) && (
        <div className="flex gap-1.5 mt-2 ml-[42px]">
          {exp.isLive && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/[0.08] px-1.5 py-0.5 font-mono text-[8px] font-bold text-emerald-400">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          )}
          {exp.isGraduation && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-1.5 py-0.5 font-mono text-[8px] text-amber-300">
              <GraduationCap className="w-2.5 h-2.5" /> EoS
            </span>
          )}
        </div>
      )}

    </div>
  </button>
);
```

## Done When
- All 4 entries render in the left panel as compact clickable cards
- Spine animates from top when section scrolls into view
- Year labels, node dots, and connectors are correctly aligned
- Clicking any card calls `onSelect` (detail panel is still a stub — just verify state updates via React DevTools or the console if needed)
- ContinuousNet card shows LIVE and EoS badges
- Active card: left accent bar visible, violet tint bg, brighter role text, glowing dot
- Inactive cards: dimmer, no accent bar
- `npm run lint` passes

---

---

# Task 4 — ExperienceDetail + DetailCard (Right Animated Panel)

## Goal
Replace the `ExperienceDetail` stub with the real animated detail panel. Uses `AnimatePresence` so switching the selected experience produces a smooth exit/enter transition.

## Component Hierarchy

```
ExperienceDetail          ← AnimatePresence wrapper, key=experience.id
  └─ motion.div           ← the animated wrapper (entry/exit)
       └─ DetailCard      ← the actual content card
```

## Steps

### 4.1 — ExperienceDetail Component

```tsx
const ExperienceDetail = ({
  experience,
  onWatchDemo,
}: {
  experience: Experience;
  onWatchDemo: (id: string) => void;
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
    >
      <DetailCard experience={experience} onWatchDemo={onWatchDemo} />
    </motion.div>
  </AnimatePresence>
);
```

### 4.2 — DetailCard Component

The premium content card. Renders all details for a given `Experience`.

```tsx
const DetailCard = ({
  experience: exp,
  onWatchDemo,
}: {
  experience: Experience;
  onWatchDemo: (id: string) => void;
}) => (
  <div
    className="relative overflow-hidden rounded-2xl border border-violet/20 bg-[#0c0c18]"
    style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px hsl(262 83% 68% / 0.06)" }}
  >
    {/* Left accent bar */}
    <div
      className="absolute left-0 inset-y-0 w-[3px] rounded-l-2xl pointer-events-none"
      style={{ background: "linear-gradient(180deg, hsl(262 83% 78%), hsl(230 68% 62%))" }}
    />

    {/* Top glow line */}
    <div
      className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(262 83% 78% / 0.85) 30%, hsl(230 68% 62% / 0.65) 70%, transparent)",
        boxShadow: "0 0 16px hsl(262 83% 68% / 0.45)",
      }}
    />

    {/* Ambient top glow */}
    <div
      className="absolute inset-x-0 top-0 h-48 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 70% 100% at 40% 0%, hsl(262 83% 68% / 0.08), transparent 70%)" }}
    />

    {/* Noise texture */}
    <div
      className="absolute inset-0 pointer-events-none opacity-35"
      style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 8px)" }}
    />

    <div className="relative pl-8 pr-6 py-7 md:pl-10 md:pr-8 md:py-9">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">

        {/* Logo */}
        <div
          className="relative shrink-0 w-14 h-14 rounded-2xl border border-violet/20 bg-black/40 flex items-center justify-center p-2.5 overflow-hidden"
          style={{ boxShadow: "0 0 24px hsl(262 83% 68% / 0.10), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(262 83% 68% / 0.15), transparent 65%)" }}
          />
          <img
            src={exp.logoUrl}
            alt={exp.company}
            className="relative w-full h-full object-contain"
            style={{ filter: "grayscale(0.15) brightness(1.1) drop-shadow(0 0 8px hsl(262 83% 68% / 0.35))" }}
          />
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {exp.isLive && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            )}
            {exp.duration && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-xs font-bold text-violet-bright">
                <span className="w-2 h-2 rounded-full bg-violet-bright animate-pulse" />
                {exp.duration}
              </span>
            )}
            {exp.isGraduation && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
                <GraduationCap className="w-3 h-3" /> End of Studies
              </span>
            )}
            {exp.type === "internship" && !exp.isGraduation && (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/25 bg-blue-400/[0.07] px-2.5 py-0.5 font-mono text-[10px] text-blue-300/80">
                <Building2 className="w-3 h-3" /> Internship
              </span>
            )}
          </div>

          {/* Role */}
          <h3 className="font-display font-bold text-xl md:text-2xl text-gradient leading-snug mb-1">
            {exp.role}
          </h3>

          {/* Company + period + location */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono text-sm font-bold text-white/80">{exp.company}</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-white/45 font-mono">
              <Calendar className="h-3 w-3 text-violet/50 shrink-0" /> {exp.period}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
              <MapPin className="h-3 w-3 text-violet/50 shrink-0" /> {exp.location}
            </span>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="mb-5 h-px"
        style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.20), hsl(230 68% 62% / 0.10) 50%, transparent)" }}
      />

      {/* ── Description ── */}
      <p className="text-sm text-white/55 leading-relaxed mb-5">
        {exp.description}
      </p>

      {/* ── Two-column: Highlights + Metrics+Stack ── */}
      <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-8">

        {/* Left: Key Highlights */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3">Key Highlights</p>
          <ul className="space-y-2.5">
            {exp.highlights.map((point, idx) => (
              <motion.li
                key={`${exp.id}-h${idx}`}
                className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + idx * 0.07, duration: 0.25, ease: [0, 0, 0.2, 1] }}
              >
                <CheckCircle2 className="mt-0.5 shrink-0 w-3.5 h-3.5 text-violet/50" />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Metrics (if any) + Tech Stack */}
        <div className="md:w-52 space-y-5">

          {/* Impact metrics — only shown when exp.metrics is defined and non-empty */}
          {exp.metrics && exp.metrics.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3">Impact</p>
              <div className="grid grid-cols-3 gap-2">
                {exp.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-violet/15 bg-violet/[0.05] p-2.5 text-center"
                  >
                    <p className="font-display font-bold text-xl text-gradient leading-none">{m.value}</p>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-white/40 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3 flex items-center gap-1.5">
              <Code2 className="w-3 h-3" /> Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exp.tech.map((t, idx) => (
                <motion.span
                  key={`${exp.id}-${t}`}
                  className="inline-flex items-center rounded-md border border-violet/20 bg-violet/[0.06] px-2 py-1 font-mono text-[10px] font-medium text-white/65 transition-colors duration-200 hover:border-violet/45 hover:text-white/90 hover:bg-violet/[0.12]"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.12 + idx * 0.03, duration: 0.2 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Bar ── */}
      {(exp.demo || exp.videoId || exp.github) && (
        <div className="mt-6 pt-4 border-t border-violet/10 flex flex-wrap gap-2">
          {exp.demo && (
            <Button
              size="sm"
              className="text-xs gap-1.5 text-white shadow-[0_0_18px_hsl(262_83%_68%/0.22)] transition-all duration-200 hover:shadow-[0_0_28px_hsl(262_83%_68%/0.4)]"
              style={{ background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))" }}
              onClick={() => window.open(exp.demo, "_blank")}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </Button>
          )}
          {exp.videoId && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-violet/25 bg-black/15 text-white/70 hover:border-violet/55 hover:bg-violet/10 hover:text-white transition-all duration-200"
              onClick={() => onWatchDemo(exp.videoId!)}
            >
              <Play className="w-3.5 h-3.5" /> Watch Demo
            </Button>
          )}
          {exp.github && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-violet/20 bg-black/15 text-white/60 hover:border-violet/45 hover:bg-violet/10 hover:text-white transition-all duration-200"
              onClick={() => window.open(exp.github, "_blank")}
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </Button>
          )}
        </div>
      )}

    </div>

    {/* Bottom glow line */}
    <div
      className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(262 83% 68% / 0.18), transparent)" }}
    />
  </div>
);
```

**Important key note**: The `motion.li` for highlights uses `key={`${exp.id}-h${idx}`}` and the `motion.span` for tech uses `key={`${exp.id}-${t}`}`. These compound keys ensure React re-mounts the animated elements on every selection change, which is what makes the stagger animation re-fire on each switch. If you use just `idx` or just `t` as the key, the animation will only fire on first render.

## Done When
- Detail panel renders all content for the default ContinuousNet selection
- Clicking a navigator entry: AnimatePresence smoothly exits old content (fade + slide up), enters new content (fade + slide from below)
- Stagger animation on highlights re-fires visibly on each selection change
- Stagger animation on tech pills re-fires on each selection change
- Metrics grid (3 / 3 / 9+) only renders for ContinuousNet
- "Internship" blue badge renders for ESPRIT and MBM LAB (non-graduation internships)
- "End of Studies" amber badge + "LIVE" green badge render for ContinuousNet
- "9+ months" duration pill renders only for ContinuousNet
- Action bar: Live Demo + Watch Demo for ContinuousNet; GitHub only for CodinGoat + MBM LAB; nothing for ESPRIT
- `npm run lint` passes

---

---

# Task 5 — Keyboard Navigation + Accessibility

## Goal
Make the navigator keyboard-accessible so that arrow keys cycle through entries and screen readers announce the correct state.

## Steps

### 5.1 — Arrow Key Handler

Inside `ExperienceSection`, add this `useEffect` after the state declarations (replace the comment placeholder left in Task 2):

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const currentIndex = experiences.findIndex((exp) => exp.id === selectedId);
    if (e.key === "ArrowDown" && currentIndex < experiences.length - 1) {
      setSelectedId(experiences[currentIndex + 1].id);
    }
    if (e.key === "ArrowUp" && currentIndex > 0) {
      setSelectedId(experiences[currentIndex - 1].id);
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [selectedId]);
```

### 5.2 — Role Attributes on Navigator

The outer `<div>` wrapping the entries in `ExperienceNavigator` should have:
```tsx
role="tablist"
aria-label="Experience entries"
```

The `NavigatorCard` button already has `role="tab"` and `aria-selected` from Task 3. Confirm those are present.

### 5.3 — Focus Ring

The `NavigatorCard` button already has `focus-visible:ring-2 focus-visible:ring-violet/60` from Task 3. Confirm this is present and visible when navigating with Tab key in the browser.

## Done When
- `ArrowDown` selects the next entry; `ArrowUp` selects the previous entry; both cycle through all 4
- At the first entry, `ArrowUp` does nothing; at the last entry, `ArrowDown` does nothing
- Tab key navigates to navigator cards and shows a visible violet focus ring

---

---

# Task 6 — Mobile Layout (Horizontal Chip Row)

## Goal
On mobile (< 768px): hide the vertical navigator, show a horizontal scrollable chip row at the top, then the full detail card below. On desktop: vertical navigator is shown, chip row is hidden.

## Target Visual (mobile)

```
┌──────────────────────────────────────────────┐
│ [●ContinuousN▸]  [CodinGoat]  [ESPRIT]  [MBM]  ← horizontal scroll, no scrollbar
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│                                              │
│   DetailCard — full width                    │
│                                              │
└──────────────────────────────────────────────┘
```

Active chip: violet border + tint + company name bright. Inactive chip: dim border, muted text.

## Steps

### 6.1 — MobileExperienceChips Component

Add this component to the file:

```tsx
const MobileExperienceChips = ({
  experiences,
  selectedId,
  onSelect,
}: {
  experiences: Experience[];
  selectedId: string;
  onSelect: (id: string) => void;
}) => (
  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
    {experiences.map((exp) => {
      const isSelected = exp.id === selectedId;
      return (
        <button
          key={exp.id}
          onClick={() => onSelect(exp.id)}
          className="shrink-0 flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60"
          style={{
            borderColor: isSelected
              ? "hsl(262 83% 68% / 0.5)"
              : "hsl(262 83% 68% / 0.15)",
            background: isSelected ? "hsl(262 83% 68% / 0.10)" : "transparent",
          }}
        >
          <img
            src={exp.logoUrl}
            alt=""
            className="w-4 h-4 object-contain"
            style={{ filter: "grayscale(0.15) brightness(1.05)" }}
          />
          <span
            className="font-mono text-[11px] font-medium whitespace-nowrap"
            style={{ color: isSelected ? "hsl(0 0% 88%)" : "hsl(0 0% 48%)" }}
          >
            {exp.company.split(" ")[0]}
          </span>
          {exp.isLive && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          )}
        </button>
      );
    })}
  </div>
);
```

Note: `exp.company.split(" ")[0]` gives "ContinuousNet", "CodinGoat", "ESPRIT", "MBM" — short enough for chips.

### 6.2 — Wire into ExperienceSection

Replace the comment placeholder in the mobile chip row slot (from Task 2):

```tsx
<div className="md:hidden mb-4">
  <MobileExperienceChips
    experiences={experiences}
    selectedId={selectedId}
    onSelect={setSelectedId}
  />
</div>
```

### 6.3 — Add no-scrollbar Utility to index.css

Open `src/index.css` and add at the very end (outside any existing layer blocks):

```css
@layer utilities {
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
}
```

If an `@layer utilities` block already exists in the file, add only the two rules inside it, don't create a second block.

## Done When
- On mobile (< 768px): chip row is visible, vertical navigator is `display:none`
- On desktop (≥ 768px): chip row is `display:none`, vertical navigator is visible
- Chip row scrolls horizontally without showing a scrollbar on any browser
- Active chip has visible violet tint and border
- Selecting a chip on mobile correctly updates the detail panel
- No horizontal overflow (use browser devtools responsive mode to verify at 375px width)
- Detail card is full-width on mobile with appropriate padding

---

---

# Task 7 — Video Modal + Final Verification

## Goal
Add the YouTube video modal and do a complete verification pass in the browser and linter.

## Steps

### 7.1 — Video Modal

Replace the `{/* Video modal (Task 7) */}` comment in `ExperienceSection` with:

```tsx
{activeVideoId && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
    onClick={() => setActiveVideoId(null)}
  >
    <div
      className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setActiveVideoId(null)}
        className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white px-3 py-1 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-colors"
      >
        Close ✕
      </button>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
        title="Demo video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  </div>
)}
```

### 7.2 — Import Cleanup

Verify that every imported icon and hook is actually used in the final file. Expected imports:

```tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Briefcase, MapPin, Calendar, Github, ExternalLink, Play,
  CheckCircle2, Code2, GraduationCap, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
```

Remove anything not in this list. Add anything missing.

### 7.3 — Full Browser Verification Checklist

Run `npm run dev` and verify:

**Section header**
- [ ] "Experience" section-label chip renders with Briefcase icon
- [ ] "Professional Journey" h2 renders in display font
- [ ] Section heading line renders
- [ ] Subtitle paragraph renders

**Navigator (desktop, ≥ 768px)**
- [ ] All 4 entries visible, newest (ContinuousNet 2025) at top, oldest (MBM LAB 2022) at bottom
- [ ] Glowing spine connects all entries top-to-bottom
- [ ] Spine animates (scaleY 0 → 1) when section scrolls into viewport
- [ ] Year labels (2025, 2024, 2023, 2022) visible to the left of the spine
- [ ] Node dots glow on the spine; selected dot is brighter
- [ ] ContinuousNet card shows LIVE (green pulse) and EoS (amber) badges
- [ ] Clicking any card selects it: left accent bar appears, violet tint bg, brighter text

**Detail panel (both layouts)**
- [ ] ContinuousNet is selected by default on page load
- [ ] All content renders for ContinuousNet: LIVE + 9+ months + EoS badges, role, company, period, location, description, 3 highlights, metrics (3/3/9+), 9 tech pills, Live Demo + Watch Demo buttons
- [ ] Clicking CodinGoat: AnimatePresence transition fires — old content fades/slides up, new fades/slides in from below; CodinGoat detail shows correctly including GitHub button, no metrics block, "Internship" blue badge absent (it's isGraduation — wait, CodinGoat has no isGraduation — check: CodinGoat should show "Internship" badge since type=internship and isGraduation is falsy)
  - ESPRIT: "Internship" blue badge, no GitHub, no metrics, no action bar
  - MBM LAB: "Internship" blue badge, GitHub button, no metrics
- [ ] Highlight stagger animation re-fires visibly on each selection switch
- [ ] Tech pill stagger animation re-fires visibly on each selection switch

**Video modal**
- [ ] "Watch Demo" button (ContinuousNet) opens the modal with YouTube iframe autoplay
- [ ] Clicking the backdrop closes the modal
- [ ] Clicking "Close ✕" button closes the modal

**Keyboard**
- [ ] ArrowDown cycles down through entries; ArrowUp cycles up
- [ ] Tab key shows focus ring (violet outline) on navigator cards

**Mobile (< 768px — test in devtools responsive mode at 375px)**
- [ ] Horizontal chip row visible at top, vertical navigator hidden
- [ ] Chip row scrolls horizontally, no visible scrollbar
- [ ] Active chip highlighted with violet border + tint
- [ ] Detail card is full-width, no horizontal overflow
- [ ] Sticky behavior disabled on mobile (detail scrolls normally with page)

**Code quality**
- [ ] `npm run lint` passes with zero errors or warnings
- [ ] No TypeScript errors in the terminal
- [ ] No unused imports
- [ ] No dead code (old WorkExperienceCard, InternshipCard, InternshipTimeline, TimelineDivider — all deleted)

## Done When
All checklist items above are confirmed ✓

---

## Implementation Notes

- **Never rename** `id="internships"` on the section — the Navigation component uses it
- **Never modify** `PortfolioLayout.tsx` — the import already points to `ExperienceSection`
- **Entire redesign is self-contained** inside `ExperienceSection.tsx` + one utility in `index.css`
- The finished file will be ~550–650 lines — that is fine for a single portfolio component
- The old components (`WorkExperienceCard`, `InternshipCard`, `InternshipTimeline`, `TimelineDivider`) are completely replaced — delete any remnants
- React key strategy for animated lists: use `${experience.id}-${index}` compound keys on `motion.li` and `motion.span` so they re-mount (and re-animate) on every selection change
