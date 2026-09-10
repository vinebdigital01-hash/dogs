/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Modern sage + white + slate
          teal: "#1B7A5A", // primary sage
          tealDark: "#145C44",
          tealLight: "#E7F6EF",
          emerald: "#1B7A5A",
          cream: "#FFFFFF",
          beige: "#F3F6F4",
          gold: "#2A9D75", // brighter sage for secondary CTAs
          goldDark: "#1B7A5A",
          coral: "#3D9B78",
          coralDark: "#145C44",
          charcoal: "#334155",
          charcoalSoft: "#64748B",
          ink: "#0F172A",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ['"Nunito"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Poppins"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(27, 122, 90, 0.18)",
        card: "0 18px 40px -18px rgba(15, 23, 42, 0.10)",
        pop: "0 24px 50px -20px rgba(27, 122, 90, 0.28)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(15,23,42,0.78) 0%, rgba(20,92,68,0.55) 100%)",
        "warm-gradient": "linear-gradient(135deg, #145C44 0%, #2A9D75 100%)",
        "cream-wash":
          "radial-gradient(900px 500px at 10% 0%, #E7F6EF 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F8FAF9 100%)",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-gentle": "floatGentle 5s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.8s ease-out both",
        "slide-right": "slideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-left": "slideLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "zoom-in": "zoomIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scaleIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "marquee": "marquee 28s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "shimmer": "shimmer 2.8s ease-in-out infinite",
        "wiggle": "wiggle 2.5s ease-in-out infinite",
        "ken-burns": "kenBurns 18s ease-in-out infinite alternate",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-28px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(28px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.86)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.45)" },
          "50%": { boxShadow: "0 0 0 14px rgba(37, 211, 102, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-4deg)" },
          "75%": { transform: "rotate(4deg)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-2%, -1%)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
      },
    },
  },
  plugins: [],
};
