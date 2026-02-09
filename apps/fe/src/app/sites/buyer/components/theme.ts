export function applyInitialTheme() {
  if (typeof window === "undefined") return;

  try {
    const savedTheme = localStorage.theme;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : !!prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
  } catch {
    // Ignore storage access issues.
  }
}

export function toggleDarkMode() {
  if (typeof window === "undefined") return;

  try {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
  } catch {
    // Ignore storage access issues.
  }
}
