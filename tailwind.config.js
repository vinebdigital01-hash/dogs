/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Premium Madhav Kennal palette
        brand: {
          teal: "#0F5F5C",
          tealDark: "#0A4442",
          tealLight: "#E6F2F1",
          emerald: "#137E75",
          cream: "#FFF8EE",
          beige: "#F4EBDC",
          gold: "#F5B935",
          goldDark: "#D89A1C",
          coral: "#F27059",
          coralDark: "#DE5B44",
          charcoal: "#1F2A2E",
          charcoalSoft: "#3A4A50",
          ink: "#0B1A1D",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"Playfair Display"', "ui-serif", "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', '"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        700: "700",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(15, 95, 92, 0.18)",
        card: "0 20px 45px -20px rgba(31, 42, 46, 0.22)",
        pop: "0 25px 60px -25px rgba(15, 95, 92, 0.35)",
        ring: "0 0 0 6px rgba(245, 185, 53, 0.18)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(1200px 600px at 15% 20%, #E6F2F1 0%, transparent 60%), radial-gradient(900px 500px at 90% 80%, #FFF3D6 0%, transparent 55%), linear-gradient(180deg, #FFF8EE 0%, #FFFFFF 100%)",
        "teal-gradient": "linear-gradient(135deg, #0F5F5C 0%, #137E75 100%)",
        "gold-gradient": "linear-gradient(135deg, #F5B935 0%, #F27059 100%)",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out both",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 185, 53, 0.55)" },
          "50%": { boxShadow: "0 0 0 14px rgba(245, 185, 53, 0)" },
        },
      },
    },
  },
  plugins: [],
};
