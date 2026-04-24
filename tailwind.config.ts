import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Obsidian Agency custom palette
        violet: {
          DEFAULT: "hsl(var(--violet))",
          bright:  "hsl(var(--violet-bright))",
          dim:     "hsl(var(--violet-dim))",
        },
        indigo: {
          DEFAULT: "hsl(var(--indigo))",
          dim:     "hsl(var(--indigo-dim))",
        },
        surface: {
          base:     "hsl(var(--surface-base))",
          card:     "hsl(var(--surface-card))",
          elevated: "hsl(var(--surface-elevated))",
          hover:    "hsl(var(--surface-hover))",
        },
        sidebar: {
          DEFAULT:            "hsl(var(--sidebar-background))",
          foreground:         "hsl(var(--sidebar-foreground))",
          primary:            "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:             "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border:             "hsl(var(--sidebar-border))",
          ring:               "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        xl:   "calc(var(--radius) + 4px)",
        "2xl":"calc(var(--radius) + 8px)",
      },
      backgroundImage: {
        "gradient-violet":  "var(--gradient-violet)",
        "gradient-surface": "var(--gradient-surface)",
        "gradient-hero":    "var(--gradient-hero)",
      },
      boxShadow: {
        "glow":     "var(--shadow-glow)",
        "glow-lg":  "var(--shadow-glow-lg)",
        "card":     "var(--shadow-card)",
        "elevated": "var(--shadow-elevated)",
      },
      transitionTimingFunction: {
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring":     "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      transitionDuration: {
        "instant": "50ms",
        "fast":    "150ms",
        "normal":  "250ms",
        "slow":    "400ms",
        "slower":  "600ms",
        "glacial": "1000ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(32px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(262 83% 68% / 0.3)" },
          "50%":      { boxShadow: "0 0 40px hsl(262 83% 68% / 0.6), 0 0 80px hsl(262 83% 68% / 0.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to:   { strokeDashoffset: "0" },
        },
        "shimmer": {
          from: { backgroundPosition: "200% 0" },
          to:   { backgroundPosition: "-200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s cubic-bezier(0, 0, 0.2, 1) both",
        "fade-in":        "fade-in 0.4s ease-out both",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0, 0, 0.2, 1) both",
        "pulse-glow":     "pulse-glow 2.5s ease-in-out infinite",
        "float":          "float 6s ease-in-out infinite",
        "draw-line":      "draw-line 1.5s ease-out forwards",
        "shimmer":        "shimmer 3s linear infinite",
        "spin-slow":      "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
