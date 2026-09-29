// src/data/projects.ts
// Architecture Section 5.2 — 3 projects at launch (PRD P1).
//
// Content status (.clinerules/03-content-status.md):
//   - description: ❌ not written by the owner yet. The placeholder strings below
//     are intentionally unshippable (PRD P4 forbids placeholder / "Coming Soon"
//     cards) and are replaced during M5.
//   - techStack: ❌ not confirmed per project. PRD P5 requires accuracy, so the
//     arrays are left empty rather than guessed (resume skill lists are not
//     proof of per-project use). Renders no tags until confirmed in M5.
//   - liveUrl: ✅ confirmed by the owner (2026-09-29). IDSC is cleared for public
//     linking (.clinerules/03). No repoUrl values were provided, so none are set.
//   - thumbnail: ❌ image files do not exist yet in public/images/projects/ —
//     ProjectCard omits the media block until they land (M5).

import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'pawangbisnis',
    title: 'PawangBisnis',
    type: 'professional',
    description:
      '[PLACEHOLDER — PawangBisnis description pending, see .clinerules/03-content-status.md]',
    thumbnail: 'pawangbisnis.webp',
    techStack: [], // owner to confirm (PRD P5)
    liveUrl: 'https://pawangbisnis.com/',
    featured: true,
    order: 1,
  },
  {
    id: 'idsc',
    title: 'IDSC',
    type: 'professional',
    description:
      '[PLACEHOLDER — IDSC description pending, see .clinerules/03-content-status.md]',
    thumbnail: 'idsc.webp',
    techStack: [], // owner to confirm (PRD P5)
    liveUrl: 'https://idsc.com.sg/',
    featured: true,
    order: 2,
  },
  {
    id: 'nyambat',
    title: 'nyambat.id',
    type: 'personal',
    description:
      '[PLACEHOLDER — nyambat.id description pending, see .clinerules/03-content-status.md]',
    thumbnail: 'nyambat.webp',
    techStack: [], // owner to confirm (PRD P5)
    liveUrl: 'https://nyambat-id.vercel.app/',
    featured: false,
    order: 1,
  },
];

// Architecture 5.2 — the home page preview shows the top 2 featured projects (PRD H5).
export const featuredProjects = projects.filter((project) => project.featured);
