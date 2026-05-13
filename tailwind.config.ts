import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        copper: {
          DEFAULT: "#173d8d",
          light: "#2456b8",
          dark: "#0f2d6b",
        },
        gold: {
          DEFAULT: "#2d6de0",
          light: "#3a7bd5",
        },
        dark: {
          bg: "#0f0f0f",
          card: "#1a1a1a",
          surface: "#252525",
        },
        light: {
          bg: "#fafafa",
          card: "#ffffff",
          surface: "#f5f5f5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(23, 61, 141, 0.3)",
        "glow-lg": "0 0 40px rgba(23, 61, 141, 0.4)",
      },
      animation: {
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
