import { createContext, useContext, useState } from "react";

/**
 * ShapR Theme — colors extracted 1-to-1 from the web CSS files
 *
 * Light mode  → web default (day) styles
 * Dark mode   → web .night-mode styles
 */
export const Themes = {
  light: {
    // ── Page / Shell backgrounds
    background:        "#f0edf8",   // .app-shell bg / --bg
    backgroundAuth:    "#f9fafb",   // login & signup page bg
    backgroundPanel:   "#faf8ff",   // .panel-head bg

    // ── Surfaces (cards, panels, sidebar, topbar)
    card:              "#ffffff",   // all cards, panels, sidebar, topbar
    card2:             "#f7f5fd",   // --surface-2 (profile page)
    card3:             "#f8fafc",   // search input bg (history)
    card4:             "#f3f4f6",   // input bg (login/signup)

    // ── Borders
    border:            "#f3f0fb",   // sidebar border-right, topbar border-bottom
    borderCard:        "rgba(0,0,0,0.08)",  // dashboard cards & panels
    borderHistory:     "#ece2f9",   // history controls, search input
    borderProfile:     "#e8e2f5",   // profile cards (--border)
    borderInput:       "#e5e7eb",   // login/signup input border

    // ── Primary purple (nav active, buttons, toggles, links)
    primary:           "#7C5BD6",   // .nav-item.active, buttons, focus rings
    primaryHover:      "#6a4bc2",   // hover state
    primaryDark:       "#5b3db0",   // --accent-dark
    primaryLight:      "#ede9fe",   // --accent-light, icon backgrounds
    primaryMid:        "#c4b5fd",   // --accent-mid, avatar border focus
    primarySoft:       "rgba(124,91,214,0.10)", // session highlight bg

    // ── Auth brand (login & signup only — deeper purple)
    brand:             "#6a0dad",   // .login-brand, .login-title
    brandHover:        "#560a91",   // .login-btn-primary:hover

    // ── Dashboard-specific purples
    dashIcon:          "#6b57b9",   // .card-ico.purple
    dashTableHeader:   "#4c1d95",   // table thead th color
    dashTableBorder:   "#6f3ee8",   // table thead border-bottom
    dashSaveBtn:       "#6d28d9",   // session form save button
    predict:           "#7c5bd6",   // prediction panel bg

    // ── Text
    text:              "#111827",   // primary body text
    textSecondary:     "#374151",   // labels, form text
    textMuted:         "#6b7280",   // muted / secondary
    textLight:         "#9ca3af",   // placeholders, very muted
    textSlate:         "#64748b",   // table header cells (history)
    textDark:          "#1e293b",   // history title / modal title
    textProfile:       "#1a1535",   // profile --text-1
    textProfile2:      "#6b6585",   // profile --text-2
    textProfile3:      "#b0aac8",   // profile --text-3
    textBlack:         "#0b0b0b",   // dashboard card value

    // ── Status / Pills
    pillOkBg:          "#d8ffe3",
    pillOkText:        "#0b7a33",
    pillWarnBg:        "#ffe7d4",
    pillWarnText:      "#b94b10",
    productive:        "#2FA84F",
    productiveBg:      "#e6f4ea",
    unproductive:      "#F07A1A",
    unproductiveBg:    "#fce8d5",

    // ── Tips icons
    tipsGoodBg:        "#e8fff0",
    tipsBadBg:         "#fff1e6",

    // ── Danger / logout
    danger:            "#EF4444",
    dangerBg:          "#fff1f1",

    // ── Accent (kept from original, used for star/rating)
    accent:            "#f7ad19",

    // ── Topbar icon hover bg
    topBtnHoverBg:     "#f5f3ff",
  },

  dark: {
    // ── Page / Shell backgrounds
    background:        "#0f0f1a",   // .night-mode bg
    backgroundAuth:    "#0f0f1a",   // login page dark
    backgroundPanel:   "#16162a",   // .night-mode .panel-head

    // ── Surfaces
    card:              "#1e1e35",   // .night-mode cards & panels
    card2:             "#221f33",   // profile --surface-2 night
    card3:             "#12121f",   // input bg night
    card4:             "#16162a",   // sidebar & topbar bg night

    // ── Borders
    border:            "#2a2a45",   // all borders night
    borderCard:        "#2a2a45",
    borderHistory:     "#2a2a45",
    borderProfile:     "#2e2b45",
    borderInput:       "#3a3a5c",

    // ── Primary (same purple, unchanged in night mode)
    primary:           "#7C5BD6",
    primaryHover:      "#6a4bc2",
    primaryDark:       "#5b3db0",
    primaryLight:      "rgba(124,91,214,0.20)",  // night icon bg
    primaryMid:        "#c4b5fd",
    primarySoft:       "#251e40",   // session highlight night

    // ── Auth brand night
    brand:             "#a78bfa",   // .night-mode .login-title
    brandHover:        "#6B4BC0",

    // ── Dashboard-specific
    dashIcon:          "#a78bfa",
    dashTableHeader:   "#a78bfa",
    dashTableBorder:   "#4a3a7a",
    dashSaveBtn:       "#6d28d9",
    predict:           "#7c5bd6",

    // ── Text
    text:              "#e0e0f0",   // .night-mode body text
    textSecondary:     "#c0c0d0",
    textMuted:         "#8b8fb8",
    textLight:         "#9ca3b8",
    textSlate:         "#8b8fb8",
    textDark:          "#f0f0f0",
    textProfile:       "#f0eeff",
    textProfile2:      "#a09abf",
    textProfile3:      "#6b6585",
    textBlack:         "#e0e0f0",

    // ── Status / Pills (unchanged)
    pillOkBg:          "#d8ffe3",
    pillOkText:        "#0b7a33",
    pillWarnBg:        "#ffe7d4",
    pillWarnText:      "#b94b10",
    productive:        "#2FA84F",
    productiveBg:      "#e6f4ea",
    unproductive:      "#F07A1A",
    unproductiveBg:    "#fce8d5",

    // ── Tips icons (unchanged)
    tipsGoodBg:        "#e8fff0",
    tipsBadBg:         "#fff1e6",

    // ── Danger
    danger:            "#f87171",   // .night-mode logout
    dangerBg:          "#2a1f1f",

    // ── Accent
    accent:            "#f7ad19",

    // ── Topbar hover
    topBtnHoverBg:     "#1e1e38",
  },
};

type ThemeType = "light" | "dark";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isNight = theme === "dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isNight,
        colors: Themes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);