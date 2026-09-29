// src/data/experience.ts
// Work timeline consumed by WorkTimeline → TimelineItem on /about (PRD A2).
//
// Source of truth: docs/resume_content.md (owner-supplied, committed 2026-09-29).
//   - Highlights are the resume bullets, verbatim. Nothing here is invented,
//     paraphrased or reworded.
//   - `category: 'prior'` holds the older non-engineering roles, grouped under a
//     separate heading (Architecture 5.1).
//   - NO `secondment` block is populated anywhere. The May 2024 – Dec 2024 INA
//     Digital client engagement under PT. Digital Data Integrasi is omitted
//     entirely and deliberately not genericized (confirmed owner decision —
//     .clinerules/03-content-status.md, memory-bank/Decisions.md).
//     INA Digital's own "May 2026 – Present" entry is a direct employment entry
//     and is kept (owner confirmation, 2026-09-29).
//   - Education and certifications are intentionally absent: the Experience type
//     has no field for them and no v1 PRD requirement covers them.
//   - Entries are ordered newest-first within each category; WorkTimeline groups them.

import type { Experience } from './types';

export const experience: Experience[] = [
  {
    company: 'INA Digital',
    role: 'Frontend Developer',
    location: 'South Jakarta, Indonesia',
    startDate: 'May 2026',
    endDate: 'Present',
    current: true,
    category: 'primary',
    highlights: [
      'Developed and optimized responsive, user-friendly interfaces for a civil servants internal platform.',
      'Collaborated with UI/UX designers and backend developers to implement intuitive designs.',
      'Integrated APIs and ensured seamless interaction between frontend and backend systems.',
      'Migrated legacy frontend code from Remix to Astro.',
    ],
  },
  {
    company: 'PT. Digital Data Integrasi',
    role: 'Technical Consultant',
    location: 'South Jakarta, Indonesia',
    startDate: 'Feb 2024',
    endDate: 'May 2026',
    current: false,
    category: 'primary',
    highlights: [
      'Wrote scripts to automate browser-facing clerical work based on Python and Selenium.',
      "Built the company's support/issue ticketing system for active projects/clients.",
      'Built a simple ETL tool using Node.js to import raw CSV data.',
      'Built 10+ dashboard pages UI across multiple business processes with RBAC.',
      'Developed responsive web interfaces, ensuring seamless UI/UX and optimized performance.',
      'Analyzed complex data relationships using Neo4j, applying Cypher queries for modeling and insights.',
      'Bridged frontend development with data-driven solutions for enhanced project outcomes.',
    ],
  },
  {
    company: 'Integrated Decision System Consultancy Pte Ltd',
    role: 'Part-time Frontend Developer',
    location: 'Singapore (Remote)',
    startDate: 'Sep 2022',
    endDate: 'Present',
    current: true,
    category: 'primary',
    highlights: [
      "Rebuilt the company's old website using vanilla HTML, CSS, and JavaScript.",
      "Migrated the company's website source code to React.js to accommodate further demo features.",
      "Developed the company's microservices product demo & API documentation CMS UI/platform.",
    ],
  },
  {
    company: 'PT. Barrans Global Mandiri',
    role: 'Frontend Developer Intern',
    location: 'Bandung, Indonesia',
    startDate: 'May 2022',
    endDate: 'Jul 2022',
    current: false,
    category: 'primary',
    highlights: [
      "Developed dashboard and landing page for the company's bootcamp candidate management web app using React.js in a team of 6 developers.",
      "Experimented with Monaco Editor to develop an online coding platform for the company's bootcamp coding test.",
      "Experimented with Next.js to migrate the company's bootcamp division website from vanilla HTML, CSS, and JavaScript.",
    ],
  },
  {
    company: 'Appen',
    role: 'Crowdsourced Data Contractor',
    location: 'Global (Remote)',
    startDate: 'May 2016',
    endDate: 'May 2022',
    current: false,
    category: 'prior',
    highlights: [
      'Completed crowdsourced micro-tasks supporting ML training and evaluation, including data annotation, search relevance rating, and data collection across 5+ client projects (details restricted under NDA).',
    ],
  },
  {
    company: 'SMAIT Miftahul Khoir',
    role: 'Math Teacher & IT Support Staff',
    location: 'Bandung, Indonesia',
    startDate: 'Jul 2014',
    endDate: 'Oct 2021',
    current: false,
    category: 'prior',
    highlights: [
      'Taught mathematics; later managed school IT infrastructure, including network setup and website maintenance during the transition to online learning.',
    ],
  },
];
