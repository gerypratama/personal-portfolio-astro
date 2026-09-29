// src/scripts/theme.ts
// User-initiated dark mode toggle.
// Architecture Section 7.2.
//
// The anti-FOUC counterpart lives as an inline `is:inline` script in
// BaseLayout.astro <head> — it must run before first paint, so it cannot be
// imported from here. This module only handles the click interaction.

const THEME_KEY = 'theme';

/**
 * Wires the ThemeToggle button:
 * toggles the `dark` class on <html> and persists the choice to localStorage.
 * Also syncs `aria-pressed` so assistive tech reflects the current state.
 */
export function initThemeToggle(): void {
  const toggle = document.getElementById('theme-toggle');
  if (!(toggle instanceof HTMLButtonElement)) return;

  const syncPressedState = (isDark: boolean) => {
    toggle.setAttribute('aria-pressed', String(isDark));
  };

  // Reflect whatever the inline head script already decided.
  syncPressedState(document.documentElement.classList.contains('dark'));

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    syncPressedState(isDark);
  });
}
