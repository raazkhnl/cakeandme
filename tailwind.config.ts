import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          fixed: "hsl(var(--primary-fixed))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          fixed: "hsl(var(--secondary-fixed))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          variant: "hsl(var(--surface-variant))",
          container: "hsl(var(--surface-container))",
          low: "hsl(var(--surface-container-low))",
          high: "hsl(var(--surface-container-high))",
          tint: "hsl(var(--surface-tint))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 7vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        "eyebrow": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.18em", fontWeight: "600" }]
      },
      borderRadius: {
        xl: "0.85rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      spacing: {
        page: "clamp(1.25rem, 4vw, 4rem)",
        gutter: "1.5rem",
        container: "1280px"
      },
      backdropBlur: {
        xs: "2px"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
