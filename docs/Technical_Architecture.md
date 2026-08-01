# **Technical Architecture**

## **Personal Portfolio Website — Astro Rewrite**

**Owner:** Gery Pratama Oktaviano  
 **Status:** Draft v1.0  
 **Last Updated:** June 2026  
 **Companion to:** PRD v1.0

---

## **1\. Architecture Overview**

This site is a **fully static, content-first website** with no backend, no database, and no server-side rendering. Every page is pre-rendered at build time and served as plain HTML/CSS/JS from Vercel's CDN.

The guiding principle is: **use the least powerful tool that solves the problem.** A portfolio site has no dynamic data requirements. Every complexity added beyond static generation is accidental, not essential.

* GitHub Repo (Astro)  
*       │  
*       ▼ push to main  
* Vercel Build Pipeline  
*   \- astro build  
*   \- output: static HTML/CSS/JS  
*       │  
*       ▼  
* Vercel CDN Edge Network  
*       │  
*       ▼  
* Custom Domain (gerypratama.com or equivalent)  
    
  ---

  ## **2\. Tech Stack**

| Layer | Choice | Rationale |
| ----- | ----- | ----- |
| Framework | **Astro (latest stable)** | SSG-first, ships zero JS by default, component-island model, file-based routing. Directly aligned with current employer stack. |
| Styling | **Tailwind CSS v4 \+ custom Astro components** | Owner's existing proficiency; v4's CSS-first config is cleaner for a solo project. No UI library — components (cards, tags, timeline items, buttons) built from scratch. Gives full aesthetic control without template look. |
| JS | **Vanilla JS only** | Dark mode toggle \+ scroll animations don't justify a JS framework. No React, no Vue, no Svelte islands. Keeps bundle size near zero. |
| Content | **Static TypeScript data files** | `src/data/projects.ts` and `src/data/experience.ts` — typed objects, no CMS overhead, simple enough for 3 projects and a work timeline. |
| Contact Form | **formly.email** | Already in use; no change required beyond updating the allowed domain after DNS switch |
| Deployment | **Vercel** | Already in use; create a new Vercel project pointing to the new repo |
| Repo | **New GitHub repo** | Separate from existing Remix repo (see PRD constraint C1) |

  ### **What's explicitly excluded and why**

* **React / Vue / Svelte islands:** No component on this site requires client-side state beyond a theme toggle and a scroll observer. Adding a framework for that is over-engineering.  
* **shadcn/ui:** Built on Radix UI (React). Using it in Astro would require `@astrojs/react`, adding a React runtime for zero meaningful gain on a site of this scale. Portfolio components are simple enough to build custom in plain Tailwind.  
* **DaisyUI:** A reasonable Tailwind plugin alternative to shadcn/ui (no React needed), but adds an opinionated class layer that can conflict with a custom minimalist aesthetic. Not worth the trade-off here.  
* **Animation library (GSAP, Framer Motion, Motion):** Intersection Observer \+ CSS transitions handle the required subtle animations without a dependency.  
* **Astro Content Collections:** Appropriate for content-heavy sites or blogs. For 3 projects and a work timeline, a typed TypeScript data file is simpler, faster to set up, and easier to maintain.  
* **`@astrojs/tailwind` integration:** Deprecated for Tailwind v4. Use `@tailwindcss/vite` directly as a Vite plugin instead (confirmed against current Tailwind docs).  
  ---

  ## **3\. Repository Structure**

* portfolio/  
* ├── public/  
* │   ├── cv/  
* │   │   └── gery-pratama-cv.pdf          \# Static CV download asset  
* │   ├── images/  
* │   │   ├── projects/  
* │   │   │   ├── pawangbisnis.webp  
* │   │   │   ├── idsc.webp  
* │   │   │   └── nyambat.webp  
* │   │   └── og/  
* │   │       └── og-default.jpg           \# Open Graph share image  
* │   ├── favicon.svg  
* │   └── robots.txt  
* │  
* ├── src/  
* │   ├── components/  
* │   │   ├── layout/  
* │   │   │   ├── Header.astro  
* │   │   │   └── Footer.astro  
* │   │   ├── ui/  
* │   │   │   ├── Button.astro  
* │   │   │   ├── ProjectCard.astro  
* │   │   │   ├── SkillTag.astro  
* │   │   │   ├── ThemeToggle.astro  
* │   │   │   └── TimelineItem.astro  
* │   │   └── sections/  
* │   │       ├── Hero.astro  
* │   │       ├── FeaturedProjects.astro  
* │   │       ├── SkillsGrid.astro  
* │   │       ├── WorkTimeline.astro  
* │   │       └── ContactForm.astro  
* │   │  
* │   ├── data/  
* │   │   ├── types.ts                     \# Shared interfaces: Project, Experience  
* │   │   ├── projects.ts                  \# Project entries (3 at launch)  
* │   │   └── experience.ts                \# Work timeline entries  
* │   │  
* │   ├── layouts/  
* │   │   └── BaseLayout.astro             \# Head, Header, Footer, theme script  
* │   │  
* │   ├── pages/  
* │   │   ├── index.astro                  \# /  
* │   │   ├── about.astro                  \# /about  
* │   │   ├── projects.astro               \# /projects  
* │   │   ├── contact.astro                \# /contact  
* │   │   └── 404.astro                    \# /404  
* │   │  
* │   ├── scripts/  
* │   │   ├── theme.ts                     \# Dark mode logic  
* │   │   └── animations.ts               \# Scroll reveal observer  
* │   │  
* │   └── styles/  
* │       └── global.css                   \# CSS custom properties, base resets  
* │  
* ├── astro.config.mjs  
* ├── tailwind.config.ts                   \# Tailwind v4: minimal, CSS-first  
* ├── tsconfig.json  
* └── package.json  
    
  ---

  ## **4\. Routing & Pages**

Astro uses file-based routing. All routes are statically generated at build time.

| File | Route | Output |
| ----- | ----- | ----- |
| `pages/index.astro` | `/` | `index.html` |
| `pages/about.astro` | `/about` | `about/index.html` |
| `pages/projects.astro` | `/projects` | `projects/index.html` |
| `pages/contact.astro` | `/contact` | `contact/index.html` |
| `pages/404.astro` | `/404` | `404.html` |

**No dynamic routes** (`[slug].astro`) are required in v1 — projects have no individual detail pages.

`astro.config.mjs` output mode:

* // astro.config.mjs  
* import { defineConfig } from 'astro/config';  
* import tailwindcss from '@tailwindcss/vite';  
* import sitemap from '@astrojs/sitemap';  
*   
* export default defineConfig({  
*   site: 'https://yourdomain.com', // replace with actual domain  
*   output: 'static',  
*   integrations: \[sitemap()\],  
*   vite: {  
*     plugins: \[tailwindcss()\],  
*   },  
* });  
    
  ---

  ## **5\. Data Layer — Static TypeScript Files**

Projects and experience data live in plain TypeScript files with defined interfaces. No CMS, no Content Collections, no Zod schemas. Simple to write, simple to update.

Skills are defined directly in `about.astro` as a grouped object — they're used in one place only and don't justify a separate file. If that changes in a future version, extracting to `src/data/skills.ts` is a trivial refactor.

### **5.1 Type Definitions**

* // src/data/types.ts  
*   
* export interface Project {  
*   id: string;  
*   title: string;  
*   type: 'professional' | 'personal';  
*   description: string;           // 2–3 sentences max  
*   thumbnail: string;             // filename only, e.g. "pawangbisnis.webp"  
*   techStack: string\[\];  
*   liveUrl?: string;  
*   repoUrl?: string;  
*   featured: boolean;             // true \= shown on home page preview  
*   order: number;                 // display order within type group  
* }  
*   
* export interface Experience {  
*   company: string;  
*   role: string;  
*   location: string;  
*   startDate: string;             // display string: "May 2026"  
*   endDate: string;               // display string: "Present" | "Dec 2024"  
*   current: boolean;  
*   category: 'primary' | 'prior'; // "prior" groups older non-engineering roles under a separate heading  
*   secondment?: {                 // for roles where you were staffed to a client via another employer  
*     client: string;              // e.g. "INA Digital"  
*     startDate: string;  
*     endDate: string;  
*     highlights: string\[\];        // bullet points specific to the secondment period  
*   };  
*   highlights: string\[\];          // bullet points from resume  
* }


  ### **5.2 Projects Data File**

* // src/data/projects.ts  
* import type { Project } from './types';  
*   
* export const projects: Project\[\] \= \[  
*   {  
*     id: 'pawangbisnis',  
*     title: 'PawangBisnis',  
*     type: 'professional',  
*     description: 'TODO: 2–3 sentence description.',  // owner to fill in  
*     thumbnail: 'pawangbisnis.webp',  
*     techStack: \['React', 'Next.js', 'Tailwind CSS'\],  // owner to confirm  
*     liveUrl: 'https://pawangbisnis.com',  
*     featured: true,  
*     order: 1,  
*   },  
*   {  
*     id: 'idsc',  
*     title: 'IDSC',  
*     type: 'professional',  
*     description: 'TODO: 2–3 sentence description.',  
*     thumbnail: 'idsc.webp',  
*     techStack: \['React', 'Tailwind CSS'\],             // owner to confirm  
*     liveUrl: undefined,                               // confirm if publicly linkable  
*     featured: true,  
*     order: 2,  
*   },  
*   {  
*     id: 'nyambat',  
*     title: 'nyambat.id',  
*     type: 'personal',  
*     description: 'TODO: 2–3 sentence description.',  
*     thumbnail: 'nyambat.webp',  
*     techStack: \[\],                                    // owner to confirm  
*     featured: false,  
*     order: 1,  
*   },  
* \];  
*   
* export const featuredProjects \= projects.filter(p \=\> p.featured);


  ### **5.3 Using in Pages**

* \---  
* // src/pages/projects.astro  
* import { projects } from '../data/projects';  
*   
* const professional \= projects  
*   .filter(p \=\> p.type \=== 'professional')  
*   .sort((a, b) \=\> a.order \- b.order);  
*   
* const personal \= projects  
*   .filter(p \=\> p.type \=== 'personal')  
*   .sort((a, b) \=\> a.order \- b.order);  
* \---


> **Content dependency:** All `TODO` fields must be filled in before the `/projects` page is development-complete. See PRD Section 10\.

---

## **6\. Component Architecture**

Components follow a three-tier model: **layout → sections → ui**.

| Tier | Description | Examples |
| ----- | ----- | ----- |
| `layout/` | Full-page structural wrappers | `Header.astro`, `Footer.astro` |
| `sections/` | Page-level content blocks, consume data | `Hero.astro`, `WorkTimeline.astro` |
| `ui/` | Stateless, reusable primitives | `ProjectCard.astro`, `Button.astro`, `SkillTag.astro` |

### **6.3 TimelineItem**

Renders a single work experience entry. If the entry has a `secondment` field, it renders a nested sub-entry visually indented under the parent block — sharing the same left timeline rail but offset to signal it's subordinate.

* ┌─────────────────────────────────────┐  
* │ ● PT. Digital Data Integrasi        │  ← parent entry  
* │   Technical Consultant              │  
* │   Feb 2024 – May 2026               │  
* │   · highlight 1                     │  
* │   · highlight 2                     │  
* │                                     │  
* │   ┌─────────────────────────────┐   │  ← nested secondment sub-entry  
* │   │ ↳ Client: INA Digital       │   │  
* │   │   May 2024 – Dec 2024       │   │  
* │   │   · highlight 1             │   │  
* │   └─────────────────────────────┘   │  
* └─────────────────────────────────────┘


The nested block uses a visual treatment distinct from the main entry — a lighter border, slightly muted text, and an indented left margin — to make the staffing relationship immediately readable without needing explanatory copy.

* \---  
* // src/components/ui/TimelineItem.astro  
* import type { Experience } from '../../data/types';  
*   
* interface Props {  
*   experience: Experience;  
* }  
* const { experience } \= Astro.props;  
* const { company, role, location, startDate, endDate, current, highlights, secondment } \= experience;  
* \---  
*   
* \<article class="timeline-item reveal-on-scroll"\>  
*   \<\!-- Main entry \--\>  
*   \<div class="timeline-main"\>  
*     \<h3\>{role}\</h3\>  
*     \<p class="company"\>{company} · {location}\</p\>  
*     \<p class="dates"\>  
*       {startDate} – {current ? 'Present' : endDate}  
*     \</p\>  
*     \<ul\>  
*       {highlights.map(h \=\> \<li\>{h}\</li\>)}  
*     \</ul\>  
*   \</div\>  
*   
*   \<\!-- Nested secondment sub-entry, rendered only if present \--\>  
*   {secondment && (  
*     \<div class="timeline-secondment"\>  
*       \<p class="secondment-label"\>↳ Client engagement: {secondment.client}\</p\>  
*       \<p class="dates"\>{secondment.startDate} – {secondment.endDate}\</p\>  
*       \<ul\>  
*         {secondment.highlights.map(h \=\> \<li\>{h}\</li\>)}  
*       \</ul\>  
*     \</div\>  
*   )}  
* \</article\>


This keeps `TimelineItem.astro` as a single component — no separate `SecondmentItem` component needed. The secondment block is conditionally rendered and styled purely via Tailwind utility classes.

Every page uses `BaseLayout.astro`. It handles `<head>` metadata, the theme initialization script, and global structural wrappers.

* \---  
* // src/layouts/BaseLayout.astro  
* interface Props {  
*   title: string;  
*   description: string;  
*   ogImage?: string;  
* }  
* const { title, description, ogImage \= '/images/og/og-default.jpg' } \= Astro.props;  
* \---  
* \<html lang="en"\>  
*   \<head\>  
*     \<meta charset="UTF-8" /\>  
*     \<meta name="viewport" content="width=device-width, initial-scale=1.0" /\>  
*     \<title\>{title}\</title\>  
*     \<meta name="description" content={description} /\>  
*   
*     \<\!-- Open Graph \--\>  
*     \<meta property="og:title" content={title} /\>  
*     \<meta property="og:description" content={description} /\>  
*     \<meta property="og:image" content={ogImage} /\>  
*     \<meta property="og:type" content="website" /\>  
*   
*     \<\!-- CRITICAL: theme script must be inline and first to prevent FOUC \--\>  
*     \<script is:inline\>  
*       const stored \= localStorage.getItem('theme');  
*       const prefersDark \= window.matchMedia('(prefers-color-scheme: dark)').matches;  
*       if (stored \=== 'dark' || (\!stored && prefersDark)) {  
*         document.documentElement.classList.add('dark');  
*       }  
*     \</script\>  
*   
*     \<link rel="canonical" href={Astro.url} /\>  
*   \</head\>  
*   \<body\>  
*     \<Header /\>  
*     \<main\>  
*       \<slot /\>  
*     \</main\>  
*     \<Footer /\>  
*   \</body\>  
* \</html\>


  ### **6.2 ProjectCard**

* \---  
* // src/components/ui/ProjectCard.astro  
* interface Props {  
*   title: string;  
*   description: string;  
*   thumbnail: string;  
*   techStack: string\[\];  
*   liveUrl?: string;  
*   repoUrl?: string;  
* }  
* \---  
* \<\!-- Card markup with fade-in class for scroll observer targeting \--\>  
* \<article class="project-card reveal-on-scroll"\>  
*   ...  
* \</article\>  
    
  ---

  ## **7\. Theming — Dark Mode Implementation**

  ### **7.1 Strategy**

Use Tailwind's **class-based dark mode** (`darkMode: 'class'` in config). The `dark` class is toggled on `<html>`. Theme preference is persisted in `localStorage`.

**The critical problem to solve:** If you load the theme toggle script after page render, users on dark mode will see a flash of light mode first (FOUC — Flash of Unstyled Content). The fix is an **inline script in `<head>`** that runs synchronously before any HTML is painted (see `BaseLayout.astro` above).

### **7.2 Toggle Component**

* \---  
* // src/components/ui/ThemeToggle.astro  
* \---  
* \<button id="theme-toggle" aria-label="Toggle dark mode"\>  
*   \<\!-- Sun icon (shown in dark mode) \--\>  
*   \<span class="hidden dark:block"\>☀\</span\>  
*   \<\!-- Moon icon (shown in light mode) \--\>  
*   \<span class="block dark:hidden"\>☾\</span\>  
* \</button\>  
*   
* \<script\>  
*   const toggle \= document.getElementById('theme-toggle');  
*   toggle?.addEventListener('click', () \=\> {  
*     const isDark \= document.documentElement.classList.toggle('dark');  
*     localStorage.setItem('theme', isDark ? 'dark' : 'light');  
*   });  
* \</script\>


  ### **7.3 CSS Custom Properties**

Define semantic color tokens in `global.css` for both modes, consumed by Tailwind utilities via `@theme`:

* /\* src/styles/global.css \*/  
* @import "tailwindcss";  
*   
* @layer base {  
*   :root {  
*     /\* Light mode — Slate \+ Indigo \*/  
*     \--color-bg: \#F8FAFC;           /\* Slate 50 \*/  
*     \--color-surface: \#F1F5F9;      /\* Slate 100 \*/  
*     \--color-text-primary: \#0F172A; /\* Slate 900 \*/  
*     \--color-text-muted: \#475569;   /\* Slate 600 \*/  
*     \--color-accent: \#4F46E5;       /\* Indigo 600 \*/  
*     \--color-border: \#E2E8F0;       /\* Slate 200 \*/  
*   }  
*   
*   .dark {  
*     \--color-bg: \#020617;           /\* Slate 950 \*/  
*     \--color-surface: \#0F172A;      /\* Slate 900 \*/  
*     \--color-text-primary: \#F8FAFC; /\* Slate 50 \*/  
*     \--color-text-muted: \#94A3B8;   /\* Slate 400 \*/  
*     \--color-accent: \#6366F1;       /\* Indigo 500 \*/  
*     \--color-border: \#1E293B;       /\* Slate 800 \*/  
*   }  
* }


These custom properties are the source of truth. Where Tailwind utility classes are sufficient (e.g. `bg-slate-50 dark:bg-slate-950`), prefer those directly in components. Reserve the CSS variables for cases where you need to reference a color in custom CSS outside of Tailwind utilities.

---

## **8\. Animation Strategy**

**Principle:** No animation library. All motion is handled by the browser's native Intersection Observer API \+ CSS transitions.

### **8.1 Scroll Reveal Pattern**

Any element with the class `reveal-on-scroll` starts invisible and transitions in when it enters the viewport.

* /\* global.css \*/  
* .reveal-on-scroll {  
*   opacity: 0;  
*   transform: translateY(16px);  
*   transition: opacity 0.5s ease, transform 0.5s ease;  
* }  
*   
* .reveal-on-scroll.is-visible {  
*   opacity: 1;  
*   transform: translateY(0);  
* }  
    
* // src/scripts/animations.ts  
* export function initScrollReveal() {  
*   const observer \= new IntersectionObserver(  
*     (entries) \=\> {  
*       entries.forEach((entry) \=\> {  
*         if (entry.isIntersecting) {  
*           entry.target.classList.add('is-visible');  
*           observer.unobserve(entry.target); // animate once, not on every scroll  
*         }  
*       });  
*     },  
*     { threshold: 0.1 }  
*   );  
*   
*   document.querySelectorAll('.reveal-on-scroll').forEach((el) \=\> {  
*     observer.observe(el);  
*   });  
* }  
    
* \<\!-- Call in BaseLayout.astro \--\>  
* \<script\>  
*   import { initScrollReveal } from '../scripts/animations';  
*   document.addEventListener('DOMContentLoaded', initScrollReveal);  
* \</script\>


  ### **8.2 Accessibility — Respect `prefers-reduced-motion`**

* @media (prefers-reduced-motion: reduce) {  
*   .reveal-on-scroll {  
*     opacity: 1;  
*     transform: none;  
*     transition: none;  
*   }  
* }


This is not optional — it's required for accessibility compliance and takes 4 lines.

---

## **9\. SEO Implementation**

| Requirement | Implementation |
| ----- | ----- |
| Unique `<title>` per page | `BaseLayout` prop, format: `"Page Name — Gery Pratama"` |
| `<meta description>` | `BaseLayout` prop, 150–160 chars per page |
| Open Graph tags | In `BaseLayout`, using page-specific props |
| Canonical URL | `<link rel="canonical" href={Astro.url} />` in `BaseLayout` |
| Sitemap | `@astrojs/sitemap` integration — auto-generates `/sitemap-index.xml` |
| `robots.txt` | Static file in `/public/robots.txt`, permissive |
| Image `alt` text | Required on all `<img>` and Astro `<Image>` components |
| Semantic HTML | `<main>`, `<article>`, `<section>`, `<nav>`, `<time>` used correctly |

### **robots.txt**

* User-agent: \*  
* Allow: /  
* Sitemap: https://yourdomain.com/sitemap-index.xml  
    
  ---

  ## **10\. Image Handling**

Use Astro's built-in `<Image>` component for all project thumbnails. It handles:

* WebP conversion at build time  
* Responsive `srcset` generation  
* Enforced `width`/`height` to prevent layout shift (CLS)  
* \---  
* import { Image } from 'astro:assets';  
* \---  
* \<Image  
*   src={import(\`../../public/images/projects/${thumbnail}\`)}  
*   alt={\`${title} project screenshot\`}  
*   width={800}  
*   height={450}  
*   format="webp"  
*   loading="lazy"  
* /\>


All project thumbnail images must share the same aspect ratio (**16:9 recommended**) for consistent card layout across the projects grid.

---

## **11\. Contact Form Integration**

The form posts to formly.email's endpoint. No JS required — it's a standard HTML form action.

* \<\!-- src/components/sections/ContactForm.astro \--\>  
* \<form  
*   action="https://formly.email/f/YOUR\_FORM\_ID"  
*   method="POST"  
* \>  
*   \<input type="text" name="name" required /\>  
*   \<input type="email" name="email" required /\>  
*   \<input type="text" name="subject" required /\>  
*   \<textarea name="message" required\>\</textarea\>  
*   
*   \<\!-- Honeypot field — spam prevention, must stay hidden \--\>  
*   \<input type="text" name="\_gotcha" style="display:none" /\>  
*   
*   \<button type="submit"\>Send Message\</button\>  
* \</form\>


**Post-launch action required:** After DNS is switched to the custom domain, update the allowed domain in the formly.email dashboard. The form will reject submissions from unregistered domains.

---

## **12\. CV Download**

The CV PDF is stored as a static asset and served directly by Vercel's CDN — no server logic needed.

* public/  
* └── cv/  
*     └── gery-pratama-cv.pdf  
    
* \<\!-- Usage in any component \--\>  
* \<a href="/cv/gery-pratama-cv.pdf" download="Gery\_Pratama\_CV.pdf"\>  
*   Download CV  
* \</a\>


**Maintenance note:** When the CV is updated, replace the file in `/public/cv/`. If the filename stays the same, no code changes are needed. Consider versioning the filename (e.g. `gery-pratama-cv-2026.pdf`) if you want to force cache busting.

---

## **13\. Build & Deployment**

### **13.1 Local Development**

* npm create astro@latest portfolio  
* cd portfolio  
* npm install  
* npm run dev        \# http://localhost:4321


  ### **13.2 Vercel Configuration**

1. Create a **new Vercel project** — do not reuse the existing Remix project  
2. Connect to the new GitHub repository  
3. Vercel auto-detects Astro — no custom build config needed  
4. Build command: `astro build` (auto-detected)  
5. Output directory: `dist` (auto-detected)  
6. Add environment variables: none required for v1

   ### **13.3 Domain Migration (Zero-Downtime)**

Execute in this order to avoid any gap in availability:

* 1\. Build and deploy Astro site to Vercel → live at \*.vercel.app URL  
* 2\. Test all pages, form, CV download, dark mode on the preview URL  
* 3\. Add custom domain to the NEW Vercel project  
* 4\. Update DNS records at registrar (A record / CNAME to Vercel)  
* 5\. Wait for DNS propagation (minutes to hours)  
* 6\. Verify custom domain is live and SSL cert issued  
* 7\. Update formly.email allowed domain  
* 8\. On the OLD Vercel project: add a redirect rule from gerypratama.vercel.app → new domain  
* 9\. Archive the old Remix repo on GitHub


  ### **13.4 Branch Strategy (Minimal, Solo Dev)**

* main        → production (auto-deploys to Vercel)  
* dev         → active development (Vercel preview deploys)


No need for feature branches on a solo project. Open PRs from `dev` → `main` for each meaningful milestone so there's a clean merge history.

---

## **14\. Performance Targets & Strategy**

| Metric | Target | How |
| ----- | ----- | ----- |
| Lighthouse Performance | ≥ 90 desktop | Astro ships zero JS by default; static HTML |
| LCP (Largest Contentful Paint) | \< 2.5s | Hero section has no heavy image; fonts preloaded |
| CLS (Cumulative Layout Shift) | \< 0.1 | Explicit width/height on all images via `<Image>` |
| Bundle size | \< 10KB JS | No framework; only theme toggle \+ scroll observer scripts |
| Font loading | No layout shift | Use `font-display: swap`; limit to 1–2 typefaces |

---

## **15\. Accessibility Baseline**

These are non-negotiable minimums, not stretch goals:

* All interactive elements reachable via keyboard (`Tab`, `Enter`, `Space`)  
* `aria-label` on icon-only buttons (e.g. theme toggle, social links)  
* Color contrast ratio ≥ 4.5:1 for body text in both light and dark modes  
* `prefers-reduced-motion` respected for all animations (see Section 8.2)  
* Correct heading hierarchy (`h1` → `h2` → `h3`) on every page — never skip levels for visual sizing  
* `lang="en"` on `<html>`  
  ---

  ## **16\. Technical Risks & Mitigations**

| Risk | Detail | Mitigation |
| ----- | ----- | ----- |
| Tailwind v4 \+ Astro compatibility issues | v4 uses a Vite plugin, not PostCSS. Integration pattern is different from v3. | **Confirmed:** `@tailwindcss/vite` is the current approach per Tailwind docs. Pin versions in `package.json` at project start. |
| FOUC on dark mode | If theme script loads too late, dark-mode users see a flash of light mode | Inline `<script is:inline>` in `<head>` before any styled content (see Section 7.1) |
| formly.email domain rejection post-migration | Form will silently fail if domain isn't updated | Add formly.email update to launch checklist; test form before announcing the site |
| CV PDF becomes stale | PDF in `/public` is not auto-updated | Document a manual update process; consider versioned filename |
| Project images inconsistent size/ratio | Mixed aspect ratios break grid layout | Standardize all thumbnails to 16:9 at 800×450px before development |

  ---

  ## **17\. Out of Scope — Future Architecture Considerations**

These are not part of v1 but listed to avoid decisions that would block them later:

* **CMS integration:** The `src/data/` files can be replaced with a CMS data fetcher (Astro supports Contentful, Sanity, Notion loaders) without touching page components or UI — the data layer is already abstracted behind typed interfaces.  
* **Content Collections (upgrade path):** If the site grows to 10+ projects or adds a blog, migrating from `src/data/*.ts` to Astro Content Collections is straightforward — same interfaces, same query patterns, just a different source.  
* **Project detail pages:** Adding `pages/projects/[slug].astro` with `getStaticPaths()` is a straightforward extension; the `id` field on each project is already set up for this.  
* **Blog:** A separate data file or Content Collection \+ `pages/blog/[slug].astro` follows the same pattern.  
* **i18n:** Astro has first-party i18n routing support — can be added without a structural rewrite.