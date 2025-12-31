// @ts-ignore
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F33",
        navy: {
          950: "#050F1A",
          900: "#0B1F33",
          800: "#1A2F47",
          700: "#2A3F5B",
          600: "#3A4F6B",
        },
        text: {
          primary: "#FDFCFA",
          secondary: "#E8E5E0",
          muted: "#B8B5B0",
        },
        accent: {
          sage: "#9FB8A8",
          aqua: "#7FB3B3",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 4px 16px 0 rgba(0, 0, 0, 0.3)",
        "refined": "0 2px 8px 0 rgba(0, 0, 0, 0.2)",
        "subtle": "0 1px 3px 0 rgba(0, 0, 0, 0.15)",
        "glow": "0 0 30px rgba(255, 255, 255, 0.03)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};

export default config;

