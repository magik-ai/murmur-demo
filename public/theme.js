export const THEME_KEY = "theme";

const isTheme = (v) => v === "light" || v === "dark";

// The saved choice wins; otherwise follow the system; otherwise light.
export function resolveTheme(saved, systemPrefersDark) {
  if (isTheme(saved)) return saved;
  return systemPrefersDark ? "dark" : "light";
}

export function toggleTheme(theme) {
  return theme === "dark" ? "light" : "dark";
}

// What the toggle will do when pressed.
export function toggleLabel(theme) {
  return theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
}
