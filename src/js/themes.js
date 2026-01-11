import { $ } from "./utils.js";

const THEME_KEY = "uni-theme-new";
const THEMES = ["onyx", "alabaster", "spectrum"];

/**
 * Applies a theme to the document body and updates UI elements.
 * @param {string} theme - The theme name to apply.
 */
export function setTheme(theme) {
    if (!THEMES.includes(theme)) theme = "onyx";

    // Remove all possible theme classes
    document.body.classList.remove(...THEMES.map(t => `theme-${t}`));
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);

    // Update custom UI active state for theme buttons
    document.querySelectorAll(".theme-opt").forEach((opt) => {
        opt.classList.toggle("active", opt.dataset.theme === theme);
    });

    localStorage.setItem(THEME_KEY, theme);
}

/**
 * Initializes the theme system by loading the saved theme or defaulting to onyx.
 */
export function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "onyx";
    setTheme(savedTheme);
}

/**
 * Sets up event listeners for the theme toggle and dropdown.
 */
export function bindThemeEvents() {
    const btnThemeToggle = $("#btnThemeToggle");
    const themeDropdown = $("#themeDropdown");

    if (btnThemeToggle && themeDropdown) {
        btnThemeToggle.onclick = (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle("hidden");
        };

        themeDropdown.onclick = (e) => {
            const opt = e.target.closest(".theme-opt");
            if (opt) {
                e.stopPropagation();
                setTheme(opt.dataset.theme);
                themeDropdown.classList.add("hidden");
            }
        };
    }

    // Close dropdown on outside click
    window.addEventListener("click", () => {
        themeDropdown?.classList.add("hidden");
    });
}
