// src/data/types.ts
// Shared interfaces for the data layer.
// Verbatim from Technical Architecture Section 5.1.

export interface Project {
  id: string;
  title: string;
  type: 'professional' | 'personal';
  description: string;           // 2–3 sentences max
  thumbnail: string;             // filename only, e.g. "pawangbisnis.webp"
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;             // true = shown on home page preview
  order: number;                 // display order within type group
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;             // display string: "May 2026"
  endDate: string;               // display string: "Present" | "Dec 2024"
  current: boolean;
  category: 'primary' | 'prior'; // "prior" groups older non-engineering roles under a separate heading
  secondment?: {                 // for roles where you were staffed to a client via another employer
    client: string;              // e.g. "INA Digital"
    startDate: string;
    endDate: string;
    highlights: string[];        // bullet points specific to the secondment period
  };
  highlights: string[];          // bullet points from resume
}