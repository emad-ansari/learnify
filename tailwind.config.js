/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4 content paths — adjust globs to match your project structure
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────
        // BRAND / PRIMARY  (teal family)
        // Base: #229F92 (Sign Up button)
        // ─────────────────────────────────────────────
        primary: {
          DEFAULT: "#229F92", // Sign Up button bg  — your exact value
          light: "#84D0C9", // Gradient start / radial highlight
          muted: "#97D1CB", // Welcome-back badge background
          subtle: "#CCEFEB", // Form container background
          dark: "#1A7E73", // [ADJUSTED] Slightly darker for pressed/active states — gives better contrast vs DEFAULT
        },

        // ─────────────────────────────────────────────
        // SECONDARY / ACCENT  (deep teal text)
        // Base: #2E5652 (Welcome-back badge text)
        // ─────────────────────────────────────────────
        secondary: {
          DEFAULT: "#2E5652", // Badge text — your exact value
          light: "#5A7B78", // Username label text — your exact value
          muted: "#819C99", // Input field border — your exact value
        },

        // ─────────────────────────────────────────────
        // FOREGROUND  (text on light backgrounds)
        // ─────────────────────────────────────────────
        foreground: {
          DEFAULT: "#2E5652", // Primary readable text (reuse secondary)
          muted: "#7D7D7D", // "Explore courses…" paragraph — your exact value
          subtle: "#92A5A3", // Icon & placeholder text inside inputs — your exact value
          // [ADJUSTED] Adding a near-black for future headings/titles
          strong: "#1C3734", // Not used in mockup yet; derived from secondary darkened
        },

        // ─────────────────────────────────────────────
        // BACKGROUND  (screen & surface)
        // ─────────────────────────────────────────────
        background: {
          DEFAULT: "#F9F9FB", // Gradient end / base screen bg — your exact value
          gradient: "#84D0C9", // Gradient start (same as primary.light)
          surface: "#CCEFEB", // Card / form container — matches primary.subtle
          // [ADJUSTED] Adding a pure white alias for inner input backgrounds
          input: "#FFFFFF", // Input field fill — white gives clean contrast on #CCEFEB surface
        },

        // ─────────────────────────────────────────────
        // BORDER
        // ─────────────────────────────────────────────
        border: {
          DEFAULT: "#819C99", // Input field border — your exact value
          // [ADJUSTED] Focus ring: slight darkening of primary for accessibility
          focus: "#229F92", // Active/focused input ring (reuse primary)
        },

        // ─────────────────────────────────────────────
        // STATUS COLORS  (not in mockup — added for completeness)
        // [ADJUSTED] Derived to stay consistent with the teal palette
        // ─────────────────────────────────────────────
        success: "#229F92", // Reuse primary — fits a learning app's positive tone
        error: "#D9534F", // Standard accessible red — added for form validation
        warning: "#E8A838", // Warm amber — added for future notifications
      },

      // ─────────────────────────────────────────────
      // FONT FAMILIES
      // Add your Expo font names here after loading them
      // ─────────────────────────────────────────────
      fontFamily: {
        sans: ["Poppins_400Regular", "sans-serif"],
        medium: ["Poppins_500Medium", "sans-serif"],
        semibold: ["Poppins_600SemiBold", "sans-serif"],
        bold: ["Poppins_700Bold", "sans-serif"],
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS  (rounded feel matching mockup)
      // ─────────────────────────────────────────────
      borderRadius: {
        input: "12px", // Input fields
        card: "24px", // Form container card
        badge: "999px", // Pill-shaped "WELCOME BACK" badge
        btn: "16px", // Sign Up button
      },
    },
  },

  plugins: [],
};
