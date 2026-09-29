// src/scripts/animations.ts
// Scroll reveal via native IntersectionObserver — no animation library.
// Architecture Section 8.1.
//
// The `prefers-reduced-motion` override lives in global.css (Architecture
// Section 8.2), so no extra branching is needed here.

/**
 * Reveals every `.reveal-on-scroll` element once it enters the viewport.
 * Each element is unobserved after its first reveal, so it animates once
 * rather than on every scroll.
 */
export function initScrollReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once, not on every scroll
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}
