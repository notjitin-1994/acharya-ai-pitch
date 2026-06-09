/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smartTeal: '#A7DADB',
        actionIndigo: '#6366f1',
        deepSlate: '#020C1B',
        surfaceSlate: '#142433',
        secondaryText: '#b0c5c6',
      },
      fontFamily: {
        display: ['Quicksand', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      animation: {
        "shimmer-slide": "shimmer-slide var(--speed) inherit linear infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "ripple": "ripple var(--duration, 2s) ease calc(var(--i, 0) * 0.2s) infinite",
        "border-beam": "border-beam var(--duration) infinite linear",
        "background-position-spin": "background-position-spin 3s infinite alternate",
        "grid": "grid 15s linear infinite",
      },
      keyframes: {
        "background-position-spin": {
          "0%": { "background-position": "top center" },
          "100%": { "background-position": "bottom center" },
        },
        "shimmer-slide": {
          "to": {
            transform: "rotate(360deg)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
