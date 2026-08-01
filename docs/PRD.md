# **Product Requirements Document**

## **Personal Portfolio Website — Rewrite & Improvement**

**Owner:** Gery Pratama Oktaviano  
 **Status:** Draft v1.0  
 **Last Updated:** June 2026

---

## **1\. Background & Problem Statement**

The current portfolio site (`gerypratama.vercel.app`) was built with Remix and has not kept pace with career progression. It has several compounding issues that reduce its effectiveness as a professional tool:

* **Stale content:** Bio describes "two years of experience"; copyright footer reads 2024\. Both are visibly wrong to any careful recruiter.  
* **Underrepresentation of skills:** The site positions as a frontend-only developer. The resume reflects full-stack depth (Node.js, Neo4j, ETL tooling, NestJS, Docker) that does not appear anywhere on the site.  
* **Weak project presentation:** Only 2 professional projects are listed. Two personal project slots are "Coming Soon" placeholders — a negative signal on a portfolio.  
* **No global-employer signals:** No downloadable CV, no timezone/remote-readiness context, no clear call-to-action for international hiring audiences.  
* **Technical debt:** Built on Remix, which is being deprecated internally in favor of Astro at the owner's current employer. Rewrite is timely and skill-aligned.  
  ---

  ## **2\. Goals**

| \# | Goal | How It's Measured |
| ----- | ----- | ----- |
| G1 | Accurately represent current skills and seniority level | All content reflects 3+ years of experience and full-stack scope |
| G2 | Convert visiting recruiters/hiring managers into contact leads | Contact form submission rate (baseline: currently unknown) |
| G3 | Be credible to global (non-Indonesian) employers | Site passes a "30-second test" for English fluency, professional polish, and clarity of identity |
| G4 | Load fast and rank on name-based searches | Lighthouse performance ≥ 90; page indexed and appearing for "Gery Pratama developer" |
| G5 | Be maintainable long-term by a solo developer | Content updates require no framework expertise — just editing files |

  ---

  ## **3\. Non-Goals (Explicit Out of Scope)**

* **No blog or writing section** — not planned, not in scope for v1  
* **No CMS integration** — content will be managed directly in code/markdown files  
* **No i18n / multilingual support** — English only  
* **No deep case study pages** — projects are presented as cards, not long-form writeups  
* **No IT consulting-specific positioning** — freelance availability mentioned in contact section only, not a site theme  
* **No e-commerce, booking, or paid features**  
* **No analytics dashboard** — basic Vercel analytics acceptable if already available, but not a requirement  
  ---

  ## **4\. Target Audience**

  ### **Primary: Hiring Managers & Recruiters**

* **Roles they are hiring for:** Frontend Developer, Full-stack Developer  
* **Geographies:** Singapore/APAC, Europe, Southeast Asia, global remote  
* **Behavior:** Typically arrive from LinkedIn, a job application link, or a GitHub profile. Spend under 60 seconds forming an opinion. Will look for: tech stack fit, evidence of shipped work, professional communication ability, and a contact path.

  ### **Secondary: Freelance/Contract Clients**

* Arrive organically or via referral  
* Contact via the same contact form  
* No dedicated positioning needed — a note in the contact section is sufficient  
  ---

  ## **5\. Information Architecture**

* /                   → Home  
* /about              → About  
* /projects           → Projects (all)  
* /contact            → Contact


No nested routes required for v1. Each project does **not** get its own detail page — all project content is contained in the `/projects` listing.

---

## **6\. Page-by-Page Requirements**

### **6.1 Home (`/`)**

**Purpose:** Establish identity immediately and direct the visitor to the most relevant section.

| ID | Requirement | Priority |
| ----- | ----- | ----- |
| H1 | Display name, current title ("Software Engineer / Web Developer"), and location (Jakarta, Indonesia — open to remote) | Must |
| H2 | Single clear primary CTA — "View My Work" linking to `/projects` | Must |
| H3 | Secondary CTA — "Get In Touch" linking to `/contact` | Must |
| H4 | Brief tagline or one-liner (not a full bio paragraph — that lives on `/about`) | Must |
| H5 | Featured projects preview: show top 2 project cards (subset of `/projects`) | Should |
| H6 | Downloadable CV button visible on home page | Must |

**Acceptance criteria:** A first-time visitor who knows nothing about the owner should be able to identify who he is, what he does, and where to go next within 5 seconds.

---

### **6.2 About (`/about`)**

**Purpose:** Give depth on background, skills, and experience for visitors who want more before reaching out.

| ID | Requirement | Priority |
| ----- | ----- | ----- |
| A1 | Bio paragraph — updated, accurate, reflecting 3+ years full-stack experience | Must |
| A2 | Work timeline / experience section — chronological, matching resume | Must |
| A3 | Skills section — grouped by category (Frontend, Backend, Databases, Tools) | Must |
| A4 | Downloadable CV button present on this page as well | Must |
| A5 | No "Coming Soon" content on this page | Must |

**Note on bio copy:** The current bio is stale and misrepresents seniority. It must be fully rewritten before this page can be marked content-complete.

---

### **6.3 Projects (`/projects`)**

**Purpose:** Demonstrate shipped work with enough context to establish credibility.

| ID | Requirement | Priority |
| ----- | ----- | ----- |
| P1 | Display exactly 3 projects at launch: PawangBisnis, IDSC, nyambat.id | Must |
| P2 | Each project card must include: thumbnail/screenshot, project name, short description (2–3 sentences max), and tech stack tags | Must |
| P3 | Projects are grouped by type: Professional Work / Personal Projects | Must |
| P4 | No placeholder or "Coming Soon" cards | Must |
| P5 | Tech stack tags must be accurate and match actual tech used per project | Must |
| P6 | External link to live project or GitHub repo where available and permitted | Should |
| P7 | Thumbnail images must be real screenshots, not placeholder images | Must |

**Content dependency:** Short descriptions and confirmed tech stacks for all 3 projects must be written by the owner before development of this page can be completed.

---

### **6.4 Contact (`/contact`)**

**Purpose:** Provide a frictionless path to reach the owner.

| ID | Requirement | Priority |
| ----- | ----- | ----- |
| C1 | Contact form powered by formly.email (carry over current integration) | Must |
| C2 | Form fields: Name, Email, Subject, Message | Must |
| C3 | All fields required with basic client-side validation | Must |
| C4 | Success state shown after submission (not just a blank redirect) | Must |
| C5 | Email address displayed as a static fallback below the form | Must |
| C6 | LinkedIn and GitHub links present on this page | Must |
| C7 | Brief note indicating openness to freelance/contract work | Should |

---

### **6.5 Global / All Pages**

| ID | Requirement | Priority |
| ----- | ----- | ----- |
| GL1 | Navigation: links to Home, Projects, About, Contact | Must |
| GL2 | Dark mode toggle — light is the default; preference persisted via localStorage | Must |
| GL3 | Footer: copyright (current year, dynamic), LinkedIn, GitHub | Must |
| GL4 | Downloadable CV PDF accessible from nav or persistent CTA | Must |
| GL5 | Fully responsive — usable on mobile, tablet, and desktop | Must |
| GL6 | No broken links, no 404s on internal routes at launch | Must |

---

## **7\. Design Requirements**

| ID | Requirement |
| ----- | ----- |
| D1 | Aesthetic: minimalist — generous whitespace, restrained use of color, no decorative clutter |
| D2 | Default mode: light; dark mode toggled manually by the user |
| D3 | Dark mode preference persisted in localStorage across sessions |
| D4 | Animation: subtle only — fade-ins on page load, scroll-triggered reveals. No looping animations, no parallax, no heavy motion |
| D5 | Typography: clean, professional sans-serif; consistent scale |
| D6 | Color palette must work in both light and dark modes without degraded readability |
| D7 | Project thumbnails must be consistent in aspect ratio across all cards |
| D8 | No stock illustrations, no abstract hero graphics — content-first layout |

---

## **8\. Technical Requirements**

| ID | Requirement |
| ----- | ----- |
| T1 | Framework: Astro.js (latest stable at time of development) |
| T2 | Deployment: Vercel — new project (not the existing Remix Vercel project) |
| T3 | Repository: new GitHub repository, separate from existing Remix repo |
| T4 | Domain: custom domain to be configured in Vercel; `gerypratama.vercel.app` redirects to custom domain post-launch |
| T5 | Styling: Tailwind CSS preferred given owner's existing proficiency |
| T6 | CV download: PDF file stored in the repo's `/public` directory, served as a static asset |
| T7 | Contact form: formly.email (existing account, carry over configuration) |
| T8 | No backend or server-side logic required — fully static output |
| T9 | All pages must be statically generated at build time (Astro SSG mode) |

---

## **9\. SEO & Performance Requirements**

| ID | Requirement |
| ----- | ----- |
| S1 | Each page has a unique, descriptive `<title>` and `<meta description>` |
| S2 | Open Graph tags on all pages (for LinkedIn share previews) |
| S3 | `sitemap.xml` generated at build (Astro's `@astrojs/sitemap` integration) |
| S4 | `robots.txt` present and permissive |
| S5 | Lighthouse Performance score ≥ 90 on desktop |
| S6 | All images use modern formats (WebP) and include `alt` text |
| S7 | Canonical URLs set correctly on all pages |

---

## **10\. Content Requirements & Pre-Launch Checklist**

The following content must be produced by the owner **before** the corresponding page can be marked development-complete. These are blocking dependencies.

| Content Item | Blocking Page | Status |
| ----- | ----- | ----- |
| Updated bio copy (reflecting current seniority and full-stack scope) | `/about`, `/` | ⚠️ Draft exists — resume summary (July 2026 version) is a strong base; needs adaptation for web format |
| Short description (2–3 sentences) for PawangBisnis | `/projects` | ❌ Not written |
| Short description for IDSC | `/projects` | ❌ Not written |
| Short description for nyambat.id | `/projects` | ❌ Not written |
| Confirmed tech stack list per project | `/projects` | ❌ Not confirmed |
| Real thumbnail screenshot for nyambat.id (current is PNG placeholder) | `/projects` | ❌ Missing |
| Updated CV PDF (print-ready, matches current resume) | Global | ❌ Not prepared |
| Custom domain decision and purchase | Global | ❌ Pending |
| formly.email form endpoint/config for new domain | `/contact` | ❌ Pending |

---

## **11\. Constraints & Assumptions**

* **Solo developer:** There is no design handoff, no QA team, and no separate content team. The owner is building and writing everything.  
* **No budget assumed** for paid tools beyond what is currently in use (Vercel free tier, formly.email).  
* **Existing Remix repo is not deleted** — archived as `portfolio-remix` for reference.  
* **The Remix site remains live** on the current Vercel project until the Astro site is production-ready and the domain is swapped.  
* The formly.email integration will need to be updated to the new domain once the custom domain is live.  
* Project screenshots for PawangBisnis and IDSC already exist on the current site and can be reused if quality is acceptable.  
  ---

  ## **12\. Risks**

| Risk | Likelihood | Impact | Mitigation |
| ----- | ----- | ----- | ----- |
| Content not ready before development completion | High | High | Write all content before starting page development, not after |
| Custom domain not purchased/configured before launch | Medium | Medium | Keep old Vercel URL as fallback; domain swap is non-blocking for development |
| formly.email form breaks when domain changes | Medium | Low | Test form submission end-to-end after domain switch before announcing site |
| "Coming Soon" projects never ship, leaving a thin project page long-term | High | Medium | Commit to building at least one new project (Citrakala or Mock Dashboard) within 6 months of launch |
| CV PDF becomes stale after launch | High | Medium | Store PDF in `/public` with a versioned filename; update with every job search cycle |

  ---

  ## **13\. Open Items**

| \# | Item | Owner | Due |
| ----- | ----- | ----- | ----- |
| O1 | Finalise custom domain name | Gery | Before launch |
| O2 | Write all project descriptions and confirm tech stacks | Gery | Before development of `/projects` |
| O3 | Rewrite bio copy | Gery | Before development of `/about` |
| O4 | Prepare print-ready CV PDF | Gery | Before development of any CV download button |
| O5 | Decide on a color palette / design reference (find 1–2 sites as visual references) | Gery | Before development starts |
| O6 | Confirm which projects can be publicly linked (IDSC, INA Digital may have restrictions) | Gery | Before development of `/projects` |

  ---

  ## **14\. Out of Scope for v1 — Potential v2 Additions**

* Blog / writing section  
* CMS-backed content (e.g. Notion, Contentful, Sanity)  
* Case study detail pages per project  
* Testimonials section  
* Multilingual support (EN/ID)  
* Analytics beyond Vercel's built-in dashboard  
* Additional personal projects (Citrakala, Mock Dashboard) — added when built